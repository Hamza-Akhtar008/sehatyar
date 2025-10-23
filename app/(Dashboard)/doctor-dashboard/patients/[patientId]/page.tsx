import PatientDetailsWrapper from "../../../../../components/Dashboard/Doctor/components/PatientDetailsWrapper";
import { getUserById } from "@/lib/Api/Public/user_api";
import { notFound } from "next/navigation";
import axios from "axios";
import React from "react";

interface Props {
  params: { patientId: string };
}

export default async function PatientDetailsPage({ params }: Props) {
  const patientId = params.patientId;
  let patient = null;
  try {
    patient = await getUserById(patientId);
  } catch (e) {
    return notFound();
  }
  if (!patient) return notFound();

  // Format last visit date on the server
  const lastVisit = patient.updatedAt ? new Date(patient.updatedAt).toLocaleDateString() : "-";

  // Fetch prescriptions for this user
  let prescriptions: any[] = [];
  try {
    const res = await axios.get(`http://localhost:3003/prescription/user/${patientId}`);
    prescriptions = Array.isArray(res.data) ? res.data : [];
  } catch (e) {
    prescriptions = [];
  }

  return (
    <div className="w-full px-6 py-8">
      <PatientDetailsWrapper patient={{ ...patient, lastVisit }} />
      {/* Prescription List */}
      <div className="mt-10">
        <h3
          className="text-2xl font-bold mb-6"
          style={{ color: "#5fe089" }}
        >
          Prescriptions
        </h3>
        {prescriptions.length === 0 ? (
          <div className="text-gray-500">No prescriptions found.</div>
        ) : (
          <div className="space-y-8">
            {prescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="border rounded-xl p-6 bg-white shadow"
                style={{ borderColor: "#5fe089", borderWidth: 2 }}
              >
                <div className="mb-6">
                  <div className="font-semibold text-lg mb-2" style={{ color: "#5fe089" }}>
                    Diagnosis
                  </div>
                  <div className="bg-gray-50 rounded-md p-3 text-gray-800 border border-[#e5e5e5]">
                    {typeof prescription.diagnosis === "string" && prescription.diagnosis.includes("<")
                      ? <div dangerouslySetInnerHTML={{ __html: prescription.diagnosis }} />
                      : <span>{prescription.diagnosis}</span>
                    }
                  </div>
                </div>
                <div className="mb-6">
                  <div className="font-semibold text-lg mb-2" style={{ color: "#5fe089" }}>
                    Medications
                  </div>
                  {Array.isArray(prescription.medications) && prescription.medications.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {prescription.medications.map((med: any, idx: number) => (
                        <div key={idx} className="bg-gray-50 rounded-md p-3 border border-[#e5e5e5] flex flex-col gap-1">
                          <div>
                            <span className="font-medium text-gray-700">Name:</span>{" "}
                            <span className="text-gray-800">{med.name}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Dosage:</span>{" "}
                            <span className="text-gray-800">{med.dosage}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Frequency:</span>{" "}
                            <span className="text-gray-800">{med.frequency}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Duration:</span>{" "}
                            <span className="text-gray-800">{med.duration}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Notes:</span>{" "}
                            <span className="text-gray-800">{med.notes}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-md p-3 text-gray-500 border border-[#e5e5e5]">No medications listed.</div>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-lg mb-2" style={{ color: "#5fe089" }}>
                    Instructions
                  </div>
                  <div className="bg-gray-50 rounded-md p-3 text-gray-800 border border-[#e5e5e5]">
                    {prescription.instructions || "-"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
