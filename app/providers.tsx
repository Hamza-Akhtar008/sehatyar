"use client";

import { AuthProvider } from "@/src/contexts/AuthContext";
import { LocationProvider } from "@/src/contexts/LocationContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LocationProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </LocationProvider>
    </AuthProvider>
  );
}
