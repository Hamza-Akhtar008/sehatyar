"use client";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { postPrescription, editPrescriptionById } from "@/lib/Api/prescription";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface AddPrescriptionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  prescriptionToEdit?: any;
}

export default function AddPrescriptionModal({
  open,
  onClose,
  onSubmit,
  prescriptionToEdit,
}: AddPrescriptionModalProps) {
  const [activeTab, setActiveTab] = useState("diagnosis");
  const [form, setForm] = useState({
    diagnosis: "",
    medications: [
      { name: "", dosage: "", frequency: "", duration: "", notes: "" },
    ],
    tests: [] as string[],
    bloodPressure: { high: "", low: "" },
    instructions: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isEditMode = !!prescriptionToEdit;

  // Populate form when editing
  useEffect(() => {
    if (prescriptionToEdit) {
      setForm({
        diagnosis: prescriptionToEdit.diagnosis || "",
        medications: prescriptionToEdit.medications || [
          { name: "", dosage: "", frequency: "", duration: "", notes: "" },
        ],
        tests: prescriptionToEdit.tests || [],
        bloodPressure: {
          high: prescriptionToEdit.bloodPressure?.high?.toString() || "",
          low: prescriptionToEdit.bloodPressure?.low?.toString() || "",
        },
        instructions: prescriptionToEdit.instructions || "",
      });
    } else {
      // Reset form when not editing
      setForm({
        diagnosis: "",
        medications: [
          { name: "", dosage: "", frequency: "", duration: "", notes: "" },
        ],
        tests: [],
        bloodPressure: { high: "", low: "" },
        instructions: "",
      });
    }
  }, [prescriptionToEdit, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx?: number
  ) => {
    const { name, value } = e.target;
    if (typeof idx === "number") {
      setForm((prev) => ({
        ...prev,
        medications: prev.medications.map((med, i) =>
          i === idx ? { ...med, [name]: value } : med
        ),
      }));
    } else {
      // Handle bloodPressure fields
      if (name === "high" || name === "low") {
        setForm((prev) => ({
          ...prev,
          bloodPressure: {
            ...prev.bloodPressure,
            [name]: value,
          },
        }));
      } else {
        setForm((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const handleAddMedication = () => {
    setForm((prev) => ({
      ...prev,
      medications: [
        ...prev.medications,
        { name: "", dosage: "", frequency: "", duration: "", notes: "" },
      ],
    }));
  };

  const handleRemoveMedication = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        diagnosis: form.diagnosis,
        medications: form.medications,
        tests: form.tests,
        bloodPressure: {
          high: Number(form.bloodPressure.high) || 0,
          low: Number(form.bloodPressure.low) || 0,
        },
        instructions: form.instructions,
      };

      if (isEditMode && prescriptionToEdit?.id) {
        // Edit existing prescription
        await editPrescriptionById(prescriptionToEdit.id, payload as any);
      } else {
        // Add new prescription
        const appointmentId = Number(localStorage.getItem("appointmentId") || 0);
        const userId = Number(localStorage.getItem("userId") || 0);
        
        await postPrescription({
          ...payload,
          appointmentId,
          userId,
        } as any);
        
        localStorage.removeItem("appointmentId");
        localStorage.removeItem("userId");
      }

      setLoading(false);
      onClose();
      
      // Refresh the page to show updated data
      router.refresh();
    } catch (err: any) {
      setError(err?.message || `Failed to ${isEditMode ? 'update' : 'add'} prescription`);
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!open) return null;

  const tabs = [
    { id: "diagnosis", label: "Diagnosis" },
    { id: "medications", label: "Medications" },
    { id: "tests", label: "Tests" },
    { id: "bloodPressure", label: "Blood Pressure" },
    { id: "instructions", label: "Instructions" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl flex flex-col border border-gray-300"
        style={{
          width: "100%",
          maxWidth: "1000px", 
          minWidth: "750px",  
          height: "min(90vh, 700px)",
          overflow: "hidden",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-gray-800">
            {isEditMode ? "Edit Prescription" : "Add New Prescription"}
          </h2>
        </div>

        {/* Tabs - Oracle Style */}
        <div className="bg-gray-100 border-b border-gray-300 px-6">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-3 font-medium text-sm transition-all relative ${
                  activeTab === tab.id
                    ? "bg-white text-[#5FE089] border-t-2 border-[#5FE089]"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                } border-r border-gray-300`}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <form
          className="flex-1 flex flex-col overflow-hidden"
          onSubmit={handleSubmit}
        >
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            {/* Diagnosis Tab */}
            {activeTab === "diagnosis" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-gray-700">
                    Diagnosis Details
                  </label>
                  <span className="text-xs text-gray-500">Required</span>
                </div>
                <div className="border border-gray-300 rounded">
                  <ReactQuill
                    theme="snow"
                    value={form.diagnosis}
                    onChange={(value) =>
                      setForm((prev) => ({ ...prev, diagnosis: value }))
                    }
                    className="min-h-[200px]"
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["clean"],
                      ],
                    }}
                  />
                </div>
              </div>
            )}

            {/* Medications Tab */}
            {activeTab === "medications" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-gray-700">
                    Medication List
                  </label>
                  <span className="text-xs text-gray-500">
                    {form.medications.length} medication(s)
                  </span>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto border border-gray-200 rounded p-2">
                  {form.medications.map((med, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-300 rounded bg-white p-4 space-y-3 shadow-sm"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Medication Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Enter medication name"
                            value={med.name}
                            onChange={(e) => handleChange(e, idx)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Dosage *
                          </label>
                          <input
                            type="text"
                            name="dosage"
                            placeholder="e.g., 500mg"
                            value={med.dosage}
                            onChange={(e) => handleChange(e, idx)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Frequency *
                          </label>
                          <input
                            type="text"
                            name="frequency"
                            placeholder="e.g., Twice daily"
                            value={med.frequency}
                            onChange={(e) => handleChange(e, idx)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Duration *
                          </label>
                          <input
                            type="text"
                            name="duration"
                            placeholder="e.g., 7 days"
                            value={med.duration}
                            onChange={(e) => handleChange(e, idx)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Additional Notes
                        </label>
                        <textarea
                          name="notes"
                          placeholder="Any special instructions or notes..."
                          value={med.notes}
                          onChange={(e) => handleChange(e, idx)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={2}
                        />
                      </div>
                      
                      {form.medications.length > 1 && (
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="text-red-600 text-xs font-medium hover:text-red-800 px-3 py-1 border border-red-300 rounded hover:bg-red-50 transition"
                            onClick={() => handleRemoveMedication(idx)}
                          >
                            Remove Medication
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <button
                  type="button"
                  className="flex items-center gap-2 text-green-600 hover:text-green-800 text-sm font-medium border border-green-300 rounded px-4 py-2 hover:bg-green-50 transition"
                  onClick={handleAddMedication}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Another Medication
                </button>
              </div>
            )}

            {/* Tests Tab */}
            {activeTab === "tests" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-gray-700">
                    Prescribed Tests
                  </label>
                  <span className="text-xs text-gray-500">
                    {form.tests.length} test(s)
                  </span>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto border border-gray-200 rounded p-4">
                  {form.tests.map((test, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 border border-gray-300 rounded bg-white p-3"
                    >
                      <input
                        type="text"
                        value={test}
                        onChange={(e) => {
                          const newTests = [...form.tests];
                          newTests[idx] = e.target.value;
                          setForm(prev => ({ ...prev, tests: newTests }));
                        }}
                        placeholder="Enter test name (e.g., Blood Test)"
                        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        className="text-red-600 text-xs font-medium hover:text-red-800 px-3 py-2 border border-red-300 rounded hover:bg-red-50 transition whitespace-nowrap"
                        onClick={() => setForm(prev => ({
                          ...prev,
                          tests: prev.tests.filter((_, i) => i !== idx),
                        }))}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  
                  {form.tests.length === 0 && (
                    <div className="text-gray-500 text-sm text-center py-4">
                      No tests added yet. Click the button below to add a test.
                    </div>
                  )}
                </div>
                
                <button
                  type="button"
                  className="flex items-center gap-2 text-green-600 hover:text-green-800 text-sm font-medium border border-green-300 rounded px-4 py-2 hover:bg-green-50 transition"
                  onClick={() => setForm(prev => ({
                    ...prev,
                    tests: [...prev.tests, ""],
                  }))}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Test
                </button>
              </div>
            )}

            {/* Blood Pressure Tab */}
            {activeTab === "bloodPressure" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-gray-700">
                    Blood Pressure
                  </label>
                  <span className="text-xs text-gray-500">Optional</span>
                </div>
                <div className="border border-gray-300 rounded bg-white p-4 flex gap-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">High (Systolic)</label>
                    <input
                      type="number"
                      name="high"
                      placeholder="e.g., 120"
                      value={form.bloodPressure.high}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Low (Diastolic)</label>
                    <input
                      type="number"
                      name="low"
                      placeholder="e.g., 80"
                      value={form.bloodPressure.low}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Instructions Tab */}
            {activeTab === "instructions" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-gray-700">
                    Patient Instructions
                  </label>
                  <span className="text-xs text-gray-500">Required</span>
                </div>
                <div className="border border-gray-300 rounded bg-white">
                  <textarea
                    name="instructions"
                    value={form.instructions}
                    onChange={handleChange}
                    placeholder="Enter detailed instructions for the patient..."
                    className="w-full border-0 rounded px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={8}
                    required
                  />
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <p className="text-xs text-yellow-800">
                    <strong>Note:</strong> These instructions will be provided to the patient along with the prescription.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-3 mt-4">
                <div className="text-red-700 text-sm font-medium">{error}</div>
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-300 flex items-center justify-between">
            <button
              type="button"
              className="px-6 py-2 text-gray-700 text-sm font-medium border border-gray-300 rounded hover:bg-gray-100 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">
                All required fields must be completed
              </span>
              <button
                type="submit"
                className="px-8 py-2 bg-[#5FE089] hover:bg-[#4dcc73] text-white text-sm font-medium rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Saving..." : isEditMode ? "Update Prescription" : "Save Prescription"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}