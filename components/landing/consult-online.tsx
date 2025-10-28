import React, { useState } from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const doctorSpecialties = [
  { id: 1, name: 'Dermatologist', icon: '/assets/specialityIcons/Dermatologist.png', isOnline: true },
  { id: 2, name: 'Gynecologist', icon: '/assets/specialityIcons/Gynecologist.png', isOnline: true },
  { id: 3, name: 'Gastroenterologist', icon: '/assets/specialityIcons/Cardiologist.png', isOnline: true },
  { id: 4, name: 'Urologist', icon: '/assets/specialityIcons/Urologist.png', isOnline: true },
  { id: 5, name: 'Dentist', icon: '/assets/specialityIcons/Dentist.png', isOnline: true },
  { id: 6, name: 'Obesity Specialist', icon: '/assets/specialityIcons/ObesitySpecialist.png', isOnline: true },
  { id: 7, name: 'ENT Specialist', icon: '/assets/specialityIcons/ENTSpecialist.png', isOnline: true },
  { id: 8, name: 'Orthopedic Surgeon', icon: '/assets/specialityIcons/OrthopedicSurgeon.png', isOnline: true },
  { id: 9, name: 'Sexologist', icon: '/assets/specialityIcons/Sexologist.png', isOnline: true },
  { id: 10, name: 'Neurologist', icon: '/assets/specialityIcons/Neurologist.png', isOnline: true },
  { id: 11, name: 'Child Specialist', icon: '/assets/specialityIcons/ChildSpecialist.png', isOnline: true },
  { id: 12, name: 'Pulmonologist', icon: '/assets/specialityIcons/Pulmonologist.png', isOnline: true },
  { id: 13, name: 'Eye Specialist', icon: '/assets/specialityIcons/EyeSpecialist.png', isOnline: true },
  { id: 14, name: 'Medical Specialist', icon: '/assets/specialityIcons/MedicalSpecialist.png', isOnline: true },
];

// Doctor card component
const DoctorCard = ({ name, isOnline, icon }: {
  name: string;
  isOnline: boolean;
  icon: string;
}) => {
  return (
    <div className="group flex items-center py-4 px-6.5 transition-all rounded-4xl border-[1px] border-[#A6A6A6] gap-2.5 hover:bg-[#F4F4F4] hover:border-none">
      <div className='bg-[#003F31] group-hover:bg-[#5FE089] p-3 rounded-full'>
        <Image src={icon} alt={name} width={20} height={20} className=''/>
      </div>
      <div className='flex flex-col gap-1'>
      <h3 className="text-base font-medium text-gray-900 mb-0">{name}</h3>
      <button className='text-start'>
        <span className={cn(
        "px-3 py-0.5 text-xs font-medium rounded-full",
        isOnline ? "bg-green-100 group-hover:bg-[#5FE089] text-green-800" : "bg-gray-100 text-gray-800"
      )}>
        {isOnline ? 'Online' : 'Offline'}
      </span>
        </button>
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
            icon={doctor.icon}
          />
        ))}
      </div>
    </div>
  )
}
