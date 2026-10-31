import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page-helpers";

export const Route = createFileRoute("/_authenticated/materiales")({
  head: () => pageHead("Materiales", "Materiales e inventario para las obras."),
  component: () => <ComingSoon title="Materiales" phase={3} />,
});
