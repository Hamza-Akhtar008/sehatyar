"use client";
import Appointment from "@/components/Dashboard/Doctor/components/Appointments";


export default function AppointmentsPage() {
    return (
        <>
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
        <Appointment />
    </div>
        </>
    );
}