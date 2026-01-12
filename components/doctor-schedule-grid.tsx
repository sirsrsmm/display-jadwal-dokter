"use client"

import { Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Doctor {
  id: string
  name: string
  specialty: string
  poli: string
  startTime: string
  endTime: string
  available: boolean
  nextPatient?: string
}

const doctorData: Doctor[] = [
  {
    id: "1",
    name: "Dr. Budi Santoso",
    specialty: "Sp.Jantung",
    poli: "Jantung",
    startTime: "08:00",
    endTime: "16:00",
    available: true,
    nextPatient: "10:30",
  },
  {
    id: "2",
    name: "Dr. Siti Nurhaliza",
    specialty: "Sp.PD",
    poli: "Penyakit Dalam",
    startTime: "09:00",
    endTime: "17:00",
    available: true,
    nextPatient: "11:00",
  },
  {
    id: "3",
    name: "Dr. Ahmad Suryanto",
    specialty: "Sp.Bedah",
    poli: "Bedah",
    startTime: "08:30",
    endTime: "15:30",
    available: false,
  },
  {
    id: "4",
    name: "Dr. Retno Putri",
    specialty: "Sp.Anak",
    poli: "Anak",
    startTime: "09:00",
    endTime: "16:30",
    available: true,
    nextPatient: "09:45",
  },
  {
    id: "5",
    name: "Dr. Rinto Wijaya",
    specialty: "Sp.Saraf",
    poli: "Saraf",
    startTime: "10:00",
    endTime: "18:00",
    available: true,
    nextPatient: "14:00",
  },
  {
    id: "6",
    name: "Dr. Dina Kusuma",
    specialty: "Sp.Kulit",
    poli: "Kulit",
    startTime: "08:00",
    endTime: "16:00",
    available: true,
  },
]

export default function DoctorScheduleGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {doctorData.map((doctor) => (
        <Card
          key={doctor.id}
          className="border bg-gradient-to-br from-accent/10 via-card to-secondary/5 hover:shadow-md transition-all duration-300 group"
        >
          <CardContent className="p-4">
            <div className="space-y-3">
              {/* Status Badge & Name */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {doctor.name}
                  </p>
                  <p className="text-xs text-accent font-medium">{doctor.specialty}</p>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 ${
                    doctor.available
                      ? "bg-green-400/20 text-green-600 dark:text-green-400"
                      : "bg-red-400/20 text-red-600 dark:text-red-400"
                  }`}
                >
                  {doctor.available ? "✓" : "×"}
                </div>
              </div>

              {/* Poli */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                <span className="font-medium truncate">{doctor.poli}</span>
              </div>

              {/* Schedule */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded px-2 py-1.5">
                <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="font-medium">
                  {doctor.startTime} - {doctor.endTime}
                </span>
              </div>

              {/* Next Patient */}
              {doctor.nextPatient && (
                <div className="bg-secondary/10 rounded px-2 py-1.5 border border-secondary/20">
                  <p className="text-xs text-muted-foreground mb-0.5">Pasien: </p>
                  <p className="font-bold text-sm text-secondary">{doctor.nextPatient}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
