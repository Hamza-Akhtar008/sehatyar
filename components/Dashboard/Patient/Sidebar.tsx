import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  CalendarDays,
  FileText,
  Pill,
  Users2,
  MessageSquare,
  UserCircle2,
  LogOut,
  X,
} from "lucide-react";

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
};

const PatientSidebar = ({ isOpen = false, onClose }: Props) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-30 z-50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
      className="fixed lg:relative  m-4 z-20 bg-white flex flex-col justify-between 
                 h-screen lg:h-auto w-[80px] md:w-[200px] lg:w-[200px]
                 p-4 lg:p-5 rounded-none lg:rounded-[22px]
                 border-r border-[#F2F2F2] transition-all duration-300"
    >
        {/* Mobile close button */}
        <button
          type="button"
          aria-label="Close sidebar"
          className="lg:hidden absolute right-2 top-2 p-2 rounded-md hover:bg-gray-50"
          onClick={onClose}
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Header / Logo */}
        <div className="px-4 py-5">
          <Image
            src="/images/logo2.webp"
            alt="Sehatyar"
            width={140}
            height={36}
            className="object-contain"
            priority
          />
        </div>
        <div className="border-b border-gray-200" />

        {/* Nav */}
        <nav className="p-4 flex flex-col h-[calc(100%-96px)]">
          {/* Active: Home */}
          <Link
            href="#"
            aria-current="page"
            className="no-underline group flex items-center gap-3 rounded-xl px-4 py-3 mb-2 bg-[#5FE0894D] text-[#01503F]"
          >
            <Home size={20} className="shrink-0 text-[#01503F]" />
            <span className="text-[16px] font-medium">Home</span>
          </Link>

          <Link
            href="#"
            className="no-underline group flex items-center gap-3 rounded-xl px-4 py-3 mb-2 text-gray-600 hover:bg-[#5FE0894D] hover:text-[#01503F] transition-colors"
          >
            <CalendarDays size={20} className="shrink-0 text-gray-500 group-hover:text-[#01503F]" />
            <span className="text-[16px]">Medical Records</span>
          </Link>

          <Link
            href="#"
            className="no-underline group flex items-center gap-3 rounded-xl px-4 py-3 mb-2 text-gray-600 hover:bg-[#5FE0894D] hover:text-[#01503F] transition-colors"
          >
            <FileText size={20} className="shrink-0 text-gray-500 group-hover:text-[#01503F]" />
            <span className="text-[16px]">My Health Records</span>
          </Link>

          <Link
            href="#"
            className="no-underline group flex items-center gap-3 rounded-xl px-4 py-3 mb-2 text-gray-600 hover:bg-[#5FE0894D] hover:text-[#01503F] transition-colors"
          >
            <Pill size={20} className="shrink-0 text-gray-500 group-hover:text-[#01503F]" />
            <span className="text-[16px]">My Medications</span>
          </Link>

        
        
          <Link
            href="#"
            className="no-underline group flex items-center gap-3 rounded-xl px-4 py-3 mb-2 text-gray-600 hover:bg-[#5FE0894D] hover:text-[#01503F] transition-colors"
          >
            <img src="/images/setting.svg" alt="" />
            <span className="text-[16px]">Settings</span>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Sign Out */}
          <Link
            href="#"
            className="no-underline group flex items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} className="shrink-0 text-red-600" />
            <span className="text-[16px]">Sign Out</span>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default PatientSidebar;