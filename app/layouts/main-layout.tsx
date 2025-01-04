import { getUser } from "~/lib/functions/getUser";
import type { Route } from "./+types/main-layout";
import { Outlet } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  const user = getUser(request);
  return user;
}

const MainLayout = ({ loaderData }: Route.ComponentProps) => {
  return (
    <div className="flex items-stretch">
      <div className="w-60 bg-sky-400 h-screen max-h-screen"></div>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
