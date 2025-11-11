"use client"

import { useState, useEffect } from "react"
import { Users, Mail, Phone, Edit2, Trash2, Plus, X } from "lucide-react"
import Image from "next/image"
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserRole } from "@/src/types/enums";

// --- Types ---
type PatientType = {
  id: number;
  name: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  status: string;
};

type ClinicType = {
  id: number;
  name: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  status: string;
};

interface ClinicModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinic: ClinicType | null;
  onSave: (formData: ClinicType) => void;
}

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  patientName?: string;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL


function ClinicModal({ isOpen, onClose, clinic, onSave }: ClinicModalProps) {
  const [formData, setFormData] = useState<ClinicType & {
    fullName?: string;
    country?: string;
    city?: string;
    phoneNumber?: string;
    password?: string;
    role?: string;
  }>(
    clinic || {
      id: 0,
      name: "",
      gender: "",
      email: "",
      phone: "",
      address: "",
      status: "Active",
      fullName: "",
      country: "",
      city: "",
      phoneNumber: "",
      password: "",
      role: "clinic", // default role
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const postData = {
        fullName: formData.name,
        country: formData.country,
        city: formData.city,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        role: "clinic" 
      };

      const response = await axios.post(`${BASE_URL}users`, postData);
      
      if (response.data) {
        toast.success("Clinic created successfully");
        // Clear form only after successful API call
        setFormData({
          id: 0,
          name: "",
          gender: "",
          email: "",
          phone: "",
          address: "",
          status: "Active",
          fullName: "",
          country: "",
          city: "",
          phoneNumber: "",
          password: "",
          role: "clinic",
        });
        onSave(formData);
        onClose();
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        toast.error("Clinic already exists");
        return;
      }
      console.error("Error creating user:", error);
      toast.error("Failed to create clinic. Please try again.");
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4"
        style={{
          width: "600px",
          maxHeight: "90vh",
          overflowY: "auto"
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{clinic ? "Edit Clinic" : "Add New Clinic"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div className="flex gap-3">
            {/* <div className="flex-1">
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
            </div> */}
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
            <label className="block text-sm font-semibold text-gray-900 mb-2">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Country</label>
            <input
              type="text"
              value={formData.country || ""}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">City</label>
            <input
              type="text"
              value={formData.city || ""}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
            <input
              type="text"
              value={formData.phoneNumber || ""}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
            <input
              type="password"
              value={formData.password || ""}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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

export function HospitalsManagement() {
  const [clinics, setClinics] = useState<ClinicType[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingClinic, setEditingClinic] = useState<ClinicType | null>(null);
  const [deletingClinic, setDeletingClinic] = useState<ClinicType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);

  useEffect(() => {
    async function fetchClinics() {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}users?role=${UserRole.CLINIC}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        if (Array.isArray(data)) {
          setClinics(
            data.map((u: any) => ({
              id: u.id,
              name: u.fullName || "",
              gender: u.gender?.toLowerCase() || "",
              email: u.email || "",
              phone: u.phoneNumber || "",
              address: `${u.city || ""}${u.country ? ", " + u.country : ""}`,
              status: u.isActive ? "Active" : "Inactive",
              profilePic: u.profilePic || "",
            }))
          );
          setMaleCount(data.filter((u: any) => u.gender?.toLowerCase() === "male").length);
          setFemaleCount(data.filter((u: any) => u.gender?.toLowerCase() === "female").length);
        }
      } catch {
        setClinics([]);
        setMaleCount(0);
        setFemaleCount(0);
      } finally {
        setLoading(false);
      }
    }
    fetchClinics();
  }, []);

  const handleSaveClinic = (formData: ClinicType) => {
    if (editingClinic) {
      setClinics(clinics.map((p) => (p.id === editingClinic .id ? { ...formData, id: p.id } : p)));
      setEditingClinic(null);
    } else {
      setClinics([...clinics, { ...formData, id: Date.now(), status: "Active" }]);
    }
    setIsAddModalOpen(false);
  };

  const handleDeleteClinic = async () => {
    if (!deletingClinic) return;
    try {
      await fetch(`${BASE_URL}users/${deletingClinic.id}`, {
        method: "DELETE",
      });
      setClinics(clinics.filter((c) => c.id !== deletingClinic.id));
    } catch (err) {
      // Optionally handle error
    }
    setIsDeleteModalOpen(false);
    setDeletingClinic(null);
  };

  const handleEditClick = (clinic: ClinicType) => {
    setEditingClinic(clinic);
    setIsAddModalOpen(true);
  };

  const handleDeleteClick = (clinic: ClinicType) => {
    setDeletingClinic(clinic);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setEditingClinic(null)
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Loader */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: "#62e18b" }}></div>
          </div>
        )}
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Clinics</h1>
            <button
              onClick={() => {
                setEditingClinic(null)
                setIsAddModalOpen(true)
              }}
              style={{ backgroundColor: "#62e18b" }}
              className="px-6 py-3 rounded-lg text-black font-semibold hover:opacity-90 transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Clinic
            </button>
          </div>
          <p className="text-gray-600">Manage clinic  accounts and information</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Clinics</p>
                <p className="text-3xl font-bold text-gray-900">{clinics.length}</p>
              </div>
              <Users style={{ color: "#62e18b" }} className="w-10 h-10" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active</p>
                <p className="text-3xl font-bold text-gray-900">
                  {clinics.filter((c) => c.status === "Active").length}
                </p>
              </div>
              <div style={{ backgroundColor: "#62e18b" }} className="w-10 h-10 rounded-full"></div>
            </div>
          </div>
          
        </div>

        {/* Patients Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {/* Removed Profile and Age columns */}
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Address</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clinics.map((clinic) => (
                <tr key={clinic.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  {/* Removed Profile and Age columns */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Users style={{ color: "#62e18b" }} className="w-5 h-5" />
                      <span className="font-semibold text-gray-900">{clinic.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{clinic.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" style={{ color: "#62e18b" }} />
                      {clinic.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{clinic.address}</td>
                  <td className="px-6 py-4">
                    <span
                      style={{ backgroundColor: "#62e18b" }}
                      className="px-3 py-1 rounded-full text-sm font-semibold text-black"
                    >
                      {clinic.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {/* <button
                        onClick={() => handleEditClick(patient)}
                        className="p-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button> */}
                      <button
                        onClick={() => handleDeleteClick(clinic)}
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
      <ClinicModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        clinic={editingClinic}
        onSave={handleSaveClinic}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteClinic}
        patientName={deletingClinic?.name}
      />
    </div>
  )
}
