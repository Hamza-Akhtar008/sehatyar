'use client';
import React from "react";
import Image from "next/image";
import { useAuth } from '@/src/contexts/AuthContext';

export default function DoctorDashboardHeader() {
  
  const { user } = useAuth();

  
  return (
    <header className="flex items-center -ml-2 justify-between h-[64px] px-4 bg-white rounded-[22px] w-full shadow-sm">
      {/* Left: Greeting */}
      <div className="text-[20px] font-medium text-[#555]">Good Morning, {user?.fullName || 'Doctor'}</div>

      {/* Right: Notification, Chat, Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <button className="p-0 bg-transparent hover:bg-gray-100 rounded-full">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-2 2v1h16v-1l-2-2z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {/* Chat Icon */}
        <button className="p-0 bg-transparent hover:bg-gray-100 rounded-full">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {/* Profile */}
        <div className="flex items-center gap-2">
          <Image src="/assets/Doctor-D-profile.png" alt="Dr. Adil Khan" width={40} height={40} className="rounded-full" />
          <div className="flex flex-col">
            <span className="font-semibold text-[16px] text-[#222] leading-none">{user?.fullName || 'Dr. Adil Khan'}</span>
            <span className="text-xs text-[#B0B0B0] leading-none">{user?.role || 'Cardiologist'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
