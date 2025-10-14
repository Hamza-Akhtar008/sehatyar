'use client';
import React from 'react';

interface AppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-[#0000004D] bg-opacity-50 flex items-center justify-center z-50 rounded-[22px]">
            <div className="bg-white rounded-lg p-6 w-[450px] max-w-[90%]">
                <h2 className="text-xl font-semibold mb-4">Schedule New Appointment</h2>
                
                <div className="mb-4">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="w-full p-2 border border-gray-300 rounded-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">+ Add new user</p>
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                        type="email" 
                        className="w-full p-2 border border-gray-300 rounded-full" 
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                        type="tel" 
                        className="w-full p-2 border border-gray-300 rounded-full" 
                    />
                </div>
                
                <div className="flex justify-end gap-4 mt-6">
                    <button 
                        className="px-4 py-2 border border-gray-300 rounded-full text-gray-700"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className="px-4 py-2 bg-[#5FE089] text-white rounded-full"
                    >
                        Schedule
                    </button>
                </div>
            </div>
        </div>
    );
}