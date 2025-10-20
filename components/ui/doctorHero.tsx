"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { Star, User } from 'lucide-react';
import Image from 'next/image';

// Doctor interface type definition matching API response
interface Doctor {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  specialization: string;
  licenseNumber: string;
  experienceYears: number;
  consultationFee: number;
  bio?: string;
  clinicAddress?: string;
  clinicName?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  phoneNumber?: string;
  profilePicture?: string;
  qualifications?: string;
  languages?: string[];
  availableForVideoConsultation: boolean;
  user :
  {
    fullName: string;
  }
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
  availableToday?: boolean;
}

// Doctor Card component
const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/doctor-profile?doctorId=${doctor.id}`);
  };

  const handleBookAppointment = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/book-appointment?doctorId=${doctor.id}`);
  };

  const handleVideoConsultation = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/book-appointment?doctorId=${doctor.id}&type=video`);
  };
  
  const fullName = doctor.user?.fullName || 'Unknown';
  const displayRating = doctor.rating || 4.5;
  const displayReviews = doctor.reviewCount || 0;
  
  return (
    <div className="bg-[#F8F8F8] rounded-4xl p-10 cursor-pointer hover:shadow-lg transition" onClick={handleClick}>
      <div className="flex flex-row items-center">
        {/* Doctor Image and Info */}
        <div className="flex flex-row gap-10 items-center">
          {/* Doctor Image */}
          <div className="w-34 h-34 rounded-full overflow-hidden  bg-yellow-500 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0 relative">
            {doctor.profilePicture ? (
              <Image 
                src={doctor.profilePicture} 
                alt={`Dr. ${fullName}`}
                fill
                sizes="(max-width: 768px) 80px, 100px"
                className="object-cover"
                priority
              />
            ) : (
              <User className="h-10 w-10 lg:h-12 lg:w-12 text-gray-400" />
            )}
          </div>
          
          {/* Doctor Info */}
          <div className="flex flex-col gap-y-1">
            <h2 className="text-3xl font-semibold text-[#414141] mb-0">{fullName}</h2>
            
            {/* Verification Badge */}
            <div className="flex items-center justify-center sm:justify-start"> 
              <span className="inline-flex items-center text-green-600 text-xs py-1 px-2.5 bg-[#E8E8E8] rounded-2xl">
                <span className={`w-2 h-2 ${doctor.verified ? 'bg-green-500' : 'bg-gray-400'} rounded-full mr-1`}></span>
                 <span className="text-[#3D3D3D]">{doctor.verified !== false ? 'PMDC Verified' : 'Not Verified'}</span>
              </span>
            </div>
            
            {/* Specialties */}
            <p className="text-gray-600 text-sm font-medium">
              {doctor.specialization}
            </p>
            
            {/* Qualifications */}
            {doctor.qualifications && (
              <p className="text-gray-600 text-sm font-medium">
                {doctor.qualifications}
              </p>
            )}
            
            {/* Experience & Rating */}
            <div className="flex items-center gap-6 justify-start">
              <div>
                <p className="text-gray-600 text-sm font-normal">{doctor.experienceYears} Years</p>
                <p className="text-[8px] text-gray-500 leading-none">Experience</p>
              </div>
              <div className="items-center gap-1">
                <div className="flex items-center text-yellow-400">
                  <div className="flex">
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 stroke-none" />
                    ))}
                  </div>
                  <span className="ml-1 text-sm font-normal text-gray-600">{displayRating}</span>
                </div>
                <p className="text-[8px] text-gray-500 leading-none">{displayReviews} Reviews</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className=" ml-auto flex flex-col gap-1.5 items-end">
          {doctor.availableForVideoConsultation && (
            <button 
              onClick={handleVideoConsultation}
              className="py-3 px-5 boder-black border-[1px] rounded-3xl hover:bg-gray-100 transition"
            >
              Video Consultation
            </button>
          )}
          <button 
            onClick={handleBookAppointment}
            className="w-full sm:w-auto bg-green-500 text-black rounded-full py-3 px-5 hover:bg-green-600 transition"
          >
            Book an Appointment
          </button>
        </div>
      </div>
      
      {/* Consultation Info */}
      <div className="mt-10 bg-white p-8 rounded-3xl">
        <div className="flex flex-col sm:flex-row justify-between items-end gap-2">
          <div className="text-center sm:text-left">
            <p className="font-medium text-gray-700">
              {doctor.availableForVideoConsultation ? 'Online Video Consultation' : 'In-Clinic Consultation'}
            </p>
            {doctor.availableToday !== false && (
              <div className="flex items-center mt-1.5 justify-center sm:justify-start">
                <span className="inline-flex items-center text-green-600 text-xs py-1 px-2.5 bg-[#E8E8E8] rounded-2xl">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  <span className="text-[#3D3D3D]">Available today</span>
                </span>
              </div>
            )}
          </div>
          <div className="text-2xl font-semibold text-gray-800">
            Rs {doctor.consultationFee?.toLocaleString() || 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
};

interface DoctorHeroProps {
  doctors: Doctor[];
  loading?: boolean;
  specialization?: string;
  city?: string;
}

export default function DoctorHero({ doctors, loading = false, specialization = '', city = '' }: DoctorHeroProps) {
  // List of filter buttons
  const filterButtons = [
    'Female Doctors',
    'Doctors Near Me',
    'Most Experience',
    'Lowest Fee',
    'Highest Rated',
    'Available Today',
    'Video Consultation'
  ]

  const breadcrumb = city && specialization 
    ? `Home / Pakistan / ${city} / ${specialization} in ${city}`
    : 'Home / Pakistan / Doctors';

  const title = specialization && city
    ? `${doctors.length} Best ${specialization} in ${city}`
    : `${doctors.length} Doctors`;

  return (
    <div className=''>
      <div className='flex flex-col'>
        <p className='text-sm description mb-0'>{breadcrumb}</p>
        <h1 className='text-[2.5rem] m-0 text-[#323232] my-10'>
          {title} <span className='text-brand-green-500'> | Top Specialists </span> 
        </h1>
        <p className='text-lg description'>Find the best doctors near you</p>
        <div className='mt-10 flex flex-wrap gap-3'>
          {filterButtons.map((text, index) => (
            <button 
              key={index} 
              className='text-sm py-2.5 px-5 border-[1px] text-gray-700 border-[#003F31] hover:bg-white rounded-3xl transition-colors'
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      <div className='my-12'>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : doctors.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor}/>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No doctors found. Please try different search criteria.</p>
          </div>
        )}
      </div> 
    </div>
  )
}
