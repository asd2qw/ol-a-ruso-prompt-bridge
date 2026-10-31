import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page-helpers";

export const Route = createFileRoute("/_authenticated/trabajos")({
  head: () => pageHead("Trabajos", "Tareas y trabajos asignados al equipo."),
  component: () => <ComingSoon title="Trabajos" phase={2} />,
});
