"use client";
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
      } catch {
        setPatients([]);
      } finally {
        setLoading(false);
      }
    }
    fetchRecentPatients();
  }, [user?.token]);

  return (
    <div className="bg-white rounded-[22px] w-full lg:w-[460px] p-6 sm:p-5 shadow-sm border border-[#F2F2F2] flex flex-col">
      {/* Header */}
         <h2 className="text-[20px] md:text-[22px] font-bold text-[#52525B] mb-2">Recent  Patients</h2>


      {/* Patient List */}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[320px]">
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading...</div>
        ) : patients.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No recent patients.</div>
        ) : (
          patients.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-[#F5F5F5] rounded-[18px] px-4 sm:px-4 py-2.5"
            >
              {/* Left Section */}
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-[#E5E7EB] flex-shrink-0">
                  <Image
                    src={p.img ? p.img : "/assets/user.png"}
                    alt={p.name || p.patientName || "User"}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="font-medium text-[14px] sm:text-[16px] text-[#52525B] truncate max-w-[140px] sm:max-w-[180px]">
                    {p.name || p.patientName}
                  </div>
                  <div className="text-[11px] sm:text-[12px] text-[#9F9FA8]">
                    {p.time || p.appointmentTime}
                  </div>
                </div>
              </div>

              {/* Right Section (Buttons) */}
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full bg-[#EDEDED] flex items-center justify-center hover:bg-[#D1FADF] transition">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="18" fill="#52525B" fillOpacity="0.1"/>
              <path d="M24.8557 22.148C24.2974 21.5855 22.9453 20.7646 22.2893 20.4338C21.435 20.0035 21.3647 19.9683 20.6932 20.4672C20.2453 20.8001 19.9475 21.0976 19.4233 20.9858C18.8991 20.874 17.7601 20.2436 16.7627 19.2494C15.7653 18.2552 15.0984 17.0831 14.9863 16.5606C14.8741 16.0382 15.1765 15.744 15.5062 15.295C15.971 14.6622 15.9358 14.5567 15.5386 13.7024C15.2288 13.038 14.384 11.6985 13.8194 11.1431C13.2154 10.5465 13.2154 10.6519 12.8263 10.8137C12.5094 10.9469 12.2054 11.109 11.9182 11.2978C11.3557 11.6715 11.0435 11.9819 10.8252 12.4484C10.6068 12.9149 10.5088 14.0087 11.6362 16.0569C12.7637 18.1051 13.5547 19.1524 15.1919 20.785C16.8291 22.4177 18.0881 23.2955 19.9285 24.3277C22.2052 25.6028 23.0785 25.3543 23.5465 25.1363C24.0144 24.9183 24.3262 24.609 24.7006 24.0465C24.8899 23.7597 25.0523 23.456 25.1858 23.1394C25.3479 22.7517 25.4533 22.7517 24.8557 22.148Z" stroke="#52525B" stroke-miterlimit="10"/>
              <path d="M24.8557 22.148C24.2974 21.5855 22.9453 20.7646 22.2893 20.4338C21.435 20.0035 21.3647 19.9683 20.6932 20.4672C20.2453 20.8001 19.9475 21.0976 19.4233 20.9858C18.8991 20.874 17.7601 20.2436 16.7627 19.2494C15.7653 18.2552 15.0984 17.0831 14.9863 16.5606C14.8741 16.0382 15.1765 15.744 15.5062 15.295C15.971 14.6622 15.9358 14.5567 15.5386 13.7024C15.2288 13.038 14.384 11.6985 13.8194 11.1431C13.2154 10.5465 13.2154 10.6519 12.8263 10.8137C12.5094 10.9469 12.2054 11.109 11.9182 11.2978C11.3557 11.6715 11.0435 11.9819 10.8252 12.4484C10.6068 12.9149 10.5088 14.0087 11.6362 16.0569C12.7637 18.1051 13.5547 19.1524 15.1919 20.785C16.8291 22.4177 18.0881 23.2955 19.9285 24.3277C22.2052 25.6028 23.0785 25.3543 23.5465 25.1363C24.0144 24.9183 24.3262 24.609 24.7006 24.0465C24.8899 23.7597 25.0523 23.456 25.1858 23.1394C25.3479 22.7517 25.4533 22.7517 24.8557 22.148Z" stroke="#52525B" strokeMiterlimit="10"/>
              </svg>

                </button>

                <button className="w-8 h-8 rounded-full bg-[#EDEDED] flex items-center justify-center hover:bg-[#D1FADF] transition">
               <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="18" fill="#52525B" fillOpacity="0.1"/>
              <path d="M14.25 15.75H21M14.25 18.75H21M14.25 21.75H18M25.5 18C25.5 22.1422 22.1422 25.5 18 25.5H10.5V18C10.5 13.8578 13.8578 10.5 18 10.5C22.1422 10.5 25.5 13.8578 25.5 18Z" stroke="#52525B" stroke-linecap="round" strokeLinejoin="round"/>
              <path d="M14.25 15.75H21M14.25 18.75H21M14.25 21.75H18M25.5 18C25.5 22.1422 22.1422 25.5 18 25.5H10.5V18C10.5 13.8578 13.8578 10.5 18 10.5C22.1422 10.5 25.5 13.8578 25.5 18Z" stroke="#52525B" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
