import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page-helpers";

export const Route = createFileRoute("/_authenticated/calendario")({
  head: () => pageHead("Calendario", "Agenda de trabajos y eventos de la empresa."),
  component: () => <ComingSoon title="Calendario" phase={2} />,
});
