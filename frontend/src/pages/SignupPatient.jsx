import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_URL


const SignUpPatient = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(BASE_URL);
  })

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {
      const response = await axios.post(
        `${BASE_URL}/patientauth/register`,
        userData
      );
      console.log("SignUp with:", response);
    } catch (e) {
      console.log(e);
    }
    navigate("/login/patient");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSignUp}>
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
            CREATE AN ACCOUNT
          </h2>
          <label className="text-center text-gray-600 mb-6">Email</label>
          <Input
            type="email"
            placeholder="name@example.com"
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
            Sign Up
          </Button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          By clicking continue, you agree to our{" "}
          <a href="/terms" className="underline cursor-default">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline cursor-default">
            Privacy Policy
          </a>
          .
          <div className="text-center text-sm font-bold text-blue-600 mt-5">
            <span className="text-gray-500">Already Signed up? </span>
            <a href="/login/patient" className="underline">
              Login
            </a>
          </div>
        </p>
      </div>
    </div>
  );
};

export default SignUpPatient;
