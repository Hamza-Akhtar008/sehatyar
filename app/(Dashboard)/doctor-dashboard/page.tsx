"use client";
import React from "react";
import StatsCards from "@/components/Dashboard/Doctor/StatsCards";
import UpcomingAppointments from "@/components/Dashboard/Doctor/UpcomingAppointments";
import RecentPatients from "@/components/Dashboard/Doctor/RecentPatients";
import CalendarView from "@/components/Dashboard/Doctor/CalendarView";
import { useAuth } from "@/src/contexts/AuthContext";
import { useEffect, useState } from "react";
import { getUpcomingAppointments } from "@/lib/Api/appointment";


export default function DoctorDashboardPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      if (!user?.doctorId) return;
      setLoading(true);
      try {
        const data = await getUpcomingAppointments(user.doctorId);
        let arr = Array.isArray(data) ? data : (Array.isArray(data?.upcomingAppointments) ? data.upcomingAppointments : []);
        setAppointments(arr);
      } catch {
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, [user?.doctorId]);

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
          <StatsCards appointments={appointments} loading={loading} />
        </div>

        {/* Upcoming Appointments + Recent Patients */}
        <div className="flex flex-col lg:flex-row w-full mt-2">
          {/* Left side */}
          <div className="flex-1">
            <UpcomingAppointments appointments={appointments} loading={loading} />
          </div>

          {/* Right side */}
          <div className="w-full lg:w-fit mr-3">
            <RecentPatients />
          </div>
        </div>

        {/* Calendar */}
        <div className="w-full mt-2  h-full">
          <CalendarView />
        </div>
      </div>
    </div>
  );
}
