'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getUpcomingAppointments } from "@/lib/Api/appointment";
import { useAuth } from "@/src/contexts/AuthContext";

export default function UpcomingAppointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      if (!user?.doctorId) return;
      setLoading(true);
      try {
        const data = await getUpcomingAppointments(user.doctorId);
        setAppointments(data || []);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, [user?.doctorId]);

  return (
    <div className="bg-white rounded-[22px] -mt-3 -ml-1 p-4 shadow-sm border border-[#F2F2F2] flex-1 w-[990px]">
      <h2 className="text-[22px] font-bold text-[#52525B] -mb-2">Upcoming Appointments</h2>

      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading...</div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No upcoming appointments.</div>
      ) : (
        <div className="flex flex-col gap-6">
          {appointments.slice(0, 3).map((a, i) => (
            <div key={i} className="flex items-center justify-between bg-[#F5F5F5] rounded-[22px] px-2 py-1">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image src={a.profilepicture || "/assets/Doctor-D-profile.png"} alt={a.patientName || a.name || "Profile"} width={39} height={39} />
                </div>
                <div>
                  <div className="font-medium text-[16px] text-[#52525B]">{a.patientName || a.name}</div>
                  <div className="text-[12px] text-[#9F9FA8]">{a.specialty || a.appointmentFor}</div>
                </div>
              </div>

              <div className="flex flex-col items-end  ">
                <span className="text-[12px] text-[#6B7280] mr-2">{a.appointmentTime || a.time}</span>
                <span className={`px-4  text-[12px] rounded-full font-semibold ${a.statusColor || "bg-[#BFF3D0] text-[#01503F]"}`}>{a.status || "Scheduled"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
