"use client"

import { useState, useEffect } from "react"
import HospitalHeader from "@/components/hospital-header"
import DoctorScheduleWeekly from "@/components/doctor-schedule-weekly"
import BedAvailabilityCompact from "@/components/bed-availability-compact"

export default function HospitalDashboard() {
  const [currentDate, setCurrentDate] = useState<string>("")
  const [currentTime, setCurrentTime] = useState<string>("")

  useEffect(() => {
    const updateDate = () => {
      const now = new Date()
      setCurrentDate(
        now.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      )
    }
    updateDate()
    const interval = setInterval(updateDate, 60000) // Update date every minute
    return () => clearInterval(interval)
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex flex-col">
      <HospitalHeader currentDate={currentDate} currentTime={currentTime} />

      <main className="flex-1 overflow-hidden px-2 sm:px-3 py-2 sm:py-3">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-2 sm:gap-3 h-full">
          {/* Left Column - Doctor Schedule (responsive: full width on mobile, 70% on desktop) */}
          <div className="lg:col-span-7 flex flex-col overflow-hidden min-h-96 lg:min-h-0">
            <div className="mb-1.5 sm:mb-2">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold text-foreground mb-0.5">
                Jadwal Dokter Per Poli
              </h2>
              <p className="text-xs text-muted-foreground hidden sm:block">Jadwal mingguan per poliklinik</p>
            </div>
            <div className="flex-1 overflow-hidden">
              <DoctorScheduleWeekly />
            </div>
          </div>

          {/* Right Column - Bed Availability (responsive: full width on mobile, 30% on desktop) */}
          <div className="lg:col-span-3 flex flex-col overflow-hidden min-h-96 lg:min-h-0">
            <div className="mb-1.5 sm:mb-2">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold text-foreground mb-0.5">
                Ketersediaan Tempat Tidur
              </h2>
              <p className="text-xs text-muted-foreground hidden sm:block">Status per poliklinik</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              <BedAvailabilityCompact />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
