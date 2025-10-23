
"use client";
import React from "react";

interface PatientDetailsProps {
  patient: any;
  onAddPrescription?: () => void;
}

export default function PatientDetails({ patient, onAddPrescription }: PatientDetailsProps) {
  if (!patient) return null;

  return (
    <div className="w-full">
      {/* Header Section with Patient Info and Action Button */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b">
        <div className="flex items-center gap-4">
          <img
            src={patient.patientProfile?.profilePic || "/assets/doctors.svg"}
            alt={patient.fullName}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <div>
            <h2 className="font-bold text-2xl">{patient.fullName}</h2>
            <p className="text-sm text-gray-500">PATIENT ID: {patient.id}</p>
          </div>
        </div>
        <button
          className="bg-[#46cc8e] text-white px-8 py-3 rounded-lg font-medium hover:scale-105 transition"
          onClick={onAddPrescription}
        >
          Add New Prescription
        </button>
      </div>

      {/* Patient Information Grid */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Gender</span>
            <span className="font-medium">{patient.gender || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Age</span>
            <span className="font-medium">{patient.patientProfile?.age || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Blood Group</span>
            <span className="font-medium">{patient.patientProfile?.bloodGroup || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Phone Number</span>
            <span className="font-medium">{patient.phoneNumber || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Email</span>
            <span className="font-medium">{patient.email || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Last Visit</span>
            <span className="font-medium">{patient.lastVisit}</span>
          </div>
        </div>
      </div>

      {/* Medical Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">Medical Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Condition</span>
            <span className="font-medium">{patient.patientProfile?.condition || "N/A"}</span>
          </div>
          {patient.patientProfile?.allergies && patient.patientProfile.allergies.length > 0 && (
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Allergies</span>
              <span className="font-medium">{patient.patientProfile.allergies.join(", ")}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
