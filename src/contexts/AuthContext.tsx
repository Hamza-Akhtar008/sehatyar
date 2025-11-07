"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "../types/enums";

// Define the shape of our auth context
export type User = {
  id: string;
  doctorId?: string;
  fullName: string;
  email: string;
  role: UserRole;
  token?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  setUser: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Check for saved auth token on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error loading auth state:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Import and use your login API call
      const response = await import("@/lib/Api/Auth/api").then((mod) =>
        mod.login(email, password)
      );
      console.log("LOGIN RESPONSE:", response);

      // Handle response with only id and access_token
      if (response.id && response.access_token) {
        // Save token to localStorage for axios interceptor
        localStorage.setItem("authToken", response.access_token);

        // Fetch user profile
        const getUserProfile = await import(
          "@/lib/Api/Auth/getUserProfile"
        ).then((mod) => mod.getUserProfile);
        const profile = await getUserProfile(
          response.id,
          response.access_token
        );
        
        const userData: User = {
          id: profile.id,
          doctorId: response.doctorId?.toString(),
          fullName: profile.fullName || "",
          email: profile.email || "",
          role: profile.role || "patient",
          token: response.access_token,
        };
        
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        // ⚠️ REMOVED THE REDIRECT FROM HERE ⚠️
        // Let the DashboardLayout handle the redirect based on role
        // This prevents double redirects
        
        return response;
      }
      throw new Error(
        "Login response missing user data. See console for details."
      );
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken')
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    // Clear the session storage flag too
    sessionStorage.removeItem('dashboard-redirected');
    router.push("/login");
  };

  const setUserData = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    setUser: setUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// HOC for protected routes
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function ProtectedRoute(props: P) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/login");
      }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      );
    }

    return isAuthenticated ? <Component {...(props as P)} /> : null;
  };
}

// HOC for role-based protection
export function withRole<P extends object>(
  Component: React.ComponentType<P>,
  role: UserRole
) {
  return function RoleProtectedRoute(props: P) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push("/login");
        } else if (user?.role !== role) {
          router.push(
            user?.role === "doctor"
              ? "/doctor-dashboard"
              : user?.role === "admin"
              ? "/admin-dashboard"
              : user?.role === "receptionist"
              ? "/receptionist-dashboard"
              : "/patient-dashboard"
          );
        }
      }
    }, [isLoading, isAuthenticated, user, router]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      );
    }

    return isAuthenticated && user?.role === role ? (
      <Component {...(props as P)} />
    ) : null;
  };
}