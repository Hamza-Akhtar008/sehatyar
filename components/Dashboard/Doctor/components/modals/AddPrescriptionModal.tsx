"use client";
import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
interface AddPrescriptionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function AddPrescriptionModal({
  open,
  onClose,
  onSubmit,
}: AddPrescriptionModalProps) {
  const [form, setForm] = useState({
    diagnosis: "",
    medications: [
      { name: "", dosage: "", frequency: "", duration: "", notes: "" },
    ],
    instructions: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
      setForm((prev) => ({ ...prev, [name]: value }));
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
      // Get IDs from localStorage
      const appointmentId = Number(localStorage.getItem("appointmentId") || 0);
      const userId = Number(localStorage.getItem("userId") || 0);

      // Prepare payload
      const payload = {
        diagnosis: form.diagnosis,
        medications: form.medications,
        instructions: form.instructions,
        appointmentId,
        userId,
      };

      await axios.post("http://localhost:3003/prescription", payload);

      // Remove IDs from localStorage after success
      localStorage.removeItem("appointmentId");
      localStorage.removeItem("userId");

      setLoading(false);
      onClose();

      // Reload the patient details page
      if (userId) {
        router.replace(`/doctor-dashboard/patients/${userId}`);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to add prescription");
      setLoading(false);
    }
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 bg-opacity-40 z-50 flex items-center justify-center"
      onMouseDown={handleBackdropClick}
      style={{ overflowY: "auto" }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-lg flex flex-col gap-8"
        style={{
          width: "100%",
          maxWidth: 600,
          minWidth: 340,
          height: "min(90vh, 700px)",
          maxHeight: "90vh",
          minHeight: 400,
          padding: "2rem",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Add New Prescription
        </h2>
        <form
          className="flex flex-col gap-6 flex-1 overflow-y-auto hide-scrollbar"
          style={{ minHeight: 0 }}
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Diagnosis
            </label>

            <div className="max-w-2xl mx-auto border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 bg-white">
              <ReactQuill
                theme="snow"
                value={form.diagnosis}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, diagnosis: value }))
                }
                className="min-h-[150px] rounded-lg [&_.ql-toolbar]:rounded-t-lg [&_.ql-toolbar]:border-gray-300 [&_.ql-container]:rounded-b-lg [&_.ql-container]:border-t [&_.ql-container]:border-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medications
            </label>
            {form.medications.map((med, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-md p-3 mb-3 flex flex-col gap-2 bg-gray-50"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={med.name}
                    onChange={(e) => handleChange(e, idx)}
                    className="w-1/2 border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                  <input
                    type="text"
                    name="dosage"
                    placeholder="Dosage"
                    value={med.dosage}
                    onChange={(e) => handleChange(e, idx)}
                    className="w-1/2 border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="frequency"
                    placeholder="Frequency"
                    value={med.frequency}
                    onChange={(e) => handleChange(e, idx)}
                    className="w-1/2 border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                  <input
                    type="text"
                    name="duration"
                    placeholder="Duration"
                    value={med.duration}
                    onChange={(e) => handleChange(e, idx)}
                    className="w-1/2 border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                <textarea
                  name="notes"
                  placeholder="Notes"
                  value={med.notes}
                  onChange={(e) => handleChange(e, idx)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={2}
                />
                {form.medications.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500 text-xs mt-1 self-end"
                    onClick={() => handleRemoveMedication(idx)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="bg-[#71e496] hover:scale-105 text-white text-xs px-4 py-1 rounded-full transition"
              onClick={handleAddMedication}
            >
              Add Medication
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructions
            </label>
            <textarea
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              rows={2}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex items-center justify-between mt-4">
            <button
              type="button"
              className="text-gray-700 text-base px-6 py-2 rounded-full hover:bg-gray-100 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#71e496] hover:scale-105 text-white text-base px-10 py-2 rounded-full transition"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Prescription"}
            </button>
          </div>
        </form>
      </div>
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
