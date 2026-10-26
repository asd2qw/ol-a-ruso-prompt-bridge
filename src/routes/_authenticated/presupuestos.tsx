import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon, OwnerOnly } from "@/components/page-helpers";

export const Route = createFileRoute("/_authenticated/presupuestos")({
  head: () => ({ meta: [{ title: "Presupuestos · Gestión de Obras" }] }),
  component: () => <OwnerOnly><ComingSoon title="Presupuestos" phase={3} /></OwnerOnly>,
});
