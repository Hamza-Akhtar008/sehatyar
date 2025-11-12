"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { getAppointmentsForPatient } from "@/lib/Api/appointment";
import { X, Eye, Download } from "lucide-react";
import { uploadMedicalHistoryFiles } from "@/lib/Api/Patient/patient_api";

interface Doctor {
  id?: string;
  profilePic?: string;
  user: { fullName: string };
  primarySpecialization: string[];
  yearsOfExperience?: number;
  FeesPerConsultation?: number;
}

interface Appointment {
  id: string;
  patientName: string;
  phoneNumber?: string;
  email?: string;
  paymentMethod?: string;
  amount?: number;
  status: "completed" | "cancelled" | "pending";
  notes?: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentFor?: string;
  doctor: Doctor;
  prescriptions: string[];
  medicalHistoryFiles?: 
   string[];
}

export default function UploadReport() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filesByAppointment, setFilesByAppointment] = useState<Record<string, File[]>>({});

  const fetchappointments = async ()=>
  {
 const user = localStorage.getItem("user");
    let userId: string | null = null;
    if (user) {
      try {
        const parsed = JSON.parse(user);
        userId = parsed.id ? String(parsed.id) : null;
      } catch {
        userId = null;
      }
    }
    if (!userId) return;

    setLoading(true);
    getAppointmentsForPatient(userId)
      .then((data: any[]) => {
        const mapped: Appointment[] = Array.isArray(data)
          ? data.map((item: any) => ({
              id: String(item.id),
              patientName: item.patientName,
              phoneNumber: item.phoneNumber,
              email: item.email,
              paymentMethod: item.paymentMethod,
              amount: item.amount,
              status:
                item.status === "completed"
                  ? "completed"
                  : item.status === "cancelled"
                  ? "cancelled"
                  : "pending",
              notes: item.notes,
              appointmentDate: item.appointmentDate,
              appointmentTime: item.appointmentTime,
              appointmentFor: item.appointmentFor,
              doctor: {
                id: item.doctor?.id,
                profilePic: item.doctor?.profilePic,
                user: {
                  fullName: item.doctor?.user?.fullName || "Unknown Doctor",
                },
                primarySpecialization: item.doctor?.primarySpecialization || [],
                yearsOfExperience: item.doctor?.yearsOfExperience,
                FeesPerConsultation: item.doctor?.FeesPerConsultation,
              },
              prescriptions: item.prescriptions || [],
              medicalHistoryFiles: item.medicalHistoryFiles || [],
            }))
          : [];
        setAppointments(mapped);
      })
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false));
  }
  useEffect(() => {
   fetchappointments()
  }, []);

  const handleToggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleFileSelect = (appointmentId: string, selectedFiles: File[]) => {
    setFilesByAppointment((prev) => ({
      ...prev,
      [appointmentId]: [...(prev[appointmentId] || []), ...selectedFiles],
    }));
  };

  const handleDrop = (appointmentId: string, e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(appointmentId, Array.from(e.dataTransfer.files));
  };

  const handleRemoveFile = (appointmentId: string, index: number) => {
    setFilesByAppointment((prev) => ({
      ...prev,
      [appointmentId]: prev[appointmentId].filter((_, i) => i !== index),
    }));
  };

const handleUpload = async (appointmentId: string) => {
  const files = filesByAppointment[appointmentId];
  if (!files || files.length === 0) return toast.error("No files selected");

  try {
    const formData = new FormData();
    
    // Append each file to FormData
    files.forEach((file) => {
      formData.append("medicalHistoryFiles", file); // "files" should match your backend field name
    });

   
    // Example API call (replace with your API function)
    const response = await uploadMedicalHistoryFiles(formData,appointmentId);


    toast.success("Files uploaded successfully");
fetchappointments();
    // Clear uploaded files from state
    setFilesByAppointment((prev) => ({ ...prev, [appointmentId]: [] }));

    // Optionally, refresh the appointments to get updated `medicalHistoryFiles`
  } catch (error) {
    console.error(error);
    toast.error("Upload failed");
  }
};

  if (loading) return <p>Loading appointments...</p>;

  const completedAppointments = appointments.filter((a) => a.status === "completed");

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="bg-white rounded-2xl mt-4 shadow-sm p-4 sm:p-6 md:p-8 w-full max-w-[1100px] space-y-4">
      {completedAppointments.map((appt) => (
        <div key={appt.id} className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
          <button
            className="w-full flex justify-between items-center font-semibold text-gray-800"
            onClick={() => handleToggleAccordion(appt.id)}
          >
            <span>
           {appt.notes}-{formatDate(appt.appointmentDate)}:{appt.appointmentTime} - {appt.doctor.user.fullName}
            </span>
            <span>{expandedId === appt.id ? "-" : "+"}</span>
          </button>

          {expandedId === appt.id && (
            <div className="mt-4 space-y-4 text-gray-700">
              <p><strong>Patient:</strong> {appt.patientName}</p>
              <p><strong>Notes:</strong> {appt.notes || "No notes"}</p>

              {/* File upload */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(appt.id, e)}
                className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-green-400 transition"
              >
                <p>Drag & drop files here or click to browse</p>
                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    e.target.files && handleFileSelect(appt.id, Array.from(e.target.files))
                  }
                  className="hidden"
                  id={`fileInput-${appt.id}`}
                />
                <label
                  htmlFor={`fileInput-${appt.id}`}
                  className="inline-block mt-2 px-6 py-2 bg-green-500 text-white rounded-full cursor-pointer hover:bg-green-600"
                >
                  Browse Files
                </label>
              </div>

              {/* Selected files before upload */}
              {filesByAppointment[appt.id]?.length > 0 && (
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  {filesByAppointment[appt.id].map((file, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>{file.name}</span>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveFile(appt.id, idx)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <Button
                className="mt-2 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2"
                onClick={() => handleUpload(appt.id)}
              >
                Upload Files
              </Button>

              {/* Display previously uploaded files */}
              {appt.medicalHistoryFiles&&appt.medicalHistoryFiles?.length > 0 && (
                <div className="mt-4">
              
                  <div className="space-y-3">
                    {appt.medicalHistoryFiles.map((file,index) => (
                      <div
                        key={file}
                        className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 sm:p-5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                            <svg
                              width="23"
                              height="23"
                              viewBox="0 0 23 23"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.1875 12.9375H12.9375V14.375H7.1875V12.9375ZM7.1875 9.34375H15.8125V10.7812H7.1875V9.34375ZM7.1875 16.5312H10.7812V17.9688H7.1875V16.5312Z"
                                fill="#01503F"
                              />
                              <path
                                d="M17.9688 3.59375H15.8125V2.875C15.8125 2.49375 15.661 2.12812 15.3915 1.85853C15.1219 1.58895 14.7562 1.4375 14.375 1.4375H8.625C8.24375 1.4375 7.87812 1.58895 7.60853 1.85853C7.33895 2.12812 7.1875 2.49375 7.1875 2.875V3.59375H5.03125C4.65 3.59375 4.28437 3.7452 4.01478 4.01478C3.7452 4.28437 3.59375 4.65 3.59375 5.03125V20.125C3.59375 20.5062 3.7452 20.8719 4.01478 21.1415C4.28437 21.411 4.65 21.5625 5.03125 21.5625H17.9688C18.35 21.5625 18.7156 21.411 18.9852 21.1415C19.2548 20.8719 19.4062 20.5062 19.4062 20.125V5.03125C19.4062 4.65 19.2548 4.28437 18.9852 4.01478C18.7156 3.7452 18.35 3.59375 17.9688 3.59375ZM8.625 2.875H14.375V5.75H8.625V2.875ZM17.9688 20.125H5.03125V5.03125H7.1875V7.1875H15.8125V5.03125H17.9688V20.125Z"
                                fill="#01503F"
                              />
                            </svg>
                          </div>
                            <div className="flex flex-col gap-1">
                            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                              Test Report - {index+1}
                            </h3>
                           
                          </div>
                         
                        </div>

                        <div className="flex items-center gap-3 mt-3 sm:mt-0">
                          <button
                            onClick={() => window.open(file, "_blank")}
                            className="text-gray-400 hover:text-gray-700 transition-colors"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => window.open(file, "_blank")}
                            className="text-gray-400 hover:text-gray-700 transition-colors"
                          >
                            <Download className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
