"use client"

import { useState, useEffect } from "react"
import { AppointmentCard } from "./appointment-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAppointmentsForPatient } from "@/lib/Api/appointment"

type TabType = "upcoming" | "complete" | "diagnosis"

interface Appointment {
  id: string
  doctorName: string
  specialty: string
  date: string
  time: string
  status: "completed" | "pending" | "cancelled"
  avatar: string
}

export function AppointmentList() {
  const [activeTab, setActiveTab] = useState<TabType>("upcoming")
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    // Get userId from localStorage (or other source)
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
    getAppointmentsForPatient(userId)
      .then((data) => {
        // Map API response to UI fields and ensure status is typed
        const mapped: Appointment[] = Array.isArray(data)
          ? data.map((item: any) => {
              let status: "completed" | "pending" | "cancelled" = "pending";
              if (item.status === "completed") status = "completed";
              else if (item.status === "cancelled") status = "cancelled";
              else status = "pending";
              return {
                id: String(item.id),
                doctorName: item.doctor?.user?.fullName || "Unknown Doctor",
                specialty: Array.isArray(item.doctor?.primarySpecialization)
                  ? item.doctor.primarySpecialization.join(", ")
                  : "",
                date: item.appointmentDate || "",
                time: item.appointmentTime || "",
                status,
                avatar: item.doctor?.profilePic || "",
              };
            })
          : [];
        setAppointments(mapped);
      })
      .catch(() => setAppointments([]));
  }, []);

  return (
    <div className="bg-white rounded-2xl mt-2 -ml-4 shadow-sm p-6  w-[1064px]">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-transparent p-0 border-b border-border">
          <TabsTrigger
            value="upcoming"
            className="rounded-t-lg rounded-b-none data-[state=active]:bg-green-400 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="complete"
            className="rounded-t-lg rounded-b-none data-[state=active]:bg-green-400 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="diagnosis"
            className="rounded-t-lg rounded-b-none data-[state=active]:bg-green-400 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground"
          >
            Cancelled
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {appointments.filter(a => a.status === "pending").map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </TabsContent>

        <TabsContent value="complete" className="space-y-4 mt-6">
          {appointments.filter(a => a.status === "completed").length === 0 ? (
            <p className="text-muted-foreground">No completed appointments</p>
          ) : (
            appointments.filter(a => a.status === "completed").map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          )}
        </TabsContent>

        <TabsContent value="diagnosis" className="space-y-4 mt-6">
          {appointments.filter(a => a.status === "cancelled").length === 0 ? (
            <p className="text-muted-foreground">No cancelled appointments</p>
          ) : (
            appointments.filter(a => a.status === "cancelled").map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
