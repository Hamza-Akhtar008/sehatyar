import React from "react";
import Image from "next/image";

const days = [
  { label: "Monday 14", active: true },
  { label: "Tuesday 15" },
  { label: "Wednesday 16" },
  { label: "Thursday 17" },
  { label: "Friday 18" },
  { label: "Saturday 19" },
  { label: "Sunday 20" },
  { label: "Monday 21" },
];

const appointments = [
  { name: "Sarah Johnson", specialty: "Cardiologist", time: "3:15 PM", status: "Confirmed", img: "/assets/Doctor-D-profile.png" },
  { name: "Sarah Johnson", specialty: "Cardiologist", time: "3:15 PM", status: "Confirmed", img: "/assets/Doctor-D-profile.png" },
  { name: "Sarah Johnson", specialty: "Cardiologist", time: "3:15 PM", status: "Confirmed", img: "/assets/Doctor-D-profile.png" },
];

export default function CalendarView() {
  return (
    <div className="bg-white rounded-2xl p-3 -mt-3 -ml-1 shadow-sm border border-[#F2F2F2]">
      <div className="font-bold text-lg  text-[#222]">Calendar View</div>
      <div className="flex gap-3.5 mb-1">
  {days.map((d, i) => (
    <button
      key={i}
      className={`px-10 py-1 rounded-[22px] text-[14px] font-semibold text-[12px] tracking-wide transition-all duration-200 
        ${d.active ? 'bg-[#D1FADF] text-[#222]' : 'bg-[#F2F2F2] text-[#222]'}`}
    >
      {d.label}
    </button>
  ))}
</div>

      <div className="flex flex-col gap-4">
        {appointments.map((a, i) => (
          <div key={i} className="flex items-center justify-between bg-[#F9FAFB] rounded-xl px-3 py-1">
            <div className="flex items-center gap-3">
              <Image src={a.img} alt={a.name} width={40} height={40} className="rounded-full" />
              <div>
                <div className="font-semibold text-[#222] text-[16px]">{a.name}</div>
                <div className="text-xs text-[#6B7280]">{a.specialty}</div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-[#6B7280]">{a.time}</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E9D7FE] text-[#7F56D9]">{a.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
