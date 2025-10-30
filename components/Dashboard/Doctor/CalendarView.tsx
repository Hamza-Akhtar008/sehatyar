'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getUpcomingAppointments } from "@/lib/Api/appointment";
import { useAuth } from "@/src/contexts/AuthContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const allDays = [
  { label: "Monday 14", value: "14-10-2025" },
  { label: "Tuesday 15", value: "15-10-2025" },
  { label: "Wednesday 16", value: "16-10-2025" },
  { label: "Thursday 17", value: "17-10-2025" },
  { label: "Friday 18", value: "18-10-2025" },
  { label: "Saturday 19", value: "19-10-2025" },
  { label: "Sunday 20", value: "20-10-2025" },
  { label: "Monday 21", value: "21-10-2025" },
  { label: "Tuesday 22", value: "22-10-2025" },
  { label: "Wednesday 23", value: "23-10-2025" },
  { label: "Thursday 24", value: "24-10-2025" },
  { label: "Friday 25", value: "25-10-2025" },
  { label: "Saturday 26", value: "26-10-2025" },
  { label: "Sunday 27", value: "27-10-2025" },
  { label: "Monday 28", value: "28-10-2025" },
  { label: "Tuesday 29", value: "29-10-2025" },
  { label: "Wednesday 30", value: "30-10-2025" },
  { label: "Thursday 31", value: "31-10-2025" },
];

const VISIBLE_DAYS = 7;

export default function CalendarView() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(allDays[0].value);
  const [startIdx, setStartIdx] = useState(0);

  useEffect(() => {
    async function fetchAppointments() {
      if (!user?.doctorId) return;
      setLoading(true);
      try {
        const data = await getUpcomingAppointments(user.doctorId);
        setAppointments(data || []);
      } catch (err) {
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, [user?.doctorId]);

  const filteredAppointments = appointments.filter(
    (a) => a.appointmentDate === selectedDate
  );

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(prev - 1, 0));
  };
  const handleNext = () => {
    setStartIdx((prev) => Math.min(prev + 1, allDays.length - VISIBLE_DAYS));
  };

  const visibleDays = allDays.slice(startIdx, startIdx + VISIBLE_DAYS);

  return (
    <div
      className="bg-white rounded-2xl p-3 shadow-sm border border-[#F2F2F2]"
      style={{
        width: "full",
        height: "500px",
        overflowX: "auto",
        overflowY: "auto",
      }}
    >
      <div className="font-bold text-lg text-[#222] mb-2">Calendar View</div>

      {/* Date Navigation */}
      <div className="flex items-center gap-2 mb-3 sticky top-0 bg-white py-1">
        <button
          onClick={handlePrev}
          disabled={startIdx === 0}
          className="p-2 rounded-full bg-[#F2F2F2] text-[#222] hover:bg-[#D1FADF]"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-3.5 overflow-x-auto scrollbar-thin scrollbar-thumb-[#D1FADF] scrollbar-track-[#F2F2F2]">
          {visibleDays.map((d, i) => (
            <button
              key={i}
              className={`px-10 py-1 rounded-[22px] text-[13px] font-semibold transition-all duration-200 
                ${
                  selectedDate === d.value
                    ? "bg-[#D1FADF] text-[#222]"
                    : "bg-[#F2F2F2] text-[#222]"
                }`}
              onClick={() => setSelectedDate(d.value)}
            >
              {d.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={startIdx + VISIBLE_DAYS >= allDays.length}
          className="p-2 rounded-full bg-[#F2F2F2] text-[#222] hover:bg-[#D1FADF]"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Appointment List */}
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading...</div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No appointments for this date.
          </div>
        ) : (
          filteredAppointments.map((a, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-[#F9FAFB] rounded-xl px-3 py-2 min-w-[550px]"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={
                    a.doctor?.profilePic || "/assets/Doctor-D-profile.png"
                  }
                  alt={a.patientName || a.name || "Profile"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold text-[#222] text-[15px]">
                    {a.patientName || a.name}
                  </div>
                  <div className="text-xs text-[#6B7280]">
                    {a.specialty || a.appointmentFor}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-[#6B7280]">
                  {a.appointmentTime || a.time}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E9D7FE] text-[#7F56D9]">
                  {a.status || "Confirmed"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
