import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon, OwnerOnly } from "@/components/page-helpers";

export const Route = createFileRoute("/_authenticated/presupuestos")({
  head: () => pageHead("Presupuestos", "Presupuestos para clientes y obras."),
  component: () => <OwnerOnly><ComingSoon title="Presupuestos" phase={3} /></OwnerOnly>,
});
