import React, { useState } from "react";

interface AddPrescriptionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function AddPrescriptionModal({ open, onClose, onSubmit }: AddPrescriptionModalProps) {
  const [form, setForm] = useState({
    medicationName: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit(form);
      setLoading(false);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to add prescription");
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg flex flex-col gap-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Add New Prescription</h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
            <input type="text" name="medicationName" value={form.medicationName} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
            <input type="text" name="dosage" value={form.dosage} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
            <input type="text" name="frequency" value={form.frequency} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input type="text" name="duration" value={form.duration} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructions / Notes</label>
            <textarea name="instructions" value={form.instructions} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" rows={2} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" required />
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
              className="bg-[#059669] hover:bg-[#047857] text-white text-base px-10 py-2 rounded-full transition"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Prescription"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
