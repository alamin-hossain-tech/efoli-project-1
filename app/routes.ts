import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/main-layout.tsx", [
    index("routes/home.tsx"),
    route("/about", "routes/about.tsx"),
  ]),
  route("/login", "routes/login.tsx"),
  route("/sign-up", "routes/sign-up.tsx"),
] satisfies RouteConfig;
