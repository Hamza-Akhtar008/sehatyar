"use client"

import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { useEffect, useState } from "react"
import { getDoctorProfileByDoctorId } from "@/lib/Api/Doctor/doctor_api"
import { getAvailability, type Slot as AvailabilitySlot } from "@/lib/Api/availability"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DoctorProfile {
  id: number
  userId: number
  firstName: string
  lastName: string
  specialization: string
  licenseNumber: string
  experienceYears: number
  consultationFee: number
  FeesPerConsultation?: string
  bio?: string
  clinicAddress?: string
  clinicName?: string
  city?: string
  state?: string
  country?: string
  zipCode?: string
  phoneNumber?: string
  profilePicture?: string
  profilePic?: string
  qualifications?: string
  languages?: string[]
  availableForVideoConsultation: boolean
  user: {
    fullName: string
  }
  rating?: number
  reviewCount?: number
  verified?: boolean
  availableToday?: boolean
}

interface TimeSlot {
  time: string
  available: boolean
  slotId?: number
}

interface HospitalAvailability {
  hospitalName: string
  slots: TimeSlot[]
}

interface DayAvailability {
  date: string
  dayName: string
  hospitals: HospitalAvailability[]
}

// Helper function to generate 30-minute time slots
const generateTimeSlots = (startTime: string, endTime: string): string[] => {
  const slots: string[] = []
  const [startHour, startMin] = startTime.split(":").map(Number)
  const [endHour, endMin] = endTime.split(":").map(Number)

  let currentHour = startHour
  let currentMin = startMin

  while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
    const hour12 = currentHour > 12 ? currentHour - 12 : currentHour === 0 ? 12 : currentHour
    const period = currentHour >= 12 ? "PM" : "AM"
    const timeStr = `${hour12.toString().padStart(2, "0")}:${currentMin.toString().padStart(2, "0")} ${period}`
    slots.push(timeStr)

    currentMin += 30
    if (currentMin >= 60) {
      currentMin = 0
      currentHour++
    }
  }

  return slots
}

const GREEN_PRIMARY = "#5FE089"

function Slot({
  label,
  available = true,
  selected = false,
  onClick,
}: {
  label: string
  available?: boolean
  selected?: boolean
  onClick?: () => void
}) {
  return (
    <button
      disabled={!available}
      className={
        `h-10 min-w-[84px] mt-5 rounded-[12px] border px-3 text-[12px] transition-colors ` +
        (selected
          ? "bg-[#5FE089] text-[#414141] border-[#01503F]"
          : available
            ? "bg-white text-[#414141] border-[#414141] hover:bg-gray-50"
            : "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed")
      }
      onClick={available ? onClick : undefined}
    >
      {label}
    </button>
  )
}

function SlotRow({
  title,
  slots,
  selectedSlot,
  onSlotClick,
}: {
  title: string
  slots: TimeSlot[]
  selectedSlot: string | null
  onSlotClick: (time: string) => void
}) {
  if (slots.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      <div className="text-xs text-[#414141]">{title}</div>
      <div className="flex flex-wrap gap-7">
        {slots.map((slot, idx) => (
          <div
            key={idx}
            className={`
              transition-all duration-200
              rounded-md border cursor-pointer px-4 py-2 text-sm font-medium
              ${
                slot.available
                  ? selectedSlot === slot.time
                    ? "bg-[#01503F] text-white border-[#01503F]"
                    : "bg-white text-[#01503F] border-[#D1D5DB] hover:bg-[#E6F4F1] hover:border-[#01503F]"
                  : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              }
            `}
            onClick={() => slot.available && onSlotClick(slot.time)}
          >
            {slot.time}
          </div>
        ))}
      </div>
    </div>
  )
}
  



export  function DayTabs({
  days,
  selectedDay,
  onDaySelect,
}: {
  days: DayAvailability[]
  selectedDay: number
  onDaySelect: (index: number) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 150
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="border-b border-[#E5E7EB] pb-3 px-6 max-w-4xl relative">
      {/* Left scroll button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow-sm hover:bg-gray-100 z-10"
      >
        <ChevronLeft className="w-5 h-5 text-gray-500" />
      </button>

      <div
        ref={scrollRef}
        className="overflow-x-auto scroll-smooth no-scrollbar"
      >
        <div className="flex items-center gap-8 min-w-min">
          {days.map((day, i) => (
            <button
              key={i}
              onClick={() => onDaySelect(i)}
              className={
                `text-sm pb-2 font-medium transition-colors whitespace-nowrap ` +
                (i === selectedDay
                  ? "text-[#01503F] border-b-2 border-[#01503F]"
                  : "text-[#6B7280] hover:text-[#01503F]")
              }
            >
              {day.dayName}
            </button>
          ))}
        </div>
      </div>

      {/* Right scroll button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow-sm hover:bg-gray-100 z-10"
      >
        <ChevronRight className="w-5 h-5 text-gray-500" />
      </button>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}


export default function AppointmentBooking() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const doctorId = searchParams.get("doctorId")
  const consultationType = searchParams.get("type")

  const [doctor, setDoctor] = useState<DoctorProfile | null>(null)
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([])
  const [daySchedules, setDaySchedules] = useState<DayAvailability[]>([])
  const [selectedDayIndex, setSelectedDayIndex] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!doctorId) {
        setError("No doctor ID provided")
        setLoading(false)
        return
      }

      try {
        setLoading(true)

        const [doctorData, availabilityData] = await Promise.all([
          getDoctorProfileByDoctorId(Number(doctorId)),
          getAvailability(Number(doctorId)),
        ])

        setDoctor(doctorData)
        setAvailability(
          availabilityData.filter(
            (slot: AvailabilitySlot) =>
              slot.isActive &&
              (consultationType === "video" ? slot.availabilityType === "online" : slot.availabilityType === "clinic"),
          ),
        )
        setError(null)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load appointment data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [doctorId, consultationType])

  useEffect(() => {
    if (availability.length === 0) {
      setDaySchedules([])
      return
    }

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const today = new Date()
    const schedules: DayAvailability[] = []

    // Group availability by day of week
    const availabilityByDay = availability.reduce(
      (acc, slot) => {
        if (!acc[slot.dayOfWeek]) {
          acc[slot.dayOfWeek] = []
        }
        acc[slot.dayOfWeek].push(slot)
        return acc
      },
      {} as Record<string, AvailabilitySlot[]>,
    )

    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dayName = daysOfWeek[date.getDay()]
      const daySlots = availabilityByDay[dayName] || []

      const hospitalMap = new Map<string, TimeSlot[]>()

   daySlots.forEach((slot) => {
  if (slot.startTime && slot.endTime) {
    const hospitalName =
      slot.availabilityType == "clinic"
        ? `${slot.address}`
        : "Online Consultation"

    const timeSlots = generateTimeSlots(slot.startTime, slot.endTime)

    if (!hospitalMap.has(hospitalName)) {
      hospitalMap.set(hospitalName, [])
    }

    timeSlots.forEach((time) => {
      const slotObj: TimeSlot = {
        time,
        available: true,
        slotId: slot.id,
      }
      hospitalMap.get(hospitalName)?.push(slotObj)
    })
  }
})


      const hospitals: HospitalAvailability[] = Array.from(hospitalMap.entries()).map(([hospitalName, slots]) => ({
        hospitalName,
        slots,
      }))

      const dateStr = i === 0 ? "Today" : date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

      schedules.push({
        date: date.toISOString().split("T")[0],
        dayName: `${dateStr}, ${dayName.slice(0, 3)}`,
        hospitals,
      })
    }

    setDaySchedules(schedules)
  }, [availability])

  const handleSlotClick = (time: string) => {
    setSelectedSlot(time)
  }

  if (loading) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </main>
    )
  }

  if (error || !doctor) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">{error || "Doctor not found"}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </main>
    )
  }

  const fullName = doctor.user?.fullName || "Unknown"
  const consultationTypeText =
    consultationType === "video" || doctor.availableForVideoConsultation
      ? "Online Video Consultation"
      : "In-Clinic Consultation"

  const currentDaySchedule = daySchedules[selectedDayIndex]

  return (
    <main className="w-full">
      <section className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
          {/* Left side: calendar and slots */}
          <Card className="rounded-2xl bg-[#F8F8F8]">
            <CardContent className="p-4 md:p-6">
              {daySchedules.length > 0 ? (
                <>
                  <DayTabs days={daySchedules} selectedDay={selectedDayIndex} onDaySelect={setSelectedDayIndex} />

                  <div className="mt-6 space-y-6">
                    {currentDaySchedule && (
                      <>
                        {currentDaySchedule.hospitals.map((hospital, idx) => (
                          <SlotRow
                            key={idx}
                            title={hospital.hospitalName}
                            slots={hospital.slots}
                            selectedSlot={selectedSlot}
                            onSlotClick={handleSlotClick}
                          />
                        ))}
                      </>
                    )}

                    {!currentDaySchedule ||
                      (currentDaySchedule.hospitals.length === 0 && (
                        <div className="text-center py-10 text-gray-500">No slots available for this day</div>
                      ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-10 text-gray-500">No availability found for this doctor</div>
              )}
            </CardContent>
          </Card>

          {/* Right side: doctor info and reviews */}
          <div className="space-y-4">
            <Card className="rounded-2xl bg-[#F8F8F8]">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                    {doctor.profilePicture || doctor.profilePic ? (
                      <Image
                        src={doctor.profilePicture || doctor.profilePic || ""}
                        alt={`Dr. ${fullName}`}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-[#111827] font-semibold">Dr. {fullName}</div>
                    <div className="text-xs text-[#6B7280]">{consultationTypeText}</div>
                    <div className="text-sm font-medium mt-2">
                      Fee: Rs. {doctor.FeesPerConsultation || doctor.consultationFee?.toLocaleString() || "N/A"}
                    </div>
                  </div>
                </div>
                {/* Confirm Booking Button */}
                <div className="mt-6">
                  <Button
                    className="w-full h-10 rounded-full text-[14px] font-medium"
                    style={{ backgroundColor: "#5FE089", color: "#0A0A0A" }}
                    disabled={!selectedSlot}
                    onClick={() => {
                      if (!selectedSlot) return
                      router.push(
                        `/book-appointment/confirm?doctorId=${doctorId}&time=${encodeURIComponent(selectedSlot)}&date=${daySchedules[selectedDayIndex]?.date}`,
                      )
                    }}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="text-[18px] font-semibold text-[#414141] px-1">
              Reviews about Dr. {fullName} {doctor.reviewCount ? `(${doctor.reviewCount})` : ""}
            </div>

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
                <Image src="/downarrow.svg" alt="Down Arrow" width={18} height={18} />
                Load More Reviews
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
