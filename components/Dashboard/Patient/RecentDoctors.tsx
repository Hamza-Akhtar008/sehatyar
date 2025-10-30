"use client"
import { useRef } from "react"
import { DoctorCard } from "./doctor-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

const doctors = [
  { id: 1, name: "Dr. Emily Rodriguez", specialty: "Dermatologist", rating: 4.7, image: "/images/recentdoctor.png" },
  { id: 2, name: "Dr. Daniel Carter", specialty: "Cardiologist", rating: 4.9, image: "/images/recentdoctor2.png" },
  { id: 3, name: "Dr. Ayesha Malik", specialty: "Neurologist", rating: 4.8, image: "/images/recentdoctor3.png" },
  { id: 4, name: "Dr. Michael Chen", specialty: "Orthopedic Surgeon", rating: 4.6, image: "/images/recentdoctor4.png" },
  { id: 5, name: "Dr. Fatima Zahra", specialty: "Pediatrician", rating: 4.9, image: "/images/recentdoctor5.png" },
  { id: 6, name: "Dr. John Smith", specialty: "ENT Specialist", rating: 4.5, image: "/images/recentdoctor6.png" },
  { id: 7, name: "Dr. Sarah Johnson", specialty: "Dermatologist", rating: 4.8, image: "/images/recentdoctor7.png" },
  { id: 8, name: "Dr. Usman Khalid", specialty: "Psychiatrist", rating: 4.7, image: "/images/recentdoctor8.png" },
]

export function RecentDoctors() {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="bg-white rounded-2xl mt-4 shadow-sm p-6 max-w-[1064px] w-full  relative"
     style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE/Edge
      }}
      >
        
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
        Recent Doctors
      </h2>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-2 h-2 text-gray-700" />
        </button>

        {/* Doctor Cards Carousel */}
    <div
  ref={carouselRef}
  className="
    flex gap-4 sm:gap-6 overflow-x-scroll scroll-smooth snap-x snap-mandatory
    pb-4 md:pb-0 scrollbar-hide
  "
  style={{
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }}
>
  {doctors.map((doctor) => (
    <div
      key={doctor.id}
      className="snap-start flex-shrink-0 w-[75%] sm:w-[45%] md:w-[30%] lg:w-[23%]"
    >
      <DoctorCard
        name={doctor.name}
        specialty={doctor.specialty}
        rating={doctor.rating}
        image={doctor.image}
      />
    </div>
  ))}
</div>


        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-2 h-2 text-gray-700" />
        </button>
      </div>
    </div>
  )
}
