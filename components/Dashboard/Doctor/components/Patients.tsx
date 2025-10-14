'use client';
import { useState } from "react";
import Image from "next/image";
import ViewPatientModal from "./modals/ViewPatientModal";
import AddPatientsModal from "./modals/AddPatientsModal";


export default function Patients() {
    const [showAddPatientModal, setShowAddPatientModal] = useState(false);
    const [showViewPatientModal, setShowViewPatientModal] = useState(false);
    
    // Sample patient data based on the image
    const patients = [
        {
            name: "Sarah Johnson",
            patientId: "PATIENT ID P001",
            lastVisit: "Oct 9, 2024",
            condition: "Healthy",
            phone: "+1 (555) 123-4567"
        },
        {
            name: "Michael Chen",
            patientId: "PATIENT ID P002", 
            lastVisit: "Oct 9, 2024",
            condition: "Healthy",
            phone: "+1 (555) 123-4567"
        }
    ];

    //Clicking view medical reports 
        const handleViewReports = (patient: any) => {
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
                {patients.map((patient, index) => (
                    <div key={index} className="patient-card">
                        <div className="patient-avatar">
                            <Image
                                src={`/assets/doctors.svg`}
                                alt={patient.name}
                                width={48}
                                height={48}
                                className="object-cover"
                            />
                        </div>
                        
                        <div className="patient-info">
                            <div className="patient-header-row">
                                <div>
                                    <h3 className="patient-name">{patient.name}</h3>
                                    <p className="patient-id">{patient.patientId}</p>
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
                                    <span>{patient.lastVisit}</span>
                                </div>
                                <div className="patient-detail-item">
                                    <label>Condition:</label>
                                    <span>{patient.condition}</span>
                                </div>
                                <div className="patient-detail-item">
                                    <label>Phone:</label>
                                    <span>{patient.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View Patient Modal */}
            {showViewPatientModal && (
                <ViewPatientModal 
                    open={showViewPatientModal}
                    onClose={() => setShowViewPatientModal(false)} 
                    onSchedule={() => {/* implement scheduling logic here or leave empty if not needed */}} 
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
        