import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Clipboard,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Stethoscope,
  User,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = [
    { path: "/dashboard", label: "DASHBOARD", icon: <LayoutDashboard /> },
    { path: "/appointments", label: "APPOINTMENTS", icon: <Clipboard /> },
    { path: "/search", label: "SEARCH DOCTOR", icon: <GraduationCap /> },
    { path: "/profile", label: "PROFILE", icon: <User /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    navigate("/");
  }

  return (
    <div className="w-[16%] flex flex-col justify-start items-center py-6 h-screen bg-blue-500 sticky top-0 left-0 z-50">
      <div className="flex items-center justify-center gap-2">
        <Stethoscope strokeWidth={3} size={28} className="text-white" />
        <h1 className="text-2xl font-bold text-white">TELETRANSLATE</h1>
      </div>
      <div className="flex flex-col mt-16 gap-6">
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <Button
              className={`w-full text-lg font-semibold bg-blue-500 text-white hover:bg-white hover:text-blue-600 transition ease-in-out delay-150 hover:scale-110 duration-300 shadow-sm flex text-start gap-1 border-[2px] ${
                location.pathname === item.path ? "bg-white text-blue-600" : ""
              }`}
            >
              {item.icon}
              <p className="cursor-pointer">{item.label}</p>
            </Button>
          </Link>
        ))}
      </div>
      <div className="w-[13rem] mt-96">

          <Button className="w-full text-lg font-semibold bg-blue-500 text-white hover:bg-white hover:text-blue-600 transition ease-in-out delay-150 hover:scale-110 duration-300 shadow-sm flex text-start gap-1 border-[2px]" onClick={handleLogout}>
            <LogOut />
            <p className="cursor-pointer">Logout</p>
          </Button>

      </div>
    </div>
  );
};

export default Sidebar;
