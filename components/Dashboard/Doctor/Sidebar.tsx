import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';


const sidebarItems = [
  { label: "Dashboard", icon: "/assets/sidebar/dashboard.svg", href: "/doctor-dashboard", active: true },
  { label: "Appointment", icon: "/assets/sidebar/appointment.svg", href: "/appointment" },
  { label: "Patients", icon: "/assets/sidebar/patients.svg", href: "/patients" },
  { label: "Availability", icon: "/assets/sidebar/availability.svg", href: "/availability" },
  { label: "Message", icon: "/assets/sidebar/message.svg", href: "/messages" },
  { label: "Analytics", icon: "/assets/sidebar/analytics.svg", href: "/analytics" },
  { label: "Settings", icon: "/assets/sidebar/settings.svg", href: "/settings" },
];

export default function DoctorSidebar() {
   const { logout } = useAuth();
     const pathname = usePathname();
     const router = useRouter();
    

    const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside
      className="fixed lg:relative m-4 z-20 bg-white flex flex-col justify-between 
                 h-screen lg:h-auto w-[80px] md:w-[200px] lg:w-[240px]
                 p-4 lg:p-5 rounded-none lg:rounded-[22px]
                 border-r border-[#F2F2F2] transition-all duration-300"
    >
      {/* Header / Logo */}
      <div className="flex items-center justify-center  mb-10">
        <Image
          src="/assets/Test 2.svg"
          alt="Sehatyar logo"
          width={102}
          height={27}
         
        />
        
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 lg:px-4 lg:py-3 
                        rounded-lg font-medium text-sm lg:text-[16px]
                        transition-colors whitespace-nowrap
                        ${
                          item.active
                            ? "bg-[#E6F9F0] text-[#2DC36A]"
                            : "text-[#222] hover:bg-[#F2F2F2]"
                        }`}
          >
            <span className="w-6 h-6 flex items-center justify-center shrink-0">
              <Image src={item.icon} alt={item.label} width={24} height={24} />
            </span>
            <span className="hidden md:inline">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        className="mt-auto flex items-center gap-2 text-[#F04438] font-medium 
                   px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg hover:bg-[#F2F2F2] 
                   text-sm lg:text-[16px]"
      >
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 20 20"
          className="shrink-0"
        >
          <path
            d="M7.5 7.5l5 5m0-5l-5 5"
            stroke="#F04438"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="2.5"
            y="2.5"
            width="15"
            height="15"
            rx="7.5"
            stroke="#F04438"
            strokeWidth="1.5"
          />
        </svg>
        <span className="hidden md:inline"
        onClick={handleLogout}

      >Logout</span>
      </button>
    </aside>
  );
}
