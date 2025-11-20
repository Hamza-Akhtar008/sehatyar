"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Hospital,
  UserCog,
  UserRound,
  Users,
  CalendarDays,
  FileText,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  LucideIcon,
} from "lucide-react";
import { UserRole } from "@/src/types/enums";

// ✅ Add proper type for icons
type SidebarItem = {
  label: string;
  icon: string | LucideIcon;
  href: string;
};

const adminSidebar: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin-dashboard" },
  { label: "Clinics", icon: Hospital, href: "/admin-dashboard/clinics" },
  { label: "Doctors", icon: UserRound, href: "/admin-dashboard/doctors" },
  { label: "Individual Doctors", icon: UserRound, href: "/admin-dashboard/individual-doctors" },

  { label: "Patients", icon: Users, href: "/admin-dashboard/patients" },
  {
    label: "Receptionists",
    icon: UserCog,
    href: "/admin-dashboard/receptionists",
  },
  {
    label: "Appointments",
    icon: CalendarDays,
    href: "/admin-dashboard/appointments",
  },
  { label: "Invoices", icon: FileText, href: "/admin-dashboard/invoices" },
  // { label: "Analytics", icon: BarChart3, href: "/admin-dashboard/analytics" },
  // { label: "Message", icon: MessageSquare, href: "/admin-dashboard/messages" },
  { label: "Settings", icon: Settings, href: "/admin-dashboard/settings" },
];



const ClinicSideBar: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/clinic-dashboard" },

  { label: "Doctors", icon: UserRound, href: "/clinic-dashboard/doctors" },
  { label: "Patients", icon: Users, href: "/clinic-dashboard/patients" },
  {
    label: "Receptionists",
    icon: UserCog,
    href: "/clinic-dashboard/receptionists",
  },
  {
    label: "Appointments",
    icon: CalendarDays,
    href: "/clinic-dashboard/appointments",
  },
  { label: "Invoices", icon: FileText, href: "/clinic-dashboard/invoices" },
  // { label: "Analytics", icon: BarChart3, href: "/admin-dashboard/analytics" },
  { label: "Message", icon: MessageSquare, href: "/clinic-dashboard/messages" },
  { label: "Settings", icon: Settings, href: "/clinic-dashboard/settings" },
];



const baseDoctorSidebar: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: "/assets/sidebar/dashboard.svg",
    href: "/doctor-dashboard",
  },
  {
    label: "Appointment",
    icon: "/assets/sidebar/appointment.svg",
    href: "/doctor-dashboard/appointment",
  },
  {
    label: "Patients",
    icon: "/assets/sidebar/patients.svg",
    href: "/doctor-dashboard/patients",
  },
  {
    label: "Availability",
    icon: "/assets/sidebar/availability.svg",
    href: "/doctor-dashboard/availability",
  },
  {
    label: "Message",
    icon: "/assets/sidebar/message.svg",
    href: "/doctor-dashboard/messages",
  },
  {
    label: "Analytics",
    icon: "/assets/sidebar/analytics.svg",
    href: "/doctor-dashboard/analytics",
  },
  {
    label: "Settings",
    icon: "/assets/sidebar/settings.svg",
    href: "/doctor-dashboard/settings",
  },
];

const doctorsidebar: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: "/assets/sidebar/dashboard.svg",
    href: "/doctor-dashboard",

  },
    {
    label: "Receptionists",
    icon: UserCog,
    href: "/clinic-dashboard/receptionists",
  },
  // {
  //   label: "Hospitals",
  //   icon: "/assets/sidebar/appointment.svg",
  //   href: "/doctor-dashboard/Hospital",
  // },
  {
    label: "Appointment",
    icon: "/assets/sidebar/appointment.svg",
    href: "/doctor-dashboard/appointment",
  },
  {
    label: "Patients",
    icon: "/assets/sidebar/patients.svg",
    href: "/doctor-dashboard/patients",
  },
  {
    label: "Availability",
    icon: "/assets/sidebar/availability.svg",
    href: "/doctor-dashboard/availability",
  },
  {
    label: "Message",
    icon: "/assets/sidebar/message.svg",
    href: "/doctor-dashboard/messages",
  },
  {
    label: "Analytics",
    icon: "/assets/sidebar/analytics.svg",
    href: "/doctor-dashboard/analytics",
  },
  {
    label: "Settings",
    icon: "/assets/sidebar/settings.svg",
    href: "/doctor-dashboard/settings",
  },
];


const individualDoctorSidebar: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: "/assets/sidebar/dashboard.svg",
    href: "/doctor-dashboard",
  },

  // 👇 Insert Receptionists as the second tab
  {
    label: "Receptionists",
    icon: UserCog,
    href: "/doctor-dashboard/receptionist",
  },

  // Now append the rest (but skip the original Dashboard)
  ...baseDoctorSidebar.slice(1),
];

const patientsidebar: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: "/assets/sidebar/dashboard.svg",
    href: "/patient-dashboard",
  },
  {
    label: "Appointment",
    icon: "/assets/sidebar/appointment.svg",
    href: "/patient-dashboard/appointment",
  },
  {
    label: "Medical Records",
    icon: "/assets/sidebar/patients.svg",
    href: "/patient-dashboard/medical",
  },
  {
    label: "Message",
    icon: "/assets/sidebar/message.svg",
    href: "/patient-dashboard/messages",
  },
  {
    label: "Settings",
    icon: "/assets/sidebar/settings.svg",
    href: "/patient-dashboard/settings",
  },
];

const receptionistSidebar: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/receptionist-dashboard",
  },
  {
    label: "Appointments",
    icon: CalendarDays,
    href: "/receptionist-dashboard/appointments",
  },
  {
    label: "Doctors",
    icon: UserRound,
    href: "/receptionist-dashboard/doctors",
  },
  
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/receptionist-dashboard/messages",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/receptionist-dashboard/settings",
  },
];

export default function DoctorSidebar() {
  const { logout, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  
let sidebarItems: SidebarItem[] = [];

if (user?.role === UserRole.PATIENT) {
  sidebarItems = patientsidebar;
}

else if (
  user?.role === UserRole.DOCTOR ||
  user?.role === UserRole.CLINICDOCTOR
) {
  sidebarItems = baseDoctorSidebar; // no receptionists
}

else if (user?.role === UserRole.INDIVIDUALDOCTOR) {
  sidebarItems = individualDoctorSidebar; // receptionists included
}

else if (
  user?.role === UserRole.RECEPTIONIST ||
  user?.role === UserRole.CLINICRECEPTIONIST
) {
  sidebarItems = receptionistSidebar;
}
else if (user?.role === UserRole.ADMIN) {
  sidebarItems = adminSidebar;
}

else {
  sidebarItems = ClinicSideBar;
}



  return (
    <aside
      className="w-20 sm:w-24 md:w-56 lg:w-64 h-screen bg-white flex flex-col justify-between 
                 p-3 sm:p-4 md:p-5 rounded-none lg:rounded-[22px]
                 border border-[#F2F2F2] transition-all duration-300 overflow-y-auto"
    >
      {/* Header / Logo */}
      <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-10">
        <Image
          src="/assets/Test 2.svg"
          alt="Sehatyar logo"
          width={102}
          height={27}
          className="w-16 sm:w-20 md:w-24 h-auto"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 
                          rounded-lg font-medium text-xs sm:text-sm md:text-base
                          transition-colors whitespace-nowrap
                          ${
                            isActive
                              ? "bg-[#E6F9F0] text-[#2DC36A]"
                              : "text-[#222] hover:bg-[#F2F2F2]"
                          }`}
            >
              <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                {typeof item.icon === "string" ? (
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={24}
                    height={24}
                  />
                ) : (
                  item.icon && ( // Only render if icon is defined
                    // @ts-ignore
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  )
                )}
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
                   px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg hover:bg-[#F2F2F2] 
                   text-xs sm:text-sm md:text-base transition-colors"
      >
        <img
          src="/images/exit.png"
          alt="logout"
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
        <span className="hidden md:inline">Logout</span>
      </button>
    </aside>
  );
}
