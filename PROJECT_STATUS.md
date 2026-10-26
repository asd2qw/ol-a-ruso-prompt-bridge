# Estado del proyecto

## Fase 1 — terminada
- Lovable Cloud: base de datos, autenticación.
- Inicio de sesión por correo/contraseña, recuperación de contraseña (/reset-password).
- Primera cuenta = propietario (crea la empresa). Registro público cerrado después.
- Trabajadores: crear (máx. 15), editar, permisos (gastos/materiales), activar/desactivar (bloquea el acceso), cambiar contraseña, eliminar. Historial en `audit_log`.
- Configuración: datos de empresa, prefijo de facturas, IVA por defecto.
- Navegación completa; módulos no hechos muestran "Próximamente".

## Pendiente
- Fase 2: clientes, obras, trabajos, calendario.
- Fase 3: presupuestos, pagos, materiales, almacén, gastos.
- Fase 4: finanzas, facturas, PDF.
- Fase 5: horas, equipos, fotos, notificaciones.
- Fase 6: PWA instalable, pruebas, seguridad, GitHub.

## Arquitectura
TanStack Start (React 19) + Tailwind v4 + Lovable Cloud. Operaciones privilegiadas en funciones de servidor con verificación de rol.
