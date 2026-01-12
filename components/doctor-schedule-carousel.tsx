"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    name: "Dr. Budi Santoso, Sp.Jantung",
    specialty: "Jantung",
    poli: "Poliklinik Jantung",
    startTime: "08:00",
    endTime: "16:00",
    available: true,
    nextPatient: "10:30",
  },
  {
    id: "2",
    name: "Dr. Siti Nurhaliza, Sp.PD",
    specialty: "Penyakit Dalam",
    poli: "Poliklinik Penyakit Dalam",
    startTime: "09:00",
    endTime: "17:00",
    available: true,
    nextPatient: "11:00",
  },
  {
    id: "3",
    name: "Dr. Ahmad Suryanto, Sp.Bedah",
    specialty: "Bedah Umum",
    poli: "Poliklinik Bedah",
    startTime: "08:30",
    endTime: "15:30",
    available: false,
  },
  {
    id: "4",
    name: "Dr. Retno Putri, Sp.Anak",
    specialty: "Anak",
    poli: "Poliklinik Anak",
    startTime: "09:00",
    endTime: "16:30",
    available: true,
    nextPatient: "09:45",
  },
  {
    id: "5",
    name: "Dr. Rinto Wijaya, Sp.Saraf",
    specialty: "Saraf",
    poli: "Poliklinik Saraf",
    startTime: "10:00",
    endTime: "18:00",
    available: true,
    nextPatient: "14:00",
  },
  {
    id: "6",
    name: "Dr. Dina Kusuma, Sp.Kulit",
    specialty: "Kulit & Kelamin",
    poli: "Poliklinik Kulit",
    startTime: "08:00",
    endTime: "16:00",
    available: true,
  },
]

export default function DoctorScheduleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoScroll, setAutoScroll] = useState(true)
  const itemsPerView = 3

  useEffect(() => {
    if (!autoScroll) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(doctorData.length / itemsPerView))
    }, 5000)
    return () => clearInterval(interval)
  }, [autoScroll])

  const handlePrev = () => {
    setAutoScroll(false)
    setCurrentIndex(
      (prev) => (prev - 1 + Math.ceil(doctorData.length / itemsPerView)) % Math.ceil(doctorData.length / itemsPerView),
    )
  }

  const handleNext = () => {
    setAutoScroll(false)
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(doctorData.length / itemsPerView))
  }

  const visibleDoctors = doctorData.slice(currentIndex * itemsPerView, (currentIndex + 1) * itemsPerView)

  return (
    <div className="space-y-4">
      {/* Carousel Container */}
      <div className="relative bg-card rounded-xl overflow-hidden border border-border p-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[280px]">
          {visibleDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="border-0 bg-gradient-to-br from-accent/10 via-card to-secondary/5 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-5">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm line-clamp-2">{doctor.name}</h3>
                      <p className="text-xs text-accent font-medium mt-1">{doctor.specialty}</p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${
                        doctor.available
                          ? "bg-green-400/20 text-green-600 dark:text-green-400"
                          : "bg-red-400/20 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {doctor.available ? "Tersedia" : "Busy"}
                    </div>
                  </div>

                  {/* Poli Location */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span className="font-medium">{doctor.poli}</span>
                  </div>

                  {/* Schedule Time */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 rounded-lg px-3 py-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">
                      {doctor.startTime} - {doctor.endTime}
                    </span>
                  </div>

                  {/* Next Patient */}
                  {doctor.nextPatient && (
                    <div className="pt-2 border-t border-border/30">
                      <p className="text-xs text-muted-foreground mb-1">Pasien berikutnya:</p>
                      <p className="font-bold text-sm text-secondary">{doctor.nextPatient}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary/90 hover:bg-primary text-primary-foreground rounded-full p-2 transition-all duration-200 z-10"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/90 hover:bg-primary text-primary-foreground rounded-full p-2 transition-all duration-200 z-10"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: Math.ceil(doctorData.length / itemsPerView) }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx)
              setAutoScroll(false)
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-primary w-8" : "bg-border hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Auto-scroll Toggle */}
      <div className="flex justify-center">
        <Button
          variant={autoScroll ? "default" : "outline"}
          size="sm"
          onClick={() => setAutoScroll(!autoScroll)}
          className={autoScroll ? "bg-primary text-primary-foreground" : ""}
        >
          {autoScroll ? "▶ Auto-scroll Aktif" : "⏸ Auto-scroll Mati"}
        </Button>
      </div>
    </div>
  )
}
