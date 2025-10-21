"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { Star, User } from 'lucide-react';
import Image from 'next/image';

// helper formatters (non-breaking, used only for display)
const capitalizeWords = (s: string) => s.replace(/\b\w/g, c => c.toUpperCase());
const formatSpecializations = (spec?: string | string[]) => {
  if (!spec) return '';
  const arr = Array.isArray(spec) ? spec : spec.split(',').map(s => s.trim());
  return arr.filter(Boolean).map(capitalizeWords).join(', ');
};
type Education = { institute: string; degreeName: string; fieldOfStudy?: string }
const formatEducation = (education?: Education[]) => {
  if (!education?.length) return '';
  return education
    .map(e => `${e.degreeName}${e.fieldOfStudy ? ` (${e.fieldOfStudy})` : ''}`)
    .join(', ');
};
const computeAvgRating = (reviews?: { rating?: number }[]) => {
  if (!reviews?.length) return undefined;
  const ratings = reviews
    .map(r => Number(r?.rating))
    .filter(v => Number.isFinite(v) && v > 0);
  if (ratings.length === 0) return undefined;
  const avg = ratings.reduce((sum, v) => sum + v, 0) / ratings.length;
  return Number(avg.toFixed(1));
};

// Doctor interface type definition matching API response
interface Doctor {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  specialization: string;                // legacy single string
  primarySpecialization?: string[];      // new API: ["cardiology", "Internal Medicine"]
  licenseNumber: string;
  experienceYears: number;               // legacy number
  yearsOfExperience?: string | number;   // new API: "5"
  consultationFee: number;
  FeesPerConsultation?: string;          // API field
  bio?: string;
  clinicAddress?: string;
  clinicName?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  phoneNumber?: string;
  profilePicture?: string;
  profilePic?: string; // API field
  qualifications?: string;               // legacy string
  education?: Education[];               // new API array
  languages?: string[];
  availableForVideoConsultation: boolean;
  user : { fullName: string; }
  rating?: number;
  reviewCount?: number;
  reviews?: { rating?: number }[];       // new API array
  verified?: boolean;
  availableToday?: boolean;
  // extras from API we don't render here but keep for future
  servicesTreatementOffered?: string[];
  conditionTreatments?: string[];
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

  // safely derive display fields from new API first, then fall back
  const fullName =
    doctor.user?.fullName ||
    [doctor.firstName, doctor.lastName].filter(Boolean).join(' ') ||
    'Unknown';

  const displaySpecialization =
    doctor.specialization ||
    formatSpecializations(doctor.primarySpecialization);

  const displayQualifications =
    doctor.qualifications || formatEducation(doctor.education);

  const expYears =
    doctor.experienceYears ??
    (doctor.yearsOfExperience !== undefined
      ? Number(doctor.yearsOfExperience)
      : undefined);

  const reviewsCount =
    Array.isArray(doctor.reviews)
      ? doctor.reviews.length
      : (doctor.reviewCount ?? 0);

  const avgRating =
    Array.isArray(doctor.reviews) && doctor.reviews.length > 0
      ? computeAvgRating(doctor.reviews)
      : (doctor.rating ?? undefined);

  const displayRating = avgRating ?? 4.5;
  const displayReviews = reviewsCount ?? 0;

  const feeVal =
    doctor.FeesPerConsultation != null
      ? Number(doctor.FeesPerConsultation)
      : doctor.consultationFee;
  const displayFee =
    feeVal != null && !Number.isNaN(Number(feeVal))
      ? Number(feeVal).toLocaleString()
      : 'N/A';

  return (
    <div className="bg-[#F8F8F8] rounded-4xl p-4 sm:p-6 md:p-7 lg:p-10 cursor-pointer hover:shadow-lg transition" onClick={handleClick}>
      <div className="flex flex-col lg:flex-row lg:flex-wrap items-start lg:items-center gap-4 lg:gap-0">
        {/* Doctor Image and Info */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-7 lg:gap-10 items-center sm:items-center w-full lg:w-auto">
          {/* Doctor Image */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-34 lg:h-34 rounded-full overflow-hidden bg-yellow-500 flex items-center justify-center flex-shrink-0 relative">
            {(doctor.profilePicture || (doctor.profilePic && doctor.profilePic !== "")) ? (
              <Image 
                src={doctor.profilePicture || doctor.profilePic || ''} 
                alt={`Dr. ${fullName}`}
                fill
                sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 112px, 136px"
                className="object-cover"
                priority
              />
            ) : (
              <User className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-400" />
            )}
          </div>

          {/* Doctor Info */}
          <div className="flex flex-col gap-y-1 text-center sm:text-left w-full sm:w-auto">
            <h2 className="text-xl sm:text-2xl md:text-[1.75rem] lg:text-3xl font-semibold text-[#414141] mb-0">{fullName}</h2>

            {/* Verification Badge */}
            <div className="flex items-center justify-center sm:justify-start"> 
              <span className="inline-flex items-center text-green-600 text-xs py-1 px-2.5 bg-[#E8E8E8] rounded-2xl">
                <span className={`w-2 h-2 ${doctor.verified ? 'bg-green-500' : 'bg-gray-400'} rounded-full mr-1`}></span>
                <span className="text-[#3D3D3D]">{doctor.verified !== false ? 'PMDC Verified' : 'Not Verified'}</span>
              </span>
            </div>

            {/* Specialties */}
            <p className="text-gray-600 text-xs sm:text-sm font-medium">
              {displaySpecialization}
            </p>

            {/* Qualifications */}
            {displayQualifications && (
              <p className="text-gray-600 text-xs sm:text-sm font-medium">
                {displayQualifications}
              </p>
            )}

            {/* Experience & Rating */}
            <div className="flex items-center gap-4 sm:gap-5 md:gap-5 lg:gap-6 justify-center sm:justify-start">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm font-normal">{expYears ?? 0} Years</p>
                <p className="text-[8px] text-gray-500 leading-none">Experience</p>
              </div>
              <div className="items-center gap-1">
                <div className="flex items-center text-yellow-400">
                  <div className="flex">
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 stroke-none" />
                    ))}
                  </div>
                  <span className="ml-1 text-xs sm:text-sm font-normal text-gray-600">{displayRating}</span>
                </div>
                <p className="text-[8px] text-gray-500 leading-none">{displayReviews} Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full lg:ml-auto lg:w-auto flex flex-col gap-1.5 items-stretch sm:items-end">
          {/* Always show Video Consultation button */}
          <button 
            onClick={handleVideoConsultation}
            className="whitespace-nowrap py-2.5 sm:py-2.5 md:py-2.5 lg:py-3 px-4 sm:px-4 md:px-4 lg:px-5 text-sm border text-black border-black rounded-full bg-white hover:bg-gray-100 transition"
          >
            Video Consultation
          </button>
          <button 
            onClick={handleBookAppointment}
            className="whitespace-nowrap w-full bg-[#5fe089] text-black rounded-full py-2.5 sm:py-2.5 md:py-2.5 lg:py-3 px-4 sm:px-4 md:px-4 lg:px-5 text-sm transition"
          >
            Book an Appointment
          </button>
        </div>
      </div>

      {/* Consultation Info */}
      <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-10 bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-3xl">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-2">
          <div className="text-center sm:text-left">
            <p className="font-medium text-gray-700 text-sm sm:text-sm md:text-base">
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
          <div className="text-xl sm:text-xl md:text-2xl font-semibold text-gray-800">
            Rs {displayFee}
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
    'Video Consultation'
  ]

  const breadcrumb = city && specialization 
    ? `Home / Pakistan / ${city} / ${specialization} in ${city}`
    : 'Home / Pakistan / Doctors';

  const title = specialization && city
    ? `${doctors.length} Best ${specialization} in ${city}`
    : `${doctors.length} Doctors`;

  return (
    <div className='px-4 sm:px-0'>
      <div className='flex flex-col'>
        <p className='text-xs sm:text-sm description mb-0'>{breadcrumb}</p>
        <h1 className='text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.5rem] m-0 text-[#323232] my-6 sm:my-7 md:my-8 lg:my-10'>
          {title} <span className='text-brand-green-500'> | Top Specialists </span> 
        </h1>
        <p className='text-base sm:text-base md:text-lg description'>Find the best doctors near you</p>
        <div className='mt-6 sm:mt-7 md:mt-8 lg:mt-10 flex flex-wrap gap-2 sm:gap-2.5 md:gap-3'>
          {filterButtons.map((text, index) => (
            <button 
              key={index} 
              className='text-xs sm:text-sm py-2 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 border-[1px] text-gray-700 border-[#003F31] hover:bg-white rounded-3xl transition-colors'
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      <div className='my-8 sm:my-9 md:my-10 lg:my-12'>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : doctors.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-4 md:gap-4 lg:gap-5'>
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor}/>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg sm:text-xl text-gray-500">No doctors found. Please try different search criteria.</p>
          </div>
        )}
      </div> 
    </div>
  )
}