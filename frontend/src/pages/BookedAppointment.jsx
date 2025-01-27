import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { getFormattedDate } from "@/utils"

const BookedAppointment = ({ appointment, closeModal }) => {
  const user = localStorage.getItem("user");

  const handleId = () => {
    localStorage.setItem("id", appointment.id);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-brightness-50 backdrop-blur">
      <div className="bg-white p-6 rounded-lg w-1/4 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Appointment Details</h1>
          <button className="text-black" onClick={closeModal}>
            <X size={20} />
          </button>
        </div>
        <div>
          {user === "Patient" ? (
            <h2 className="text-xl font-bold">{appointment?.doctor?.name ?? "Doctor"}</h2>
          ) : (
            <h2 className="text-xl font-bold">{appointment?.patient?.name ?? "Patient"}</h2>
          )}
          <p className="text-lg">Date: {getFormattedDate(appointment.date)}</p>
          <p className="text-lg">Time: {appointment.time}</p>
          <p className="text-lg">Notes: {appointment.notes}</p>
        </div>
        <Link to={`/meet/${appointment._id}`}>
          <Button className="text-lg bg-blue-500 hover:bg-blue-600" onClick={handleId}>
            Join Call
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BookedAppointment;
