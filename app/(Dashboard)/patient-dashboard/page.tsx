"use client";

import FindDoctorCard from "@/components/Dashboard/Patient/FindDoctorCard";
import { RecentDoctors } from "@/components/Dashboard/Patient/RecentDoctors";
import TutorialCard from "@/components/Dashboard/Patient/Tutorial";
import { useAuth } from "@/src/contexts/AuthContext";

export default function PatientDashboard() {
  const { user, logout } = useAuth();

  return (
    < >
      <div className="max-w-8xl mx-auto overflow-auto h-[calc(100vh-89.6px)] scrollbar-hide">
        {/* Tutorial Card (No spacing/margins) */}
        <div className="!m-0 !p-0 ">
          <TutorialCard />
        </div>
        <FindDoctorCard/>
        

  
        {/* Dashboard sections */}
    <RecentDoctors/>
      
      </div>
    </>
  );
}
