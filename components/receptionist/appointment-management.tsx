"use client"

import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { Calendar, Clock, User, Phone, Mail, MapPin, DollarSign, Trash2, Plus, X, Eye, Search } from "lucide-react"

// --- Types ---
type AppointmentType = {
  id: number;
  patientName: string;
  phoneNumber: string;
  email: string;
  paymentMethod: string;
  amount: string;
  notes: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentFor: string;
  doctorId: number;
  doctorName: string;
  specialty: string;
  hospitalName: string;
  status: string;
};

interface AppointmentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppointmentType | null;
}

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  appointmentId?: number | null;
}

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (formData: AppointmentType) => void;
}


function AppointmentDetailModal({ isOpen, onClose, appointment }: AppointmentDetailModalProps) {
  if (!isOpen || !appointment) return null

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Patient Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Patient Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User style={{ color: "#62e18b" }} className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-600">Name</p>
                  <p className="font-semibold text-gray-900">{appointment.patientName || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone style={{ color: "#62e18b" }} className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{appointment.phoneNumber || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail style={{ color: "#62e18b" }} className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{appointment.email || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Doctor & Hospital Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Doctor Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600">Doctor</p>
                <p className="font-semibold text-gray-900">{appointment.doctorName || "N/A"}</p>
                <p className="text-sm text-gray-600">{appointment.specialty || "N/A"}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin style={{ color: "#62e18b" }} className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-600">Hospital</p>
                  <p className="font-semibold text-gray-900">{appointment.hospitalName || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Appointment Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar style={{ color: "#62e18b" }} className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-600">Date</p>
                  <p className="font-semibold text-gray-900">{appointment.appointmentDate || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock style={{ color: "#62e18b" }} className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-600">Time</p>
                  <p className="font-semibold text-gray-900">{appointment.appointmentTime || "N/A"}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600">Appointment For</p>
                <p className="font-semibold text-gray-900">{appointment.appointmentFor || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Payment Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600">Payment Method</p>
                <p className="font-semibold text-gray-900 capitalize">{appointment.paymentMethod || "N/A"}</p>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign style={{ color: "#62e18b" }} className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-600">Amount</p>
                  <p className="font-semibold text-gray-900">${appointment.amount || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Notes</h3>
          <p className="text-gray-700">{appointment.notes || "N/A"}</p>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

function DeleteConfirmModal({ isOpen, onClose, onConfirm, appointmentId }: DeleteConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Delete Appointment</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this appointment? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Delete
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// --- Add Appointment Modal ---
function AddAppointmentModal({ isOpen, onClose, onAdd }: AddAppointmentModalProps) {
  const [formData, setFormData] = useState<AppointmentType>({
    id: 0,
    patientName: "",
    phoneNumber: "",
    email: "",
    paymentMethod: "",
    amount: "",
    notes: "",
    appointmentDate: "",
    appointmentTime: "",
    appointmentFor: "",
    doctorId: 0,
    doctorName: "",
    specialty: "",
    hospitalName: "",
    status: "Pending",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({ ...formData, id: Date.now() });
    onClose();
    setFormData({
      id: 0,
      patientName: "",
      phoneNumber: "",
      email: "",
      paymentMethod: "",
      amount: "",
      notes: "",
      appointmentDate: "",
      appointmentTime: "",
      appointmentFor: "",
      doctorId: 0,
      doctorName: "",
      specialty: "",
      hospitalName: "",
      status: "Pending",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-xl p-8 mx-4"
        style={{
          width: "620px",
          height: "640px",
          maxWidth: "95vw",
          maxHeight: "95vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add Appointment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          style={{
            flex: 1,
            overflowY: "auto",
            minHeight: 0,
          }}
        >
          <input
            type="text"
            placeholder="Patient Name"
            value={formData.patientName}
            onChange={e => setFormData({ ...formData, patientName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Doctor Name"
            value={formData.doctorName}
            onChange={e => setFormData({ ...formData, doctorName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Specialty"
            value={formData.specialty}
            onChange={e => setFormData({ ...formData, specialty: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Hospital Name"
            value={formData.hospitalName}
            onChange={e => setFormData({ ...formData, hospitalName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="date"
            placeholder="Appointment Date"
            value={formData.appointmentDate}
            onChange={e => setFormData({ ...formData, appointmentDate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="time"
            placeholder="Appointment Time"
            value={formData.appointmentTime}
            onChange={e => setFormData({ ...formData, appointmentTime: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Payment Method"
            value={formData.paymentMethod}
            onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={e => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            placeholder="Notes"
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export function AppointmentsManagement() {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentType | null>(null);
  const [deletingAppointmentId, setDeletingAppointmentId] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔍 Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  // 🔹 Handlers
  const handleViewDetails = (appointment: AppointmentType) => {
    setSelectedAppointment(appointment);
    setIsDetailModalOpen(true);
  };

  const handleDeleteClick = (appointmentId: number) => {
    setDeletingAppointmentId(appointmentId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingAppointmentId) return;
    setLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}appointments/${deletingAppointmentId}`,
        { method: "DELETE" }
      );
      setAppointments(appointments.filter((a) => a.id !== deletingAppointmentId));
      toast.success("Appointment deleted");
    } catch {
      toast.error("Failed to delete appointment");
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setDeletingAppointmentId(null);
    }
  };

  const handleAddAppointment = (formData: AppointmentType) => {
    setAppointments([...appointments, formData]);
  };

  // 🔹 Filter logic
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesName = appointment.patientName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || appointment.status === statusFilter;
    const matchesDate =
      !dateFilter || appointment.appointmentDate === dateFilter;

    return matchesName && matchesStatus && matchesDate;
  });

  const confirmedCount = appointments.filter((a) => a.status === "Confirmed").length;
  const pendingCount = appointments.filter((a) => a.status === "Pending").length;
  const totalRevenue = appointments.reduce((sum, a) => sum + Number.parseFloat(a.amount), 0);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}appointments`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data = await res.json();
        if (Array.isArray(data)) {
          setAppointments(
            data.map((item: any) => ({
              id: item.id,
              patientName: item.patientName || "",
              phoneNumber: item.phoneNumber || "",
              email: item.email || "",
              paymentMethod: item.paymentMethod || "",
              amount: item.amount ? String(item.amount) : "",
              notes: item.notes || "",
              appointmentDate: item.appointmentDate
                ? (typeof item.appointmentDate === "string" && item.appointmentDate.includes("T")
                    ? item.appointmentDate.split("T")[0]
                    : item.appointmentDate)
                : "",
              appointmentTime: item.appointmentTime || "",
              appointmentFor: item.appointmentFor || "",
              doctorId: item.doctorId || 0,
              doctorName: item.doctorName || "",
              specialty: item.specialty || "",
              hospitalName: item.hospitalName || "",
              status: item.status
                ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                : "",
              // Add all fields you want to show in the table here
              updatedAt: item.updatedAt || "",
            }))
          );
        }
      } catch {
        setAppointments([]);
      }
    }
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Loader */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: "#62e08b" }}></div>
          </div>
        )}
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Appointments</h1>
            {/* <button
              style={{ backgroundColor: "#62e18b" }}
              className="px-6 py-3 rounded-lg text-black font-semibold hover:opacity-90 transition flex items-center gap-2"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="w-5 h-5" />
              Add Appointment
            </button> */}
          </div>
          <p className="text-gray-600">
            Manage all patient appointments and schedules
          </p>
        </div>

     

        {/* 🔍 Filter Section */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          {/* Search */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by patient name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62e18b] outline-none"
            />
          </div>

          {/* Date */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full md:w-1/4 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#62e18b] outline-none"
          />

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-1/4 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#62e18b] outline-none"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("All");
              setDateFilter("");
            }}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Reset
          </button>
        </div>

        {/* 🧾 Appointments Table */}
        <div className="border border-gray-200 rounded-lg overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Patient Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Payment Method</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Notes</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{appointment.patientName || "N/A"}</td>
                    <td className="px-6 py-4">{appointment.phoneNumber || "N/A"}</td>
                    <td className="px-6 py-4">{appointment.email || "N/A"}</td>
                    <td className="px-6 py-4">{appointment.paymentMethod || "N/A"}</td>
                    <td className="px-6 py-4">{appointment.amount || "N/A"}</td>
                    <td className="px-6 py-4">{appointment.notes || "N/A"}</td>
                    <td className="px-6 py-4">{appointment.appointmentDate || "N/A"}</td>
                    <td className="px-6 py-4">{appointment.appointmentTime || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span
                        style={{
                          backgroundColor:
                            appointment.status === "Completed"
                              ? "#62e18b"
                              : appointment.status === "Pending"
                              ? "#fcd34d"
                              : appointment.status === "Cancelled"
                              ? "#ef4444"
                              : "#f3f4f6",
                        }}
                        className="px-3 py-1 rounded-full text-sm font-semibold text-black"
                      >
                        {appointment.status || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(appointment)}
                          className="p-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(appointment.id)}
                          className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                          title="Cancel"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-gray-500">
                    No appointments found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AppointmentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        appointment={selectedAppointment}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        appointmentId={deletingAppointmentId}
      />

      <AddAppointmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddAppointment}
      />
    </div>
  );
}

