# Informe de mantenimiento

## Resumen
- `npm ci` se ejecutó con advertencias de paquetes obsoletos.
- `npm test` falló: vitest no encontrado.
- `npm audit` falló con 403 Forbidden.
- Se ampliaron exclusiones en `.gitignore`.
- Workflows de GitHub Actions ahora incluyen `permissions: read-all`, `concurrency` y actualizaciones a `codecov-action@v4` y `upload-artifact@v4`.
- Escaneo rápido de secretos: `api_keys_to_replace.txt` contiene claves revocadas (líneas 1-8).
 - Se corrigió la indentación de pasos en `ci.yml` para evitar fallos en la canalización y se añadieron TODOs para fijar acciones por SHA.

## Dependencias
No se pudieron actualizar dependencias automáticamente (`npx npm-check-updates` devolvió 403 Forbidden).

## Próximos pasos
- Instalar `vitest` o revisar configuración de pruebas.
- Revisar acceso al registry para ejecutar `npm audit` y `npm-check-updates`.
- Considerar rotación adicional de claves listadas en `api_keys_to_replace.txt`.
- Ejecutar `npx playwright install` para que las pruebas E2E encuentren los navegadores requeridos.
