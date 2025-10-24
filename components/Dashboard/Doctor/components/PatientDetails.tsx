
"use client";
import React from "react";


interface PatientDetailsProps {
  patient: any;
  onAddPrescription?: () => void;
  onEditPrescription?: (prescription: any) => void;
}

export default function PatientDetails({ patient, onAddPrescription, onEditPrescription }: PatientDetailsProps) {
  if (!patient) return null;

  // Track active tab for each prescription
  const [activeTabs, setActiveTabs] = React.useState<{ [key: string]: string }>({});

  const handleTabChange = (prescriptionId: string | number, tabId: string) => {
    setActiveTabs(prev => ({ ...prev, [prescriptionId]: tabId }));
  };

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
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
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

{/* Prescription List */}
<div className="bg-white rounded-lg shadow-md p-6">
  <h3 className="text-xl font-semibold mb-4">Prescription History</h3>

  {Array.isArray(patient.prescriptions) && patient.prescriptions.length > 0 ? (
    <div className="space-y-4">
      {patient.prescriptions.map((prescription: any, index: number) => {
        const prescriptionId = prescription.id || index;
        const tabs = [
          { id: "diagnosis", label: "Diagnosis" },
          { id: "medications", label: "Medications" },
          { id: "tests", label: "Tests" },
          { id: "bloodPressure", label: "Blood Pressure" },
          { id: "instructions", label: "Instructions" },
        ];
        const activeTab = activeTabs[prescriptionId] || "diagnosis";
        return (
          <details
            key={prescriptionId}
            className="border border-gray-200 rounded-lg p-4 group"
          >
            <summary className="flex justify-between items-center cursor-pointer font-medium text-gray-800">
              <span>
                {prescription.diagnosis?.replace(/<[^>]+>/g, '')?.slice(0, 40) || 'Untitled Prescription'}
              </span>
              <span className="text-sm text-gray-500 group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>

            <div className="mt-3 text-sm text-gray-700">
              {/* Edit Button */}
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => onEditPrescription?.(prescription)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 
                      2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </button>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-4">
                <nav className="flex gap-2">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      className={`px-4 py-2 text-xs font-medium rounded-t transition-colors ${
                        activeTab === tab.id
                          ? "bg-[#5FE089] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => handleTabChange(prescriptionId, tab.id)}
                      type="button"
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div>
                {activeTab === "diagnosis" && (
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">Diagnosis</span>
                    <div className="font-medium">
                      {typeof prescription.diagnosis === "string" && prescription.diagnosis.includes("<")
                        ? <div dangerouslySetInnerHTML={{ __html: prescription.diagnosis }} />
                        : <span>{prescription.diagnosis}</span>
                      }
                    </div>
                  </div>
                )}
                {activeTab === "medications" && (
                  <div>
                    <span className="text-xs text-gray-500 block mb-2">Medications</span>
                    {Array.isArray(prescription.medications) && prescription.medications.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {prescription.medications.map((med: any, idx: number) => (
                          <div key={idx} className="bg-gray-50 rounded p-3 shadow-sm">
                            <div><span className="font-semibold">{med.name}</span></div>
                            <div className="text-xs text-gray-600">Dosage: {med.dosage}</div>
                            <div className="text-xs text-gray-600">Frequency: {med.frequency}</div>
                            <div className="text-xs text-gray-600">Duration: {med.duration}</div>
                            {med.notes && (
                              <div className="text-xs text-gray-600">Notes: {med.notes}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="font-medium">No medications listed</span>
                    )}
                  </div>
                )}
                {activeTab === "tests" && (
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">Tests</span>
                    {prescription.tests?.length > 0 ? (
                      <span className="font-medium">{prescription.tests.join(", ")}</span>
                    ) : (
                      <span className="font-medium">No tests listed</span>
                    )}
                  </div>
                )}
                {activeTab === "bloodPressure" && (
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">Blood Pressure</span>
                    {prescription.bloodPressure ? (
                      <span className="font-medium">
                        {prescription.bloodPressure.high}/{prescription.bloodPressure.low} mmHg
                      </span>
                    ) : (
                      <span className="font-medium">No blood pressure recorded</span>
                    )}
                  </div>
                )}
                {activeTab === "instructions" && (
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">Instructions</span>
                    <span className="font-medium">{prescription.instructions || "N/A"}</span>
                  </div>
                )}
              </div>
            </div>
          </details>
        );
      })}
  
    </div>
  ) : (
    <div className="text-gray-500">No prescription history available.</div>
  )}
</div>


    </div>
  );
}
