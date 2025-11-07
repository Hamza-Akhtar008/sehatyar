"use client"

import { useState } from "react"
import { Calendar, Users, DollarSign, Plus, X, Eye, Trash2, User } from "lucide-react"

// Types for modals
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DetailModalProps extends ModalProps {
  title: string;
  data: Record<string, any> | null;  // Make data nullable
}

interface DeleteConfirmModalProps extends ModalProps {
  onConfirm: () => void;
  title: string;
}

// Add type for your data objects
interface AppointmentData {
  id: number;
  patientName: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  amount: string;
}

// Sample Data
const appointmentsData: AppointmentData[] = [
  {
    id: 1,
    patientName: "John Anderson",
    doctorName: "Dr. Sarah Johnson",
    appointmentDate: "2025-11-10",
    appointmentTime: "10:00 AM",
    status: "Confirmed",
    amount: "150",
  },
  {
    id: 2,
    patientName: "Emily Roberts",
    doctorName: "Dr. Michael Chen",
    appointmentDate: "2025-11-12",
    appointmentTime: "2:00 PM",
    status: "Pending",
    amount: "200",
  },
  {
    id: 3,
    patientName: "Michael Smith",
    doctorName: "Dr. Emily Rodriguez",
    appointmentDate: "2025-11-08",
    appointmentTime: "9:00 AM",
    status: "Confirmed",
    amount: "100",
  },
]

const doctorsData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: "8 years",
    phone: "+1-800-111-1111",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    experience: "10 years",
    phone: "+1-800-222-2222",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    experience: "6 years",
    phone: "+1-800-333-3333",
  },
]

const patientsData = [
  {
    id: 1,
    name: "John Anderson",
    age: "32",
    bloodGroup: "O+",
    phone: "+1-800-111-2222",
    email: "john@email.com",
  },
  {
    id: 2,
    name: "Emily Roberts",
    age: "28",
    bloodGroup: "A+",
    phone: "+1-800-222-3333",
    email: "emily@email.com",
  },
  {
    id: 3,
    name: "Michael Smith",
    age: "45",
    bloodGroup: "B+",
    phone: "+1-800-333-4444",
    email: "michael@email.com",
  },
]

const invoicesData = [
  {
    id: 1,
    invoiceNo: "INV-001",
    patientName: "John Anderson",
    amount: "150",
    status: "Paid",
    date: "2025-11-05",
  },
  {
    id: 2,
    invoiceNo: "INV-002",
    patientName: "Emily Roberts",
    amount: "200",
    status: "Pending",
    date: "2025-11-04",
  },
  {
    id: 3,
    invoiceNo: "INV-003",
    patientName: "Michael Smith",
    amount: "100",
    status: "Paid",
    date: "2025-11-03",
  },
]

// Add Appointment Modal
function AddAppointmentModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Appointment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Patient Name" className="border border-gray-300 rounded-lg p-3" />
            <input type="text" placeholder="Phone Number" className="border border-gray-300 rounded-lg p-3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="email" placeholder="Email" className="border border-gray-300 rounded-lg p-3" />
            <select className="border border-gray-300 rounded-lg p-3">
              <option>Select Doctor</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="date" className="border border-gray-300 rounded-lg p-3" />
            <input type="time" className="border border-gray-300 rounded-lg p-3" />
          </div>
          <textarea 
            placeholder="Notes" 
            className="w-full border border-gray-300 rounded-lg p-3" 
            rows={3}  // Fix the rows type error by removing quotes
          ></textarea>
          <div className="flex gap-3">
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
              Create Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Detail Modal Component
function DetailModal({ isOpen, onClose, title, data }: DetailModalProps) {
  if (!isOpen || !data) return null

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-3">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600 font-semibold capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
              <span className="text-gray-900">{String(value)}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Close
        </button>
      </div>
    </div>
  )
}

// Delete Confirm Modal
function DeleteConfirmModal({ isOpen, onClose, onConfirm, title }: DeleteConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Delete {title}</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
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

export function ReceptionistDashboard() {
  const [activeTab, setActiveTab] = useState("appointments")
  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState<Record<string, any> | null>(null);
  const [deleteTitle, setDeleteTitle] = useState<string>("")

  const handleViewDetails = (data: Record<string, any>, type: string) => {
    setSelectedData(data);
    setIsDetailModalOpen(true);
  };

  const handleDeleteClick = (title: string) => {
    setDeleteTitle(title);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false)
  }

  const confirmCount = appointmentsData.filter((a) => a.status === "Confirmed").length
  const totalRevenue = appointmentsData.reduce((sum, a) => sum + Number.parseFloat(a.amount), 0)

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Receptionist Dashboard</h1>
          <p className="text-gray-600">Manage appointments, doctors, patients, and invoices</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Today's Appointments</p>
                <p className="text-3xl font-bold text-gray-900">{appointmentsData.length}</p>
              </div>
              <Calendar style={{ color: "#62e18b" }} className="w-10 h-10" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Confirmed</p>
                <p className="text-3xl font-bold text-gray-900">{confirmCount}</p>
              </div>
              <div style={{ backgroundColor: "#62e18b" }} className="w-10 h-10 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Doctors</p>
                <p className="text-3xl font-bold text-gray-900">{doctorsData.length}</p>
              </div>
              <Users style={{ color: "#62e18b" }} className="w-10 h-10" />
            </div>
          </div>
         
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 flex flex-wrap gap-4">
          {["appointments", "doctors"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                borderBottomColor: activeTab === tab ? "#62e18b" : "transparent",
                color: activeTab === tab ? "#62e18b" : "#666",
              }}
              className="pb-4 font-semibold border-b-2 transition capitalize"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div>
            <div className="flex justify-between items-center mb-6">
            
              <button
                onClick={() => setIsAddAppointmentModalOpen(true)}
                style={{ backgroundColor: "#62e18b" }}
                className="px-4 py-2 rounded-lg text-black font-semibold hover:opacity-90 transition flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Appointment
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-900">Patient</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-900">Doctor</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentsData.map((appointment) => (
                    <tr key={appointment.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-4 md:px-6 py-4 font-semibold text-gray-900">{appointment.patientName}</td>
                      <td className="px-4 md:px-6 py-4 text-gray-600">{appointment.doctorName}</td>
                      <td className="px-4 md:px-6 py-4 text-gray-600">
                        {appointment.appointmentDate} {appointment.appointmentTime}
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span
                          style={{
                            backgroundColor: appointment.status === "Confirmed" ? "#62e18b" : "#fcd34d",
                          }}
                          className="px-3 py-1 rounded-full text-sm font-semibold text-black"
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetails(appointment, "Appointment")}
                            className="p-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick("Appointment")}
                            className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
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
        )}

        {/* Doctors Tab */}
        {activeTab === "doctors" && (
          <div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctorsData.map((doctor) => (
                <div key={doctor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      style={{ backgroundColor: "#62e18b" }}
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                    >
                      <User className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Experience: {doctor.experience}</p>
                  <p className="text-sm text-gray-600 mb-4">Phone: {doctor.phone}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(doctor, "Doctor")}
                      className="flex-1 p-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-sm font-semibold"
                    >
                      View
                    </button>
                  
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


      </div>

      {/* Modals */}
      <AddAppointmentModal isOpen={isAddAppointmentModalOpen} onClose={() => setIsAddAppointmentModalOpen(false)} />

      <DetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={deleteTitle}
        data={selectedData}  
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={deleteTitle}
      />
    </div>
  )
}
