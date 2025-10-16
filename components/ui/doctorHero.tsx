import React from 'react'
import { Star, User } from 'lucide-react';
import Image from 'next/image';

// Doctor interface type definition
interface Doctor {
  id: number;
  name: string;
  verified: boolean;
  specialties: string[];
  qualifications: string;
  experienceYears: number;
  rating: number;
  reviews: number;
  videoConsultation: boolean;
  availableToday: boolean;
  consultationFee: number;
  imageUrl: string;
}

// Sample doctor data
const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Cameron Williamson',
    verified: true,
    specialties: ['Dermatologist', 'Cosmetologist'],
    qualifications: 'MBBS, FCPS (Dermatology)',
    experienceYears: 10,
    rating: 4.9,
    reviews: 428,
    videoConsultation: true,
    availableToday: true,
    consultationFee: 1500,
    imageUrl: '/images/doctors/d1.png',
  },
  {
    id: 2,
    name: 'Ralph Edwards',
    verified: true,
    specialties: ['Dermatologist', 'Cosmetologist'],
    qualifications: 'MBBS, FCPS (Dermatology)',
    experienceYears: 10,
    rating: 4.9,
    reviews: 428,
    videoConsultation: true,
    availableToday: true,
    consultationFee: 1500,
    imageUrl: '/images/doctors/d2.png',
  },
  {
    id: 3,
    name: 'Guy Hawkins',
    verified: true,
    specialties: ['Dermatologist', 'Cosmetologist'],
    qualifications: 'MBBS, FCPS (Dermatology)',
    experienceYears: 8,
    rating: 4.8,
    reviews: 350,
    videoConsultation: true,
    availableToday: true,
    consultationFee: 1200,
    imageUrl: '/images/doctors/d3.png',
  },
  {
    id: 4,
    name: 'Arlene McCoy',
    verified: true,
    specialties: ['Dermatologist', 'Cosmetologist'],
    qualifications: 'MBBS, FCPS (Dermatology)',
    experienceYears: 12,
    rating: 4.9,
    reviews: 520,
    videoConsultation: true,
    availableToday: true,
    consultationFee: 1800,
    imageUrl: '/images/doctors/d5.png',
  },
  {
    id: 5,
    name: 'Arlene McCoy',
    verified: true,
    specialties: ['Dermatologist', 'Cosmetologist'],
    qualifications: 'MBBS, FCPS (Dermatology)',
    experienceYears: 12,
    rating: 4.9,
    reviews: 520,
    videoConsultation: true,
    availableToday: true,
    consultationFee: 1800,
    imageUrl: '/images/doctors/d6.png',
  },
  {
    id: 6,
    name: 'Arlene McCoy',
    verified: true,
    specialties: ['Dermatologist', 'Cosmetologist'],
    qualifications: 'MBBS, FCPS (Dermatology)',
    experienceYears: 12,
    rating: 4.9,
    reviews: 520,
    videoConsultation: true,
    availableToday: true,
    consultationFee: 1800,
    imageUrl: '/images/doctors/d6.png',
  },
];

// Doctor Card component
const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  return (
    <div className="bg-[#F8F8F8] rounded-4xl p-10">
      <div className="flex flex-row items-center">
        {/* Doctor Image and Info */}
        <div className="flex flex-row gap-10 items-center">
          {/* Doctor Image */}
          <div className="w-34 h-34 rounded-full overflow-hidden  bg-yellow-500 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0 relative">
            {doctor.imageUrl ? (
              <Image 
                src={doctor.imageUrl} 
                alt={`Dr. ${doctor.name}`}
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
            <h2 className="text-3xl font-semibold text-[#414141] mb-0">{doctor.name}</h2>
            
            {/* Verification Badge */}
            <div className="flex items-center justify-center sm:justify-start"> 
              <span className="inline-flex items-center text-green-600 text-xs py-1 px-2.5 bg-[#E8E8E8] rounded-2xl">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                 <span className="text-[#3D3D3D]">PMDC Verified</span>
              </span>
            </div>
            
            {/* Specialties */}
            <p className="text-gray-600 text-sm font-medium">
              {doctor.specialties.join(', ')}
            </p>
            
            {/* Qualifications */}
            <p className="text-gray-600 text-sm font-medium">
              {doctor.qualifications}
            </p>
            
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
                  <span className="ml-1 text-sm font-normal text-gray-600">{doctor.rating}</span>
                </div>
                <p className="text-[8px] text-gray-500 leading-none">{doctor.reviews} Reviews</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className=" ml-auto flex flex-col gap-1.5 items-end">
          <button className="py-3 px-5 boder-black border-[1px] rounded-3xl">
            Video Consultation
          </button>
          <button className="w-full sm:w-auto bg-green-500 text-black rounded-full py-3 px-5">
            Book an Appointment
          </button>
        </div>
      </div>
      
      {/* Consultation Info */}
      <div className="mt-10 bg-white p-8 rounded-3xl">
        <div className="flex flex-col sm:flex-row justify-between items-end gap-2">
          <div className="text-center sm:text-left">
            <p className="font-medium text-gray-700">Online Video Consultation</p>
            {doctor.availableToday && (
              <div className="flex items-center mt-1.5 justify-center sm:justify-start">
                <span className="inline-flex items-center text-green-600 text-xs py-1 px-2.5 bg-[#E8E8E8] rounded-2xl">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  <span className="text-[#3D3D3D]">Available today</span>
                </span>
              </div>
            )}
          </div>
          <div className="text-2xl font-semibold text-gray-800">
            Rs {doctor.consultationFee.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function doctorHero() {
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

  return (
    <div className=''>
      <div className='flex flex-col'>
        <p className='text-sm description mb-0'>Home / Pakistan / Abbottabad / Dermatologists in Abbottabad</p>
        <h1 className='text-[2.5rem] m-0 text-[#323232] my-10'>380 Best Dermatologist in Karachi <span className='text-green-400'> | Top Skin Specialist </span> </h1>
        <p className='text-lg description'>Also known as Skin Specialist ,ماہرامراض جلد ,Skin Doctor and Mahir-e-imraz-e-jild</p>
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
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor}/>
          ))}
        </div>
      </div> 
    </div>
  )
}
