import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page-helpers";

export const Route = createFileRoute("/_authenticated/obras")({
  head: () => ({ meta: [{ title: "Obras · Gestión de Obras" }] }),
  component: () => <ComingSoon title="Obras" phase={2} />,
});
