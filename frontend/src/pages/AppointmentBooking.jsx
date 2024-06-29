import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, ClipboardPlus, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";

const AppointmentBooking = () => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [note, setNote] = useState();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }

    setTimeSlot(timeList);
  };

  const isPastDay = (day) => {
    return day <= new Date();
  };

  return (
    <div className="py-5 px-12 h-screen">
      <div className="flex gap-2 justify-center items-center">
        <ClipboardPlus size={36} className="font-semibold" />
        <h1 className="text-3xl font-semibold">Appointment Booking</h1>
      </div>

      <div className="mt-6">
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
          <div className="border-2 p-4 rounded-lg shadow-md h-[28rem] w-[22rem]">
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
                  onClick={() => setSelectedTimeSlot(item.time)}
                  className={`p-2 border cursor-pointer
                            text-center shadow-sm hover:bg-blue-600 hover:text-white
                            rounded-full
                            ${
                              item.time == selectedTimeSlot &&
                              "bg-blue-600 text-white"
                            }`}
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
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center gap-6 mt-6">
        <Button className="w-[25%] bg-red-500 hover:bg-red-600">Cancel</Button>
        <Button className="w-[25%] bg-blue-500 hover:bg-blue-600">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AppointmentBooking;
