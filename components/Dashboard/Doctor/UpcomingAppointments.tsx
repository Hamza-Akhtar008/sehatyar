'use client';
import React from "react";
import Image from "next/image";

interface UpcomingAppointmentsProps {
  appointments: any[];
  loading: boolean;
}

export default function UpcomingAppointments({ appointments, loading }: UpcomingAppointmentsProps) {
  return (
    <div className="bg-white rounded-[22px] p-4 shadow-sm border border-[#F2F2F2] flex-1 max-w-[950px] h-full">
      <h2 className="text-[20px] md:text-[22px] font-bold text-[#52525B] mb-2">Upcoming Appointments</h2>

      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading...</div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No upcoming appointments.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {appointments.filter(a => a.status === "pending").slice(0, 3).map((a, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#F5F5F5] rounded-[18px] px-3 py-3 sm:px-4 sm:py-2"
            >
              {/* Left Section */}
              <div className="flex items-center gap-3 mb-2 sm:mb-0">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={a.profilepicture || "/assets/Doctor-D-profile.png"}
                    alt={a.patientName || a.name || "Profile"}
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <div className="font-medium text-[15px] md:text-[16px] text-[#52525B]">
                    {a.patientName || a.name}
                  </div>
                  <div className="text-[12px] text-[#9F9FA8]">
                    {a.specialty || a.appointmentFor}
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col items-start sm:items-end">
                <span className="text-[12px] text-[#6B7280] mb-1 sm:mr-2">
                  {a.appointmentTime || a.time}
                </span>
                <span
                  className={`px-3 py-[2px] text-[11px] rounded-full font-semibold text-center ${
                    a.statusColor || "bg-[#BFF3D0] text-[#01503F]"
                  }`}
                >
                  {a.status || "Scheduled"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
