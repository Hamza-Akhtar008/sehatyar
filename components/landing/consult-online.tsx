import React, { useState } from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// Mock data for doctors specialties
const doctorSpecialties = [
  {
    id: 1,
    name: 'Gynecologist',
    isOnline: true,
    iconColor: '#005641' // Dark green
  },
  {
    id: 2,
    name: 'Gynecologist',
    isOnline: true,
    iconColor: '#005641'
  },
  {
    id: 3,
    name: 'Gynecologist',
    isOnline: true,
    iconColor: '#005641'
  },
  {
    id: 4,
    name: 'Gynecologist',
    isOnline: true,
    iconColor: '#005641'
  },
  {
    id: 5,
    name: 'Gynecologist',
    isOnline: true,
    iconColor: '#005641'
  },
  {
    id: 6,
    name: 'Gynecologist',
    isOnline: true,
    iconColor: '#005641'
  },

 
];

// Doctor card component
const DoctorCard = ({ name, isOnline, iconColor }: {
  name: string;
  isOnline: boolean;
  iconColor: string;
}) => {
  return (
    <div className="flex items-center py-4 px-6.5 hover:shadow-md transition-all rounded-4xl border-[1px] border-[#A6A6A6] gap-2">
      <div 
        className="w-10.5 h-10.5 rounded-full flex items-center justify-center flex-3"        
        style={{ backgroundColor: iconColor }}
      >
        {/* SVG Icon for doctor - simple person icon matching the design */}
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path 
            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className='flex flex-col gap-1'>
      <h3 className="text-base font-medium text-gray-900 mb-0">{name}</h3>
      <span className={cn(
        "px-3 py-0.5 text-xs font-medium rounded-full",
        isOnline ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
      )}>
        {isOnline ? 'Online' : 'Offline'}
      </span>
      </div>
    </div>
  );
};

export default function ConsultOnline() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter doctors based on search query
  const filteredDoctors = doctorSpecialties.filter(doctor => 
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="w-full mx-auto">
      {/* <h2 className="text-2xl font-bold mb-6 text-center">Consult Online With Our Specialists</h2> */}
      
      {/* Search Input */}
      <div className="flex items-center text-[16px] bg-[#F4F4F4] text-[#616161] rounded-full px-5 py-4 mb-6  mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#616161]">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <Input
          type="text"
          placeholder="Search for specialization"
          className="hero-input border-none shadow-none bg-transparent focus:ring-0 h-full w-full placeholder:text-[#616161] placeholder:text-sm placeholder:font-light"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Popular specialties tags */}
      {/* <div className='flex flex-wrap gap-2 mt-4 mb-8 justify-center'>
        {['All', 'Gynecologist', 'Dentist', 'Cardiologist', 'Neurologist'].map((specialty, index) => (
          <button 
            key={index}
            className='border border-[#E0E0E0] rounded-full px-4 py-2 text-[#616161] text-sm hover:bg-[#F4F4F4] transition-colors'
            onClick={() => setSearchQuery(specialty === 'All' ? '' : specialty)}
          >
            {specialty}
          </button>
        ))}
      </div> */}

      {/* Grid of doctors */}
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6'>
        {filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            name={doctor.name}
            isOnline={doctor.isOnline}
            iconColor={doctor.iconColor}
          />
        ))}
      </div>
    </div>
  )
}
