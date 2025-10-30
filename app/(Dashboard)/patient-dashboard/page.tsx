"use client"

import FindDoctorCard from "@/components/Dashboard/Patient/FindDoctorCard"
import { RecentDoctors } from "@/components/Dashboard/Patient/RecentDoctors"
import TutorialCard from "@/components/Dashboard/Patient/Tutorial"
import { useAuth } from "@/src/contexts/AuthContext"

export default function PatientDashboard() {
  const { user } = useAuth()

  return (
    <div
      className="w-full h-[calc(100vh-89.6px)] overflow-y-auto overflow-x-hidden"
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


        {/* Tutorial Card */}
        <TutorialCard />

        {/* Find Doctor Card */}
        <FindDoctorCard />

        {/* Recent Doctors Section */}
        <RecentDoctors />
   
    </div>
  )
}
