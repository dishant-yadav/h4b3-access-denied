import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Sidebar = () => {
  const menuItems = [
    { path: "/dashboard", label: "DASHBOARD" },
    { path: "/appointments", label: "APPOINTMENTS" },
    { path: "/search", label: "SEARCH DOCTOR" },
    { path: "/profile", label: "PROFILE" },
  ];

  return (
    <div className="w-56 flex flex-col justify-start items-center py-6 h-screen">
      <h1 className="text-2xl font-bold">LOGO</h1>
      <div className="flex flex-col mt-8 gap-4">
      {menuItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <Button className="w-full text-lg font-semibold bg-blue-500 text-white text-black hover:bg-white transition ease-in-out delay-150 hover:scale-110 duration-300 shadow-sm shadow-white">
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
