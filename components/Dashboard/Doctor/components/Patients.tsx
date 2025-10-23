'use client';
import { useState } from "react";
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

    // Fetch patients from API on mount
    React.useEffect(() => {
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
        fetchPatients();
    }, []);

    //Clicking view medical reports 
    const handleViewReports = (patient: any) => {
        setSelectedPatient(patient);
        setShowViewPatientModal(true);
    }

    return (
        <div className="patient-container">
            <div className="patient-header">
                <h2 className="patient-title">Patients</h2>
                <button 
                    className="add-patient-button"
                    onClick={() => setShowAddPatientModal(true)}
                >
                    <span>+</span>
                    <span>Add Patient</span>
                </button>
            </div>
            
            <div className="patient-grid">
                {loading ? (
                    <div>Loading patients...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : patients.length === 0 ? (
                    <div>No patients found.</div>
                ) : (
                    patients.map((patient: any, index: number) => (
                        <div key={index} className="patient-card">
                            <div className="patient-avatar">
                                <Image
                                    src={patient.patientProfile?.profilePic || "/assets/doctors.svg"}
                                    alt={patient.fullName}
                                    width={48}
                                    height={48}
                                    className="object-cover"
                                />
                            </div>
                            <div className="patient-info">
                                <div className="patient-header-row">
                                    <div>
                                        <h3 className="patient-name">{patient.fullName}</h3>
                                        <p className="patient-id">PATIENT ID {patient.id}</p>
                                    </div>
                                    <button className="view-reports-button"
                                        onClick={() => handleViewReports(patient)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        View Medical Reports
                                    </button>
                                </div>
                                <div className="patient-details">
                                    <div className="patient-detail-item">
                                        <label>Last Visit:</label>
                                        <span>{patient.updatedAt ? new Date(patient.updatedAt).toLocaleDateString() : "-"}</span>
                                    </div>
                                    <div className="patient-detail-item">
                                        <label>Condition:</label>
                                        <span>{patient.patientProfile?.condition || "N/A"}</span>
                                    </div>
                                    <div className="patient-detail-item">
                                        <label>Phone:</label>
                                        <span>{patient.phoneNumber}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* View Patient Modal */}
            {showViewPatientModal && (
                <ViewPatientModal 
                    open={showViewPatientModal}
                    onClose={() => setShowViewPatientModal(false)} 
                    onSchedule={() => {/* implement scheduling logic here or leave empty if not needed */}} 
                    patient={selectedPatient}
                />
            )}

            {/* Add Patient Modal */}
             <AddPatientsModal 
                open={showAddPatientModal} 
                onClose={() => setShowAddPatientModal(false)} 
                onSchedule={() => {/* implement scheduling logic here or leave empty if not needed */}}
            /> 
        </div>
    );
}
        