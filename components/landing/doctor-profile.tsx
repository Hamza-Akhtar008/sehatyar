"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDoctorProfileByDoctorId } from "@/lib/Api/Doctor/doctor_api";
import DoctorProfileTabs from "@/components/landing/DoctorProfileTabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface DoctorProfile {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  specialization: string;
  licenseNumber: string;
  experienceYears: number;
  consultationFee: number;
  FeesPerConsultation?: string; // API field
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
  qualifications?: string;
  languages?: string[];
  availableForVideoConsultation: boolean;
  user: {
    fullName: string;
  };
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
  availableToday?: boolean;
}

type StatProps = { label: string; value: string };

function Stat({ label, value }: StatProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
      <span className="font-medium text-[#111827]">{value}</span>
      <span className="text-[#6B7280]">{label}</span>
    </div>
  );
}

function ProgressRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-4">
      <span className="min-w-[120px] text-sm text-[#4B5563]">{label}</span>
      <div className="flex-1 h-[6px] rounded-full bg-[#E5E7EB]">
        <div
          className="h-[6px] rounded-full bg-[#0F766E]"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-10 text-right text-xs text-[#4B5563]">{value}%</span>
    </div>
  );
}

export default function DoctorProfile() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const doctorId = searchParams.get("doctorId");

  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      if (!doctorId) {
        setError("No doctor ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getDoctorProfileByDoctorId(Number(doctorId));
        setDoctor(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching doctor profile:", err);
        setError("Failed to load doctor profile");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorProfile();
  }, [doctorId]);

  if (loading) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </main>
    );
  }

  if (error || !doctor) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">{error || "Doctor not found"}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </main>
    );
  }

  const fullName = doctor.user?.fullName || 'Unknown';
  const displayRating = doctor.rating || 4.5;
  const displayReviews = doctor.reviewCount || 0;

  return (
    <main className="w-full">
     
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700&display=swap');
        .plus-jakarta-sans * {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
        }
      `}</style>
      <section className="mx-auto w-full max-w-[1300px] px-4 md:px-6 lg:px-8 py-6 md:py-10 plus-jakarta-sans">
       
      
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          {/* Left – header card, tabs and feedback */}
          <section>
            {/* Header card  */}
            <Card className="rounded-2xl bg-[#F8F8F8] mb-6">
              <CardHeader className="gap-4 md:gap-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                  <div className="relative h-24 w-24 md:h-28 md:w-28 rounded-full overflow-hidden bg-gray-200">
                    {(doctor.profilePicture || doctor.profilePic) ? (
                      <Image
                        src={doctor.profilePicture || doctor.profilePic || ''}
                        alt={`Dr. ${fullName}`}
                        fill
                        sizes="112px"
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold text-[32px] leading-tight text-[#414141]">
                        Dr. {fullName}
                      </h1>
                      <span className="bg-[#E8E8E8] text-[#3D3D3D] text-[12px] px-3 py-1 rounded-full font-medium flex items-center gap-1 w-fit min-w-[120px]">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="inline">
                          <circle cx="10" cy="10" r="10" fill={doctor.verified !== false ? "#5FE089" : "#9CA3AF"}/>
                          {doctor.verified !== false && (
                            <path d="M6 10l2.5 2.5L14 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          )}
                        </svg>
                        {doctor.verified !== false ? 'PMDC Verified' : 'Not Verified'}
                      </span>
                    </div>
                    <div className="text-[#52525B] text-[14px] font-medium mt-2">
                      {doctor.specialization}
                    </div>
                    {doctor.qualifications && (
                      <div className="text-[#52525B] text-[14px] mt-1">
                        {doctor.qualifications}
                      </div>
                    )}
                    <div className="mt-3 flex gap-8">
                      <div className="flex flex-col items-center">
                        <span className="text-[12px]  text-[#52525B]">Under 15 Min</span>
                        <span className="text-[8px] text-[#52525B] ">Wait Time</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[12px]  text-[#52525B]">{doctor.experienceYears} Years</span>
                        <span className="text-[8px] text-[#52525B] ">Experience</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="flex items-center gap-1 text-[12px] text-[#52525B]">
                          <svg width="14" height="14" viewBox="0 0 20 20" fill="#FACC15" xmlns="http://www.w3.org/2000/svg" className="inline">
                            <path d="M10 15.27L16.18 18l-1.64-7.03L19 7.24l-7.19-.61L10 0 8.19 6.63 1 7.24l5.46 3.73L4.82 18z"/>
                          </svg>
                          {displayRating}
                        </span>
                        <span className="text-[8px] text-[#52525B] ">{displayReviews} Reviews</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
             

            </Card>
            <DoctorProfileTabs />
          </section>

          {/* Right – booking cards or fallback */}
          <aside className="space-y-4">
            {doctor.availableForVideoConsultation && (
              <Card className="rounded-xl bg-[#F8F8F8]">
                <CardHeader>
                  <CardTitle className="text-[#414141] text-[22px]">
                    Online Video Consultation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#52525B]">Fee:</span>
                    <span className="text-[#111827]">Rs. {doctor.FeesPerConsultation || doctor.consultationFee?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#52525B]">Address:</span>
                    <span className="text-right text-[#111827]">
                      Use phone/laptop for video call
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#52525B]">
                    <span>Available </span>
                    <span>02:00 PM - 03:00 PM</span>
                  </div>
                  <Button
                    className="w-full bg-[#5FE089] mt-2 py-6 hover:bg-[#51db7f] rounded-full text-black"
                    onClick={() => router.push(`/book-appointment?doctorId=${doctor.id}&type=video`)}
                  >
                    Book an Appointment
                  </Button>
                </CardContent>
              </Card>
            )}

            {doctor.clinicName && (
              <Card className="rounded-xl bg-[#F8F8F8]">
                <CardHeader>
                  <CardTitle className="text-[#414141] text-[22px]">{doctor.clinicName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#52525B]">Fee:</span>
                    <span className="text-[#111827]">Rs. {doctor.FeesPerConsultation || doctor.consultationFee?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#52525B]">Address:</span>
                    <span className="text-right text-[#111827]">
                      {doctor.clinicAddress || `${doctor.city || ''}, ${doctor.state || ''}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#52525B]">
                    <span>Available </span>
                    <span>02:00 PM - 03:00 PM</span>
                  </div>
                  <Button
                    className="w-full bg-[#01503F] mt-2 hover:bg-[#15803D] py-6 rounded-full text-white"
                    onClick={() => router.push(`/book-appointment?doctorId=${doctor.id}`)}
                  >
                    Book an Appointment
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Fallback card if no video or clinic info */}
            {!(doctor.availableForVideoConsultation || doctor.clinicName) && (
              <Card className="rounded-xl bg-[#F8F8F8]">
                <CardHeader>
                  <CardTitle className="text-[#414141] text-[22px]">
                    No Booking Options Available
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-[#52525B] text-sm">
                    This doctor currently does not offer online or in-clinic booking options.
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
