import Image from "next/image";
import React from "react";

interface StatsCardsProps {
  appointments: any[];
  loading: boolean;
}

export default function StatsCards({ appointments, loading }: StatsCardsProps) {
  // Example stats using appointments data
  const total = appointments.length;
  const upcoming = appointments.filter(a => a.status === "pending" || a.status === "Scheduled").length;
  const completed = appointments.filter(a => a.status === "completed").length;
  const nextAppointment = appointments[0]?.appointmentTime || "-";

  const stats = [
    {
      label: "Total Appointments",
      value: loading ? "..." : total,
      // sub: loading ? "" : `${upcoming} upcoming` ,
      subClass: "text-[#2DC36A]",
      iconBg: "bg-[#E6F9F0]",
      icons: "/assets/greenusericon.png",
    },
    {
      label: "Upcoming Appointments",
      value: loading ? "..." : upcoming,
      sub: loading ? "" : `Next at ${nextAppointment}`,
      subClass: "text-[#2D7CF3]",
      iconBg: "bg-[#E6F0FA]",
      icons: "/assets/greenusericon.png",
    },
    {
      label: "Completed Appointments",
      value: loading ? "..." : completed,
      sub: loading ? "" : `${completed} completed` ,
      subClass: "text-[#F04438]",
      iconBg: "bg-[#FFE6DC]",
      icons: "/assets/greenusericon.png",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center sm:justify-start w-full gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center justify-between bg-white rounded-[20px] px-6 py-5 shadow-sm border border-[#F2F2F2]
                     w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] min-w-[250px] h-[110px]"
        >
          {/* Left Side - Text */}
          <div className="flex flex-col gap-1">
            <span className="text-xs sm:text-sm text-[#A1A1A1] font-medium">{stat.label}</span>
            <span className="text-[20px] sm:text-[22px] font-bold text-[#222] leading-tight">{stat.value}</span>
            <span className={`text-xs sm:text-sm font-medium ${stat.subClass}`}>{stat.sub}</span>
          </div>

          {/* Right Side - Icon */}
          <div
            className={`flex items-center justify-center rounded-full ${stat.iconBg} p-3 w-12 h-12`}
          >
            <Image
              src={stat.icons}
              alt={stat.label}
              width={30}
              height={30}
              className="object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
