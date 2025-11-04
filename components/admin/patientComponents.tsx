"use client"

import { useState } from "react"
import { Users, Mail, Phone, Edit2, Trash2, Plus, X } from "lucide-react"

// --- Types ---
type PatientType = {
  id: number;
  name: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  status: string;
};

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientType | null;
  onSave: (formData: PatientType) => void;
}

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  patientName?: string;
}

const patientsData: PatientType[] = [
  {
    id: 1,
    name: "Ali Raza",
    age: "32",
    gender: "Male",
    email: "ali.raza@email.com",
    phone: "+92-300-1234567",
    address: "Lahore, Pakistan",
    status: "Active",
  },
  {
    id: 2,
    name: "Fatima Noor",
    age: "28",
    gender: "Female",
    email: "fatima.noor@email.com",
    phone: "+92-300-2345678",
    address: "Karachi, Pakistan",
    status: "Active",
  },
  {
    id: 3,
    name: "Ahmed Khan",
    age: "45",
    gender: "Male",
    email: "ahmed.khan@email.com",
    phone: "+92-300-3456789",
    address: "Islamabad, Pakistan",
    status: "Active",
  },
  {
    id: 4,
    name: "Sana Tariq",
    age: "36",
    gender: "Female",
    email: "sana.tariq@email.com",
    phone: "+92-300-4567890",
    address: "Faisalabad, Pakistan",
    status: "Active",
  },
  {
    id: 5,
    name: "Bilal Hussain",
    age: "52",
    gender: "Male",
    email: "bilal.hussain@email.com",
    phone: "+92-300-5678901",
    address: "Multan, Pakistan",
    status: "Active",
  },
]

function PatientModal({ isOpen, onClose, patient, onSave }: PatientModalProps) {
  const [formData, setFormData] = useState<PatientType>(
    patient || {
      id: 0,
      name: "",
      age: "",
      gender: "",
      email: "",
      phone: "",
      address: "",
      status: "Active",
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{patient ? "Edit Patient" : "Add New Patient"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Age</label>
              <input
                type="text"
                value={formData.age}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ backgroundColor: "#62e18b" }}
              className="flex-1 px-4 py-2 text-black rounded-lg font-semibold hover:opacity-90 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function DeleteConfirmModal({ isOpen, onClose, onConfirm, patientName }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Delete Patient</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{patientName ?? ""}</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export function PatientsManagement() {
  const [patients, setPatients] = useState<PatientType[]>(patientsData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState<PatientType | null>(null);
  const [deletingPatient, setDeletingPatient] = useState<PatientType | null>(null);

  const handleSavePatient = (formData: PatientType) => {
    if (editingPatient) {
      setPatients(patients.map((p) => (p.id === editingPatient.id ? { ...formData, id: p.id } : p)));
      setEditingPatient(null);
    } else {
      setPatients([...patients, { ...formData, id: Date.now(), status: "Active" }]);
    }
    setIsAddModalOpen(false);
  };

  const handleDeletePatient = () => {
    if (!deletingPatient) return;
    setPatients(patients.filter((p) => p.id !== deletingPatient.id));
    setIsDeleteModalOpen(false);
    setDeletingPatient(null);
  };

  const handleEditClick = (patient: PatientType) => {
    setEditingPatient(patient);
    setIsAddModalOpen(true);
  };

  const handleDeleteClick = (patient: PatientType) => {
    setDeletingPatient(patient);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setEditingPatient(null)
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Patients</h1>
            <button
              onClick={() => {
                setEditingPatient(null)
                setIsAddModalOpen(true)
              }}
              style={{ backgroundColor: "#62e18b" }}
              className="px-6 py-3 rounded-lg text-black font-semibold hover:opacity-90 transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Patient
            </button>
          </div>
          <p className="text-gray-600">Manage patient accounts and information</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Patients</p>
                <p className="text-3xl font-bold text-gray-900">{patients.length}</p>
              </div>
              <Users style={{ color: "#62e18b" }} className="w-10 h-10" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active</p>
                <p className="text-3xl font-bold text-gray-900">
                  {patients.filter((p) => p.status === "Active").length}
                </p>
              </div>
              <div style={{ backgroundColor: "#62e18b" }} className="w-10 h-10 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Male</p>
                <p className="text-3xl font-bold text-gray-900">
                  {patients.filter((p) => p.gender === "Male").length}
                </p>
              </div>
              <Users style={{ color: "#62e18b" }} className="w-10 h-10" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Female</p>
                <p className="text-3xl font-bold text-gray-900">
                  {patients.filter((p) => p.gender === "Female").length}
                </p>
              </div>
              <Users style={{ color: "#62e18b" }} className="w-10 h-10" />
            </div>
          </div>
        </div>

        {/* Patients Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Age</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Gender</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Address</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Users style={{ color: "#62e18b" }} className="w-5 h-5" />
                      <span className="font-semibold text-gray-900">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{patient.age}</td>
                  <td className="px-6 py-4 text-gray-600">{patient.gender}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" style={{ color: "#62e18b" }} />
                      {patient.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" style={{ color: "#62e18b" }} />
                      {patient.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{patient.address}</td>
                  <td className="px-6 py-4">
                    <span
                      style={{ backgroundColor: "#62e18b" }}
                      className="px-3 py-1 rounded-full text-sm font-semibold text-black"
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(patient)}
                        className="p-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(patient)}
                        className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <PatientModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        patient={editingPatient}
        onSave={handleSavePatient}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePatient}
        patientName={deletingPatient?.name}
      />
    </div>
  )
}
