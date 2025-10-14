'use client';
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import AppointmentModal from "./modals/AppointmentModal";

export default function Appointment() {
    const [showFilter, setShowFilter] = useState(false);
    const [showAppointmentModal, setShowAppointmentModal] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    
    const appointments = [
        {
            name: "Sarah Johnson",
            type: "Routine Checkup",
            phone: "+1 (055) 123–4567",
            time: "2:30 PM – 3:00 PM",
            status: "Confirmed",
        },
        {
            name: "Sarah Johnson",
            type: "Routine Checkup",
            phone: "+1 (055) 123–4567",
            time: "2:30 PM – 3:00 PM",
            status: "Confirmed",
        },
        {
            name: "Sarah Johnson",
            type: "Routine Checkup",
            phone: "+1 (055) 123–4567",
            time: "2:30 PM – 3:00 PM",
            status: "Confirmed",
        },
    ];



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
                {appointments.map((appointment, index) => (
                    <div key={index} className="appointment-card">
                        <div className="appointment-info">
                            <div className="appointment-avatar">
                                <Image
                                    src="/assets/doctors.svg"
                                    alt={appointment.name}
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className="appointment-details">
                                <p className="appointment-name">{appointment.name}</p>
                                <p className="appointment-type">{appointment.type}</p>
                                <p className="appointment-phone">{appointment.phone}</p>
                            </div>
                        </div>

                        <div className="appointment-time">
                            <div className="time-details">
                                <p className="time-day">Today</p>
                                <p className="time-slot">{appointment.time}</p>
                            </div>
                            <span className="status-badge">
                                {appointment.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

          
            
            {/* Use the separated AppointmentModal component */}
            <AppointmentModal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} />
        </div>
    );
}
            