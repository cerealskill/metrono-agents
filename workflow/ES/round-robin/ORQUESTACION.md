# ORQUESTACION.md

## Workflow
Round-Robin (distribución rotativa de carga)

## Objetivo
Distribuir tareas entrantes equitativamente entre un pool de agentes usando asignación cíclica.

## Roles
- **Despachador:** recibe tareas y asigna usando índice de rotación.
- **N Agentes worker:** ejecutan tareas asignadas.
- **Monitor (opcional):** rastrea balance de carga y disponibilidad de agentes.

## Cuándo usar
- Tareas homogéneas que cualquier agente puede manejar.
- Necesidad de evitar sobrecargar un solo agente.
- Distribución simple y predecible sin lógica de routing compleja.

## Protocolo
1. Despachador mantiene lista ordenada de agentes disponibles.
2. Cada nueva tarea se asigna al siguiente agente en el ciclo.
3. Agente confirma y ejecuta.
4. Si un agente no está disponible, saltar al siguiente; marcar como inactivo.
5. Reactivar agentes cuando señalan disponibilidad.

## Reglas
- El orden de asignación es determinístico (sin aleatoriedad).
- Agentes saltados se reintentan en el siguiente ciclo completo.
- Si todos los agentes están inactivos, encolar la tarea y alertar.
- Ninguna tarea se asigna a más de un agente.

## Variantes
- **Round-robin ponderado:** agentes con más capacidad reciben proporcionalmente más tareas.
- **Round-robin sticky:** el mismo solicitante siempre se enruta al mismo agente (por continuidad).

## Entregables
- Log de asignación (tarea → agente)
- Reporte de distribución de carga
- Timeline de disponibilidad de agentes

## Diagrama

    ┌───────────┐
    │  Tareas   │
    │ entrantes │
    └─────┬─────┘
          ▼
    ┌────────────┐
    │Despachador │─── índice de rotación
    └──┬──┬──┬───┘
       │  │  │
       ▼  ▼  ▼     ┌ ─ ─ ─ ─ ─ ─ ─ ┐
    ┌──┐┌──┐┌──┐     ciclo se repite
    │A1││A2││A3│   │ A1 → A2 → A3 → │
    └──┘└──┘└──┘
                   └ ─ ─ ─ ─ ─ ─ ─ ┘
