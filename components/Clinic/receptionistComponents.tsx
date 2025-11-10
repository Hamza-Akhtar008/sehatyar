"use client"

import { useEffect, useState } from "react"
import { UserCog, Mail, Phone, Edit2, Trash2, Plus, X } from "lucide-react"

// --- Types ---
type ReceptionistType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  hospital: string;
  status: string;
};

interface ReceptionistModalProps {
  isOpen: boolean;
  onClose: () => void;
  receptionist: ReceptionistType | null;
  onSave: (formData: ReceptionistType) => void;
}

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  receptionistName?: string;
}

const BASE_URL =
  process.env.NEXT_BASE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://sehatyarr-c23468ec8014.herokuapp.com";

const receptionistsData: ReceptionistType[] = [
  {
    id: 1,
    name: "Ayesha Siddiqui",
    email: "ayesha.siddiqui@hospital.com",
    phone: "+92-300-1234567",
    hospital: "City Medical Center",
    status: "Active",
  },
  {
    id: 2,
    name: "Bilal Ahmed",
    email: "bilal.ahmed@hospital.com",
    phone: "+92-300-2345678",
    hospital: "Green Valley Hospital",
    status: "Active",
  },
  {
    id: 3,
    name: "Sadia Khan",
    email: "sadia.khan@hospital.com",
    phone: "+92-300-3456789",
    hospital: "Sunset Health Clinic",
    status: "Active",
  },
  {
    id: 4,
    name: "Imran Raza",
    email: "imran.raza@hospital.com",
    phone: "+92-300-4567890",
    hospital: "Downtown Care Hospital",
    status: "Active",
  },
  {
    id: 5,
    name: "Nida Farooq",
    email: "nida.farooq@hospital.com",
    phone: "+92-300-5678901",
    hospital: "North Star Medical",
    status: "Active",
  },
]

function ReceptionistModal({ isOpen, onClose, receptionist, onSave }: ReceptionistModalProps) {
  const [formData, setFormData] = useState<ReceptionistType>(
    receptionist || {
      id: 0,
      name: "",
      email: "",
      phone: "",
      hospital: "",
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
          <h2 className="text-2xl font-bold text-gray-900">{receptionist ? "Edit Receptionist" : "Add New Receptionist"}</h2>
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
            <label className="block text-sm font-semibold text-gray-900 mb-2">Hospital</label>
            <input
              type="text"
              value={formData.hospital}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, hospital: e.target.value })}
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

function DeleteConfirmModal({ isOpen, onClose, onConfirm, receptionistName }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Delete Receptionist</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{receptionistName ?? ""}</strong>? This action cannot be undone.
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

export function ReceptionistsManagement() {
  const [receptionists, setReceptionists] = useState<ReceptionistType[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingReceptionist, setEditingReceptionist] = useState<ReceptionistType | null>(null);
  const [deletingReceptionist, setDeletingReceptionist] = useState<ReceptionistType | null>(null);

  useEffect(() => {
    async function fetchReceptionists() {
      try {
        const res = await fetch(`${BASE_URL}/users`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        if (Array.isArray(data)) {
          setReceptionists(
            data
              .filter((u: any) => u.role === "receptionist")
              .map((u: any) => ({
                id: u.id,
                name: u.fullName || "",
                email: u.email || "",
                phone: u.phoneNumber || "",
                hospital: u.hospital || "",
                status: u.isActive ? "Active" : "Inactive",
              }))
          );
        }
      } catch {
        setReceptionists([]);
      }
    }
    fetchReceptionists();
  }, []);

  const handleSaveReceptionist = (formData: ReceptionistType) => {
    if (editingReceptionist) {
      setReceptionists(receptionists.map((r) => (r.id === editingReceptionist.id ? { ...formData, id: r.id } : r)));
      setEditingReceptionist(null);
    } else {
      setReceptionists([...receptionists, { ...formData, id: Date.now(), status: "Active" }]);
    }
    setIsAddModalOpen(false);
  };

  const handleDeleteReceptionist = async () => {
    if (!deletingReceptionist) return;
    try {
      await fetch(`${BASE_URL}/users/${deletingReceptionist.id}`, {
        method: "DELETE",
      });
    } catch (err) {
      // Optionally handle error
    }
    setReceptionists(receptionists.filter((r) => r.id !== deletingReceptionist.id));
    setIsDeleteModalOpen(false);
    setDeletingReceptionist(null);
  };

  const handleEditClick = (receptionist: ReceptionistType) => {
    setEditingReceptionist(receptionist);
    setIsAddModalOpen(true);
  };

  const handleDeleteClick = (receptionist: ReceptionistType) => {
    setDeletingReceptionist(receptionist);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setEditingReceptionist(null)
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Receptionists</h1>
            {/* <button
              onClick={() => {
                setEditingReceptionist(null)
                setIsAddModalOpen(true)
              }}
              style={{ backgroundColor: "#62e18b" }}
              className="px-6 py-3 rounded-lg text-black font-semibold hover:opacity-90 transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Receptionist
            </button> */}
          </div>
          <p className="text-gray-600">Manage receptionist accounts and information</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Receptionists</p>
                <p className="text-3xl font-bold text-gray-900">{receptionists.length}</p>
              </div>
              <UserCog style={{ color: "#62e18b" }} className="w-10 h-10" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active</p>
                <p className="text-3xl font-bold text-gray-900">
                  {receptionists.filter((r) => r.status === "Active").length}
                </p>
              </div>
              <div style={{ backgroundColor: "#62e18b" }} className="w-10 h-10 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Receptionists Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Hospital</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {receptionists.map((receptionist) => (
                <tr key={receptionist.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <UserCog style={{ color: "#62e18b" }} className="w-5 h-5" />
                      <span className="font-semibold text-gray-900">{receptionist.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{receptionist.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" style={{ color: "#62e18b" }} />
                      {receptionist.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{receptionist.hospital}</td>
                  <td className="px-6 py-4">
                    <span
                      style={{ backgroundColor: "#62e18b" }}
                      className="px-3 py-1 rounded-full text-sm font-semibold text-black"
                    >
                      {receptionist.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {/* <button
                        onClick={() => handleEditClick(receptionist)}
                        className="p-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button> */}
                      <button
                        onClick={() => handleDeleteClick(receptionist)}
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
      <ReceptionistModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        receptionist={editingReceptionist}
        onSave={handleSaveReceptionist}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteReceptionist}
        receptionistName={deletingReceptionist?.name}
      />
    </div>
  )
}
