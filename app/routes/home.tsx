import { useSubmit } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tickets" },
    { name: "description", content: "Welcome to my app" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const submit = useSubmit();

  return <div></div>;
}
