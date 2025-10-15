"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";


const GREEN_PRIMARY = "#5FE089"; // slot selected

function Slot({ label, active = false, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      className={
        `h-10 min-w-[84px] mt-5 rounded-[12px] border px-3 text-[12px] ` +
        (active
          ? "bg-[#5FE089] text-[#414141] border-[#01503F]"
          : "bg-white text-[#414141] border-[#414141] ")
  }
  onClick={active ? onClick : undefined}
    >
      {label}
    </button>
  );
}

function SlotRow({ title, onActiveClick }: { title: string; onActiveClick?: () => void }) {
  return (
    <div className="space-y-3">
      <div className="text-xs text-[#414141]">{title}</div>
      <div className="flex flex-wrap gap-7">
  <Slot label="09:00 AM"  />
        <Slot label="09:00 AM" />
        <Slot label="09:00 AM" />
  <Slot label="09:00 AM" active onClick={onActiveClick} />
      </div>
    </div>
  );
}

function DayTabs() {
  const days = ["Today, 29", "Sep, 30", "Oct, 01", "Oct, 02"];
  return (
    <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 px-6">
      <button aria-label="Previous" className="text-gray-500">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <div className="flex items-center gap-22">
        {days.map((d, i) => (
          <button
            key={d}
            className={
              `text-sm pb-2 font-medium ` +
              (i === 0
                ? "text-[#01503F] border-b-2 border-[#01503F]"
                : "text-[#6B7280]")
            }
          >
            {d}
          </button>
        ))}
      </div>
      <button aria-label="Next" className="text-gray-500">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>
    </div>
  );
}

export default function AppointmentBooking() {
  const router = useRouter();
  return (
    <main className="w-full">
      <section className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
          {/* Left side: calendar and slots */}
          <Card className="rounded-2xl bg-[#F8F8F8]">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                
              </div>
              <DayTabs />

              <div className="mt-6 space-y-6">
                <div className="space-y-3">
                  <div className="text-xs text-[#414141]">Morning Slots</div>
                  <div className="flex flex-wrap gap-7">
                    <Slot label="09:00 AM" active onClick={() => router.push("/book-appointment/confirm")} />
                    <Slot label="09:00 AM" />
                    <Slot label="09:00 AM" />
                    <Slot label="09:00 AM" />
                  </div>
                </div>

                <SlotRow title="Afternoon Slots" onActiveClick={() => router.push("/book-appointment/confirm")} />
                <SlotRow title="Evening Slots" onActiveClick={() => router.push("/book-appointment/confirm")} />
              </div>
            </CardContent>
          </Card>

          {/* Right side: doctor info and reviews */}
          <div className="space-y-4">
            <Card className="rounded-2xl bg-[#F8F8F8]">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full ">
                    <Image
                      src="/images/doctors/d7.png"
                      alt="Doctor"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-[#111827] font-semibold">Dr. Attia Tabassum</div>
                    <div className="text-xs text-[#6B7280]">Online Video Consultation</div>
                    <div className="text-sm font-medium mt-2">Fee: Rs. 1,500</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-[18px] font-semibold text-[#414141] px-1">Reviews about Dr. Attia Tabassum (930)</div>

            {[1, 2, 3].map((i) => (
              <Card key={i} className="rounded-2xl bg-[#F8F8F8]">
                <CardContent className="p-5">
                  <div className="text-[#111827] font-semibold mb-2">I recommend the doctor</div>
                  <div className="text-sm text-[#6B7280] mb-3">"Very good"</div>
                  <div className="text-[11px] text-[#9CA3AF] flex items-center justify-between">
                    <span>Verified Patient: M*** **n.</span>
                    <span>5 days ago</span>
                  </div>
                </CardContent>
              </Card>
            ))}

                <div className="flex justify-start pt-2">
                <button
                  className="flex items-center gap-2 border border-[#414141] rounded-[12px] px-6 py-2 text-[#414141] text-[14px] bg-white hover:bg-[#F3F4F6] transition-colors"
                  type="button"
                >
                  <Image
                    src="/downarrow.svg"
                    alt="Down Arrow"
                    width={18}
                    height={18}
                  />
                  Load More Reviews
                </button>
              </div>
          </div>
        </div>
      </section>
    </main>
  );
}
