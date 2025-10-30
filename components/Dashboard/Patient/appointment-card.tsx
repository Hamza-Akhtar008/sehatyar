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

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: "completed" | "pending" | "cancelled";
  avatar: string;
  prescriptions?: Prescription[];
}

// --- Component ---
export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded((prev) => !prev);

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
            src={appointment.avatar}
            alt={appointment.doctorName}
            width={56}
            height={56}
            className="rounded-full object-cover border border-gray-200"
          />
          <div>
            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
              {appointment.doctorName}
            </h3>
            <p className="text-sm text-gray-500">{appointment.specialty}</p>
            <p className="text-xs text-gray-400 mt-1">
              {appointment.date} • {appointment.time}
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
              {expanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Expandable Section */}
      {appointment.status === "completed" && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            expanded ? "max-h-[1000px] mt-5" : "max-h-0"
          }`}
        >
          <div className="border-t border-gray-200 pt-5 text-sm space-y-6">
            {appointment.prescriptions?.length ? (
              appointment.prescriptions.map((prescription, index) => (
                <div
                  key={prescription.id || index}
                  className="bg-gray-50 p-4 rounded-xl shadow-inner space-y-3"
                >
                  <h4 className="font-semibold text-gray-800">
                    Prescription #{index + 1}
                  </h4>

                  {/* Diagnosis */}
                  {prescription.diagnosis && (
                    <div>
                      <p className="font-medium text-gray-700 mb-1">
                        Diagnosis:
                      </p>
                      <div
                        className="text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: prescription.diagnosis,
                        }}
                      />
                    </div>
                  )}

                  {/* Medications */}
                  {prescription.medications&&prescription.medications?.length > 0 && (
                    <div>
                      <p className="font-medium text-gray-700 mb-1">
                        Medications:
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        {prescription.medications.map(
                          (med: Medication, i: number) => (
                            <li key={i}>
                              <span className="font-medium">{med.name}</span> —{" "}
                              {med.dosage}, {med.frequency}, {med.duration}
                              {med.notes && (
                                <span className="text-gray-500">
                                  {" "}
                                  ({med.notes})
                                </span>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Tests */}
                  {prescription.tests&&prescription.tests?.length > 0 && (
                    <div>
                      <p className="font-medium text-gray-700 mb-1">Tests:</p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        {prescription.tests.map((test, i) => (
                          <li key={i}>{test}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Instructions */}
                  {prescription.instructions && (
                    <div>
                      <p className="font-medium text-gray-700 mb-1">
                        Instructions:
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {prescription.instructions}
                      </p>
                    </div>
                  )}

                  {/* Blood Pressure */}
                  {prescription.bloodPressure && (
                    <div>
                      <p className="font-medium text-gray-700 mb-1">
                        Blood Pressure:
                      </p>
                      <p className="text-gray-600">
                        {prescription.bloodPressure.high}/
                        {prescription.bloodPressure.low} mmHg
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No prescriptions available
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
