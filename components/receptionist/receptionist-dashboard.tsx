"use client"

import { useEffect, useState } from "react"
import { Calendar, Users, DollarSign, Plus, X, Eye, Trash2, User, ChevronRight, Phone, MapPin, Stethoscope, ChevronLeft, Mail, Clock } from "lucide-react"
import { CreateAppointmentRep, FetchDoctorbyClinic, FetchUserbyClinic } from "@/lib/Api/Clinic/clinic_api";
import { UserRole } from "@/src/types/enums";
import { getAvailability, type Slot as AvailabilitySlot } from "@/lib/Api/availability";
import { toast } from "react-toastify";


// Types for modals
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Patient {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
}

type DoctorType = {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  hospital: string;
  experience: string;
  status: string;
  profilePic?: string; // added profilePic for rendering
FeesPerConsultation:number
};
interface AppointmentProps {
  isOpen: boolean;
  onClose: () => void;
  ExistingPateint:Patient[]
  Doctors :DoctorType[]
}
interface DetailModalProps extends ModalProps {
  title: string;
  data: Record<string, any> | null;  // Make data nullable
}

interface DeleteConfirmModalProps extends ModalProps {
  onConfirm: () => void;
  title: string;
}


interface DoctorsCarouselProps {
  doctorsData: DoctorType[];
 
}
interface TimeSlot {
  time: string
  available: boolean
  slotId?: number
}

interface HospitalAvailability {
  hospitalName: string
  slots: TimeSlot[]
}

interface DayAvailability {
  date: string
  dayName: string
  hospitals: HospitalAvailability[]
}

export default function DoctorsCarousel({ doctorsData }: DoctorsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;

  const prevDoctor = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, doctorsData.length - visibleCount) : prev - 1
    );
  };

  const nextDoctor = () => {
    setCurrentIndex((prev) =>
      prev + visibleCount >= doctorsData.length ? 0 : prev + 1
    );
  };

  if (doctorsData.length === 0) return <p className="text-center text-gray-500">No doctors available</p>;

 const visibleCountAdjusted = Math.min(visibleCount, doctorsData.length);
const visibleDoctors = doctorsData.slice(currentIndex, currentIndex + visibleCountAdjusted);


  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="relative w-full max-w-6xl flex items-center">
        <button
          onClick={prevDoctor}
          className="absolute left-0 z-10 bg-white shadow-md hover:shadow-lg transition rounded-full p-3 -translate-x-2/4 -translate-y-1/2 top-1/2 flex items-center justify-center text-gray-700 hover:text-green-600"
        >
          {"<"}
        </button>

        <div className="flex gap-6 overflow-hidden w-full">
          {visibleDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex-1 bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-green-100 flex items-center justify-center">
                  {doctor.profilePic ? (
                    <img
                      src={doctor.profilePic}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-green-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{doctor.name}</h3>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Experience:</span> {doctor.experience}</p>
              <p className="text-sm text-gray-600 mb-4"><span className="font-medium">Phone:</span> {doctor.phone}</p>
              <button className="mt-auto w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
                View Profile
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={nextDoctor}
          className="absolute right-0 z-10 bg-white shadow-md hover:shadow-lg transition rounded-full p-3 translate-x-2/4 -translate-y-1/2 top-1/2 flex items-center justify-center text-gray-700 hover:text-green-600"
        >
          {">"}
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Showing {currentIndex + 1} to {Math.min(currentIndex + visibleCount, doctorsData.length)} of {doctorsData.length}
      </p>
    </div>
  );
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
export function AddAppointmentModal({
  isOpen,
  onClose,
  ExistingPateint,
  Doctors,
}: AppointmentProps) {
  const [searchTermPatient, setSearchTermPatient] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTermDoctor, setSearchTermDoctor] = useState("");
  const [notes, setnotes] = useState("");

  const [FeesPerConsultation,setFeesPerConsultation]=useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorType | null>(null);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [daySchedules, setDaySchedules] = useState<DayAvailability[]>([]);
  const [activeDay, setActiveDay] = useState(0);
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ time: string; slotId: number } | null>(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedDoctor?.id) {
      setAvailability([]);
      return;
    }

    let mounted = true;
    const fetchAvailability = async () => {
      setLoadingAvailability(true);
      setAvailabilityError(null);
      try {
        const res = await getAvailability(selectedDoctor.id);
        if (!mounted) return;
        setAvailability(Array.isArray(res) ? res : []);
      } catch (err: any) {
        if (!mounted) return;
        console.error("Failed to fetch availability", err);
        setAvailabilityError("Failed to load availability");
        setAvailability([]);
      } finally {
        if (!mounted) return;
        setLoadingAvailability(false);
      }
    };

    fetchAvailability();
    return () => {
      mounted = false;
    };
  }, [selectedDoctor?.id]);

  const generateTimeSlots = (start: string, end: string, intervalMinutes = 30): string[] => {
    const normalize = (t: string) => (t.length === 5 ? `${t}:00` : t);
    const s = normalize(start || "00:00:00");
    const e = normalize(end || "00:00:00");
    const current = new Date(`1970-01-01T${s}`);
    const endTime = new Date(`1970-01-01T${e}`);
    const slots: string[] = [];

    if (endTime <= current) return slots;

    const copy = new Date(current);
    while (copy <= endTime) {
      const hh = copy.getHours().toString().padStart(2, "0");
      const mm = copy.getMinutes().toString().padStart(2, "0");
      slots.push(`${hh}:${mm}`);
      copy.setMinutes(copy.getMinutes() + intervalMinutes);
    }

    return slots.filter(Boolean);
  };

  useEffect(() => {
    if (!availability || availability.length === 0) {
      setDaySchedules([]);
      return;
    }

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const schedules: DayAvailability[] = [];
    const availabilityByDay = availability.reduce((acc: Record<string, AvailabilitySlot[]>, slot) => {
      const day = slot.dayOfWeek || "";
      if (!acc[day]) acc[day] = [];
      acc[day].push(slot);
      return acc;
    }, {});

    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const weekdayName = daysOfWeek[d.getDay()];
      const daySlots = availabilityByDay[weekdayName] || [];
      const hospitalMap = new Map<string, TimeSlot[]>();

      daySlots.forEach((slot) => {
        const hospitalName =
          slot.availabilityType === "clinic"
            ? slot.address && slot.address.trim().length > 0
              ? slot.address
              : "Clinic"
            : "Online Consultation";

        const times = generateTimeSlots(slot.startTime || "", slot.endTime || "", 30);
        if (!hospitalMap.has(hospitalName)) hospitalMap.set(hospitalName, []);

        times.forEach((time) => {
          hospitalMap.get(hospitalName)!.push({
            time,
            available: true,
            slotId: slot.id,
          });
        });
      });

      const hospitals: HospitalAvailability[] = Array.from(hospitalMap.entries()).map(
        ([hospitalName, slots]) => ({ hospitalName, slots })
      );

      const label = i === 0 ? "Today" : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

      schedules.push({
        date: d.toISOString().split("T")[0],
        dayName: label,
        hospitals,
      });
    }

    setDaySchedules(schedules);
    setActiveDay(0);
    setSelectedHospital(null);
    setSelectedSlot(null);
  }, [availability]);

  if (!isOpen) return null;

  const filteredPatients = ExistingPateint.filter((p) =>
    p.fullName.toLowerCase().includes(searchTermPatient.toLowerCase())
  );

  const filteredDoctors = Doctors.filter((d) =>
    d.name.toLowerCase().includes(searchTermDoctor.toLowerCase())
  );

  const handleSelectPatient = (p: Patient) => {
    setSelectedPatient(p);
    setSearchTermPatient(p.fullName);
  };

  const handleSelectDoctor = (d: DoctorType) => {
    setFeesPerConsultation(d.FeesPerConsultation);
    setSelectedDoctor(d);
    setSearchTermDoctor(d.name);
    setAvailability([]);
    setDaySchedules([]);
    setActiveDay(0);
    setSelectedHospital(null);
    setSelectedSlot(null);
  };

  const activeSchedule = daySchedules[activeDay];

const submitAppointment = async () => {
  if (!selectedDoctor || !selectedPatient || !selectedSlot || !activeSchedule) return;

  const payload = {
    patientName: selectedPatient.fullName,          // from selectedPatient
    phoneNumber: selectedPatient.phoneNumber,       // from selectedPatient
    email: selectedPatient.email,                   // from selectedPatient

    paymentMethod: "online",                        // static for now
    amount: FeesPerConsultation,                                      // static for now
    notes: notes || "",                             // if you have notes field

    appointmentDate: new Date(activeSchedule.date).toISOString(),  
    appointmentTime: selectedSlot.time,             // example: "09:30"

    appointmentFor: "myself",                       // static for now

    doctorId: selectedDoctor.id,
    userId: selectedPatient.id,                     // the user making appointment

    appointmentType: "clinic",                      // from your availabilityType
  };

  try {
    console.log("Final Payload:", payload);

    const response  = await CreateAppointmentRep(payload);


    toast.success("Appointment Created Succesfully");
    onClose();

    // 👉 send to API
    // await createAppointment(payload)

  } catch (err) {
    console.error("Failed to create appointment", err);
  }
};


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Schedule Appointment</h2>
            <p className="text-sm text-gray-500 mt-1">Book a new appointment with a healthcare provider</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Search */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Patient</label>
                <div className="relative">
                  <input
                    type="text"
                    aria-label="Patient name"
                    placeholder="Search by name..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
                    value={searchTermPatient}
                    onChange={(e) => {
                      setSearchTermPatient(e.target.value);
                      setSelectedPatient(null);
                    }}
                  />
                  {searchTermPatient && !selectedPatient && filteredPatients.length > 0 && (
                    <ul className="absolute z-30 top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-md">
                      {filteredPatients.map((p) => (
                        <li
                          key={p.id}
                          className="px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                          onClick={() => handleSelectPatient(p)}
                        >
                          <div className="font-medium text-gray-900">{p.fullName}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{p.phoneNumber || p.email}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {selectedPatient && (
                  <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-200">
                    <div className="text-xs text-gray-600">
                      <span className="text-gray-500 block">Phone</span>
                      <span className="font-medium text-gray-900">{selectedPatient.phoneNumber || '—'}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      <span className="text-gray-500 block">Email</span>
                      <span className="font-medium text-gray-900">{selectedPatient.email || '—'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Doctor Search */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Doctor</label>
                <div className="relative">
                  <input
                    type="text"
                    aria-label="Doctor name"
                    placeholder="Search by name or specialty..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
                    value={searchTermDoctor}
                    onChange={(e) => {
                      setSearchTermDoctor(e.target.value);
                      setSelectedDoctor(null);
                    }}
                  />
                  {searchTermDoctor && !selectedDoctor && filteredDoctors.length > 0 && (
                    <ul className="absolute z-30 top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-md">
                      {filteredDoctors.map((d) => (
                        <li
                          key={d.id}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                          onClick={() => handleSelectDoctor(d)}
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold text-sm">
                            {d.name[0]?.toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{d.name}</div>
                            <div className="text-xs text-gray-500">{d.specialty || 'General'}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Select Date & Time</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {loadingAvailability ? "Loading..." : availabilityError ? availabilityError : `${daySchedules.length} days available`}
                  </p>
                </div>
              </div>

              {/* Day selector skeleton */}
              {loadingAvailability ? (
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 w-20 rounded-lg bg-gray-200 animate-pulse" />
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6">
                    {daySchedules.map((day, idx) => (
                      <button
                        type="button"
                        aria-pressed={idx === activeDay}
                        key={day.date}
                        onClick={() => {
                          setActiveDay(idx);
                          setSelectedHospital(null);
                          setSelectedSlot(null);
                        }}
                        className={`min-w-[100px] px-4 py-3 rounded-lg border transition-all flex flex-col items-center text-center ${
                          idx === activeDay
                            ? "bg-gradient-to-b from-green-600 to-green-700 text-white border-green-700 shadow-md"
                            : "bg-white border-gray-300 hover:border-gray-400 text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        <div className="text-sm font-semibold">{day.dayName}</div>
                        <div className="text-xs opacity-75 mt-1">{day.date}</div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3">
                    {(!activeSchedule || activeSchedule.hospitals.length === 0) && (
                      <div className="text-center py-12 text-gray-500">
                        <p className="text-sm">No available slots for this date</p>
                      </div>
                    )}

                    {activeSchedule?.hospitals?.map((hospital) => (
                      <div
                        key={hospital.hospitalName}
                        className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900">{hospital.hospitalName}</h4>
                            <p className="text-xs text-gray-500 mt-1">{hospital.slots.length} time slots available</p>
                          </div>
                          <button
                            type="button"
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              selectedHospital === hospital.hospitalName
                                ? "bg-green-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                            onClick={() => {
                              setSelectedHospital(hospital.hospitalName);
                              setSelectedSlot(null);
                            }}
                          >
                            {selectedHospital === hospital.hospitalName ? "✓ Selected" : "Select"}
                          </button>
                        </div>

                        {selectedHospital === hospital.hospitalName && (
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 pt-3 border-t border-gray-200">
                            {hospital.slots.map((slot) => {
                              const isSelected =
                                selectedSlot?.slotId === slot.slotId && selectedSlot?.time === slot.time;
                              return (
                                <button
                                  key={`${slot.slotId}-${slot.time}`}
                                  type="button"
                                  onClick={() => setSelectedSlot({ time: slot.time, slotId: slot.slotId || 0 })}
                                  className={`py-2 px-2 rounded-lg text-sm font-medium border transition-all ${
                                    isSelected
                                      ? "bg-green-600 text-white border-green-700 shadow-md"
                                      : "bg-white border-gray-200 text-gray-900 hover:bg-green-50 hover:border-green-300"
                                  }`}
                                >
                                  {slot.time}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>




 <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Fees Per Consultation</label>
              <input
              value={FeesPerConsultation||0}
              onChange={(e)=>setFeesPerConsultation(parseInt( e.target.value))}
              type="number"
                className="w-full  border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400"
                placeholder="Fees Per Consultation"
              />
            </div>


 

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Notes</label>
              <textarea
              value={notes}
              onChange={(e)=>setnotes(e.target.value)}
                className="w-full min-h-[80px] border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400"
                placeholder="Write Your Issuse Here"
              />
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitAppointment}
                disabled={!selectedSlot || !selectedPatient || !selectedDoctor}
                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-all"
              >
                {selectedSlot && selectedPatient && selectedDoctor ? "Book Appointment" : "Select required fields"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
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
function AppointmentDetailModal({ isOpen, onClose, appointment }: { isOpen: boolean; onClose: () => void; appointment: any }) {
  if (!isOpen || !appointment) return null;

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
  );
}

export function ReceptionistDashboard() {
  const [activeTab, setActiveTab] = useState("appointments")
  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
  const [deleteTitle, setDeleteTitle] = useState<string>("")
   const [doctors, setDoctors] = useState<DoctorType[]>([]);
    const [loading, setLoading] = useState<boolean>(false); 

  const [ExistingPatient,setExistingPatient]=useState<Patient[]>([]);
const fetchExistingPatient=async()=>
{
  const response = await FetchUserbyClinic(UserRole.PATIENT);
  setExistingPatient(response);
}


 useEffect(() => {
    async function fetchDoctors() {
      setLoading(true);
      try {
        const res = await FetchDoctorbyClinic();
     
          setDoctors(
            res.map((doc: any) => ({

              FeesPerConsultation:doc.FeesPerConsultation,
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
        
      } catch {
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

 useEffect(()=>
{
  fetchExistingPatient();

},[])

  const handleViewDetails = (appointment: any, type: string) => {
    setSelectedAppointment(appointment);
    setIsDetailModalOpen(true);
  };

  const handleDeleteClick = (title: string) => {
    setDeleteTitle(title);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false)
  }

  const [appointments, setAppointments] = useState<any[]>([]);
  useEffect(() => {
    async function fetchAppointments() {
      const token = localStorage.getItem("authToken");
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}appointments/by/clinic`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data = await res.json();
        setAppointments(Array.isArray(data) ? data : []);
      } catch {
        setAppointments([]);
      }
    }
    fetchAppointments();
  }, []);

  const confirmCount = appointments.filter((a) => a.status === "Confirmed").length
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
                <p className="text-3xl font-bold text-gray-900">{doctors.length}</p>
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
                  {appointments.map((appointment) => (
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
                              appointment.status === "Confirmed"
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
        
<DoctorsCarousel doctorsData={doctors} />
        
        )}


      </div>

      {/* Modals */}
      <AddAppointmentModal isOpen={isAddAppointmentModalOpen} onClose={() => setIsAddAppointmentModalOpen(false)} ExistingPateint={ExistingPatient}Doctors ={doctors}/>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={deleteTitle}
      />

      <AppointmentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        appointment={selectedAppointment}
      />
    </div>
  )
}
