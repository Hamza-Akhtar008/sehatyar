"use client";
import React from "react";
import StatsCards from "@/components/Dashboard/Doctor/StatsCards";
import UpcomingAppointments from "@/components/Dashboard/Doctor/UpcomingAppointments";
import RecentPatients from "@/components/Dashboard/Doctor/RecentPatients";
import CalendarView from "@/components/Dashboard/Doctor/CalendarView";

export default function DoctorDashboardPage() {
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

      <div className="flex flex-col">
        {/* Stats Cards */}
        <div className="flex flex-wrap w-full">
          <StatsCards />
        </div>

        {/* Upcoming Appointments + Recent Patients */}
        <div className="flex flex-col lg:flex-row w-full mt-2">
          {/* Left side */}
          <div className="flex-1">
            <UpcomingAppointments />
          </div>

          {/* Right side */}
          <div className="w-full lg:w-fit mr-3">
            <RecentPatients />
          </div>
        </div>

        {/* Calendar */}
        <div className="w-full mt-2 h-[400px]">
          <CalendarView />
        </div>
      </div>
    </div>
  );
}
