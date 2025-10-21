
"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plusjakarta",
  subsets: ["latin"],
  weight: ["500", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});



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
      <html lang="en" suppressHydrationWarning className={` ${montserrat.variable} ${plusJakarta.variable} ${inter.variable} ${geistSans.variable} ${geistMono.variable}`}>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex items-center justify-center min-h-screen">
              Loading...
            </div>
          </ThemeProvider>
        </body>
      </html>
    );
  }

  // Only show content if authenticated
  return (
    <>
      <html lang="en" suppressHydrationWarning className={` ${montserrat.variable} ${plusJakarta.variable} ${inter.variable} ${geistSans.variable} ${geistMono.variable}`}>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen">
              {/* Sidebar */}
              {user?.role === 'doctor' ? (
                <DoctorSidebar />
              ) : (
                <PatientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              )}
              
              {/* Right side (header + content) */}
              <div className="flex-1 flex flex-col lg:ml-64">
                {/* Fixed Header */}
                <div className="fixed left-64 right-0 top-0 z-40">
                  {user?.role === 'doctor' ? (
                    <DoctorDashboardHeader />
                  ) : (
                    <PatientDashboardHeader onToggleSidebar={() => setSidebarOpen((v) => !v)} />
                  )}
                </div>

                {/* Scrollable Content */}
                <main className="flex-1 mt-16 p-6 overflow-y-auto bg-gray-50">
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
