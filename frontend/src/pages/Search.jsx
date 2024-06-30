import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
// import { doctors } from "@/constants/info";
import { BriefcaseMedical, UserSearch } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL


const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState([])


  const departments = [
    "Dermatology",
    "Cardiology",
    "Orthopedic",
    "Medicine",
    "Neurology",
    "Hematology",
    "Pediatrics",
    "ENT",
    "Gastroenterology",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`${BASE_URL}/doctors/get`)
        setDoctors(resp.data)
      }
      catch (e) {
        console.log(e)
        setDoctors([])
      }
    }
    fetchData()
    // setDoctors(fetchData())
  }, [])

  useEffect(() => {
    console.log(doctors)
  }, [doctors])

  const filteredDoctors = searchQuery
    ? doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : doctors;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-[84%] h-screen">
        <Topbar name="SEARCH" />
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 flex flex-col items-center justify-center bg-gray-100 pt-8 pb-12">
            <div className="mb-6 items-center px-5 flex flex-col gap-2">
              <h2 className="font-bold text-4xl tracking-wide">
                Search <span className="text-blue-600">Doctors</span>
              </h2>
              <h2 className="text-gray-500 text-xl">
                Search Your Doctor and Book Appointment in one click
              </h2>

              <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-3 py-2 rounded-md outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-lg"
                >
                  <UserSearch className="mr-2" />
                  Search
                </Button>
              </div>
            </div>
            <Marquee className="my-4">
              {departments.map((item, index) => (
                <div
                  key={index}
                  className="w-36 flex flex-col justify-center items-center px-4 py-3 bg-blue-500 rounded-md text-white font-semibold shadow-lg mr-4"
                >
                  <BriefcaseMedical />
                  <p>{item}</p>
                </div>
              ))}
            </Marquee>
            <div className="flex flex-col mt-6">
              <h1 className="text-2xl font-semibold">Popular Doctors</h1>
              <div className="flex justify-center items-center gap-8 mt-8">
                {doctors.length > 0 && doctors.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center gap-1 px-6 py-4 bg-blue-500 shadow-lg rounded-lg transition ease-in-out delay-150 hover:scale-110 duration-300"
                  >
                    <img
                      src={item.profilePhoto || "https://img.freepik.com/free-photo/doctor-offering-medical-teleconsultation_23-2149329007.jpg"}
                      className="h-40 w-40 rounded-full"
                      alt="doctor"
                    />
                    <p className="text-sm px-2 py-1 bg-white text-blue-600 rounded-full text-center font-medium mt-2">
                      {item.speciality}
                    </p>
                    <p className="text-lg font-semibold text-white text-center my-2">
                      {item.name}
                    </p>

                    <Link to={`/doctor/${item._id}`} className="w-full">
                      <Button className="mt-1 bg-white text-blue-600 hover:bg-white w-full">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
