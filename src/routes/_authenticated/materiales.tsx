import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page-helpers";

export const Route = createFileRoute("/_authenticated/materiales")({
  head: () => ({ meta: [{ title: "Materiales · Gestión de Obras" }] }),
  component: () => <ComingSoon title="Materiales" phase={3} />,
});
