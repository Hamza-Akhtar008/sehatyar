"use client"
import Image from "next/image"
import { useAuth } from "@/src/contexts/AuthContext"

interface DoctorDashboardHeaderProps {
  setSidebarOpen: (open: boolean) => void
  sidebarOpen: boolean
}

export default function DoctorDashboardHeader({
  setSidebarOpen,
  sidebarOpen,
}: DoctorDashboardHeaderProps) {
  const { user } = useAuth()

  return (
    <header
      className="
     max-w-8xl  
        flex flex-row sm:flex-row
        items-start sm:items-center
        justify-between
        gap-3 sm:gap-4 md:gap-4
        px-3 sm:px-5 md:px-4
        py-3 sm:py-4
        m-2 sm:m-4
        bg-white rounded-xl sm:rounded-[22px]
       shadow-sm
        transition-all
      "
    >

        <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-200 rounded-lg"
              >
                <svg width="16" height="16" fill="none">
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
      {/* Left: Greeting */}
      <div
        className="
          text-[16px] sm:text-[18px] md:text-[20px]
          font-medium text-[#555]
          truncate
        "
      >
        Good Morning, {user?.fullName || "Doctor"}
      </div>

      {/* Right: Actions (notification, chat, profile) */}
      <div
        className="
          flex items-center justify-end
          w-full sm:w-auto
          gap-3 sm:gap-4 md:gap-6
          flex-wrap sm:flex-nowrap
        "
      >
        {/* Notification Icon */}
        <button
          className="
            p-2 sm:p-2.5
            bg-transparent hover:bg-gray-100
            rounded-full transition-colors flex-shrink-0
          "
          aria-label="Notifications"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-2 2v1h16v-1l-2-2z"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Chat Icon */}
        <button
          className="
            p-2 sm:p-2.5
            bg-transparent hover:bg-gray-100
            rounded-full transition-colors flex-shrink-0
          "
          aria-label="Messages"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Profile */}
        <div
          className="
            flex items-center gap-2
            sm:gap-3 md:gap-4
            bg-gray-50 sm:bg-transparent
            rounded-full sm:rounded-none
            px-2 py-1 sm:px-0 sm:py-0
            w-full sm:w-auto
            justify-between sm:justify-start
          "
        >
          <Image
            src="/assets/Doctor-D-profile.png"
            alt="Doctor Profile"
            width={40}
            height={40}
            className="rounded-full w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span
              className="
                font-semibold text-sm sm:text-base
                text-[#222] leading-none truncate
              "
            >
              {user?.fullName || "Dr. Adil Khan"}
            </span>
            <span
              className="
                text-[11px] sm:text-xs text-[#B0B0B0]
                leading-none truncate
              "
            >
              {user?.role || "Cardiologist"}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
