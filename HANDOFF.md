# HANDOFF — traspaso del proyecto a otra IA / otro editor

Este archivo es el punto de entrada para cualquiera (humano o IA) que continúe el proyecto
fuera de Lovable. Léelo entero antes de tocar código. Los detalles están en
`AGENTS.md`, `PROJECT_STATUS.md`, `DATABASE.md`, `SETUP.md` y `CHANGELOG.md`.

## 1. Qué es la aplicación

Sistema de gestión para una empresa de reformas/construcción. Módulos previstos:
inicio, clientes, obras, trabajos, calendario, presupuestos, pagos, materiales, almacén,
gastos, finanzas, facturas (PDF), horas, equipos, fotos, notificaciones, trabajadores,
configuración. Interfaz en español.

## 2. Stack

- TanStack Start v1 (React 19, Vite 7) — enrutado por archivos en `src/routes`, server functions con `createServerFn`.
- Tailwind CSS v4 (`src/styles.css`, tokens semánticos; no hardcodear colores).
- Backend: Lovable Cloud (Supabase) — base de datos, autenticación, almacenamiento. No usar otra base de datos ni otro sistema de login.
- Pruebas: `bunx vitest run`.

## 3. Arranque local

1. `bun install`
2. Copiar `.env.example` a `.env` y poner los valores reales del proyecto (URL y clave publishable del backend; la clave `SUPABASE_SERVICE_ROLE_KEY` no está disponible en Lovable Cloud).
3. `bun run dev` → http://localhost:8080
4. `bunx vitest run`

## 4. Dónde está cada cosa

| Ruta | Contenido |
|---|---|
| `src/routes/index.tsx`, `auth.tsx`, `reset-password.tsx` | Registro del primer propietario, login, recuperación |
| `src/routes/_authenticated/*` | 13 secciones tras el login; las no hechas muestran `ComingSoon` |
| `src/lib/workers-rules.ts` | Reglas puras de trabajadores (límites, validaciones) |
| `src/lib/workers.functions.ts` | Server functions: crear/editar/bloquear/eliminar trabajadores |
| `src/lib/format.ts` | Fechas DD/MM/YYYY, zona Europe/Madrid, importes EUR |
| `src/test/` | Pruebas (reglas y enrutado) |
| `drizzle/migrations/0000_migration.sql` | Esquema completo de la base de datos |
| `supabase/` | Configuración del backend gestionado |

## 5. Reglas de negocio que no se pueden romper

- Primera cuenta = propietario (crea la empresa). El registro público queda cerrado después; los trabajadores **nunca** se auto-registran, solo los crea el propietario desde la app.
- Máximo **15 trabajadores** por empresa (validado en `workers-rules.ts`, en la app y por trigger en la base de datos).
- Contraseña mínima **8 caracteres**.
- Roles solo en `user_roles` (`owner` | `worker`), nunca en `profiles`.
- Toda tabla de negocio lleva `company_id` y RLS basada en `current_company_id()` / `is_company_owner()`.
- Un trabajador solo lee su perfil y su rol; no puede cambiar perfiles ni permisos.
- Operaciones privilegiadas (crear/eliminar/bloquear cuentas) solo en server functions que comprueban rol owner.
- Módulos no terminados: pantalla `ComingSoon`. Nunca simular datos ni funcionalidad falsa.
- Copys en español; fechas e importes siempre por `src/lib/format.ts`.

## 6. Estado actual

**Fase 1 — terminada:** base de datos, autenticación por correo/contraseña, recuperación
de contraseña, primer propietario, gestión de trabajadores (crear, editar, permisos de
gastos/materiales, activar/desactivar, cambiar contraseña, eliminar, historial en
`audit_log`), configuración de empresa (datos, prefijo de facturas, IVA por defecto),
navegación completa.

**Pendiente:**
- Fase 2: clientes, obras, trabajos, calendario.
- Fase 3: presupuestos, pagos, materiales, almacén, gastos.
- Fase 4: finanzas, facturas, PDF.
- Fase 5: horas, equipos, fotos, notificaciones.
- Fase 6: PWA instalable, pruebas, seguridad.

## 7. Cambios en la base de datos

- El esquema vive en `drizzle/migrations/0000_migration.sql`.
- **Las migraciones no se aplican solas** al sincronizar con GitHub/GitLab/Bitbucket ni al
  ejecutar la app. Hay que aplicarlas en el backend de destino (desde el editor original,
  o con la herramienta SQL de la plataforma que hospede la base de datos).
- Al crear tablas nuevas: `company_id`, RLS activada con políticas, y GRANT correspondiente.
  Sin políticas la tabla queda inaccesible.
- No modificar tablas ni funciones de los esquemas `auth`, `storage`, `realtime`,
  `supabase_functions`, `vault`.
- Tablas de aplicación: guardar IDs de usuario como UUIDs o referenciar `public.profiles`,
  sin claves foráneas a `auth.users` (solo `profiles` y `user_roles` pueden referirlo).

## 8. Datos y copias de seguridad

El repositorio contiene **solo código**: ni los datos de las tablas ni los archivos subidos.
Para mover la app con datos reales hay que exportar las tablas y el almacenamiento por
separado desde el panel del backend, y aplicar antes el esquema en la base de datos nueva.
Los usuarios existentes eligen una contraseña nueva en su primera visita si se migra a otro
backend.

## 9. Sugerencia de primer paso

Empezar por la Fase 2: tablas `clients` y `works` (obras) con `company_id` + RLS, pantallas
de listado/alta/edición, y pruebas de las reglas en `src/test/`. Mantener actualizados
`PROJECT_STATUS.md`, `DATABASE.md` y `CHANGELOG.md` al cerrar cada fase.
