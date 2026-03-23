# ORQUESTACION.md

## Diagrama

    ┌─────────┐     ┌────────────┐     ┌───────────┐
    │ Alerta  │────▶│ Dispatcher │────▶│ Clasificar│
    └─────────┘     └────────────┘     └─────┬─────┘
                                             │
                         ┌───────────────────┼───────────────────┐
                         ▼                   ▼                   ▼
                    ┌─────────┐        ┌─────────┐        ┌─────────┐
                    │  Sev1   │        │  Sev2   │        │  Sev3   │
                    └────┬────┘        └────┬────┘        └────┬────┘
                         ▼                  ▼                  ▼
                    ┌──────────┐     ┌───────────┐     ┌───────────┐
                    │ Escalar  │     │ Auto-fix  │     │ Auto-fix  │
                    │ + Humano │     │ + Verify  │     │ + Cerrar  │
                    └──────────┘     └───────────┘     └───────────┘


## Workflow
On-call automático

## Objetivo
Responder incidentes automáticamente con triage, mitigación inicial y escalamiento humano cuando corresponda.

## Roles
- **Dispatcher:** clasifica alerta y asigna flujo.
- **Respondedor automático:** ejecuta runbook de primera respuesta.
- **Escalador:** notifica humano on-call si supera umbral.

## Flujo
1. Ingesta de alerta
2. Clasificación (sev1/sev2/sev3)
3. Acción automática permitida (safe list)
4. Verificación post-acción
5. Escalamiento o cierre

## SLA sugerido
- Ack: <5 min
- Mitigación inicial: <15 min
- Escalamiento Sev1: inmediato

## Guardrails
- Prohibido ejecutar acciones destructivas automáticas.
- Toda acción debe quedar auditada con timestamp.

## Entrega
- Timeline
- Root cause preliminar
- Acciones tomadas
