import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page-helpers";

export const Route = createFileRoute("/_authenticated/calendario")({
  head: () => ({ meta: [{ title: "Calendario · Gestión de Obras" }] }),
  component: () => <ComingSoon title="Calendario" phase={2} />,
});
