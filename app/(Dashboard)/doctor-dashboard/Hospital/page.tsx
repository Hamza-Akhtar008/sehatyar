'use client';
import { useState, useRef, useEffect } from "react";
import Image from "next/image";


import HospitalModal from "@/components/Dashboard/Doctor/components/Hospital";
import { GetHospital } from "@/lib/Api/Hospital/Api";

export default function Hospital() {
    const [showFilter, setShowFilter] = useState(false);
    const [showHospitalModal, setShowHospitalModal] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    const [hospitals, setHospitals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const filterOptions = ['All', 'Clinics', 'Hospitals'];

    useEffect(() => {
        async function fetchHospitals() {
            setLoading(true);
            setError(null);
            try {
                const data = await GetHospital();
                setHospitals(data);
            } catch (err: any) {
                setError(err?.message || "Failed to fetch hospitals");
            } finally {
                setLoading(false);
            }
        }
        fetchHospitals();
    }, []);

    // Close filter when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setShowFilter(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="appointment-container">
            <div className="appointment-header">
                <h2 className="appointment-title">Hospitals & Clinics</h2>
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

                    <button
                        className="new-appointment-button"
                        onClick={() => setShowHospitalModal(true)}
                    >
                        + Add Hospital / Clinic
                    </button>
                </div>
            </div>

            <div className="appointment-list">
                {loading ? (
                    <div>Loading hospitals...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : hospitals.length === 0 ? (
                    <div>No hospitals or clinics found.</div>
                ) : (
                    hospitals.map((hospital, index) => (
                        <div key={index} className="appointment-card">
                            <div className="appointment-info">
                                <div className="appointment-avatar">
                                    <Image
                                        src={hospital.isClinic ? "/assets/clinic.svg" : "/assets/hospital.svg"}
                                        alt={hospital.name}
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className="appointment-details">
                                    <p className="appointment-name">{hospital.name}</p>
                                    <p className="appointment-type">
                                        {hospital.isClinic ? "Clinic" : "Hospital"}
                                    </p>
                                    <p className="appointment-phone">{hospital.phone}</p>
                                </div>
                            </div>

                            <div className="appointment-time">
                                <div className="time-details">
                                    <p className="time-day">{hospital.address}</p>
                                </div>
                                <span className="status-badge bg-blue-500 text-white">
                                    Active
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <HospitalModal
                isOpen={showHospitalModal}
                onClose={() => setShowHospitalModal(false)}
                onHospitalAdded={(newHospital: any) => setHospitals([...hospitals, newHospital])}
            />
        </div>
    );
}
