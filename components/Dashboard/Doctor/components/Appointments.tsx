'use client';
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import AppointmentModal from "./modals/AppointmentModal";
import { useRouter } from "next/navigation";
import { getAppointmentsForLoggedInDoctor } from "@/lib/Api/appointment";


export default function Appointment() {
    const [showFilter, setShowFilter] = useState(false);
    const [showAppointmentModal, setShowAppointmentModal] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    const [appointments, setAppointments] = useState<any[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAppointments() {
            setLoading(true);
            setError(null);
            try {
                const data = await getAppointmentsForLoggedInDoctor();
                setAppointments(data);
            } catch (err: any) {
                setError(err?.message || "Failed to fetch appointments");
            } finally {
                setLoading(false);
            }
        }
        fetchAppointments();
    }, []);

    const filterOptions = ['All Appointments', 'Today', 'Confirmed', 'Pending'];

    // Close filter when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setShowFilter(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    // Handler for navigating to patient details page
    const handleShowPatientDetails = (appointment: any) => {
        try {
            const patientId = appointment.userId || appointment.patient?.id || appointment.id;
            if (patientId) {
                router.push(`/doctor-dashboard/patients/${patientId}`);
            } else {
                console.error("No patient ID found in appointment:", appointment);
            }
        } catch (err) {
            console.error("Error navigating to patient details:", err);
        }
    };


    return (
        <div className="appointment-container">
            <div className="appointment-header">
                <h2 className="appointment-title">Appointments</h2>
                <div className="appointment-actions">
                                        <div className="relative" ref={filterRef}>
                        <button 
                            style={{ marginRight: '8px' }}
                            className="filter-button"
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            <Image
                                src="/assets/filter.svg"
                                alt="Filter Icon"
                                width={16}
                                height={16}
                            />
                            <span className="flex items-center gap-1">
                                Filters
                                <span className={`filter-arrow ${showFilter ? 'open' : ''}`}>^</span>
                            </span>
                        </button>
                        
                        {showFilter && (
                            <div className="filter-dropdown">
                                {filterOptions.map((option) => (
                                    <button
                                        key={option}
                                        className="filter-option"
                                        onClick={() => {
                                            console.log(`Filter selected: ${option}`);
                                            setShowFilter(false);
                                        }}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <button className="new-appointment-button" onClick={() => setShowAppointmentModal(true)}>
                        + New Appointments
                    </button>
                </div>
            </div>

            <div className="appointment-list">
                {loading ? (
                    <div>Loading appointments...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : appointments.length === 0 ? (
                    <div>No appointments found.</div>
                ) : (
                    appointments.map((appointment, index) => (
                        <div key={index} className="appointment-card">
                            <div className="appointment-info">
                                <div className="appointment-avatar">
                                    <Image
                                        src="/assets/doctors.svg"
                                        alt={appointment.patientName || "Patient"}
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className="appointment-details">
                                    <p
                                        className="appointment-name cursor-pointer text-blue-600 hover:underline"
                                        onClick={() => handleShowPatientDetails(appointment)}
                                    >
                                        {appointment.patientName}
                                    </p>
                                    <p className="appointment-type">{appointment.type || appointment.appointmentFor}</p>
                                    <p className="appointment-phone">{appointment.phoneNumber}</p>
                                </div>
                            </div>

                            <div className="appointment-time">
                                <div className="time-details">
                                    <p className="time-day">{appointment.appointmentDate || ""}</p>
                                    <p className="time-slot">{appointment.appointmentTime || ""}</p>
                                </div>
                                <span className="status-badge">
                                    {appointment.status || "Confirmed"}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

          
            
            {/* Use the separated AppointmentModal component */}
            <AppointmentModal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} />

            {/* Patient Details now navigates to a separate page */}
        </div>
    );
}
