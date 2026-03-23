# ORQUESTACION.md

## Diagrama

    ┌──────────┐     ┌──────────┐     ┌──────────┐
    │ Ejecutor │────▶│ Auditor  │────▶│ Firmante │
    └──────────┘     └──────────┘     └──────────┘
         │                │                │
         ▼                ▼                ▼
    ┌──────────┐     ┌──────────┐     ┌──────────┐
    │ Cambios  │     │Evidencia │     │ Aprobado │
    └──────────┘     └──────────┘     └──────────┘


## Workflow
Modo auditoría (uno hace, otro audita, otro firma)

## Objetivo
Asegurar independencia entre ejecución, control y aprobación final.

## Roles
- **Ejecutor:** realiza cambios.
- **Auditor:** valida cumplimiento técnico/proceso.
- **Firmante:** aprueba liberación final.

## Reglas
- Auditor no puede ser el ejecutor.
- Firmante revisa evidencia del auditor, no solo resumen.
- Sin evidencia completa no hay firma.

## Evidencia mínima
- Qué cambió
- Por qué cambió
- Qué pruebas se corrieron
- Resultado de auditoría

## Cierre
- Firma explícita
- Registro de excepciones (si existen)
