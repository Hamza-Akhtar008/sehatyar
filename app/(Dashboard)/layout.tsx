"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { type ReactNode, useEffect, useState } from "react"
import DoctorSidebar from "@/components/Dashboard/Doctor/Sidebar"
import DoctorDashboardHeader from "@/components/Dashboard/Doctor/Header"
import { useAuth } from "@/src/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Geist, Geist_Mono, Montserrat, Plus_Jakarta_Sans, Inter } from "next/font/google";

interface LayoutProps {
  children: ReactNode
}

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800"],
});

export const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plusjakarta",
  subsets: ["latin"],
  weight: ["500", "800"],
  display: "swap",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function DashboardLayout({ children }: LayoutProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)

    if (!isLoading && !isAuthenticated) {
      router.push("/login")
      return
    }

    if (!isLoading && isAuthenticated && user) {
      const currentPath = window.location.pathname
      const isOnDoctorDashboard = currentPath.includes("doctor-dashboard")
      const isOnPatientDashboard = currentPath.includes("patient-dashboard")

      if (user.role === "doctor" && isOnPatientDashboard) {
        router.push("/doctor-dashboard")
      } else if (user.role === "patient" && isOnDoctorDashboard) {
        router.push("/patient-dashboard")
      }
    }
  }, [isLoading, isAuthenticated, user, router])

  if (isLoading || !isClient) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen h-screen overflow-hidden">
        {/* Sidebar (Desktop) */}
        <div className="hidden lg:block">
          <DoctorSidebar />
        </div>

        {/* Sidebar (Mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div
          className={`fixed left-0 top-0 h-full z-40 lg:hidden transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <DoctorSidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 h-screen overflow-hidden">
          {/* Header */}
          <div className="flex-shrink-0">
            <DoctorDashboardHeader setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
          </div>

          {/* Content (No Scroll) */}
          <main className="flex-1 bg-gray-50 px-2 sm:px-4 md:px-6 py-2 sm:py-4 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
