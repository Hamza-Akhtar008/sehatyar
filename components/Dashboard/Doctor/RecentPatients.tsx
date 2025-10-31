'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getRecentAppointmentsForDoctor } from "@/lib/Api/appointment";
import { useAuth } from "@/src/contexts/AuthContext";

export default function RecentPatients() {
  const { user } = useAuth();
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentPatients() {
      if (!user?.token) return;
      setLoading(true);
      try {
        const data = await getRecentAppointmentsForDoctor(user.token);
        setPatients(data || []);
      } catch (err) {
        setPatients([]);
      } finally {
        setLoading(false);
      }
    }
    fetchRecentPatients();
  }, [user?.token]);

  return (
    <div className="bg-white rounded-[22px] w-[460px] -mt-3 p-4 h-[310px] shadow-sm border border-[#F2F2F2]">
      <h2 className="text-[22px] font-bold text-[#52525B] -mb-2 ">Recent Patients</h2>

      <div className="flex flex-col gap-2">
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading...</div>
        ) : patients.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No recent patients.</div>
        ) : (
          patients.map((p, i) => (
            <div key={i} className="flex items-center justify-between bg-[#F5F5F5] rounded-[18px] px-4 py-2">
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image src={p.img || "/assets/images/doctors/doctor-2.png"} alt={p.name || p.patientName} width={30} height={30} />
                </div>
                <div>
                  <div className="font-medium text-[16px] text-[#52525B]">{p.name || p.patientName}</div>
                  <div className="text-[12px] text-[#9F9FA8]">{p.time || p.appointmentTime}</div>
                </div>
              </div>

              <div className="flex items-center">
                <button className="w-8 h-8 rounded-full bg-[#EDEDED] flex items-center justify-center">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M21 15.5a3 3 0 01-3 3h-1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3l-4 4-4-4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-[#EDEDED] flex items-center justify-center">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 22l-4-4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
