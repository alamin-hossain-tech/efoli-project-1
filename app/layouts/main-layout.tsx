import { getUser } from "~/lib/functions/getUser";
import type { Route } from "./+types/main-layout";
import { Outlet } from "react-router";
import Sidebar from "./side-bar";
import Header from "./header";

export async function loader({ request }: Route.LoaderArgs) {
  const user = getUser(request);
  return user;
}

const MainLayout = ({ loaderData }: Route.ComponentProps) => {
  const role = loaderData?.role;
  const userName = loaderData?.name;
  return (
    <div className="flex items-stretch relative">
      <Sidebar role={role} />
      <div className="flex-grow flex flex-col">
        <Header userName={userName} />
        <div className="p-5 flex-grow max-h-[calc(100%-16)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
