<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Backend is Lovable Cloud only (DB, auth, storage); no other database or auth services — single coherent stack.
- Every business table carries `company_id` and RLS scoped via `current_company_id()` / `is_company_owner()` — keeps tenants isolated for future multi-company use.
- Roles live in `user_roles` (owner/worker), never on profiles — prevents privilege escalation.
- Worker accounts are created only via server functions in `src/lib/workers.functions.ts` with `app_metadata.company_id`; public signup only works for the very first owner (DB trigger) — workers cannot self-register.
- Business limits live in pure modules (`src/lib/*-rules.ts`) with tests in `src/test/` and are also enforced in the DB.
- UI copy is Spanish; dates via `src/lib/format.ts` (DD/MM/YYYY, Europe/Madrid, EUR).
- Unfinished modules render `ComingSoon`; never fake functionality.
- Keep PROJECT_STATUS.md, DATABASE.md, CHANGELOG.md updated at the end of each phase.
