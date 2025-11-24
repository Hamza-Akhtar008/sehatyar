"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

// --- TYPES ---
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
  gender?: string;
  country?: string;
  city?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
}

interface FullDoctor {
  id: number;
  profilePic?: string;
  yearsOfExperience?: string;
  FeesPerConsultation?: number | string;
  Description?: string;
  primarySpecialization?: string[];
  servicesTreatementOffered?: string[];
  conditionTreatments?: string[];
  education?: { institute: string; degreeName: string; fieldOfStudy: string }[];
  user: DoctorUser;
}

interface SummaryDoctor {
  id: number;
  profilePic?: string;
  primarySpecialization?: string[];
  yearsOfExperience?: string;
  FeesPerConsultation?: number | string;
  user: { fullName: string };
}

type AppointmentStatus = "completed" | "pending" | "cancelled";

export interface Appointment {
  id: string;
  patientName: string;
  phoneNumber: string;
  email?: string;
  paymentMethod: string;
  amount?: number | null;
  status: AppointmentStatus;
  notes?: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentFor: "myself" | "someone else";
  doctor: FullDoctor | SummaryDoctor;
  doctorId?: number;
  prescriptions?: Prescription[];
  prescriptionFile?: string | null;
  medicalHistoryFiles?: string[];
  clinicId?: number | null;
  isClinicAppointment?: boolean;
  appointmentType?: string | null;
}

// --- COMPONENT ---
export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded((prev) => !prev);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = () => {
    switch (appointment.status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const doctor = appointment.doctor;

  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 transition-all duration-300 hover:shadow-lg ${
        expanded ? "shadow-md" : ""
      }`}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-4">
          <Image
            src={doctor.profilePic || ""}
            alt={doctor.user.fullName}
            width={56}
            height={56}
            className="rounded-full object-cover border border-gray-200"
          />
          <div>
            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
              Dr. {doctor.user.fullName}
            </h3>
            <p className="text-sm text-gray-500">
              {doctor.primarySpecialization?.join(", ") || "Specialist"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {formatDate(appointment.appointmentDate)} • {appointment.appointmentTime}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1.5 border rounded-full text-xs font-semibold capitalize ${getStatusColor()}`}
          >
            {appointment.status}
          </span>
          {appointment.status === "completed" && (
            <div className="text-gray-500">
              {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          )}
        </div>
      </div>

      {/* Expandable Section */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? "max-h-[2000px] mt-5" : "max-h-0"
        }`}
      >
        <div className="border-t border-gray-200 pt-5 text-sm space-y-5">
          {/* Appointment Details */}
          <div className="space-y-2">
            <p><span className="font-semibold">Patient Name:</span> {appointment.patientName}</p>
            <p><span className="font-semibold">Phone:</span> {appointment.phoneNumber}</p>
            {appointment.email && <p><span className="font-semibold">Email:</span> {appointment.email}</p>}
            <p><span className="font-semibold">Appointment For:</span> {appointment.appointmentFor === "myself" ? "Myself" : "Someone Else"}</p>
            <p><span className="font-semibold">Notes / Issue:</span> {appointment.notes || "-"}</p>
            <p><span className="font-semibold">Payment Method:</span> {appointment.paymentMethod}</p>
            <p><span className="font-semibold">Amount:</span> Rs. {appointment.amount ?? "-"}</p>
          </div>

          {/* Doctor Info */}
          <div className="space-y-2 border-t border-gray-200 pt-4">
            <p className="font-semibold">Doctor Information:</p>
            <p><span className="font-semibold">Name:</span> Dr. {doctor.user.fullName}</p>
            <p><span className="font-semibold">Specialization:</span> {doctor.primarySpecialization?.join(", ") || "-"}</p>
            <p><span className="font-semibold">Experience:</span> {doctor.yearsOfExperience || "-"} years</p>
            {doctor.FeesPerConsultation && <p><span className="font-semibold">Consultation Fee:</span> Rs. {doctor.FeesPerConsultation}</p>}
          </div>

        {/* Prescription & Medical History Panel */}
<div className="pt-6">
  <p className="font-bold text-gray-800 text-lg mb-3">Files & Medical History</p>

  {/* Prescription File */}
  {appointment.prescriptionFile && (
    <div className="mb-4">
      <p className="text-gray-600 font-medium mb-2">Prescription</p>
      <a
        href={appointment.prescriptionFile}
        target="_blank"
        className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
      >
        <svg
          className="w-6 h-6 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span className="text-green-800 font-semibold">View / Download Prescription</span>
      </a>
    </div>
  )}

  {/* Medical History */}
  {appointment.medicalHistoryFiles?.length ? (
    <div>
      <p className="text-gray-600 font-medium mb-2">Medical History</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointment.medicalHistoryFiles.map((file, i) => (
          <a
            key={i}
            href={file}
            target="_blank"
            className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-xl shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
          >
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-blue-800 font-medium truncate">{file.split("/").pop()}</span>
          </a>
        ))}
      </div>
    </div>
  ) : null}
</div>

    
        </div>
      </div>
    </div>
  );
}
