#!/usr/bin/env python3
"""
Carga las historias de assets/historias-usuario-login_v2.0.0.md bajo la épica MAGIA-155.

Requiere secrets de Cloud Agent / entorno:
  ATLASSIAN_EMAIL
  ATLASSIAN_API_TOKEN
  ATLASSIAN_BASE_URL  (opcional; default https://bancoatlaspy.atlassian.net)

Uso:
  python3 scripts/jira/load_login_stories_to_epic.py
  python3 scripts/jira/load_login_stories_to_epic.py --dry-run
  python3 scripts/jira/load_login_stories_to_epic.py --only-hu
  python3 scripts/jira/load_login_stories_to_epic.py --epic MAGIA-155
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
STORIES_MD = ROOT / "assets" / "historias-usuario-login_v2.0.0.md"
DEFAULT_BASE = "https://bancoatlaspy.atlassian.net"
DEFAULT_EPIC = "MAGIA-155"


def require_env() -> tuple[str, str, str]:
    base = os.environ.get("ATLASSIAN_BASE_URL") or os.environ.get("JIRA_URL") or DEFAULT_BASE
    email = os.environ.get("ATLASSIAN_EMAIL") or os.environ.get("JIRA_USERNAME") or ""
    token = os.environ.get("ATLASSIAN_API_TOKEN") or os.environ.get("JIRA_API_TOKEN") or ""
    if not email or not token:
        print(
            "❌ Faltan credenciales de Jira.\n"
            "   Configurá en Cursor Dashboard → Cloud Agents → Secrets:\n"
            "   - ATLASSIAN_EMAIL\n"
            "   - ATLASSIAN_API_TOKEN\n"
            "   (opcional) ATLASSIAN_BASE_URL=https://bancoatlaspy.atlassian.net\n"
            "   Luego reiniciá el agente o exportá las variables en la sesión.",
            file=sys.stderr,
        )
        sys.exit(2)
    return base.rstrip("/"), email, token


def api(base: str, email: str, token: str, method: str, path: str, body: dict | None = None):
    url = f"{base}{path}"
    data = None if body is None else json.dumps(body).encode("utf-8")
    auth = base64.b64encode(f"{email}:{token}".encode()).decode()
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": f"Basic {auth}",
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            raw = resp.read().decode("utf-8") or "{}"
            return resp.status, json.loads(raw) if raw.strip() else {}
    except urllib.error.HTTPError as e:
        err = e.read().decode("utf-8", errors="replace")
        try:
            payload = json.loads(err)
        except Exception:
            payload = {"raw": err}
        return e.code, payload


def parse_cards(md_text: str) -> list[dict]:
    m6 = re.search(r"^## 6\. .+$", md_text, re.M)
    m7 = re.search(r"^## 7\. .+$", md_text, re.M)
    m8 = re.search(r"^## 8\. .+$", md_text, re.M)
    if not (m6 and m7 and m8):
        raise RuntimeError("No se encontraron las secciones 6/7/8 en el markdown")

    def parse_section(section: str, default_kind: str) -> list[dict]:
        cards = []
        for part in re.split(r"(?=^### LO-)", section, flags=re.M):
            if not part.startswith("### LO-"):
                continue
            title_m = re.match(r"^### (LO-[\w-]+) — (.+)$", part, re.M)
            if not title_m:
                continue
            key, title = title_m.group(1), title_m.group(2).strip()
            meta = {
                k.strip(): v.strip()
                for k, v in re.findall(r"^\| \*\*(.+?)\*\* \| (.+?) \|$", part, re.M)
            }
            def grab(header: str, code: bool = False) -> str:
                if code:
                    m = re.search(
                        rf"#### {re.escape(header)}\n```(?:\w+)?\n(.*?)```",
                        part,
                        re.S,
                    )
                else:
                    m = re.search(
                        rf"#### {re.escape(header)}\n(.+?)(?=\n#### |\n### |\Z)",
                        part,
                        re.S,
                    )
                return m.group(1).strip() if m else ""

            tipo = meta.get("Tipo", default_kind)
            cards.append(
                {
                    "external_key": key,
                    "summary": f"{key} — {title}"[:255],
                    "title": title,
                    "tipo": tipo,
                    "meta": meta,
                    "historia": grab("Historia", code=True) or grab("Historia"),
                    "valor": grab("Valor de negocio"),
                    "objetivo": grab("Objetivo técnico"),
                    "fuente": grab("Escenarios fuente"),
                    "ac": grab("Criterios de aceptación"),
                    "bdd": grab("Escenarios BDD", code=True),
                    "fuera_alcance": grab("Fuera de alcance"),
                    "notas": grab("Notas / preguntas abiertas"),
                    "errores": grab("Errores esperados"),
                    "kind": "HU" if "HU" in tipo else "HT",
                }
            )
        return cards

    return parse_section(md_text[m6.start() : m7.start()], "HU") + parse_section(
        md_text[m7.start() : m8.start()], "HT"
    )


def adf_doc(blocks: list[dict]) -> dict:
    return {"type": "doc", "version": 1, "content": blocks}


def adf_heading(text: str, level: int = 2) -> dict:
    return {
        "type": "heading",
        "attrs": {"level": level},
        "content": [{"type": "text", "text": text}],
    }


def adf_paragraph(text: str) -> dict:
    if not text:
        return {"type": "paragraph", "content": []}
    return {
        "type": "paragraph",
        "content": [{"type": "text", "text": text}],
    }


def adf_code(text: str, language: str = "text") -> dict:
    return {
        "type": "codeBlock",
        "attrs": {"language": language},
        "content": [{"type": "text", "text": text}],
    }


def adf_bullet_lines(text: str) -> list[dict]:
    items = []
    for line in text.splitlines():
        cleaned = re.sub(r"^[-*]\s+", "", line).strip()
        if not cleaned:
            continue
        # numbered AC lines
        cleaned = re.sub(r"^\d+\.\s+", "", cleaned)
        items.append(
            {
                "type": "listItem",
                "content": [adf_paragraph(cleaned[:4000])],
            }
        )
    if not items:
        return [adf_paragraph(text[:4000])]
    return [{"type": "bulletList", "content": items}]


def card_to_adf(card: dict) -> dict:
    content: list[dict] = []
    content.append(adf_heading("Historia", 2))
    if card.get("historia"):
        content.append(adf_code(card["historia"], "text"))
    else:
        content.append(adf_paragraph("(sin enunciado Connextra — historia técnica)"))

    if card.get("valor"):
        content.append(adf_heading("Valor de negocio", 3))
        content.append(adf_paragraph(card["valor"][:5000]))
    if card.get("objetivo"):
        content.append(adf_heading("Objetivo técnico", 3))
        content.append(adf_paragraph(card["objetivo"][:5000]))

    meta_lines = []
    for k in ("Tipo", "Épica", "Actor", "Dominios", "Prioridad sugerida", "Depende de", "Habilita", "Pantalla POC", "Contrato", "Habilita"):
        if k in card["meta"]:
            meta_lines.append(f"{k}: {card['meta'][k]}")
    if meta_lines:
        content.append(adf_heading("Metadatos", 3))
        content.extend(adf_bullet_lines("\n".join(f"- {x}" for x in meta_lines)))

    if card.get("fuente"):
        content.append(adf_heading("Escenarios fuente (Excel)", 3))
        # keep fenced text if present
        fuente = card["fuente"]
        m = re.search(r"```(?:text)?\n(.*?)```", fuente, re.S)
        content.append(adf_code(m.group(1).strip() if m else fuente, "text"))

    if card.get("ac"):
        content.append(adf_heading("Criterios de aceptación", 3))
        content.extend(adf_bullet_lines(card["ac"]))

    if card.get("bdd"):
        content.append(adf_heading("Escenarios BDD (Gherkin)", 3))
        # Jira ADF code blocks have practical size limits; keep a generous but safe slice
        content.append(adf_code(card["bdd"][:30000], "gherkin"))

    if card.get("fuera_alcance"):
        content.append(adf_heading("Fuera de alcance", 3))
        content.extend(adf_bullet_lines(card["fuera_alcance"]))

    if card.get("errores"):
        content.append(adf_heading("Errores esperados", 3))
        content.append(adf_code(card["errores"][:8000], "text"))

    if card.get("notas"):
        content.append(adf_heading("Notas / preguntas abiertas", 3))
        content.extend(adf_bullet_lines(card["notas"]))

    content.append(adf_heading("Trazabilidad", 3))
    content.append(
        adf_paragraph(
            f"Origen: historias-usuario-login_v2.0.0.md · Key funcional: {card['external_key']} · "
            f"Épica padre: {DEFAULT_EPIC}"
        )
    )
    return adf_doc(content)


def detect_project_and_link(base, email, token, epic_key: str):
    status, epic = api(base, email, token, "GET", f"/rest/api/3/issue/{epic_key}?fields=project,issuetype,summary,parent")
    if status != 200:
        raise RuntimeError(f"No se pudo leer {epic_key}: HTTP {status} {epic}")
    project_key = epic["fields"]["project"]["key"]
    project_id = epic["fields"]["project"]["id"]
    summary = epic["fields"]["summary"]

    status, meta = api(
        base,
        email,
        token,
        "GET",
        f"/rest/api/3/issue/createmeta?projectKeys={project_key}&expand=projects.issuetypes.fields",
    )
    if status != 200:
        raise RuntimeError(f"createmeta falló: HTTP {status} {meta}")

    issue_types = meta["projects"][0]["issuetypes"]
    by_name = {t["name"].lower(): t for t in issue_types}

    def pick(*names: str):
        for n in names:
            if n.lower() in by_name:
                return by_name[n.lower()]
        return None

    story_type = pick("Story", "Historia", "User Story") or pick("Task", "Tarea")
    task_type = pick("Task", "Tarea", "Technical Task", "Historia Técnica") or story_type
    if not story_type:
        raise RuntimeError(f"No hay issue types usables en {project_key}: {[t['name'] for t in issue_types]}")

    # Detect epic link mechanism from Story fields
    fields = story_type.get("fields") or {}
    epic_link_field = None
    parent_supported = "parent" in fields
    for fid, fdef in fields.items():
        name = (fdef.get("name") or "").lower()
        if name in ("epic link", "epic-link") or fid.startswith("customfield_") and "epic" in name:
            epic_link_field = fid
            break
        if name == "epic link":
            epic_link_field = fid
            break

    # Fallback common cloud epic link
    if not epic_link_field and not parent_supported:
        for fid, fdef in fields.items():
            if "epic" in (fdef.get("name") or "").lower():
                epic_link_field = fid
                break

    return {
        "project_key": project_key,
        "project_id": project_id,
        "epic_summary": summary,
        "story_type": story_type["name"],
        "task_type": task_type["name"],
        "parent_supported": parent_supported,
        "epic_link_field": epic_link_field,
        "issue_type_names": [t["name"] for t in issue_types],
    }


def build_fields(card: dict, epic_key: str, link_info: dict) -> dict:
    issue_type = link_info["story_type"] if card["kind"] == "HU" else link_info["task_type"]
    fields = {
        "project": {"key": link_info["project_key"]},
        "summary": card["summary"],
        "issuetype": {"name": issue_type},
        "description": card_to_adf(card),
        "labels": ["login", "epic-login", card["external_key"].lower().replace("_", "-"), card["kind"].lower()],
    }
    if link_info["parent_supported"]:
        fields["parent"] = {"key": epic_key}
    elif link_info["epic_link_field"]:
        fields[link_info["epic_link_field"]] = epic_key
    else:
        # last resort: put epic key in description already; also try parent
        fields["parent"] = {"key": epic_key}
    return fields


def find_existing(base, email, token, project_key: str, external_key: str):
    jql = urllib.parse.quote(
        f'project = {project_key} AND summary ~ "\\"{external_key} —\\"" ORDER BY created DESC'
    )
    # use search/jql modern endpoint if available; fallback to old search
    status, body = api(
        base,
        email,
        token,
        "GET",
        f"/rest/api/3/search/jql?jql={jql}&maxResults=5&fields=summary,key",
    )
    if status == 200 and body.get("issues") is not None:
        for issue in body["issues"]:
            if issue.get("fields", {}).get("summary", "").startswith(f"{external_key} —"):
                return issue["key"]
        return None
    # fallback classic
    status, body = api(
        base,
        email,
        token,
        "GET",
        f"/rest/api/3/search?jql={jql}&maxResults=5&fields=summary,key",
    )
    if status != 200:
        return None
    for issue in body.get("issues", []):
        if issue.get("fields", {}).get("summary", "").startswith(f"{external_key} —"):
            return issue["key"]
    return None


# late import for quote
import urllib.parse  # noqa: E402


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--epic", default=DEFAULT_EPIC)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--only-hu", action="store_true", help="Solo HU funcionales (no HT)")
    parser.add_argument("--only-ht", action="store_true", help="Solo historias técnicas")
    parser.add_argument("--limit", type=int, default=0)
    args = parser.parse_args()

    cards = parse_cards(STORIES_MD.read_text(encoding="utf-8"))
    if args.only_hu:
        cards = [c for c in cards if c["kind"] == "HU"]
    if args.only_ht:
        cards = [c for c in cards if c["kind"] == "HT"]
    if args.limit:
        cards = cards[: args.limit]

    print(f"📄 Fuente: {STORIES_MD}")
    print(f"📦 Historias a cargar: {len(cards)} (HU={sum(c['kind']=='HU' for c in cards)}, HT={sum(c['kind']=='HT' for c in cards)})")
    print(f"🎯 Épica: {args.epic}")

    if args.dry_run:
        for c in cards:
            print(f"  - [{c['kind']}] {c['summary']}")
        print("Dry-run: no se creó nada en Jira.")
        return

    base, email, token = require_env()
    print(f"🔗 Jira: {base} · usuario: {email}")

    link_info = detect_project_and_link(base, email, token, args.epic)
    print(
        f"✅ Épica '{link_info['epic_summary']}' en proyecto {link_info['project_key']}\n"
        f"   Issue types: Story={link_info['story_type']} / Task={link_info['task_type']}\n"
        f"   Link: parent={link_info['parent_supported']} epic_link_field={link_info['epic_link_field']}\n"
        f"   Types disponibles: {', '.join(link_info['issue_type_names'])}"
    )

    results = []
    for i, card in enumerate(cards, 1):
        existing = find_existing(base, email, token, link_info["project_key"], card["external_key"])
        if existing:
            print(f"[{i}/{len(cards)}] ↩️  Ya existe {existing} ← {card['external_key']}")
            results.append({"external_key": card["external_key"], "key": existing, "action": "exists"})
            continue

        fields = build_fields(card, args.epic, link_info)
        status, body = api(base, email, token, "POST", "/rest/api/3/issue", {"fields": fields})
        if status in (200, 201):
            key = body.get("key")
            print(f"[{i}/{len(cards)}] ✅ Creada {key} ← {card['external_key']}")
            results.append({"external_key": card["external_key"], "key": key, "action": "created"})
        else:
            # if parent unsupported, retry with epic link only or without parent
            print(f"[{i}/{len(cards)}] ⚠️  Falló {card['external_key']}: HTTP {status} → {json.dumps(body)[:500]}")
            if "parent" in fields and status == 400:
                fields.pop("parent", None)
                if link_info["epic_link_field"]:
                    fields[link_info["epic_link_field"]] = args.epic
                status2, body2 = api(base, email, token, "POST", "/rest/api/3/issue", {"fields": fields})
                if status2 in (200, 201):
                    key = body2.get("key")
                    print(f"           ✅ Creada en reintento {key}")
                    results.append({"external_key": card["external_key"], "key": key, "action": "created-retry"})
                else:
                    print(f"           ❌ Reintento falló HTTP {status2}: {json.dumps(body2)[:500]}")
                    results.append({"external_key": card["external_key"], "key": None, "action": "error", "error": body2})
            else:
                results.append({"external_key": card["external_key"], "key": None, "action": "error", "error": body})
        time.sleep(0.35)

    out = Path("/tmp/jira_load_results.json")
    out.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    created = sum(1 for r in results if r["action"].startswith("created"))
    exists = sum(1 for r in results if r["action"] == "exists")
    errors = sum(1 for r in results if r["action"] == "error")
    print(f"\nResumen: created={created} exists={exists} errors={errors}")
    print(f"Resultados: {out}")
    if errors:
        sys.exit(1)


if __name__ == "__main__":
    main()
