import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon, OwnerOnly } from "@/components/page-helpers";

export const Route = createFileRoute("/_authenticated/finanzas")({
  head: () => ({ meta: [{ title: "Finanzas · Gestión de Obras" }] }),
  component: () => <OwnerOnly><ComingSoon title="Finanzas" phase={4} /></OwnerOnly>,
});
