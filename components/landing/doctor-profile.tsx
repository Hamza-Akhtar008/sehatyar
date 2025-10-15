"use client";

import Image from "next/image";
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
                  <div className="relative h-24 w-24 md:h-28 md:w-28 rounded-full overflow-hidden ">
                    <Image
                      src="/images/doctors/d1.png"
                      alt="Doctor profile photo"
                      fill
                      sizes="112px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold text-[32px] leading-tight text-[#414141]">
                        Dr. Shazia Humayun Malik
                      </h1>
                      <span className="bg-[#E8E8E8] text-[#3D3D3D] text-[12px] px-3 py-1 rounded-full font-medium flex items-center gap-1 w-fit min-w-[120px]">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="inline"><circle cx="10" cy="10" r="10" fill="#5FE089"/><path d="M6 10l2.5 2.5L14 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        PMDC Verified
                      </span>
                    </div>
                    <div className="text-[#52525B] text-[14px] font-medium mt-2">
                      General Surgeon, Breast Surgeon, Laparoscopic Surgeon
                    </div>
                    <div className="text-[#52525B] text-[14px] mt-1">
                      MBBS, Diplomate of American Board of Surgery, Fellow of American College
                    </div>
                    <div className="mt-3 flex gap-8">
                      <div className="flex flex-col items-center">
                        <span className="text-[12px]  text-[#52525B]">Under 15 Min</span>
                        <span className="text-[8px] text-[#52525B] ">Wait Time</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[12px]  text-[#52525B]">36 Years</span>
                        <span className="text-[8px] text-[#52525B] ">Experience</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="flex items-center gap-1 text-[12px] text-[#52525B]">
                          <svg width="14" height="14" viewBox="0 0 20 20" fill="#FACC15" xmlns="http://www.w3.org/2000/svg" className="inline">
                            <path d="M10 15.27L16.18 18l-1.64-7.03L19 7.24l-7.19-.61L10 0 8.19 6.63 1 7.24l5.46 3.73L4.82 18z"/>
                          </svg>
                          5.0
                        </span>
                        <span className="text-[8px] text-[#52525B] ">75 Reviews</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
             

            </Card>
            <DoctorProfileTabs />
          </section>

          {/* Right – booking cards */}
          <aside className="space-y-4">
            <Card className="rounded-xl bg-[#F8F8F8]">
              <CardHeader>
                <CardTitle className="text-[#414141] text-[22px]">
                  Online Video Consultation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#52525B]">Fee:</span>
                  <span className="text-[#111827]">Rs. 5,000</span>
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
                  asChild
                >
                  <a href="/book-appointment">Book an Appointment</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-xl bg-[#F8F8F8]">
              <CardHeader>
                <CardTitle className="text-[#414141] text-[22px]">Doctors Hospital</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#52525B]">Fee:</span>
                  <span className="text-[#111827]">Rs. 5,000</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#52525B]">Address:</span>
                  <span className="text-right text-[#111827]">
                    152 A – G/1, Canal Bank, Johar Town, Lahore
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#52525B]">
                  <span>Available </span>
                  <span>02:00 PM - 03:00 PM</span>
                </div>
                <Button
                  className="w-full bg-[#01503F] mt-2 hover:bg-[#15803D] py-6 rounded-full text-white"
                  asChild
                >
                  <a href="/book-appointment">Book an Appointment</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-xl bg-[#F8F8F8]">
              <CardHeader>
                <CardTitle className="text-[#414141] text-[22px]">Cantonment Clinic</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#52525B]">Fee:</span>
                  <span className="text-[#111827]">Rs. 5,000</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#52525B]">Address:</span>
                  <span className="text-right text-[#111827]">
                    152 A – G/1, Canal Bank, Johar Town, Lahore
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#52525B]">
                  <span>Available </span>
                  <span>02:00 PM - 03:00 PM</span>
                </div>
                <Button
                  className="w-full bg-[#01503F] mt-2 py-6 hover:bg-[#15803D] rounded-full text-white"
                  asChild
                >
                  <a href="/book-appointment">Book an Appointment</a>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}
