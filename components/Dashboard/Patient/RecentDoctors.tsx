import { DoctorCard } from "./doctor-card"

const doctors = [
  {
    id: 1,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    rating: 4.7,
    image: "/images/recentdoctor.png",
  },
  {
    id: 2,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    rating: 8.7,
    image: "/images/recentdoctor2.png",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    rating: 9.7,
    image: "/images/recentdoctor3.png",
  },
  {
    id: 4,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    rating: 4.7,
    image: "/images/recentdoctor4.png",
  },
]

export function RecentDoctors() {
  return (
    <div className="bg-white rounded-2xl mt-2 -ml-4 shadow-sm p-6  w-[1064px]">
      <h2 className="text-2xl font-semibold text-foreground mb-6">Recent Doctors</h2>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            name={doctor.name}
            specialty={doctor.specialty}
            rating={doctor.rating}
            image={doctor.image}
          />
        ))}
      </div>
    </div>
  )
}
