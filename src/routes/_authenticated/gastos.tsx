import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page-helpers";

export const Route = createFileRoute("/_authenticated/gastos")({
  head: () => ({ meta: [{ title: "Gastos · Gestión de Obras" }] }),
  component: () => <ComingSoon title="Gastos" phase={3} />,
});
