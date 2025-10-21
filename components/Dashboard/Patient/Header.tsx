import React from "react";
import Image from "next/image";
import { Bell, PhoneCall, ChevronDown, Menu } from "lucide-react";

type Props = {
  onToggleSidebar?: () => void;
};

const PatientHeader = ({ onToggleSidebar }: Props) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 lg:static lg:z-auto w-full bg-white border-b border-gray-200">
      <div className="h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Menu (mobile) + Welcome */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="lg:hidden p-2 rounded-md hover:bg-gray-50"
            aria-label="Toggle sidebar"
            onClick={onToggleSidebar}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="hidden sm:block text-[18px] md:text-[20px] font-semibold text-[#0f172a] max-w-[50vw] truncate">
            Welcome back, <span className="font-bold">Sarah Johnson</span> <span>👋</span>
          </h1>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Bell with badge */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative p-2 rounded-full hover:bg-gray-50"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 rounded-full bg-red-500 text-white text-[11px] leading-5 text-center border-2 border-white">
              3
            </span>
          </button>

          {/* Emergency button */}
          <button
            type="button"
            className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#EF4444] text-white text-sm font-semibold shadow-sm hover:bg-[#dc2626] transition-colors sm:w-auto sm:px-4"
          >
            <PhoneCall className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Emergency</span>
          </button>

          {/* User profile */}
          <button type="button" className="flex items-center gap-2 sm:gap-3">
            <Image
              src="https://i.pravatar.cc/80?img=5"
              alt="Sarah Johnson"
              width={40}
              height={40}
              unoptimized
              className="rounded-full object-cover w-9 h-9 sm:w-10 sm:h-10"
            />
            <div className="hidden sm:flex flex-col leading-tight text-left">
              <span className="text-sm font-semibold text-[#111827]">Sarah Johnson</span>
              <span className="text-xs text-gray-500">Patient ID: P12345</span>
            </div>
            <ChevronDown className="hidden sm:block w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default PatientHeader;