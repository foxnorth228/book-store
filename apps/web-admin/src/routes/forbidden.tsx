import { Typography } from "@org/ui";
import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
  return <Typography variant="h1">Forbidden!</Typography>;
};

export const Route = createFileRoute("/forbidden")({
  component: RouteComponent,
});
