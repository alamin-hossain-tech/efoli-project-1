import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/main-layout.tsx", [
    index("routes/home.tsx"),
    route("/create-ticket", "routes/create-ticket.tsx"),
    route("/view-ticket/:id", "routes/ticket-details.tsx"),
  ]),
  route("/login", "routes/login.tsx"),
  route("/sign-up", "routes/sign-up.tsx"),
  route("/logout", "routes/logout.tsx"),
] satisfies RouteConfig;
