"use client";

import { AllReport } from "@/components/Dashboard/Patient/allreport";
import { AppointmentList } from "@/components/Dashboard/Patient/appointment-list";
import { RecentReports } from "@/components/Dashboard/Patient/recent-reports";
import UploadReport from "@/components/Dashboard/Patient/upload-report";



import { useAuth } from "@/src/contexts/AuthContext";

export default function PatientDashboard() {
  const { user, logout } = useAuth();

  return (
    < >
     <div
      className="w-full h-full  overflow-y-auto overflow-x-hidden"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE/Edge
      }}
    >
      {/* Hide scrollbar for Chrome, Safari, Edge */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

         <div className=" flex  items-center justify-between bg-[#FFFFFF] rounded-[22px] px-6 py-6 shadow-sm w-[1064px]  overflow-y-auto overflow-x-hidden"
          >
      {/* Left section */}
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">
Medical Reports        </h3>
        <p className="text-sm text-gray-500 mt-1 ">
View and manage your medical reports and documents        </p>
       
      </div>

      
   
    </div>
       
      <UploadReport/>
      {/* <RecentReports/>
      <AllReport/> */}
    

</div>

    </>
  );
}
