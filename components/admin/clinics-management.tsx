"use client"

import { useState, useEffect } from "react"
import { Users, Trash2, Plus, X } from "lucide-react"
import toast from "react-hot-toast"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

type Clinic = {
  id: number
  name: string
  email: string
  phone: string
  address: string
  status: string
}

type ClinicFormData = Omit<Clinic, 'id' | 'status'> & { password: string }

function ClinicModal({ 
  isOpen, 
  onClose, 
  onSuccess 
}: { 
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void 
}) {
  const [formData, setFormData] = useState<ClinicFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: ""
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const response = await fetch(`${BASE_URL}clinic`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, isDoctorClinic: false })
      })
      
      if (response.status === 400) {
        toast.error("Clinic already exists")
      } else if (response.ok) {
        toast.success("Clinic created successfully")
        setFormData({ name: "", email: "", phone: "", address: "", password: "" })
        onSuccess()
        onClose()
      } else {
        toast.error("Failed to create clinic")
      }
    } catch {
      toast.error("Failed to create clinic")
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (field: keyof ClinicFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Clinic</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {[
            { label: "Clinic Name", field: "name" as const, type: "text" },
            { label: "Clinic Address", field: "address" as const, type: "text" },
            { label: "Clinic Email", field: "email" as const, type: "email" },
            { label: "Clinic Phone", field: "phone" as const, type: "tel" },
            { label: "Clinic Password", field: "password" as const, type: "password" }
          ].map(({ label, field, type }) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {label}
              </label>
              <input
                type={type}
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
                disabled={submitting}
              />
            </div>
          ))}

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-[#62e18b] text-black rounded-lg font-semibold hover:opacity-90"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DeleteModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  clinicName 
}: { 
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  clinicName: string 
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Delete Clinic</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{clinicName}</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export function ClinicsManagement() {
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [loading, setLoading] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingClinic, setDeletingClinic] = useState<Clinic | null>(null)

  const fetchClinics = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}clinic`, { cache: "no-store" })
      const data = await res.json()
      
      setClinics(
        Array.isArray(data)
          ? data.map((c: any) => ({
              id: c.id,
              name: c.name || "",
              email: c.email || "",
              phone: c.phone || "",
              address: c.address || "",
              status: c.isActive ? "Active" : "Inactive"
            }))
          : []
      )
    } catch {
      setClinics([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClinics()
  }, [])

  const handleDelete = async () => {
    if (!deletingClinic) return
    
    try {
      await fetch(`${BASE_URL}clinic/${deletingClinic.id}`, { method: "DELETE" })
      setClinics(prev => prev.filter(c => c.id !== deletingClinic.id))
    } catch {
      toast.error("Failed to delete clinic")
    }
    
    setIsDeleteModalOpen(false)
    setDeletingClinic(null)
  }

  const activeCount = clinics.filter(c => c.status === "Active").length

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#62e18b]" />
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Clinics</h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3 rounded-lg bg-[#62e18b] text-black font-semibold hover:opacity-90 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Clinic
            </button>
          </div>
          <p className="text-gray-600">Manage clinic accounts and information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Clinics</p>
                <p className="text-3xl font-bold text-gray-900">{clinics.length}</p>
              </div>
              <Users className="w-10 h-10 text-[#62e18b]" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active</p>
                <p className="text-3xl font-bold text-gray-900">{activeCount}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#62e18b]" />
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Address</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clinics.map((clinic) => (
                <tr key={clinic.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{clinic.name}</td>
                  <td className="px-6 py-4 text-gray-900">{clinic.address}</td>
                  <td className="px-6 py-4 text-gray-900">{clinic.phone}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setDeletingClinic(clinic)
                        setIsDeleteModalOpen(true)
                      }}
                      className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ClinicModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchClinics}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        clinicName={deletingClinic?.name || ""}
      />
    </div>
  )
}