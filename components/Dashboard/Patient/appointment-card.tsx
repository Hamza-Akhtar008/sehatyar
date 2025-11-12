"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

// --- Type Definitions ---
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
  servicesTreatementOffered?: string[];
  conditionTreatments?: string[];
  education?: { institute: string; degreeName: string; fieldOfStudy: string }[];
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
  appointmentDate: string; // ISO string
  appointmentTime: string; // formatted string like "09:00 AM"
  appointmentFor: "myself" | "someone else";
  doctor: Doctor;
  prescriptions?: Prescription[];
}

// --- Component ---
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
            src={appointment.doctor?.profilePic || ""}
            alt={appointment.doctor?.user.fullName}
            width={56}
            height={56}
            className="rounded-full object-cover border border-gray-200"
          />
          <div>
            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
              Dr. {appointment.doctor?.user.fullName}
            </h3>
            <p className="text-sm text-gray-500">
              {appointment.doctor?.primarySpecialization?.join(", ") || "Specialist"}
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
            <p>
              <span className="font-semibold">Patient Name:</span> {appointment.patientName}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {appointment.phoneNumber}
            </p>
            {appointment.email && (
              <p>
                <span className="font-semibold">Email:</span> {appointment.email}
              </p>
            )}
            <p>
              <span className="font-semibold">Appointment For:</span> {appointment.appointmentFor === "myself" ? "Myself" : "Someone Else"}
            </p>
            <p>
              <span className="font-semibold">Notes / Issue:</span> {appointment.notes || "-"}
            </p>
            <p>
              <span className="font-semibold">Payment Method:</span> {appointment.paymentMethod}
            </p>
            <p>
              <span className="font-semibold">Amount:</span> Rs. {appointment.amount}
            </p>
          </div>

          {/* Doctor Info */}
          <div className="space-y-2 border-t border-gray-200 pt-4">
            <p className="font-semibold">Doctor Information:</p>
            <p>
              <span className="font-semibold">Name:</span> Dr. {appointment.doctor?.user.fullName}
            </p>
            <p>
              <span className="font-semibold">Specialization:</span>{" "}
              {appointment.doctor?.primarySpecialization?.join(", ") || "-"}
            </p>
            <p>
              <span className="font-semibold">Experience:</span>{" "}
              {appointment.doctor?.yearsOfExperience || "-"} years
            </p>
            {appointment.doctor?.FeesPerConsultation && (
              <p>
                <span className="font-semibold">Consultation Fee:</span> Rs. {appointment.doctor?.FeesPerConsultation}
              </p>
            )}
          </div>

          {/* Prescriptions */}
          {appointment.prescriptions?.length ? (
            appointment.prescriptions.map((prescription, index) => (
              <div
                key={prescription.id || index}
                className="bg-gray-50 p-4 rounded-xl shadow-inner space-y-3"
              >
                <h4 className="font-semibold text-gray-800">Prescription #{index + 1}</h4>

                {prescription.diagnosis && (
                  <p>
                    <span className="font-medium">Diagnosis:</span> {prescription.diagnosis}
                  </p>
                )}

                {prescription.medications&& prescription?.medications?.length > 0 && (
                  <div>
                    <p className="font-medium">Medications:</p>
                    <ul className="list-disc pl-5">
                      {prescription.medications.map((med, i) => (
                        <li key={i}>
                          <span className="font-medium">{med.name}</span> — {med.dosage}, {med.frequency}, {med.duration}{" "}
                          {med.notes && <span className="text-gray-500">({med.notes})</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {prescription.tests&&prescription.tests?.length > 0 && (
                  <div>
                    <p className="font-medium">Tests:</p>
                    <ul className="list-disc pl-5">
                      {prescription.tests.map((test, i) => (
                        <li key={i}>{test}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {prescription.instructions && (
                  <p>
                    <span className="font-medium">Instructions:</span> {prescription.instructions}
                  </p>
                )}

                {prescription.bloodPressure && (
                  <p>
                    <span className="font-medium">Blood Pressure:</span>{" "}
                    {prescription.bloodPressure.high}/{prescription.bloodPressure.low} mmHg
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No prescriptions available</p>
          )}
        </div>
      </div>
    </div>
  );
}
