# ORQUESTACION.md

## Workflow
Pair Programming (driver + navegante)

## Objetivo
Mejorar calidad y reducir defectos haciendo que dos agentes colaboren en tiempo real sobre la misma tarea.

## Roles
- **Driver:** escribe código/contenido, se enfoca en detalles de implementación.
- **Navegante:** revisa en tiempo real, piensa adelante, detecta problemas temprano.

## Cuándo usar
- Cambios complejos o de alto riesgo.
- Transferencia de conocimiento entre agentes.
- Tareas donde los errores son costosos de corregir después.

## Protocolo
1. Acordar objetivo y enfoque antes de empezar.
2. Driver implementa; navegante revisa continuamente.
3. Navegante señala problemas, sugiere mejoras, lleva el plan.
4. Intercambiar roles en intervalos regulares o puntos naturales.
5. Ambos firman la salida final.

## Reglas
- Navegante no dicta cada tecla — se enfoca en estrategia y correctitud.
- Driver explica intención cuando navegante pregunta.
- Los intercambios de rol son obligatorios, no opcionales.
- Desacuerdos resueltos por discusión rápida; si se traban, time-box y escalar.

## Beneficios
- Gate de calidad en tiempo real
- Contexto y conocimiento compartido
- Menos defectos llegan a revisión

## Entregables
- Artefacto completado (código, documento, config)
- Notas inline de la revisión del navegante
- Resumen de decisiones clave tomadas durante la sesión

## Diagrama

    ┌──────────┐          ┌───────────┐
    │  Driver  │◀────────▶│ Navegante │
    │ (código) │  revisión│(estrategia│
    └────┬─────┘          └─────┬─────┘
         │                      │
         ▼                      ▼
    ┌──────────┐          ┌───────────┐
    │ Escribe  │          │  Revisa   │
    │  código  │          │ en tiempo │
    │          │          │   real    │
    └────┬─────┘          └─────┬─────┘
         │                      │
         └──────────┬───────────┘
                    ▼
              ┌───────────┐
              │Intercambio│
              │ de roles  │
              └───────────┘
