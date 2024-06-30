import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginDoctor = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    availability: [
      {
        day: "Monday",
        startTime: "09:00",
        endTime: "17:00",
      },
      {
        day: "Wednesday",
        startTime: "09:00",
        endTime: "17:00",
      },
    ],
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3050/doctorauth/login",
        userData
      );
      console.log("Doctor Login with:", response);
      localStorage.setItem("userData", JSON.stringify(response.data.doctor));
      localStorage.setItem("user", "Doctor");
    } catch (e) {
      console.log(e);
    }
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <form onSubmit={handleLogin}>
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">
            Login to your account
          </h2>
          <label className="text-center text-gray-600 mb-6">Email</label>
          <Input
            type="email"
            placeholder="doctor@mail.com"
            value={userData.email}
            onChange={(e) =>
              setUserData((prevData) => ({
                ...prevData,
                email: e.target.value,
              }))
            }
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
          />
          <label className="text-center text-gray-600 mb-6">Password</label>
          <Input
            type="password"
            placeholder="*******"
            value={userData.password}
            onChange={(e) =>
              setUserData((prevData) => ({
                ...prevData,
                password: e.target.value,
              }))
            }
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
          />
          <Button
            type="submit"
            className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Log In
          </Button>

          <div className="text-center text-lg mt-5 font-bold text-blue-600">
            <a href="/signup/doctor" className="mt-40 text-sm">
              <span className="text-gray-600">Don't have an Account?</span> 
              <span className="underline"> Sign Up</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginDoctor;
