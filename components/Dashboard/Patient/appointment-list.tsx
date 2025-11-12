"use client";

import { useState, useEffect } from "react";
import { AppointmentCard } from "./appointment-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAppointmentsForPatient } from "@/lib/Api/appointment";

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

interface BloodPressure {
  high: number;
  low: number;
}

interface Prescription {
  id?: string;
  diagnosis?: string;
  medications?: Medication[];
  tests?: string[];
  instructions?: string;
  bloodPressure?: BloodPressure;
}

interface Doctor {
  id: number;
  profilePic?: string;
  user: { fullName: string };
  primarySpecialization?: string[];
  yearsOfExperience?: string;
  FeesPerConsultation?: string;
}

interface Appointment {
  id: string;
  patientName: string;
  phoneNumber: string;
  email?: string;
  paymentMethod: string;
  amount: string;
  status: "completed" | "pending" | "cancelled";
  notes?: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentFor: "myself" | "someone else";
  doctor: Doctor;
  prescriptions?: Prescription[];
}

type TabType = "upcoming" | "completed" | "cancelled"; 

export function AppointmentList() {
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    let userId: string | null = null;
    if (user) {
      try {
        const parsed = JSON.parse(user);
        userId = parsed.id ? String(parsed.id) : null;
      } catch {
        userId = null;
      }
    }
    if (!userId) return;

    setLoading(true);
    getAppointmentsForPatient(userId)
      .then((data) => {
        const mapped: Appointment[] = Array.isArray(data)
          ? data.map((item: any) => ({
              id: String(item.id),
              patientName: item.patientName,
              phoneNumber: item.phoneNumber,
              email: item.email,
              paymentMethod: item.paymentMethod,
              amount: item.amount,
              status: item.status === "completed" ? "completed" : item.status === "cancelled" ? "cancelled" : "pending",
              notes: item.notes,
              appointmentDate: item.appointmentDate,
              appointmentTime: item.appointmentTime,
              appointmentFor: item.appointmentFor,
              doctor: {
                id: item.doctor?.id,
                profilePic: item.doctor?.profilePic,
                user: {
                  fullName: item.doctor?.user?.fullName || "Unknown Doctor",
                },
                primarySpecialization: item.doctor?.primarySpecialization || [],
                yearsOfExperience: item.doctor?.yearsOfExperience,
                FeesPerConsultation: item.doctor?.FeesPerConsultation,
              },
              prescriptions: item.prescriptions || [],
            }))
          : [];
        setAppointments(mapped);
      })
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false));
  }, []);

  const filterAppointments = (tab: TabType) =>
  appointments.filter((a) =>
    tab === "upcoming" ? a.status === "pending" : a.status === tab
  );

  return (
    <div className="bg-white rounded-2xl mt-4 shadow-sm p-4 sm:p-6 md:p-8 w-full max-w-[1100px]">
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-t-4 border-t-accent-green border-gray-200 rounded-full animate-spin" />
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-transparent p-0 border-b border-border overflow-x-auto sm:overflow-visible">
            <TabsTrigger value="upcoming" className="rounded-t-lg rounded-b-none data-[state=active]:bg-green-400 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground text-sm sm:text-base">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="completed" className="rounded-t-lg rounded-b-none data-[state=active]:bg-green-400 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground text-sm sm:text-base">
              Completed
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="rounded-t-lg rounded-b-none data-[state=active]:bg-green-400 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground text-sm sm:text-base">
              Cancelled
            </TabsTrigger>
          </TabsList>

          {(["upcoming", "completed", "cancelled"] as TabType[]).map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4 mt-4 sm:mt-6">
              {filterAppointments(tab).length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  {tab === "upcoming" ? "No upcoming appointments" : tab === "completed" ? "No completed appointments" : "No cancelled appointments"}
                </p>
              ) : (
                filterAppointments(tab).map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
