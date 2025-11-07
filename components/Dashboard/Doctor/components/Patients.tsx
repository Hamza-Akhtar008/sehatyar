'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import ViewPatientModal from "./modals/ViewPatientModal";
import AddPatientsModal from "./modals/AddPatientsModal";
import { getPatientAppointmentsByDoctorId } from "@/lib/Api/Doctor/doctor_api";
import React from "react";

export default function Patients() {
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showViewPatientModal, setShowViewPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchPatients() {
    setLoading(true);
    setError(null);
    try {
      const data = await getPatientAppointmentsByDoctorId();
      setPatients(data);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchPatients();
  }, []);

  const handleViewReports = (patient: any) => {
    setSelectedPatient(patient);
    setShowViewPatientModal(true);
  };

  return (
    <div className="patient-container w-full px-4 sm:px-6 md:px-8 lg:px-10">
      {/* Header */}
      <div className="patient-header flex flex-col sm:flex-row sm:items-center sm:justify-between mt-5 gap-3 mb-6">
        <h2 className="patient-title text-lg sm:text-2xl font-semibold text-gray-800">
          Patients
        </h2>
        <button
          className="add-patient-button flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-blue-700 transition"
          onClick={() => setShowAddPatientModal(true)}
        >
          <span className="text-xl font-bold">+</span>
          <span>Add Patient</span>
        </button>
      </div>

      {/* Responsive Grid */}
      <div className="patient-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {loading ? (
          <div className="col-span-full text-center py-10 text-gray-500">
            Loading patients...
          </div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500 py-10">
            {error}
          </div>
        ) : patients.length === 0 ? (
          <div className="col-span-full text-center text-gray-600 py-10">
            No patients found.
          </div>
        ) : (
          patients.map((patient: any, index: number) => (
            <div
              key={index}
              className=" bg-[#F4F4F4] flex flex-col sm:flex-row lg:flex-col items-start sm:items-center gap-4 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              {/* Avatar */}
              <div className="patient-avatar flex-shrink-0 self-center sm:self-auto">
                <Image
                  src={patient.patientProfile?.profilePic || "/assets/doctors.svg"}
                  alt={patient.fullName}
                  width={56}
                  height={56}
                  className="object-cover rounded-full w-14 h-14 sm:w-16 sm:h-16"
                />
              </div>

              {/* Info */}
              <div className="patient-info flex-1 w-full">
                <div className="patient-header-row flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="patient-name text-base sm:text-lg font-semibold text-gray-800">
                      {patient.fullName}
                    </h3>
                    <p className="patient-id text-sm text-gray-500">
                      PATIENT ID {patient.id}
                    </p>
                  </div>
                  <button
                    className="view-reports-button flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition"
                    onClick={() => handleViewReports(patient)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 
                        8.268 2.943 9.542 7-1.274 4.057-5.064 
                        7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>View Reports</span>
                  </button>
                </div>

                {/* Details */}
                <div className="patient-details grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-3">
                  <div className="patient-detail-item">
                    <label className="font-medium text-gray-700 block text-sm">
                      Last Visit:
                    </label>
                    <span className="text-gray-600 text-sm">
                      {patient.updatedAt
                        ? new Date(patient.updatedAt).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>
                  <div className="patient-detail-item">
                    <label className="font-medium text-gray-700 block text-sm">
                      Condition:
                    </label>
                    <span className="text-gray-600 text-sm">
                      {patient.patientProfile?.condition || "N/A"}
                    </span>
                  </div>
                  <div className="patient-detail-item sm:col-span-2">
                    <label className="font-medium text-gray-700 block text-sm">
                      Phone:
                    </label>
                    <span className="text-gray-600 text-sm">
                      {patient.phoneNumber}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      {showViewPatientModal && (
        <ViewPatientModal
          open={showViewPatientModal}
          onClose={() => setShowViewPatientModal(false)}
          onSchedule={() => {}}
          patient={selectedPatient}
        />
      )}

      <AddPatientsModal
        open={showAddPatientModal}
        onSubmit={fetchPatients}
        onClose={() => setShowAddPatientModal(false)}
        onSchedule={() => {}}
      />
    </div>
  );
}
