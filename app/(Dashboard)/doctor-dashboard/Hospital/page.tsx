'use client';
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import HospitalModal from "@/components/Dashboard/Doctor/components/Hospital";
import { deleteHospital, GetHospital } from "@/lib/Api/Hospital/Api";
import { useAuth } from "@/src/contexts/AuthContext";

export default function Hospital() {
  const { user } = useAuth();
  const [showFilter, setShowFilter] = useState(false);
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<null | { id: string; name: string }>(null);
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
        const data = await GetHospital(user?.doctorId || "0");
        setHospitals(data);
      } catch (err: any) {
        setError(err?.message || "Failed to fetch hospitals");
      } finally {
        setLoading(false);
      }
    }
    fetchHospitals();
  }, [user?.doctorId]);

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
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-[#222]">
          Hospitals & Clinics
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
          {/* Filter */}
          <div className="relative" ref={filterRef}>
            <button
              className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-3 py-2 text-sm hover:bg-gray-50 transition"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Image src="/assets/filter.svg" alt="Filter Icon" width={16} height={16} />
              <span className="flex items-center gap-1">
                Filters
                <span className={`transition-transform ${showFilter ? "rotate-180" : ""}`}>^</span>
              </span>
            </button>

            {showFilter && (
              <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-md z-10">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
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

          {/* Add Hospital Button */}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
            onClick={() => setShowHospitalModal(true)}
          >
            + Add Hospital / Clinic
          </button>
        </div>
      </div>

      {/* Hospital List */}
      <div className="mt-4 flex-1">
        {loading ? (
          <div>Loading hospitals...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : hospitals.length === 0 ? (
          <div>No hospitals or clinics found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hospitals.map((hospital, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                {/* Left Info */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <Image
                      src={hospital.isClinic ? "/assets/clinic.svg" : "/assets/hospital.svg"}
                      alt={hospital.name}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[#222]">{hospital.name}</p>
                    <p className="text-sm text-gray-500">
                      {hospital.isClinic ? "Clinic" : "Hospital"}
                    </p>
                    <p className="text-sm text-gray-400">{hospital.phone}</p>
                  </div>
                </div>

                {/* Right Info */}
                <div className="flex flex-col sm:items-end mt-3 sm:mt-0 gap-3">
                  <p className="text-sm text-gray-500">{hospital.address}</p>
                  <div className="flex items-center gap-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
                      Active
                    </span>
                    <button
                      onClick={() => setConfirmDelete({ id: hospital.id, name: hospital.name })}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Hospital Modal */}
      <HospitalModal
        isOpen={showHospitalModal}
        onClose={() => setShowHospitalModal(false)}
        onHospitalAdded={(newHospital: any) => setHospitals([...hospitals, newHospital])}
      />

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] sm:w-[400px] shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Hospital</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete <strong>{confirmDelete.name}</strong>? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await deleteHospital(confirmDelete.id);
                    setHospitals((prev) => prev.filter((h) => h.id !== confirmDelete.id));
                    setConfirmDelete(null);
                  } catch (error: any) {
                    alert(error?.message || "Failed to delete hospital");
                  }
                }}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
