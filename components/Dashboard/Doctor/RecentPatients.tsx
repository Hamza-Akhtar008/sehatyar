import React from "react";
import Image from "next/image";

const patients = [
  { name: "Lisa Anderson", time: "Yesterday 3:30 PM", img: "/assets/images/doctors/doctor-2.png" },
  { name: "Robert Taylor", time: "Yesterday 2:15 PM", img: "/assets/images/doctors/doctor-3.png" },
  { name: "Jennifer Lee", time: "Monday 4:45 PM", img: "/assets/images/doctors/doctor-4.png" },
];

export default function RecentPatients() {
  return (
    <div className="bg-white rounded-[22px] w-[460px] -mt-3 p-4 h-[310px] shadow-sm border border-[#F2F2F2]">
      <h2 className="text-[22px] font-bold text-[#52525B] -mb-2 ">Recent Patients</h2>

      <div className="flex flex-col gap-2">
        {patients.map((p, i) => (
          <div key={i} className="flex items-center justify-between bg-[#F5F5F5] rounded-[18px] px-4 py-2">
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image src={p.img} alt={p.name} width={30} height={30} />
              </div>
              <div>
                <div className="font-medium text-[16px] text-[#52525B]">{p.name}</div>
                <div className="text-[12px] text-[#9F9FA8]">{p.time}</div>
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
        ))}
      </div>
    </div>
  );
}
