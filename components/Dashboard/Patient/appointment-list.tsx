"use client"

import { useState } from "react"
import { AppointmentCard } from "./appointment-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TabType = "upcoming" | "complete" | "diagnosis"

interface Appointment {
  id: string
  doctorName: string
  specialty: string
  date: string
  time: string
  status: "completed" | "pending"
  avatar: string
}

const appointments: Appointment[] = [
  {
    id: "1",
    doctorName: "Dr. James Wilson",
    specialty: "Orthopedic Surgeon",
    date: "February 28, 2024",
    time: "3:00 PM",
    status: "completed",
    avatar: "/images/recentdoctor.png",
  },
  {
    id: "2",
    doctorName: "Dr. James Wilson",
    specialty: "Orthopedic Surgeon",
    date: "February 28, 2024",
    time: "3:00 PM",
    status: "pending",
    avatar: "/images/recentdoctor2.png",
  },
]

export function AppointmentList() {
  const [activeTab, setActiveTab] = useState<TabType>("upcoming")

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
            Complete
          </TabsTrigger>
          <TabsTrigger
            value="diagnosis"
            className="rounded-t-lg rounded-b-none data-[state=active]:bg-green-400 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground"
          >
            Diagnosis & Prescription
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </TabsContent>

        <TabsContent value="complete" className="space-y-4 mt-6">
          <p className="text-muted-foreground">No completed appointments</p>
        </TabsContent>

        <TabsContent value="diagnosis" className="space-y-4 mt-6">
          <p className="text-muted-foreground">No diagnosis & prescription records</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
