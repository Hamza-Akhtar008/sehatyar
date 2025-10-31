"use client";
import Availability from "@/components/Dashboard/Doctor/components/Availability";


export default function AvailabilityPage() {
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
            {/* <h1 className="text-2xl font-bold mb-4">Availability</h1> */}
            <Availability />
        </div>
    );
}
