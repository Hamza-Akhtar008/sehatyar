import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface DoctorCardProps {
  name: string
  specialty: string
  rating: number
  image: string
}

export function DoctorCard({ name, specialty, rating, image }: DoctorCardProps) {
  return (
  <div className="flex flex-col bg-white rounded-2xl border border-[#D5D5D5] p-4 w-56">
  {/* Doctor Image */}
  <div className="flex items-start mb-2">
    <div className="relative w-20 h-20 rounded-full overflow-hidden">
      <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
    </div>
  </div>

  {/* Doctor Name */}
  <h3 className="text-[16px] font-semibold text-[#52525B] whitespace-nowrap overflow-hidden text-ellipsis -mb-1">
    {name}
  </h3>
  <p className="text-sm text-muted-foreground mt-0 ">
    {specialty}
  </p>

  {/* Rating */}
  <div className="flex items-center gap-2 mb-3">
    <div className="flex gap-1">
      {[...Array(3)].map((_, i) => (
        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <span className="text-sm font-medium text-foreground">{rating}</span>
  </div>

  {/* Book Appointment Button */}
<Button className="w-full bg-[#5FE089] hover:bg-[#4CCB77] rounded-[20px] text-white rounded-full font-medium text-sm py-1.5 px-1">
  Book Appointment
</Button>


</div>

  )
}
