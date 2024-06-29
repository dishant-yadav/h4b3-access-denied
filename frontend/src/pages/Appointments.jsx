import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import BookedAppointment from "./BookedAppointment";

const appointments = [
  {
    patient: "667fc0836625d388d8e01b29",
    doctor: {
      id: 1,
      name: "Dr. John Smith",
      qualification: "MD",
      speciality: "Cardiologist",
      address: "Hospital Address 1",
      registrationNumber: "DOC1000",
      mobileNumber: "+9876543210",
      hospitalName: "Hospital 1",
      age: 45,
      country: "USA",
      description:
        "Dr. John Smith has over 20 years of experience in cardiology and is known for his patient-centered approach.",
      linkedin: "https://www.linkedin.com/in/drjohnsmith",
      twitter: "https://twitter.com/drjohnsmith",
      facebook: "https://www.facebook.com/drjohnsmith",
      image:
        "https://img.freepik.com/free-photo/doctor-offering-medical-teleconsultation_23-2149329007.jpg",
    },
    date: "2023-07-01",
    slot: {
      time: "14:30",
      isBooked: true,
    },
    notes: "First consultation",
    id: "667fc0836625d388d8e01b34",
    isCompleted: true,
  },
  {
    patient: "667fc0836625d388d8e01b29",
    doctor: {
      id: 1,
      name: "Dr. John Doe",
      qualification: "MD",
      speciality: "Cardiologist",
      address: "Hospital Address 1",
      registrationNumber: "DOC1000",
      mobileNumber: "+9876543210",
      hospitalName: "Hospital 1",
      age: 45,
      country: "USA",
      description:
        "Dr. John Smith has over 20 years of experience in cardiology and is known for his patient-centered approach.",
      linkedin: "https://www.linkedin.com/in/drjohnsmith",
      twitter: "https://twitter.com/drjohnsmith",
      facebook: "https://www.facebook.com/drjohnsmith",
      image:
        "https://img.freepik.com/free-photo/doctor-offering-medical-teleconsultation_23-2149329007.jpg",
    },
    date: "2023-07-01",
    slot: {
      time: "14:30",
      isBooked: true,
    },
    notes: "First consultation",
    id: "667fc0836625d388d8e01b55",
    isCompleted: false,
  },
];

const Appointments = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const openDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-[84%] h-screen">
        <Topbar name="APPOINTMENTS" />
        <div className="flex-1 overflow-y-auto">
          <div className="px-10 py-4">
            <h1 className="text-xl font-semibold mb-4">
              View Your Upcoming Appointments
            </h1>
            {appointments.map((item, index) => (
              <div
                key={index}
                className="mt-6 bg-gray-200 p-4 rounded-xl flex justify-between items-center shadow-lg"
              >
                <div>
                  <h1 className="text-black font-semibold text-xl mb-2">
                    {item.doctor.name}
                  </h1>
                  <p className="text-lg font-medium">Date: {item.date}</p>
                  <p className="text-lg font-medium">Time: {item.slot.time}</p>
                </div>
                <div className="mr-6 flex gap-3">
                  <Button
                    className="text-xl bg-blue-500 hover:bg-blue-600"
                    onClick={() => openDetails(item)}
                  >
                    View
                  </Button>
                  <Button className="text-xl bg-blue-500 hover:bg-blue-600" disabled={!item.isCompleted}>Download Prescription</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {openModal && (
        <BookedAppointment
          appointment={selectedAppointment}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Appointments;
