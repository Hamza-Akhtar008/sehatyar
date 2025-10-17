"use client"

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/src/contexts/AuthContext';

// Import any icons you're using - examples below
import { 
  HomeIcon, 
  CalendarIcon, 
  UserIcon, 
  MessageSquareIcon, 
  FileTextIcon, 
  Settings2Icon, 
  LogOutIcon 
} from 'lucide-react';

const PatientSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const navigationItems = [
    { name: 'Dashboard', href: '/patient-dashboard', icon: HomeIcon },
    { name: 'Appointments', href: '/appointment', icon: CalendarIcon },
    { name: 'Medical Records', href: '/medical-records', icon: FileTextIcon },
    { name: 'Messages', href: '/messages', icon: MessageSquareIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
    { name: 'Settings', href: '/settings', icon: Settings2Icon },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="flex flex-col w-64 px-4 py-8 bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center px-2 py-4">
        <Link href="/" className="text-xl font-bold text-primary">
          Sehat Yar
        </Link>
      </div>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 ${
                  isActive
                    ? 'text-gray-700 bg-gray-100 dark:text-gray-200 dark:bg-gray-800'
                    : 'text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="mx-2 text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
          
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
          >
            <LogOutIcon className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default PatientSidebar;