import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipboardPlus, Facebook, Linkedin, ShieldCheck, Stethoscope, Twitter, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
// import { doctors } from "@/constants/info";
const BASE_URL = import.meta.env.VITE_BACKEND_URL


const DoctorPage = () => {
  const { id } = useParams();

  const [doctor, setDoctor] = useState([]);

  const navigate = useNavigate()

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`${BASE_URL}/doctors/${id}`)
        console.log(resp.data)
        setDoctor(resp.data)
      }
      catch (e) {
        console.log(e)
        setDoctor([])
      }
    }
    fetchData()
  }, [])

  return (
    <section className="flex gap-8 px-8 py-12 bg-white h-screen">
      <div className="flex flex-col items-center px-8 py-8 bg-gradient-to-r from-sky-400 to-blue-500 w-[22%] rounded-lg shadow-md">
        <img
          src={doctor.profilePhoto}
          alt={doctor.name}
          className="h-40 w-40 rounded-full"
        />

        <h1 className="text-2xl font-semibold mt-6 text-white">{doctor.name}</h1>
        <p className="text-lg font-medium">{doctor.specialty}</p>
        <p className="text-lg font-medium mt-2">{doctor.qualification}</p>
        <div className="flex gap-4 mt-6">
          <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-blue-600 transition ease-in-out delay-150 hover:scale-110 duration-300 cursor-pointer">
            <Linkedin size={20} />
          </div>
          <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-blue-600 transition ease-in-out delay-150 hover:scale-110 duration-300 cursor-pointer">
            <Twitter size={20} />
          </div>
          <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-blue-600 transition ease-in-out delay-150 hover:scale-110 duration-300 cursor-pointer">
            <Facebook size={20} />
          </div>
        </div>
        {/* <Link to="/booking"> */}
        <Button onClick={() => {
          navigate("/booking", {
            state: {
              doctor: doctor._id
            }
          })
        }} className="mt-6 bg-white text-blue-600 text-lg hover:bg-white transition ease-in-out delay-150 hover:scale-110 duration-300">
          Book Appointment
        </Button>
        {/* </Link> */}
      </div>
      <div className="w-[70%]">
        <div className="w-full p-6 border-2 border-blue-500  rounded-lg">
          <h1 className="text-2xl font-semibold">About Me</h1>
          <p className="text-lg font-medium mt-4">{doctor.bio}</p>
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
      </div>
    </section>
  );
};

export default DoctorPage;
