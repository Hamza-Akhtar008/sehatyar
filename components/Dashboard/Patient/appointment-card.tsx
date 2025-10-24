import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MoreHorizontal } from "lucide-react"

interface AppointmentCardProps {
  appointment: {
    id: string
    doctorName: string
    specialty: string
    date: string
    time: string
    status: "completed" | "pending" | "cancelled"
    avatar: string
  }
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  let statusColor = "bg-yellow-100 text-yellow-700";
  let statusLabel = "Pending";
  if (appointment.status === "completed") {
    statusColor = "bg-green-100 text-green-700";
    statusLabel = "Completed";
  } else if (appointment.status === "cancelled") {
    statusColor = "bg-red-100 text-red-700";
    statusLabel = "Cancelled";
  }

  return (
    <div className="flex items-center justify-between rounded-[22px] border border-border bg-white p-2">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.doctorName} />
          <AvatarFallback>{appointment.doctorName.split(" ")[1]?.[0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col ">
          <h3 className="font-semibold text-[16px] text-foreground">{appointment.doctorName}</h3>
          <p className="text-sm text-muted-foreground -mt-5">{appointment.specialty}</p>
          <p className="text-xs text-muted-foreground">
            {appointment.date} • {appointment.time}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}>{statusLabel}</span>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
