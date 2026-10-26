import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon, OwnerOnly } from "@/components/page-helpers";

export const Route = createFileRoute("/_authenticated/clientes")({
  head: () => ({ meta: [{ title: "Clientes · Gestión de Obras" }] }),
  component: () => <OwnerOnly><ComingSoon title="Clientes" phase={2} /></OwnerOnly>,
});
