import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-[84%] h-screen">
        <Topbar name="DASHBOARD"/>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            Dashboard Content
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
