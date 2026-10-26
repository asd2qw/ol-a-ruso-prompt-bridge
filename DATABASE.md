# Base de datos

| Tabla | Descripción |
|---|---|
| companies | Empresa (nombre, razón social, NIF/CIF, dirección, prefijo facturas, IVA por defecto) |
| profiles | Usuario: company_id, nombre, email, teléfono, activo, permisos `can_register_expenses`, `can_register_materials` |
| user_roles | Rol por usuario: `owner` o `worker` (tabla separada) |
| audit_log | Historial de cambios (quién, qué, cuándo) |

## Funciones
- `has_role(user, role)`, `current_company_id()`, `is_company_owner(company)` — security definer, usadas en RLS.
- `company_exists()` — pública, para mostrar el registro del primer propietario.
- Trigger `handle_new_user`: primer registro crea empresa + propietario; cuentas creadas por el propietario llevan `app_metadata.company_id` y reciben rol worker; resto rechazado.
- Trigger `enforce_worker_limit`: máximo 15 trabajadores por empresa.
- Trigger `profiles_guard`: impide cambiar la empresa de un perfil.

## Permisos (RLS)
- Trabajador: lee solo su perfil y su rol; no puede modificar perfiles ni permisos.
- Propietario: lee/edita perfiles de su empresa, edita la empresa, lee el historial.
- Crear/eliminar/bloquear cuentas: solo funciones de servidor que comprueban rol owner.
