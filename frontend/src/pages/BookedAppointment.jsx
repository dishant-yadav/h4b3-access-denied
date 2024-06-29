import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const BookedAppointment = ({ appointment, closeModal }) => {
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
          <h2 className="text-xl font-bold">{appointment.doctor.name}</h2>
          <p className="text-lg">Date: {appointment.date}</p>
          <p className="text-lg">Time: {appointment.slot.time}</p>
          <p className="text-lg">Notes: {appointment.notes}</p>
        </div>
        <Link to={`/meet/${appointment.id}`}>
          <Button className="text-lg bg-blue-500 hover:bg-blue-600">Join Call</Button>
        </Link>
      </div>
    </div>
  );
};

export default BookedAppointment;
