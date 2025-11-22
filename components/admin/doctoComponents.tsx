"use client"

import { useState, useEffect } from "react"
import { Stethoscope, Mail, Phone, Edit2, Trash2, Plus, X } from "lucide-react"
import Image from "next/image"
import { UserRole } from "@/src/types/enums";

type DoctorType = {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  hospital: string;
  experience: string;
  status: string;
  profilePic?: string; 
};

interface DoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: DoctorType | null;
  onSave: (formData: DoctorType) => void;
}

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  doctorName?: string;
}

const doctorsData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    email: "sarah.johnson@hospital.com",
    phone: "+1-800-123-4567",
    hospital: "City Medical Center",
    experience: "12 years",
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    email: "michael.chen@hospital.com",
    phone: "+1-800-234-5678",
    hospital: "Green Valley Hospital",
    experience: "8 years",
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    email: "emily.rodriguez@hospital.com",
    phone: "+1-800-345-6789",
    hospital: "Sunset Health Clinic",
    experience: "10 years",
    status: "Active",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    email: "james.wilson@hospital.com",
    phone: "+1-800-456-7890",
    hospital: "Downtown Care Hospital",
    experience: "15 years",
    status: "Active",
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    specialty: "Dermatology",
    email: "lisa.anderson@hospital.com",
    phone: "+1-800-567-8901",
    hospital: "North Star Medical",
    experience: "9 years",
    status: "Active",
  },
]

function DoctorModal({ isOpen, onClose, doctor, onSave }: DoctorModalProps) {
  const [formData, setFormData] = useState<DoctorType>(
    doctor || {
      id: 0,
      name: "",
      specialty: "",
      email: "",
      phone: "",
      hospital: "",
      experience: "",
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
          <h2 className="text-2xl font-bold text-gray-900">{doctor ? "Edit Doctor" : "Add New Doctor"}</h2>
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
            <label className="block text-sm font-semibold text-gray-900 mb-2">Specialty</label>
            <input
              type="text"
              value={formData.specialty}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, specialty: e.target.value })}
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

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Experience</label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, experience: e.target.value })}
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

function DeleteConfirmModal({ isOpen, onClose, onConfirm, doctorName }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Delete Doctor</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{doctorName ?? ""}</strong>? This action cannot be undone.
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

const BASE_URL =

  process.env.NEXT_PUBLIC_BASE_URL 
  

export function DoctorsManagement() {
  const [doctors, setDoctors] = useState<DoctorType[]>(doctorsData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<DoctorType | null>(null);
  const [deletingDoctor, setDeletingDoctor] = useState<DoctorType | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // loader state

  useEffect(() => {
    async function fetchDoctors() {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}doctor-profile?role=${UserRole.DOCTOR}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch doctors");
        const data = await res.json();
        if (Array.isArray(data)) {
          setDoctors(
            data.map((doc: any) => ({
              id: doc.id,
              name: doc.user?.fullName || "",
              specialty: Array.isArray(doc.primarySpecialization)
                ? doc.primarySpecialization.join(", ")
                : "",
              email: doc.user?.email || "",
              phone: doc.user?.phoneNumber || "",
              hospital: doc.hospitals?.[0]?.name || "",
              experience: doc.yearsOfExperience ? `${doc.yearsOfExperience} years` : "",
              status: doc.isActive ? "Active" : "Inactive",
              profilePic: doc.profilePic || "",
            }))
          );
        }
      } catch {
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  const handleSaveDoctor = (formData: DoctorType) => {
    if (editingDoctor) {
      setDoctors(doctors.map((d) => (d.id === editingDoctor.id ? { ...formData, id: d.id } : d)));
      setEditingDoctor(null);
    } else {
      setDoctors([...doctors, { ...formData, id: Date.now(), status: "Active" }]);
    }
    setIsAddModalOpen(false);
  };

  const handleDeleteDoctor = async () => {
    if (!deletingDoctor) return;
    try {
      await fetch(`${BASE_URL}doctor-profile/${deletingDoctor.id}`, {
        method: "DELETE",
      });
    } catch (err) {
      // Optionally handle error
    }
    setDoctors(doctors.filter((d) => d.id !== deletingDoctor.id));
    setIsDeleteModalOpen(false);
    setDeletingDoctor(null);
  };

  const handleEditClick = (doctor: DoctorType) => {
    setEditingDoctor(doctor);
    setIsAddModalOpen(true);
  };

  const handleDeleteClick = (doctor: DoctorType) => {
    setDeletingDoctor(doctor);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setEditingDoctor(null)
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
            <h1 className="text-4xl font-bold text-gray-900">Doctors</h1>
            {/* <button
              onClick={() => {
                setEditingDoctor(null)
                setIsAddModalOpen(true)
              }}
              style={{ backgroundColor: "#62e18b" }}
              className="px-6 py-3 rounded-lg text-black font-semibold hover:opacity-90 transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Doctor
            </button> */}
          </div>
          <p className="text-gray-600">Manage doctor accounts and information</p>
        </div>

        {/* Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Doctors</p>
                <p className="text-3xl font-bold text-gray-900">{doctors.length}</p>
              </div>
              <Stethoscope style={{ color: "#62e18b" }} className="w-10 h-10" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active</p>
                <p className="text-3xl font-bold text-gray-900">
                  {doctors.filter((d) => d.status === "Active").length}
                </p>
              </div>
              <div style={{ backgroundColor: "#62e18b" }} className="w-10 h-10 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Specialties</p>
                <p className="text-3xl font-bold text-gray-900">{new Set(doctors.map((d) => d.specialty)).size}</p>
              </div>
              <Stethoscope style={{ color: "#62e18b" }} className="w-10 h-10" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Experience</p>
                <p className="text-3xl font-bold text-gray-900">10.8 yrs</p>
              </div>
              <Stethoscope style={{ color: "#62e18b" }} className="w-10 h-10" />
            </div>
          </div>
        </div> */}

        {/* Doctors Table */}
        {!loading && (
          <div className="border border-gray-200 rounded-lg overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Profile</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Specialization</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Experience</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    {/* Profile Pic column */}
                    <td className="px-6 py-4">
                      {doctor.profilePic ? (
                        <Image
                          src={doctor.profilePic}
                          alt={doctor.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                          {doctor.name ? doctor.name.charAt(0) : "?"}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Stethoscope style={{ color: "#62e18b" }} className="w-5 h-5" />
                        <span className="font-semibold text-gray-900">{doctor.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{doctor.specialty}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" style={{ color: "#62e18b" }} />
                        {doctor.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" style={{ color: "#62e18b" }} />
                        {doctor.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{doctor.experience}</td>
                    <td className="px-6 py-4">
                      <span
                        style={{ backgroundColor: "#62e18b" }}
                        className="px-3 py-1 rounded-full text-sm font-semibold text-black"
                      >
                        {doctor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {/* <button
                          onClick={() => handleEditClick(doctor)}
                          className="p-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button> */}
                        <button
                          onClick={async () => {
                            setDeletingDoctor(doctor);
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>{/* <button
                          onClick={() => handleEditClick(doctor)}
                          className="p-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button> */}
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <DoctorModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        doctor={editingDoctor}
        onSave={handleSaveDoctor}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteDoctor}
        doctorName={deletingDoctor?.name}
      />
    </div>
  )
}
