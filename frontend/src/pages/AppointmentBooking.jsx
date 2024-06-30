import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { patients } from "@/data";
import axios from "axios";
import { CalendarDays, ClipboardPlus, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AppointmentBooking = () => {
  const { state } = useLocation()
  const doctor = state.doctor
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState(["10:00"]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [notes, setNote] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dateData = new Date(date);
    const data = {
      date: `${dateData.getFullYear()}/${dateData.getMonth() + 1}/${dateData.getDate()}}`,
      time: selectedTimeSlot,
      doctor: doctor,
      patient: JSON.parse(localStorage.getItem("userData"))._id,
      notes: notes
    }
    console.log(data)
    const resp = await axios.post("http://localhost:3050/api/appointments/slots/create", data)
    console.log(resp.data)
  }

  useEffect(() => {
    getTime();
  }, []);

  const getTime = async () => {
    const dateData = new Date(date);

    try {
      const resp = await axios.post("http://localhost:3050/api/appointments/slots", {
        doctor: doctor,
        date: `${dateData.getFullYear()}/${dateData.getMonth() + 1}/${dateData.getDate()}}`
      })
      // console.log(resp.data.data)
      setTimeSlot(resp.data.data);
    }
    catch (e) {
      console.log(e)
    }
  };

  const isPastDay = (day) => {
    return day <= new Date();
  };

  return (
    <div className="py-5 px-12 h-screen bg-gradient-to-r from-blue-200 to-cyan-200">
      <div className="flex gap-2 justify-center items-center">
        <ClipboardPlus size={36} className="font-semibold" />
        <h1 className="text-3xl font-semibold">Appointment Booking</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-16">
          <div className="flex justify-center items-center gap-12 mt-5">
            {/* Calender  */}
            <div className="flex flex-col p-4 gap-3 items-baseline bg-white rounded-lg border-2 shadow-md h-[28rem] w-[22rem]">
              <h2 className="flex gap-2 items-center w-full">
                <CalendarDays className="text-blue-600 h-5 w-5" />
                Select Date
              </h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={isPastDay}
                className="rounded-md w-full"
              />
            </div>
            {/* Time Slot  */}
            <div className="border-2 p-4 rounded-lg shadow-md h-[28rem] w-[22rem] bg-white">
              <h2 className="flex gap-2 items-center mb-3">
                <Clock className="text-blue-600 h-5 w-5" />
                Select Time Slot
              </h2>
              <div
                className="grid grid-cols-3 gap-2 
                        rounded-lg p-5"
              >
                {timeSlot?.map((item, index) => (
                  <h2
                    key={index}
                    onClick={() => !item.isBooked && setSelectedTimeSlot(item.time)}
                    className={`p-2 border cursor-pointer text-center shadow-sm 
              rounded-full 
              ${item.time === selectedTimeSlot ? "bg-blue-600 text-white" : ""}
              ${item.isBooked ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "hover:bg-blue-600 hover:text-white"}`}
                  >
                    {item.time}
                  </h2>

                ))}
              </div>
            </div>
          </div>
          <Textarea
            className="mt-6 mx-auto w-[47rem] shadow-md"
            placeholder="Note"
            value={notes}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center gap-6 mt-6">
          <Button className="w-[22%] bg-red-500 hover:bg-red-600">Cancel</Button>
          <Button className="w-[22%] bg-blue-500 hover:bg-blue-600">
            Submit
          </Button>
        </div>
      </form>
    </div >
  );
};

export default AppointmentBooking;
