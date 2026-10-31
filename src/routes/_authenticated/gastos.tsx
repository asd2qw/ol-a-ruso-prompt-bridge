import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/page-helpers";

export const Route = createFileRoute("/_authenticated/gastos")({
  head: () => pageHead("Gastos", "Gastos relacionados con la empresa y las obras."),
  component: () => <ComingSoon title="Gastos" phase={3} />,
});
