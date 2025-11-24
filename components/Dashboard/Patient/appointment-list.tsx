"use client";

import { useState, useEffect } from "react";
import { AppointmentCard } from "./appointment-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAppointmentsForPatient } from "@/lib/Api/appointment";

// ---------------- TYPES ----------------

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

interface DoctorUser {
  id: number;
  fullName: string;
  gender: string;
  country: string;
  city: string;
  email: string;
  phoneNumber: string;
  role: string;
}

interface FullDoctor {
  id: number;
  isActive: boolean;
  profilePic?: string;
  yearsOfExperience?: string;
  FeesPerConsultation?: number;
  Description?: string;
  primarySpecialization?: string[];
  servicesTreatementOffered?: string[];
  conditionTreatments?: string[];

  education?: {
    institute: string;
    degreeName: string;
    fieldOfStudy: string;
  }[];

  user: DoctorUser;
}

interface SummaryDoctor {
  id: number;
  profilePic?: string;
  user: { fullName: string };
  primarySpecialization?: string[];
  yearsOfExperience?: string;
  FeesPerConsultation?: string | number;
}

type AppointmentStatus = "completed" | "pending" | "cancelled";

interface BaseAppointment {
 id: string;
  patientName: string;
  phoneNumber: string;
  email?: string;
  paymentMethod: string;
  amount: number | null;
  status: AppointmentStatus;
  notes?: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentFor: "myself" | "someone else";
}

interface CompletedAppointment extends BaseAppointment {
  status: "completed";
  doctor: FullDoctor;
  doctorId: number;
  medicalHistoryFiles: string[];
  prescriptionFile: string | null;
  clinicId: number | null;
  isClinicAppointment: boolean;
  appointmentType: string | null;
}

interface NormalAppointment extends BaseAppointment {
  status: "pending" | "cancelled";
  doctor: SummaryDoctor;
  prescriptions?: Prescription[];
}

type Appointment = CompletedAppointment | NormalAppointment;

type TabType = "upcoming" | "completed" | "cancelled";

// ---------------- COMPONENT ----------------

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
          ? data.map((item: any) => {
              // Completed appointment → full structure
              if (item.status === "completed") {
                return {
                  id: String(item.id),
                  patientName: item.patientName,
                  phoneNumber: item.phoneNumber,
                  email: item.email,
                  paymentMethod: item.paymentMethod,
                  amount: item.amount,
                  status: "completed",
                  notes: item.notes,
                  appointmentDate: item.appointmentDate,
                  appointmentTime: item.appointmentTime,
                  appointmentFor: item.appointmentFor,

                  doctor: item.doctor, // full doctor object
                  doctorId: item.doctorId,

                  medicalHistoryFiles: item.medicalHistoryFiles || [],
                  prescriptionFile: item.prescriptionFile || null,

                  clinicId: item.clinicId,
                  isClinicAppointment: item.isClinicAppointment,
                  appointmentType: item.appointmentType,
                } satisfies CompletedAppointment;
              }

              // Upcoming / Cancelled → older structure
              return {
                id: String(item.id),
                patientName: item.patientName,
                phoneNumber: item.phoneNumber,
                email: item.email,
                paymentMethod: item.paymentMethod,
                amount: item.amount,
                status:
                  item.status === "cancelled" ? "cancelled" : "pending",
                notes: item.notes,
                appointmentDate: item.appointmentDate,
                appointmentTime: item.appointmentTime,
                appointmentFor: item.appointmentFor,

                doctor: {
                  id: item.doctor?.id,
                  profilePic: item.doctor?.profilePic,
                  user: {
                    fullName: item.doctor?.user?.fullName || "Unknown",
                  },
                  primarySpecialization:
                    item.doctor?.primarySpecialization || [],
                  yearsOfExperience: item.doctor?.yearsOfExperience,
                  FeesPerConsultation: item.doctor?.FeesPerConsultation,
                },

                prescriptions: item.prescriptions || [],
              } satisfies NormalAppointment;
            })
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
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TabType)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 bg-transparent p-0 border-b border-border">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          {(["upcoming", "completed", "cancelled"] as TabType[]).map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4 mt-4">
              {filterAppointments(tab).length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  {tab === "upcoming"
                    ? "No upcoming appointments"
                    : tab === "completed"
                    ? "No completed appointments"
                    : "No cancelled appointments"}
                </p>
              ) : (
                filterAppointments(tab).map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
