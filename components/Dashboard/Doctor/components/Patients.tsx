'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import ViewPatientModal from "./modals/ViewPatientModal";
import AddPatientsModal from "./modals/AddPatientsModal";
import { getPatientAppointmentsByDoctorId, deletePatientById } from "@/lib/Api/Doctor/doctor_api";
import React from "react";

interface DeleteModalProps {
  open: boolean;
  name: string;
  onConfirm: () => void;
  onClose: () => void;
}

function DeleteConfirmationModal({ open, name, onConfirm, onClose }: DeleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Patient</h3>
        <p className="text-gray-600 mb-5">
          Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Patients() {
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showViewPatientModal, setShowViewPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [deleteModal, setDeleteModal] = useState({ open: false, id: 0, name: "" });

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

  const handleDeletePatient = (id: number, name: string) => {
    setDeleteModal({ open: true, id, name });
  };

  const confirmDeletePatient = async () => {
    const { id } = deleteModal;
    try {
      await deletePatientById(id);
      setPatients((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err?.message || "Failed to delete patient");
    } finally {
      setDeleteModal({ open: false, id: 0, name: "" });
    }
  };

  return (
    <div className="patient-container w-full px-4 sm:px-6 md:px-8 lg:px-10">
      {/* Header */}
      <div className="patient-header flex flex-col sm:flex-row sm:items-center sm:justify-between mt-5 gap-3 mb-6">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">
          Patients
        </h2>
        <button
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-blue-700 transition"
          onClick={() => setShowAddPatientModal(true)}
        >
          <span className="text-xl font-bold">+</span>
          <span>Add Patient</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          patients.map((patient: any) => (
            <div
              key={patient.id}
              className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200 flex flex-col gap-4"
            >
              {/* Avatar & Name */}
              <div className="flex flex-col items-center text-center gap-2">
                <Image
                  src={patient.patientProfile?.profilePic || "/assets/doctors.svg"}
                  alt={patient.fullName}
                  width={64}
                  height={64}
                  className="object-cover rounded-full w-16 h-16 border border-gray-200"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{patient.fullName}</h3>
                  <p className="text-sm text-gray-500">PATIENT ID {patient.id}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">Last Visit:</span>
                  <span className="text-gray-600">
                    {patient.updatedAt
                      ? new Date(patient.updatedAt).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">Condition:</span>
                  <span className="text-gray-600">
                    {patient.patientProfile?.condition || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">Phone:</span>
                  <span className="text-gray-600">{patient.phoneNumber}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <button
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  onClick={() => handleViewReports(patient)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 
                      5c4.478 0 8.268 2.943 9.542 7-1.274 
                      4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>View Reports</span>
                </button>

                <button
                  className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                  onClick={() => handleDeletePatient(patient.id, patient.fullName)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 
                      21H7.862a2 2 0 01-1.995-1.858L5 
                      7m5 4v6m4-6v6m1-10V4a1 1 
                      0 00-1-1h-4a1 1 0 00-1 1v3M4 
                      7h16" />
                  </svg>
                  <span>Delete</span>
                </button>
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

      <DeleteConfirmationModal
        open={deleteModal.open}
        name={deleteModal.name}
        onConfirm={confirmDeletePatient}
        onClose={() => setDeleteModal({ open: false, id: 0, name: "" })}
      />
    </div>
  );
}
