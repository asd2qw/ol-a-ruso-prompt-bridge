import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon, OwnerOnly } from "@/components/page-helpers";

export const Route = createFileRoute("/_authenticated/facturas")({
  head: () => ({ meta: [{ title: "Facturas · Gestión de Obras" }] }),
  component: () => <OwnerOnly><ComingSoon title="Facturas" phase={4} /></OwnerOnly>,
});
