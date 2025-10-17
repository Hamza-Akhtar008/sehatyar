"use client"

import React from 'react';
import { useAuth } from '@/src/contexts/AuthContext';
import { BellIcon, UserCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PatientDashboardHeader = () => {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white border-b rounded-lg shadow-sm">
      <div>
        <h1 className="text-2xl font-semibold">Welcome, {user?.fullName}</h1>
        <p className="text-sm text-gray-500">Patient Dashboard</p>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <BellIcon className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center">
            <UserCircleIcon className="w-8 h-8 text-gray-500" />
          </div>
          <div>
            <div className="text-sm font-medium">{user?.fullName}</div>
            <div className="text-xs text-gray-500">{user?.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardHeader;