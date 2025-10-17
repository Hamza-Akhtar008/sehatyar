"use client";

import { useAuth } from "@/src/contexts/AuthContext";

export default function PatientDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{user?.fullName}</p>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
            <button 
              onClick={logout}
              className="px-4 py-2 bg-red-100 text-red-600 font-medium rounded-md hover:bg-red-200 transition"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            <p className="text-gray-500">No upcoming appointments.</p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Medical Records</h2>
            <p className="text-gray-500">No medical records found.</p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Prescriptions</h2>
            <p className="text-gray-500">No prescriptions available.</p>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-white rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Find a Doctor</h2>
          <p className="mb-4">Looking for medical assistance? Find a specialist.</p>
          <button 
            className="px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition"
          >
            Search Doctors
          </button>
        </div>
      </div>
    </div>
  );
}