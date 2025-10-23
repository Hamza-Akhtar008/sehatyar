
import PatientDetailsWrapper from "../../../../../components/Dashboard/Doctor/components/PatientDetailsWrapper";
import { getUserById } from "@/lib/Api/Public/user_api";
import { notFound } from "next/navigation";

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

  return (
    <div className="w-full px-6 py-8">
      <PatientDetailsWrapper patient={{ ...patient, lastVisit }} />
    </div>
  );
}
