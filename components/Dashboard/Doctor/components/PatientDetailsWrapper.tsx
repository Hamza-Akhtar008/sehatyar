"use client";

import PatientDetails from "./PatientDetails";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PrescriptionModal } from "./modals/AddPrescriptionModal";

interface PatientDetailsWrapperProps {
  patient: any;
  prescriptions?: any[];
}

export default function PatientDetailsWrapper({ patient, prescriptions }: PatientDetailsWrapperProps) {
  const router = useRouter();
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);

  const handleAddPrescription = () => {
    setSelectedPrescription(null);
    setShowPrescriptionModal(true);
  };

  const handleEditPrescription = (prescription: any) => {
    setSelectedPrescription(prescription);
    setShowPrescriptionModal(true);
  };

  const handleBack = () => {
    router.back();
  };

  function handlePrescriptionSubmit(data: any) {
    // TODO: Send prescription data to API
    console.log("Prescription submitted for patient", patient?.id, data);
    // You can call your API here
  }

  return (
    <>
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 5L7.5 10L12.5 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </button>
      <PatientDetails 
        patient={{ ...patient, prescriptions }} 
        onAddPrescription={handleAddPrescription}
        onEditPrescription={handleEditPrescription}
      />
      <PrescriptionModal
      patient={patient}
        open={showPrescriptionModal}
        onOpenChange={() => {
          patient={patient}
          setShowPrescriptionModal(false);
          setSelectedPrescription(null);
        }}
        
      
      />
    </>
  );
}
