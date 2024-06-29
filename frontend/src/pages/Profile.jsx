import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    weight: "",
    height: "",
    bloodGroup: "",
    bloodPressure: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleGenderChange = (value) => {
    setProfileData({
      ...profileData,
      gender: value,
    });
  };

  const handleSubmit = () => {
    console.log(profileData);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-[84%] h-screen">
        <Topbar name="PROFILE" />
        <div className="flex-1 overflow-y-auto">
          <div className="py-6 px-10">
            <h1 className="text-2xl font-semibold">Patient Profile</h1>
            <div className="flex flex-col mt-6">
              <div className="w-full flex gap-16">
                <div className="w-[40%]">
                  <p className="text-xl font-medium mb-1">First Name</p>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name..."
                    className="h-11 w-full px-2 py-1 text-lg rounded-lg border-2 border-black/50 bg-gray-200 outline-none"
                    value={profileData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-[40%]">
                  <p className="text-xl font-medium mb-1">Last Name</p>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name..."
                    className="h-11 w-full px-2 py-1 text-lg rounded-lg border-2 border-black/50 bg-gray-200 outline-none"
                    value={profileData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full flex gap-16 mt-8">
                <div className="w-[40%]">
                  <p className="text-xl font-medium mb-1">Age</p>
                  <input
                    type="number"
                    name="age"
                    placeholder="Enter age in years..."
                    className="h-11 w-full px-2 py-1 text-lg rounded-lg border-2 border-black/50 bg-gray-200 outline-none"
                    value={profileData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-[40%]">
                  <p className="text-xl font-medium mb-3">Gender</p>
                  <RadioGroup
                    className="flex gap-12"
                    value={profileData.gender}
                    onValueChange={handleGenderChange}
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="male" id="male" />
                      <p className="text-lg font-medium">Male</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="female" id="female" />
                      <p className="text-lg font-medium">Female</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="other" id="other" />
                      <p className="text-lg font-medium">Other</p>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="w-full flex gap-16 mt-8">
                <div className="w-[40%]">
                  <p className="text-xl font-medium mb-1">Email</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                    className="h-11 w-full px-2 py-1 text-lg rounded-lg border-2 border-black/50 bg-gray-200 outline-none"
                    value={profileData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-[40%]">
                  <p className="text-xl font-medium mb-1">Phone</p>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Enter your phone number..."
                    className="h-11 w-full px-2 py-1 text-lg rounded-lg border-2 border-black/50 bg-gray-200 outline-none"
                    value={profileData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full flex gap-16 mt-8">
                <div className="w-[40%]">
                  <p className="text-xl font-medium mb-1">Weight</p>
                  <input
                    type="number"
                    name="weight"
                    placeholder="Enter your weight in Kgs..."
                    className="h-11 w-full px-2 py-1 text-lg rounded-lg border-2 border-black/50 bg-gray-200 outline-none"
                    value={profileData.weight}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-[40%]">
                  <p className="text-xl font-medium mb-1">Height</p>
                  <input
                    type="number"
                    name="height"
                    placeholder="Enter your height in Cms..."
                    className="h-11 w-full px-2 py-1 text-lg rounded-lg border-2 border-black/50 bg-gray-200 outline-none"
                    value={profileData.height}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full flex gap-16 mt-8">
                <div className="w-[40%]">
                  <p className="text-xl font-medium mb-1">Blood Group</p>
                  <input
                    type="text"
                    name="bloodGroup"
                    placeholder="Enter your blood group..."
                    className="h-11 w-full px-2 py-1 text-lg rounded-lg border-2 border-black/50 bg-gray-200 outline-none"
                    value={profileData.bloodGroup}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-[40%]">
                  <p className="text-xl font-medium mb-1">Blood Pressure</p>
                  <input
                    type="text"
                    name="bloodPressure"
                    placeholder="Enter your blood pressure..."
                    className="h-11 w-full px-2 py-1 text-lg rounded-lg border-2 border-black/50 bg-gray-200 outline-none"
                    value={profileData.bloodPressure}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mt-10">
                <Button
                  className="text-xl bg-blue-500 hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  Save Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
