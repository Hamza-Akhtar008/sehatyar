import Image from "next/image";
import React from "react";

const stats = [
  {
    label: "Total Appointments",
    value: 24,
    sub: "12% from yesterday",
    subClass: "text-[#2DC36A]",
    iconBg: "bg-[#E6F9F0]",
    iconColor: "text-[#2DC36A]",
    icons:"/assets/greenusericon.png"
  },
  {
    label: "Upcoming Appointments",
    value: 16,
    sub: "Next at 2:30 PM",
    subClass: "text-[#2D7CF3]",
    iconBg: "bg-[#E6F0FA]",
    iconColor: "text-[#2D7CF3]",
    icons:"/assets/greenusericon.png"

  },
  {
    label: "Completed Appointments",
    value: 8,
    sub: "2 urgent reviews",
    subClass: "text-[#F04438]",
    iconBg: "bg-[#FFE6DC]",
    iconColor: "text-[#F04438]",
    icons:"/assets/greenusericon.png"

  },
];

export default function StatsCards() {
  return (
    <div className="flex w-full -mt-4 -ml-2 gap-2 mb-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex-1 flex items-center justify-between bg-white rounded-[22px] px-8 py-6 shadow-sm border border-[#F2F2F2] w-[320px]  h-[118px]"
        >
          {/* Left: Text */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#A1A1A1] font-medium">{stat.label}</span>
            <span className="text-[22px] font-bold text-[#222] leading-tight">{stat.value}</span>
            <span className={`text-xs font-medium ${stat.subClass}`}>{stat.sub}</span>
          </div>
          {/* Right: Icon in colored circle */}
          <div className={` flex items-center justify-center pt-2`}>
       <Image
  src={stat.icons}
  alt={stat.label}
  width={41}
  height={45}
  className={stat.iconColor}
/>
          </div>
        </div>
      ))}
    </div>
  );
}
