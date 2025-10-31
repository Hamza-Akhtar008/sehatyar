'use client';
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import AppointmentModal from "./modals/AppointmentModal";
import { useRouter } from "next/navigation";
import { getAppointmentsForLoggedInDoctor } from "@/lib/Api/appointment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";

type TabType = "upcoming" | "complete" | "cancelled";

export default function Appointment() {
  const [showFilter, setShowFilter] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true);
      setError(null);
      try {
        const data = await getAppointmentsForLoggedInDoctor();
        setAppointments(data);
      } catch (err: any) {
        setError(err?.message || "Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  // Close filter when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShowPatientDetails = (appointment: any) => {
    if (appointment?.id && appointment?.userId) {
      localStorage.setItem("appointmentId", String(appointment.id));
      localStorage.setItem("userId", String(appointment.userId));
    }
    try {
      const patientId = appointment.userId || appointment.patient?.id || appointment.id;
      if (patientId) {
        router.push(`/doctor-dashboard/patients/${patientId}`);
      }
    } catch (err) {
      console.error("Error navigating to patient details:", err);
    }
  };

  const getFilteredAppointments = (status: string) => {
    if (status === "upcoming") {
      return appointments.filter(a => ["pending", "confirmed", "Confirmed"].includes(a.status));
    } else if (status === "complete") {
      return appointments.filter(a => a.status === "completed");
    } else if (status === "cancelled") {
      return appointments.filter(a => a.status === "cancelled");
    }
    return appointments;
  };

  return (
    <>
      {/* Header */}
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#FBFBFB] rounded-[22px] px-4 sm:px-6 py-4 shadow-sm w-full">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800">
              My Appointments
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              View and manage your appointments
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-2xl mt-4 shadow-sm p-4 sm:p-6 w-full overflow-x-auto">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TabType)}
          className="w-full"
        >
          <TabsList className="flex flex-wrap w-full bg-transparent p-0 border-b border-border">
            <TabsTrigger
              value="upcoming"
              className="flex-1 min-w-[120px] text-center rounded-t-lg rounded-b-none data-[state=active]:bg-green-400 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="complete"
              className="flex-1 min-w-[120px] text-center rounded-t-lg rounded-b-none data-[state=active]:bg-green-400 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="flex-1 min-w-[120px] text-center rounded-t-lg rounded-b-none data-[state=active]:bg-green-400 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground"
            >
              Cancelled
            </TabsTrigger>
          </TabsList>

          {/* Render Appointment Tabs */}
          {["upcoming", "complete", "cancelled"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4 mt-6">
              {loading ? (
                <div className="text-center">Loading appointments...</div>
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : getFilteredAppointments(tab).length === 0 ? (
                <p className="text-muted-foreground text-center">No {tab} appointments</p>
              ) : (
                getFilteredAppointments(tab).map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-[22px] border border-border bg-white p-4 gap-4"
                  >
                    {/* Patient Info */}
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                        <AvatarImage
                          src={appointment.avatar || "/assets/doctors.svg"}
                          alt={appointment.patientName}
                        />
                        <AvatarFallback>
                          {appointment.patientName?.charAt(0) || "P"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <h3
                          className="font-semibold text-[16px] text-foreground cursor-pointer text-blue-600 hover:underline"
                          onClick={() => handleShowPatientDetails(appointment)}
                        >
                          {appointment.patientName}
                        </h3>
                        <p className="text-sm text-muted-foreground -mt-1">
                          {appointment.type || appointment.appointmentFor}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {appointment.appointmentDate} • {appointment.appointmentTime}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          tab === "upcoming"
                            ? "bg-yellow-100 text-yellow-700"
                            : tab === "complete"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </span>
                      <button className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
      />
    </>
  );
}
