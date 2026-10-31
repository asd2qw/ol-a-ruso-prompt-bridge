import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page-helpers";

export const Route = createFileRoute("/_authenticated/obras")({
  head: () => pageHead("Obras", "Proyectos, direcciones y estado de las obras."),
  component: () => <ComingSoon title="Obras" phase={2} />,
});
