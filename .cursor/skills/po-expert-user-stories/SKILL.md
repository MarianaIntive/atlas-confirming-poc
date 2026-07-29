---
name: po-expert-user-stories
description: >
  Elabora historias de usuario listas para backlog (formato tarjeta PO) a partir de
  requerimientos, Excel o notas. Usar cuando el usuario pida historias de usuario,
  criterios de aceptación, Gherkin, backlog LOGIN/ABM, o invoque po-expert-user-stories.
---

# PO Expert — Historias de usuario

Skill de Product Owner para convertir requerimientos en historias **INVEST**, listas
para Jira, con criterios de aceptación binarios y escenarios BDD en español.

## Cuándo aplicar

- "utilizar po-expert-user-stories"
- Crear / regenerar historias de usuario
- Pasar un Excel o notas a backlog
- Pedir Gherkin / criterios de aceptación

## Principios

1. **Una historia = un resultado de valor** para un actor concreto. Si mezcla pantallas y endpoints, separar HU y HT (enabler).
2. **INVEST**: Independent, Negotiable, Valuable, Estimable, Small, Testable. Si falla, partir o marcar spike.
3. **AC primero, Gherkin después**: criterios numerados (pasa/falla) son la fuente de verdad del PO; el Gherkin es la especificación BDD para QA/dev.
4. **No inventar alcance**: lo tachado se desestima; lo faltante va a "Recomendaciones", nunca mezclado con lo comprometido.
5. **Mensajes y reglas centralizados**: referenciar `MSG-xx` / `RN-xx`; no duplicar textos largos en cada historia.
6. **Idioma**: historia y AC en español; Gherkin con palabras clave en español (`Característica`, `Antecedentes`, `Escenario`, `Dado`, `Cuando`, `Entonces`, `Y`, `Esquema del escenario`, `Ejemplos`).

## Formato obligatorio de cada HU (tarjeta)

```markdown
### LO-XX — <Título corto orientado al valor>

| | |
|---|---|
| **Tipo** | HU-FE / HU-BE |
| **Épica** | LOGIN |
| **Actor** | <persona concreta> |
| **Dominios** | … |
| **Prioridad sugerida** | Must / Should / Could |
| **Depende de** | … |
| **Habilita** | … |
| **Pantalla POC** | … (si aplica) |

#### Historia
Como <actor concreto>
quiero <capacidad observable>
para <beneficio de negocio medible o claro>

#### Valor de negocio
<1–2 oraciones: por qué importa ahora>

#### Escenarios fuente
> Transcripción literal del Excel / requerimiento (si existe).

#### Criterios de aceptación
1. **[Feliz]** …
2. **[Alternativo]** …
3. **[Error / validación]** …
4. …

Cada criterio debe ser verificable en demo (sí/no). Referenciar `MSG-xx` y `RN-xx`.

#### Escenarios BDD
```gherkin
Característica: …
  Antecedentes:
    Dado …
  Escenario: …
    Dado …
    Cuando …
    Entonces …
```

#### Fuera de alcance
- …

#### Notas / preguntas abiertas
- …

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅/⚠️ | … | … | … | … | … |
```

## Formato obligatorio de cada HT (enabler)

```markdown
### LO-XX — <Método + recurso>

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Habilita** | LO-… |
| **Contrato** | `METHOD /path` |

#### Objetivo técnico
…

#### Criterios de aceptación
1. …
2. …

#### Escenarios BDD
```gherkin
Característica: …
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
```

## Orden de trabajo

1. Clasificar filas/requerimientos: incluir / desestimar / recomendación.
2. Extraer actores, reglas transversales y catálogo de mensajes.
3. Escribir HU funcionales en formato tarjeta.
4. Escribir HT enablers ligadas a cada HU.
5. Listar spikes y recomendaciones **por separado**.
6. Matriz de trazabilidad HU ↔ endpoint ↔ pantalla.
7. DoR / DoD.

## Anti-patrones (evitar)

- Meter Gherkin sin criterios numerados.
- Historias "el sistema debe…" sin actor.
- Mezclar BANCO + EGP + Proveedor en una sola HU si el flujo diverge de forma material (salvo unificación explícita del Excel).
- Inventar endpoints o pantallas no pedidas sin marcarlas como recomendación.
- Palabras clave Gherkin en inglés si el equipo trabaja en español (salvo que el repo ya fije otra convención; en regeneraciones `po-expert` usar español).
