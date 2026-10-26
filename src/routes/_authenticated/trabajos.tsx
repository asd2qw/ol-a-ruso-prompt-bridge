import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page-helpers";

export const Route = createFileRoute("/_authenticated/trabajos")({
  head: () => ({ meta: [{ title: "Trabajos · Gestión de Obras" }] }),
  component: () => <ComingSoon title="Trabajos" phase={2} />,
});
