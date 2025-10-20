"use client"

import { AuthProvider } from "@/src/contexts/AuthContext"
import { Toaster } from "react-hot-toast"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}
    <Toaster position="top-right" />
  </AuthProvider>
}