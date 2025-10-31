"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { getAppointmentsForLoggedInDoctor } from "@/lib/Api/appointment"
import { useAuth } from "@/src/contexts/AuthContext"
import { ChevronLeft, ChevronRight, User } from "lucide-react"
import dayjs from "dayjs"

const generateDates = (days = 30) => {
  const dates = []
  for (let i = 0; i < days; i++) {
    const date = dayjs().add(i, "day")
    dates.push({
      label: date.format("ddd D"),
      value: date.format("DD-MM-YYYY"),
    })
  }
  return dates
}

const allDays = generateDates(30)
const today = dayjs().format("DD-MM-YYYY")
const initialDate = today

export default function CalendarView() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(initialDate)

  useEffect(() => {
    async function fetchAppointments() {
      if (!user?.doctorId) return
      setLoading(true)
      try {
        const data = await getAppointmentsForLoggedInDoctor()
        // If data is not an array, try to extract the array property
        let arr = Array.isArray(data) ? data : (Array.isArray(data?.appointments) ? data.appointments : [])
        setAppointments(arr)
      } catch {
        setAppointments([])
      } finally {
        setLoading(false)
      }
    }
    fetchAppointments()
  }, [user?.doctorId])

  const filteredAppointments = appointments.filter((a) => {
    if (!a.appointmentDate) return false;
    // Format appointmentDate to DD-MM-YYYY
    const formatted = dayjs(a.appointmentDate).format("DD-MM-YYYY");
    return formatted === selectedDate;
  });

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F2F2F2] flex flex-col ">
      <div className="font-bold text-lg text-[#222] mb-3">Calendar View</div>

      {/* Horizontal scroll for days */}
      <div className="flex items-center gap-2 mb-4">
        <button className="p-2 rounded-full bg-[#F2F2F2] hover:bg-[#D1FADF]">
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-[#D1FADF] scrollbar-track-[#F2F2F2] px-1">
          {allDays.map((d, i) => (
            <button
              key={i}
              className={`px-6 py-2 rounded-[20px] text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedDate === d.value
                  ? "bg-[#0F766E] text-white border-2 border-[#0F766E]"
                  : "bg-[#F2F2F2] text-[#222]"
              }`}
              onClick={() => setSelectedDate(d.value)}
            >
              {d.label}
            </button>
          ))}
        </div>

        <button className="p-2 rounded-full bg-[#F2F2F2] hover:bg-[#D1FADF]">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Vertical scroll for appointments */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#D1FADF] scrollbar-track-[#F2F2F2] pr-2">
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading...</div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No appointments for this date.</div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredAppointments.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-[#F9FAFB] rounded-xl px-3 py-2 min-w-[550px]"
              >
                <div className="flex items-center gap-3">
                  {a.doctor?.profilePic ? (
                    <Image
                      src={a.doctor.profilePic}
                      alt={a.patientName || a.name || "Profile"}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E5E7EB] text-[#6B7280]">
                      <User size={20} />
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-[#222] text-[15px]">{a.patientName || a.name}</div>
                    <div className="text-xs text-[#6B7280]">{a.specialty || a.appointmentFor}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-[#6B7280]">{a.appointmentTime || a.time}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E9D7FE] text-[#7F56D9]">
                    {a.status || "Confirmed"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
