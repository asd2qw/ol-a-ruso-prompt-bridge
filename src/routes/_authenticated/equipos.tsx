import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page-helpers";

export const Route = createFileRoute("/_authenticated/equipos")({
  head: () => ({ meta: [{ title: "Equipos · Gestión de Obras" }] }),
  component: () => <ComingSoon title="Equipos" phase={5} />,
});
