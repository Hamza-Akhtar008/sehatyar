import React from "react";
import Image from "next/image";

const appointments = [
  { name: "Sarah Johnson", specialty: "Cardiologist", time: "3:15 PM", status: "Confirmed", statusColor: "bg-[#9333EA66] text-[#9333EA]",profilepicture:"/assets/upcomming-D-image1.png" },
  { name: "Sarah Johnson", specialty: "Cardiologist", time: "3:15 PM", status: "Scheduled", statusColor: "bg-[#BFF3D0] text-[#01503F]",profilepicture:"/assets/Doctor-D-profile.png" },
  { name: "Sarah Johnson", specialty: "Cardiologist", time: "3:15 PM", status: "Scheduled", statusColor: "bg-[#3B82F666] text-[#3B82F6]",profilepicture:"/assets/upcomming-D-image2.png" },
];

export default function UpcomingAppointments() {
  return (
    <div className="bg-white rounded-[22px] -mt-3 -ml-1 p-4 shadow-sm border border-[#F2F2F2] flex-1 w-[990px]">
      <h2 className="text-[22px] font-bold text-[#52525B] -mb-2">Upcoming Appointments</h2>

      <div className="flex flex-col gap-6">
        {appointments.map((a, i) => (
          <div key={i} className="flex items-center justify-between bg-[#F5F5F5] rounded-[22px] px-2 py-1">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image src={a.profilepicture} alt={a.name} width={39} height={39} />
              </div>
              <div>
                <div className="font-medium text-[16px] text-[#52525B]">{a.name}</div>
                <div className="text-[12px] text-[#9F9FA8]">{a.specialty}</div>
              </div>
            </div>

            <div className="flex flex-col items-end  ">
              <span className="text-[12px] text-[#6B7280] mr-2">{a.time}</span>
              <span className={`px-4  text-[12px] rounded-full font-semibold ${a.statusColor}`}>{a.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
