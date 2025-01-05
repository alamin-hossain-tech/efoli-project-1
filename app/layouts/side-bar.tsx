import { Ticket, Users } from "lucide-react";
import { NavLink } from "react-router";
import logo from "~/assets/logo/logo.svg";
const Sidebar = ({ role }: { role: Role }) => {
  const menuItems = [
    {
      id: "tickets",
      label: "Tickets",
      path: "/",
      icon: <Ticket className="scale-75" />,
    },
    ...(role === "ADMIN"
      ? [
          {
            id: "users",
            label: "Users",
            path: "/users",
            admin: role === "ADMIN",
            icon: <Users className="scale-75" />,
          },
        ]
      : []),
  ];

  return (
    <div className="w-64 bg-brand-1 h-full md:h-screen py-4 px-6 sticky flex-shrink-0 left-0 top-0 ">
      {/* logo  */}
      <div>
        <img src={logo} className="w-20 mx-auto" alt="logo" />
      </div>
      <div className="text-gray-3 mt-4">
        <p>MENU</p>
        <div className="flex flex-col gap-2 mt-4">
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.id}
              className={({ isActive }) =>
                `flex gap-2 px-4 py-2 rounded-lg text-white ${
                  isActive ? "bg-brand-2 " : " hover:bg-brand-2"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
