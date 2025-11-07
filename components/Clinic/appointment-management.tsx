"use client"

import { useMemo, useState } from "react"
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

export const appointmentsData = [
  {
    id: 1,
    patientName: "John Anderson",
    phoneNumber: "+1-800-111-2222",
    email: "john.anderson@email.com",
    paymentMethod: "cash",
    amount: "150",
    notes: "Regular checkup",
    appointmentDate: "2025-11-10",
    appointmentTime: "10:00 AM",
    appointmentFor: "myself",
    doctorId: 1,
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    hospitalName: "City Medical Center",
    status: "Confirmed",
  },
  {
    id: 2,
    patientName: "Emily Roberts",
    phoneNumber: "+1-800-222-3333",
    email: "emily.roberts@email.com",
    paymentMethod: "card",
    amount: "200",
    notes: "Follow-up consultation",
    appointmentDate: "2025-11-08",
    appointmentTime: "2:00 PM",
    appointmentFor: "myself",
    doctorId: 2,
    doctorName: "Dr. Michael Chen",
    specialty: "Neurology",
    hospitalName: "Green Valley Hospital",
    status: "Confirmed",
  },
  {
    id: 3,
    patientName: "Michael Smith",
    phoneNumber: "+1-800-333-4444",
    email: "michael.smith@email.com",
    paymentMethod: "cash",
    amount: "100",
    notes: "Initial consultation",
    appointmentDate: "2025-11-08",
    appointmentTime: "9:00 AM",
    appointmentFor: "myself",
    doctorId: 3,
    doctorName: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    hospitalName: "Sunset Health Clinic",
    status: "Pending",
  },
  {
    id: 4,
    patientName: "Sarah Williams",
    phoneNumber: "+1-800-444-5555",
    email: "sarah.williams@email.com",
    paymentMethod: "card",
    amount: "175",
    notes: "Physical therapy session",
    appointmentDate: "2025-11-15",
    appointmentTime: "3:30 PM",
    appointmentFor: "myself",
    doctorId: 4,
    doctorName: "Dr. James Wilson",
    specialty: "Orthopedics",
    hospitalName: "Downtown Care Hospital",
    status: "Confirmed",
  },
  {
    id: 5,
    patientName: "David Brown",
    phoneNumber: "+1-800-555-6666",
    email: "david.brown@email.com",
    paymentMethod: "cash",
    amount: "120",
    notes: "Skin treatment",
    appointmentDate: "2025-11-20",
    appointmentTime: "11:00 AM",
    appointmentFor: "myself",
    doctorId: 5,
    doctorName: "Dr. Lisa Anderson",
    specialty: "Dermatology",
    hospitalName: "North Star Medical",
    status: "Confirmed",
  },
  {
    id: 6,
    patientName: "Olivia Taylor",
    phoneNumber: "+1-800-777-8888",
    email: "olivia.taylor@email.com",
    paymentMethod: "card",
    amount: "180",
    notes: "Heart follow-up",
    appointmentDate: "2025-11-08",
    appointmentTime: "4:00 PM",
    appointmentFor: "myself",
    doctorId: 1,
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    hospitalName: "City Medical Center",
    status: "Pending",
  },
  {
    id: 7,
    patientName: "Daniel Clark",
    phoneNumber: "+1-800-999-0000",
    email: "daniel.clark@email.com",
    paymentMethod: "cash",
    amount: "220",
    notes: "Neurological evaluation",
    appointmentDate: "2025-11-02",
    appointmentTime: "1:00 PM",
    appointmentFor: "myself",
    doctorId: 2,
    doctorName: "Dr. Michael Chen",
    specialty: "Neurology",
    hospitalName: "Green Valley Hospital",
    status: "Confirmed",
  },
  {
    id: 8,
    patientName: "Sophia Lee",
    phoneNumber: "+1-800-101-2020",
    email: "sophia.lee@email.com",
    paymentMethod: "card",
    amount: "90",
    notes: "Child vaccination",
    appointmentDate: "2025-11-09",
    appointmentTime: "11:30 AM",
    appointmentFor: "child",
    doctorId: 3,
    doctorName: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    hospitalName: "Sunset Health Clinic",
    status: "Confirmed",
  },
  {
    id: 9,
    patientName: "Liam Martinez",
    phoneNumber: "+1-800-303-4040",
    email: "liam.martinez@email.com",
    paymentMethod: "cash",
    amount: "160",
    notes: "Joint pain treatment",
    appointmentDate: "2025-11-08",
    appointmentTime: "10:45 AM",
    appointmentFor: "myself",
    doctorId: 4,
    doctorName: "Dr. James Wilson",
    specialty: "Orthopedics",
    hospitalName: "Downtown Care Hospital",
    status: "Confirmed",
  },
  {
    id: 10,
    patientName: "Ava White",
    phoneNumber: "+1-800-505-6060",
    email: "ava.white@email.com",
    paymentMethod: "card",
    amount: "130",
    notes: "Facial treatment",
    appointmentDate: "2025-11-08",
    appointmentTime: "1:00 PM",
    appointmentFor: "myself",
    doctorId: 5,
    doctorName: "Dr. Lisa Anderson",
    specialty: "Dermatology",
    hospitalName: "North Star Medical",
    status: "Pending",
  },
  {
    id: 11,
    patientName: "James Turner",
    phoneNumber: "+1-800-707-8080",
    email: "james.turner@email.com",
    paymentMethod: "cash",
    amount: "250",
    notes: "Cardiac stress test",
    appointmentDate: "2025-11-18",
    appointmentTime: "9:30 AM",
    appointmentFor: "myself",
    doctorId: 1,
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    hospitalName: "City Medical Center",
    status: "Confirmed",
  },
  {
    id: 12,
    patientName: "Grace Hill",
    phoneNumber: "+1-800-808-9090",
    email: "grace.hill@email.com",
    paymentMethod: "card",
    amount: "190",
    notes: "Migraine follow-up",
    appointmentDate: "2025-11-19",
    appointmentTime: "2:45 PM",
    appointmentFor: "myself",
    doctorId: 2,
    doctorName: "Dr. Michael Chen",
    specialty: "Neurology",
    hospitalName: "Green Valley Hospital",
    status: "Pending",
  },
  {
    id: 13,
    patientName: "Ella Scott",
    phoneNumber: "+1-800-111-5555",
    email: "ella.scott@email.com",
    paymentMethod: "cash",
    amount: "110",
    notes: "Child fever consultation",
    appointmentDate: "2025-11-13",
    appointmentTime: "3:15 PM",
    appointmentFor: "child",
    doctorId: 3,
    doctorName: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    hospitalName: "Sunset Health Clinic",
    status: "Confirmed",
  },
  {
    id: 14,
    patientName: "William Young",
    phoneNumber: "+1-800-121-2121",
    email: "william.young@email.com",
    paymentMethod: "card",
    amount: "230",
    notes: "Bone fracture follow-up",
    appointmentDate: "2025-11-11",
    appointmentTime: "5:00 PM",
    appointmentFor: "myself",
    doctorId: 4,
    doctorName: "Dr. James Wilson",
    specialty: "Orthopedics",
    hospitalName: "Downtown Care Hospital",
    status: "Confirmed",
  },
  {
    id: 15,
    patientName: "Charlotte Hall",
    phoneNumber: "+1-800-131-3131",
    email: "charlotte.hall@email.com",
    paymentMethod: "cash",
    amount: "100",
    notes: "Allergy consultation",
    appointmentDate: "2025-11-09",
    appointmentTime: "9:00 AM",
    appointmentFor: "myself",
    doctorId: 5,
    doctorName: "Dr. Lisa Anderson",
    specialty: "Dermatology",
    hospitalName: "North Star Medical",
    status: "Confirmed",
  },
  {
    id: 16,
    patientName: "Henry Adams",
    phoneNumber: "+1-800-141-4141",
    email: "henry.adams@email.com",
    paymentMethod: "cash",
    amount: "150",
    notes: "Heart pressure monitoring",
    appointmentDate: "2025-11-21",
    appointmentTime: "2:30 PM",
    appointmentFor: "myself",
    doctorId: 1,
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    hospitalName: "City Medical Center",
    status: "Pending",
  },
  {
    id: 17,
    patientName: "Amelia Parker",
    phoneNumber: "+1-800-151-5151",
    email: "amelia.parker@email.com",
    paymentMethod: "card",
    amount: "210",
    notes: "Brain scan review",
    appointmentDate: "2025-10-28",
    appointmentTime: "4:15 PM",
    appointmentFor: "myself",
    doctorId: 2,
    doctorName: "Dr. Michael Chen",
    specialty: "Neurology",
    hospitalName: "Green Valley Hospital",
    status: "Confirmed",
  },
  {
    id: 18,
    patientName: "Benjamin Evans",
    phoneNumber: "+1-800-161-6161",
    email: "benjamin.evans@email.com",
    paymentMethod: "cash",
    amount: "140",
    notes: "Child nutrition consultation",
    appointmentDate: "2025-11-07",
    appointmentTime: "11:00 AM",
    appointmentFor: "child",
    doctorId: 3,
    doctorName: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    hospitalName: "Sunset Health Clinic",
    status: "Confirmed",
  },
  {
    id: 19,
    patientName: "Isabella Wright",
    phoneNumber: "+1-800-171-7171",
    email: "isabella.wright@email.com",
    paymentMethod: "card",
    amount: "185",
    notes: "Knee replacement follow-up",
    appointmentDate: "2025-11-22",
    appointmentTime: "12:00 PM",
    appointmentFor: "myself",
    doctorId: 4,
    doctorName: "Dr. James Wilson",
    specialty: "Orthopedics",
    hospitalName: "Downtown Care Hospital",
    status: "Pending",
  },
  {
    id: 20,
    patientName: "Lucas Green",
    phoneNumber: "+1-800-181-8181",
    email: "lucas.green@email.com",
    paymentMethod: "cash",
    amount: "95",
    notes: "Skin rash treatment",
    appointmentDate: "2025-11-03",
    appointmentTime: "10:30 AM",
    appointmentFor: "myself",
    doctorId: 5,
    doctorName: "Dr. Lisa Anderson",
    specialty: "Dermatology",
    hospitalName: "North Star Medical",
    status: "Confirmed",
  },
];


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
                  <p className="font-semibold text-gray-900">{appointment.patientName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone style={{ color: "#62e18b" }} className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{appointment.phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail style={{ color: "#62e18b" }} className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{appointment.email}</p>
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
                <p className="font-semibold text-gray-900">{appointment.doctorName}</p>
                <p className="text-sm text-gray-600">{appointment.specialty}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin style={{ color: "#62e18b" }} className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-600">Hospital</p>
                  <p className="font-semibold text-gray-900">{appointment.hospitalName}</p>
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
                  <p className="font-semibold text-gray-900">{appointment.appointmentDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock style={{ color: "#62e18b" }} className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-600">Time</p>
                  <p className="font-semibold text-gray-900">{appointment.appointmentTime}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Payment Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600">Payment Method</p>
                <p className="font-semibold text-gray-900 capitalize">{appointment.paymentMethod}</p>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign style={{ color: "#62e18b" }} className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-600">Amount</p>
                  <p className="font-semibold text-gray-900">${appointment.amount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {appointment.notes && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Notes</h3>
            <p className="text-gray-700">{appointment.notes}</p>
          </div>
        )}

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Close
          </button>
          <button
            style={{ backgroundColor: "#62e18b" }}
            className="flex-1 px-4 py-2 text-black rounded-lg font-semibold hover:opacity-90 transition"
          >
            Confirm Appointment
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancel Appointment</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to cancel this appointment? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Keep
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
  const [appointments, setAppointments] = useState<AppointmentType[]>(appointmentsData);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentType | null>(null);
  const [deletingAppointmentId, setDeletingAppointmentId] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly" | "total">("daily");

  // 🔹 Handlers
  const handleViewDetails = (appointment: AppointmentType) => {
    setSelectedAppointment(appointment);
    setIsDetailModalOpen(true);
  };

  const handleDeleteClick = (appointmentId: number) => {
    setDeletingAppointmentId(appointmentId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setAppointments(appointments.filter((a) => a.id !== deletingAppointmentId));
    setIsDeleteModalOpen(false);
    setDeletingAppointmentId(null);
  };

  const handleAddAppointment = (formData: AppointmentType) => {
    setAppointments([...appointments, formData]);
  };

  // 🔹 Helper to filter appointments by timeframe
  function filterAppointmentsByTimeframe(appointments: AppointmentType[], timeframe: string) {
    const now = new Date();

    return appointments.filter((a) => {
      const appointmentDate = new Date(a.appointmentDate);

      switch (timeframe) {
        case "daily":
          return appointmentDate.toDateString() === now.toDateString();

        case "weekly": {
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay()); // Sunday
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 7);
          return appointmentDate >= weekStart && appointmentDate < weekEnd;
        }

        case "monthly":
          return (
            appointmentDate.getMonth() === now.getMonth() &&
            appointmentDate.getFullYear() === now.getFullYear()
          );

        case "total":
        default:
          return true;
      }
    });
  }

  // 🔹 Group Appointments by Doctor
  const groupedByDoctor = useMemo(() => {
    const filtered = appointments.filter((a) =>
      a.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filtered.reduce((acc: any, curr) => {
      if (!acc[curr.doctorName]) acc[curr.doctorName] = [];
      acc[curr.doctorName].push(curr);
      return acc;
    }, {});
  }, [appointments, searchQuery]);

  const doctorNames = Object.keys(groupedByDoctor);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Doctor-wise Appointments</h1>
            <button
              style={{ backgroundColor: "#62e18b" }}
              className="px-6 py-3 rounded-lg text-black font-semibold hover:opacity-90 transition flex items-center gap-2"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="w-5 h-5" />
              Add Appointment
            </button>
          </div>
          <p className="text-gray-600">View and manage appointments by doctor</p>
        </div>

        {/* 🔍 Search Doctor */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctor by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62e18b] outline-none"
            />
          </div>

          {/* Timeframe Filter */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            {["daily", "weekly", "monthly", "total"].map((option) => (
              <button
                key={option}
                onClick={() => setTimeframe(option as any)}
                className={`px-4 py-2 rounded-md font-medium capitalize transition ${
                  timeframe === option
                    ? "bg-[#62e18b] text-black"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSearchQuery("")}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Reset
          </button>
        </div>

        {/* 🧾 Doctor-wise Tables */}
        {doctorNames.length > 0 ? (
          doctorNames.map((doctorName) => {
            const doctorAppointments = groupedByDoctor[doctorName];
            const filteredAppointments = filterAppointmentsByTimeframe(doctorAppointments, timeframe);

            const confirmedCount = filteredAppointments.filter((a) => a.status === "Confirmed").length;
            const pendingCount = filteredAppointments.filter((a) => a.status === "Pending").length;
          const totalRevenue = filteredAppointments
  .filter((a) => a.status === "Confirmed")
  .reduce((sum, a) => sum + parseFloat(a.amount), 0);

            return (
              <div key={doctorName} className="mb-10 border border-gray-200 rounded-lg shadow-sm">
                {/* Doctor Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{doctorName}</h2>
                    <p className="text-gray-600 text-sm">
                      {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} — 
                      Appointments: {filteredAppointments.length} | Confirmed: {confirmedCount} | 
                      Pending: {pendingCount} | Revenue: ${totalRevenue.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Appointments Table */}
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Patient</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => (
                        <tr
                          key={appointment.id}
                          className="border-b border-gray-200 hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4 flex items-center gap-3">
                            <User style={{ color: "#62e18b" }} className="w-5 h-5" />
                            <span className="font-semibold text-gray-900">{appointment.patientName}</span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            <div className="font-semibold">{appointment.appointmentDate}</div>
                            <div className="text-sm">{appointment.appointmentTime}</div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900">${appointment.amount}</td>
                          <td className="px-6 py-4">
                            <span
                              style={{
                                backgroundColor:
                                  appointment.status === "Confirmed" ? "#62e18b" : "#fcd34d",
                              }}
                              className="px-3 py-1 rounded-full text-sm font-semibold text-black"
                            >
                              {appointment.status}
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
                        <td colSpan={5} className="text-center py-4 text-gray-500">
                          No {timeframe} appointments.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-500">No appointments found.</div>
        )}
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