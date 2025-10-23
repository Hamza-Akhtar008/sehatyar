"use client";

import PatientDetails from "./PatientDetails";
import AddPrescriptionModal from "./modals/AddPrescriptionModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PatientDetailsWrapperProps {
  patient: any;
}

export default function PatientDetailsWrapper({ patient }: PatientDetailsWrapperProps) {
  const router = useRouter();
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  const handleAddPrescription = () => {
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
      <PatientDetails patient={patient} onAddPrescription={handleAddPrescription} />
      <AddPrescriptionModal
        open={showPrescriptionModal}
        onClose={() => setShowPrescriptionModal(false)}
        onSubmit={handlePrescriptionSubmit}
      />
    </>
  );
}
