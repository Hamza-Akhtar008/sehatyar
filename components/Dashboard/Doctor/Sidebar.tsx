import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";

const adminsidebar = [
  { label: "Dashboard", icon: "/assets/sidebar/dashboard.svg", href: "/doctor-dashboard" },
  { label: "Hospitals", icon: "/assets/sidebar/appointment.svg", href: "/doctor-dashboard/Hospital" },
  { label: "Appointment", icon: "/assets/sidebar/appointment.svg", href: "/doctor-dashboard/appointment" },
  { label: "Patients", icon: "/assets/sidebar/patients.svg", href: "/doctor-dashboard/patients" },
  { label: "Availability", icon: "/assets/sidebar/availability.svg", href: "/doctor-dashboard/availability" },
  { label: "Message", icon: "/assets/sidebar/message.svg", href: "/doctor-dashboard/messages" },
  { label: "Analytics", icon: "/assets/sidebar/analytics.svg", href: "/doctor-dashboard/analytics" },
  { label: "Settings", icon: "/assets/sidebar/settings.svg", href: "/doctor-dashboard/settings" },
];

const patientsidebar = [
  { label: "Dashboard", icon: "/assets/sidebar/dashboard.svg", href: "/patient-dashboard" },
  { label: "Appointment", icon: "/assets/sidebar/appointment.svg", href: "/patient-dashboard/appointment" },
  { label: "Medical Records", icon: "/assets/sidebar/patients.svg", href: "/patient-dashboard/medical" },
  { label: "Message", icon: "/assets/sidebar/message.svg", href: "/doctor-dashboard/messages" },
  { label: "Settings", icon: "/assets/sidebar/settings.svg", href: "/doctor-dashboard/settings" },
];

export default function DoctorSidebar() {
  const { logout, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Determine which sidebar to render
  const sidebarItems = user?.role === "doctor" ? adminsidebar : patientsidebar;

  return (
    <aside
      className="fixed lg:relative m-4 z-20 bg-white flex flex-col justify-between 
                 min-h-screen lg:h-auto w-[90px] md:w-[200px] lg:w-[220px]
                 p-4 lg:p-5 rounded-none lg:rounded-[22px]
                 border border-[#F2F2F2] transition-all duration-300"
    >
      {/* Header / Logo */}
      <div className="flex items-center justify-center mb-10">
        <Image src="/assets/Test 2.svg" alt="Sehatyar logo" width={102} height={27} />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href ;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 lg:px-4 lg:py-3 
                          rounded-lg font-medium text-sm lg:text-[16px]
                          transition-colors whitespace-nowrap
                          ${
                            isActive
                              ? "bg-[#E6F9F0] text-[#2DC36A]"
                              : "text-[#222] hover:bg-[#F2F2F2]"
                          }`}
            >
              <span className="w-6 h-6 flex items-center justify-center shrink-0">
                <Image src={item.icon} alt={item.label} width={24} height={24} />
              </span>
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2 text-[#F04438] font-medium 
                   px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg hover:bg-[#F2F2F2] 
                   text-sm lg:text-[16px]"
      >
      <img src="/images/exit.png" alt="logout" />
        <span className="hidden md:inline">Logout</span>
      </button>
    </aside>
  );
}
