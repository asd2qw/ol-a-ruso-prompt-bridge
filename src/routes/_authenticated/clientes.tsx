import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon, OwnerOnly } from "@/components/page-helpers";

export const Route = createFileRoute("/_authenticated/clientes")({
  head: () => pageHead("Clientes", "Contactos y datos de clientes de la empresa."),
  component: () => <OwnerOnly><ComingSoon title="Clientes" phase={2} /></OwnerOnly>,
});
