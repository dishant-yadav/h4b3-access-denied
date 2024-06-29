import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Clipboard, GraduationCap, LayoutDashboard, User } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { path: "/dashboard", label: "DASHBOARD", icon: <LayoutDashboard /> },
    { path: "/appointments", label: "APPOINTMENTS", icon: <Clipboard /> },
    { path: "/search", label: "SEARCH DOCTOR", icon: <GraduationCap /> },
    { path: "/profile", label: "PROFILE", icon: <User /> },
  ];

  return (
    <div className="w-[16%] flex flex-col justify-start items-center py-6 h-screen bg-blue-500 sticky top-0 left-0 z-50">
      <h1 className="text-2xl font-bold text-white">LOGO</h1>
      <div className="flex flex-col mt-16 gap-6">
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <Button
              className={`w-full text-lg font-semibold bg-blue-500 text-white hover:bg-white hover:text-blue-600 transition ease-in-out delay-150 hover:scale-110 duration-300 shadow-sm flex text-start gap-1 border-[2px] ${
                location.pathname === item.path ? 'bg-white text-blue-600' : ''
              }`}
            >
              {item.icon}
              <p className="cursor-pointer">{item.label}</p>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
