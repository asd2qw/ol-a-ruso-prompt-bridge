import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { canAddWorker, validateWorkerInput, type WorkerInput } from "./workers-rules";

type Ctx = { supabase: any; userId: string };

/** Verifies the caller is the owner and returns their company id. */
async function requireOwner({ supabase, userId }: Ctx): Promise<string> {
  const { data, error } = await supabase
    .from("user_roles")
    .select("company_id")
    .eq("user_id", userId)
    .eq("role", "owner")
    .maybeSingle();
  if (error || !data) throw new Error("Solo el propietario puede gestionar trabajadores.");
  return data.company_id as string;
}

async function getWorkerInCompany(admin: any, workerId: string, companyId: string) {
  const { data } = await admin
    .from("user_roles")
    .select("user_id")
    .eq("user_id", workerId)
    .eq("company_id", companyId)
    .eq("role", "worker")
    .maybeSingle();
  if (!data) throw new Error("Trabajador no encontrado.");
}

async function audit(admin: any, companyId: string, actorId: string, action: string, entityId: string, details: object) {
  await admin.from("audit_log").insert({ company_id: companyId, actor_id: actorId, entity: "worker", entity_id: entityId, action, details });
}

export const createWorker = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: WorkerInput) => input)
  .handler(async ({ data, context }) => {
    const companyId = await requireOwner(context as Ctx);
    const err = validateWorkerInput(data);
    if (err) throw new Error(err);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("company_id", companyId)
      .eq("role", "worker");
    if (!canAddWorker(count ?? 0)) throw new Error("Has alcanzado el límite de 15 trabajadores.");

    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email.trim().toLowerCase(),
      password: data.password,
      email_confirm: true,
      user_metadata: { full_name: data.fullName.trim() },
      app_metadata: { company_id: companyId, phone: data.phone?.trim() || null },
    });
    if (error || !created.user) {
      const msg = error?.message ?? "";
      throw new Error(/already/i.test(msg) ? "Ya existe una cuenta con ese correo." : "No se pudo crear la cuenta.");
    }
    await supabaseAdmin
      .from("profiles")
      .update({ can_register_expenses: data.canRegisterExpenses, can_register_materials: data.canRegisterMaterials })
      .eq("id", created.user.id);
    await audit(supabaseAdmin, companyId, context.userId, "create", created.user.id, { email: data.email, name: data.fullName });
    return { id: created.user.id };
  });

export const setWorkerActive = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { workerId: string; active: boolean }) => input)
  .handler(async ({ data, context }) => {
    const companyId = await requireOwner(context as Ctx);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await getWorkerInCompany(supabaseAdmin, data.workerId, companyId);
    const { error } = await supabaseAdmin.auth.admin.updateUserById(data.workerId, {
      ban_duration: data.active ? "none" : "876000h",
    });
    if (error) throw new Error("No se pudo actualizar la cuenta.");
    await supabaseAdmin.from("profiles").update({ active: data.active }).eq("id", data.workerId);
    await audit(supabaseAdmin, companyId, context.userId, data.active ? "activate" : "deactivate", data.workerId, {});
    return { ok: true };
  });

export const resetWorkerPassword = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { workerId: string; password: string }) => input)
  .handler(async ({ data, context }) => {
    const companyId = await requireOwner(context as Ctx);
    if (data.password.length < 8) throw new Error("La contraseña debe tener al menos 8 caracteres.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await getWorkerInCompany(supabaseAdmin, data.workerId, companyId);
    const { error } = await supabaseAdmin.auth.admin.updateUserById(data.workerId, { password: data.password });
    if (error) throw new Error("No se pudo cambiar la contraseña.");
    await audit(supabaseAdmin, companyId, context.userId, "reset_password", data.workerId, {});
    return { ok: true };
  });

export const deleteWorker = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { workerId: string }) => input)
  .handler(async ({ data, context }) => {
    const companyId = await requireOwner(context as Ctx);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await getWorkerInCompany(supabaseAdmin, data.workerId, companyId);
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.workerId);
    if (error) throw new Error("No se pudo eliminar la cuenta.");
    await audit(supabaseAdmin, companyId, context.userId, "delete", data.workerId, {});
    return { ok: true };
  });
