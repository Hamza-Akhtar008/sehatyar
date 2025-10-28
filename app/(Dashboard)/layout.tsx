
"use client";
import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider"

import { ReactNode, useEffect, useState } from "react";
import Header from "@/components/ui/header";
import DoctorSidebar from "@/components/Dashboard/Doctor/Sidebar";
import DoctorDashboardHeader from "@/components/Dashboard/Doctor/Header";
import PatientSidebar from "@/components/Dashboard/Patient/Sidebar";
import PatientDashboardHeader from "@/components/Dashboard/Patient/Header";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    // Redirect if not authenticated
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }
    
    // Check if user is on the correct dashboard page
    if (!isLoading && isAuthenticated && user) {
      const currentPath = window.location.pathname;
      const isOnDoctorDashboard = currentPath.includes('doctor-dashboard');
      const isOnPatientDashboard = currentPath.includes('patient-dashboard');
      
      // If on wrong dashboard, redirect to correct one
      if (user.role === 'doctor' && isOnPatientDashboard) {
        router.push('/doctor-dashboard');
      } else if (user.role === 'patient' && isOnDoctorDashboard) {
        router.push('/patient-dashboard');
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  // Show loading state while checking authentication
  if (isLoading || !isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  // Only show content if authenticated
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex bg-gray-50">
        {/* Sidebar */}
        <DoctorSidebar />
       
        
        {/* Right side (header + content) */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Fixed Header */}
          <div className="right-0 top-0 z-40">
            <DoctorDashboardHeader />
           
          </div>

          {/* Scrollable Content */}
          <main className="flex-1 p-3 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
