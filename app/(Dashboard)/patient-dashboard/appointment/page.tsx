"use client";

import { AppointmentList } from "@/components/Dashboard/Patient/appointment-list";
import { useAuth } from "@/src/contexts/AuthContext";

export default function PatientDashboard() {
  const { user, logout } = useAuth();

  return (
    < >
      <div className="">
         <div className=" flex -mt-4 -ml-4 items-center justify-between bg-[#FBFBFB] rounded-[22px] px-6 py-6 shadow-sm w-[764px]">
      {/* Left section */}
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">
My Appointments        </h3>
        <p className="text-sm text-gray-500 mt-1 ">
          View and manage your medical appointments
        </p>
       
      </div>

      {/* Right section */}
   
    </div>
       
      </div>

      <AppointmentList/>
    </>
  );
}
