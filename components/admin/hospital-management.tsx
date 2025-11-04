"use client"

import { Building2, MapPin, Phone, Users, Bed } from "lucide-react"
import { Button } from "@/components/ui/button"

const hospitalsData = [
  {
    id: 1,
    name: "City Medical Center",
    location: "123 Main Street, New York",
    phone: "+1-800-123-4567",
    beds: 450,
    doctors: 85,
    status: "Active",
  },
  {
    id: 2,
    name: "Green Valley Hospital",
    location: "456 Oak Avenue, Los Angeles",
    phone: "+1-800-234-5678",
    beds: 320,
    doctors: 62,
    status: "Active",
  },
  {
    id: 3,
    name: "Sunset Health Clinic",
    location: "789 Beach Road, Miami",
    phone: "+1-800-345-6789",
    beds: 280,
    doctors: 48,
    status: "Active",
  },
  {
    id: 4,
    name: "Downtown Care Hospital",
    location: "321 Park Lane, Chicago",
    phone: "+1-800-456-7890",
    beds: 520,
    doctors: 110,
    status: "Active",
  },
  {
    id: 5,
    name: "North Star Medical",
    location: "654 Summit Drive, Boston",
    phone: "+1-800-567-8901",
    beds: 380,
    doctors: 75,
    status: "Active",
  },
]

export function HospitalsManagement() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Hospitals</h1>
            <Button style={{ backgroundColor: "#62e18b" }} className="text-black hover:opacity-90">
              + Add Hospital
            </Button>
          </div>
          <p className="text-gray-600">Manage hospital data and information</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Hospitals</p>
                <p className="text-3xl font-bold text-gray-900">5</p>
              </div>
              <Building2 style={{ color: "#62e18b" }} className="w-10 h-10" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Beds</p>
                <p className="text-3xl font-bold text-gray-900">1,950</p>
              </div>
              <Bed style={{ color: "#62e18b" }} className="w-10 h-10" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Doctors</p>
                <p className="text-3xl font-bold text-gray-900">380</p>
              </div>
              <Users style={{ color: "#62e18b" }} className="w-10 h-10" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active</p>
                <p className="text-3xl font-bold text-gray-900">5</p>
              </div>
              <div style={{ backgroundColor: "#62e18b" }} className="w-10 h-10 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Hospitals List */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Hospital Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Beds</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Doctors</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hospitalsData.map((hospital) => (
                <tr key={hospital.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Building2 style={{ color: "#62e18b" }} className="w-5 h-5" />
                      <span className="font-semibold text-gray-900">{hospital.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" style={{ color: "#62e18b" }} />
                      {hospital.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" style={{ color: "#62e18b" }} />
                      {hospital.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">{hospital.beds}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">{hospital.doctors}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      style={{ backgroundColor: "#62e18b" }}
                      className="px-3 py-1 rounded-full text-sm font-semibold text-black"
                    >
                      {hospital.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                        Edit
                      </button>
                      <button className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
