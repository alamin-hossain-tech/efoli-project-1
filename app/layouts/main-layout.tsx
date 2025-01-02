import { Outlet } from "react-router";

const MainLayout = () => {
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
