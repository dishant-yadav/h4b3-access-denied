import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import {
  ClipboardPlus,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";
import React from "react";

const Dashboard = () => {
  const user = localStorage.getItem("user");
  console.log(user);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-[84%] h-screen">
        <Topbar name="DASHBOARD" />
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {user === "Doctor" ? (
              <>
                <div>
                  <h1 className="text-3xl font-semibold">
                    Welcome Back <span className="text-blue-600">Doctor</span>
                  </h1>
                </div>
                <div className="w-full p-6 border-2 border-blue-500 rounded-lg mt-8">
                  <h1 className="text-2xl font-semibold">Report</h1>
                  <div className="mt-8 flex items-center justify-start gap-6">
                    <div className="flex w-44 flex-col items-center justify-center py-6 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500">
                      <h1 className="text-lg font-semibold text-white flex items-center">
                        <UserRound size={20} className="mr-1" />
                        <span>Total Patients</span>
                      </h1>
                      <p className="text-4xl font-medium text-white">546</p>
                    </div>
                    <div className="flex w-44 flex-col items-center justify-center py-6 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500">
                      <h1 className="text-lg font-semibold text-white flex items-center">
                        <Stethoscope size={20} className="mr-1" />
                        <span>Consultation</span>
                      </h1>
                      <p className="text-4xl font-medium text-white">216</p>
                    </div>
                    <div className="flex w-44 flex-col items-center justify-center py-6 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500">
                      <h1 className="text-lg font-semibold text-white flex items-center">
                        <ShieldCheck size={20} className="mr-1" />
                        <span>Injuct</span>
                      </h1>
                      <p className="text-4xl font-medium text-white">106</p>
                    </div>
                    <div className="flex w-44 flex-col items-center justify-center py-6 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500">
                      <h1 className="text-lg font-semibold text-white flex items-center">
                        <ClipboardPlus size={20} className="mr-1" />
                        <span>Surgery</span>
                      </h1>
                      <p className="text-4xl font-medium text-white">52</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h1 className="text-3xl font-semibold">
                    Welcome Back <span className="text-blue-600">Patient</span>
                  </h1>
                </div>
                <div className="w-full p-6 border-2 border-blue-500 rounded-lg mt-8">
                  <h1 className="text-2xl font-semibold">Report</h1>
                  <div className="mt-8 flex items-center justify-start gap-6">
                    <div className="flex w-48 flex-col items-center justify-center py-6 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500">
                      <h1 className="text-lg font-semibold text-white flex items-center">
                        <UserRound size={20} className="mr-1" />
                        <span>Height</span>
                      </h1>
                      <p className="text-4xl font-medium text-white">180cm</p>
                    </div>
                    <div className="flex w-48 flex-col items-center justify-center py-6 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500">
                      <h1 className="text-lg font-semibold text-white flex items-center">
                        <Stethoscope size={20} className="mr-1" />
                        <span>Weight</span>
                      </h1>
                      <p className="text-4xl font-medium text-white">74kg</p>
                    </div>
                    <div className="flex w-48 flex-col items-center justify-center py-6 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500">
                      <h1 className="text-lg font-semibold text-white flex items-center">
                        <ShieldCheck size={20} className="mr-1" />
                        <span>Blood Group</span>
                      </h1>
                      <p className="text-4xl font-medium text-white">O+</p>
                    </div>
                    <div className="flex w-48 flex-col items-center justify-center py-6 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500">
                      <h1 className="text-lg font-semibold text-white flex items-center">
                        <ClipboardPlus size={20} className="mr-1" />
                        <span>Blood Pressure</span>
                      </h1>
                      <p className="text-4xl font-medium text-white">120/80</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
