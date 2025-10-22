import React from 'react';

import DoctorDashboardHeader from "@/components/Dashboard/Doctor/Header";
import DoctorSidebar from "@/components/Dashboard/Doctor/Sidebar";
import StatsCards from "@/components/Dashboard/Doctor/StatsCards";
import UpcomingAppointments from "@/components/Dashboard/Doctor/UpcomingAppointments";
import RecentPatients from "@/components/Dashboard/Doctor/RecentPatients";
import CalendarView from "@/components/Dashboard/Doctor/CalendarView";

export default function DoctorDashboardPage() {
    return (
       
            <>
                <div className="flex mt-4 -ml-3">
                    <StatsCards />
                </div>
                <div className="flex mt-4 -ml-3">
                    <div className="flex-1 flex flex-col">
                        <UpcomingAppointments />
                        
                    </div>
                    <div >
                        <RecentPatients />
                    </div>
                </div>
                <div className="mt-4 -ml-3">

                        <CalendarView />
                </div>
            </>
          
    );
}
