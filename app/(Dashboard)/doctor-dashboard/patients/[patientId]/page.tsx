import PatientDetailsWrapper from "../../../../../components/Dashboard/Doctor/components/PatientDetailsWrapper";
import { getUserById } from "@/lib/Api/Public/user_api";
import { notFound } from "next/navigation";
import { getPrescriptionsByUserId } from "@/lib/Api/prescription";
import React from "react";

interface Props {
  params: Promise<{ patientId: string }>;
}

export default async function PatientDetailsPage({ params }: Props) {
  const { patientId } = await params;
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
    prescriptions = await getPrescriptionsByUserId(Number(patientId));
  } catch (e) {
    prescriptions = [];
  }

  return (
    <div className="w-full px-6 py-8">
      <PatientDetailsWrapper patient={{ ...patient, lastVisit }} prescriptions={prescriptions} />
    </div>
  );
}
