"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DoctorSchedule {
  id: string
  name: string
  specialty: string
  poli: string
  schedule: {
    [day: string]: {
      time: string
      available: boolean
    } | null
  }
}

const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]

const groupByPoli = (doctors: DoctorSchedule[]) => {
  return doctors.reduce(
    (acc, doctor) => {
      if (!acc[doctor.poli]) {
        acc[doctor.poli] = []
      }
      acc[doctor.poli].push(doctor)
      return acc
    },
    {} as Record<string, DoctorSchedule[]>,
  )
}

export default function DoctorScheduleWeekly() {
  const [doctors, setDoctors] = useState<DoctorSchedule[]>([])
  const [selectedPoli, setSelectedPoli] = useState<string>("Jantung")

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("https://rsmmbogor.com/api/doctor-schedule")
        const data = await response.json()
        setDoctors(data)
      } catch (error) {
        console.error("Failed to fetch doctors:", error)
      }
    }
    fetchDoctors()
  }, [])

  const groupedDoctors = groupByPoli(doctors)
  const poliList = Object.keys(groupedDoctors)

  useEffect(() => {
    if (poliList.length > 0 && !poliList.includes(selectedPoli)) {
      setSelectedPoli(poliList[0])
    }
  }, [poliList, selectedPoli])

  const [autoScrollIndex, setAutoScrollIndex] = useState(0)
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const selectedDoctors = groupedDoctors[selectedPoli] || []
  const totalDoctors = selectedDoctors.length
  const hasMoreThanTen = totalDoctors > 10

  useEffect(() => {
    scrollIntervalRef.current = setInterval(() => {
      // Hitung batas maksimal scroll (total - 10). Jika total < 10, maka 0.
      const maxScroll = Math.max(0, totalDoctors - 10)

      // Jika sudah mencapai batas bawah scroll, pindah ke Poli berikutnya
      if (autoScrollIndex >= maxScroll) {
        const currentIndex = poliList.indexOf(selectedPoli)
        const nextIndex = (currentIndex + 1) % poliList.length
        setSelectedPoli(poliList[nextIndex])
        setAutoScrollIndex(0) // Reset scroll ke atas untuk poli baru
      } else {
        // Jika belum, scroll ke bawah
        setAutoScrollIndex((prev) => prev + 1)
      }
    }, 4000)

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current)
      }
    }
  }, [selectedPoli, autoScrollIndex, totalDoctors])

  const displayedDoctors = selectedDoctors.slice(autoScrollIndex, autoScrollIndex + 10)

  return (
    <div className="flex flex-col h-full gap-1.5">
      <div className="flex gap-1 overflow-x-auto pb-1">
        {poliList.map((poli) => (
          <Button
            key={poli}
            onClick={() => {
              setSelectedPoli(poli)
              setAutoScrollIndex(0)
            }}
            variant={selectedPoli === poli ? "default" : "outline"}
            className="whitespace-nowrap text-xs sm:text-xs py-1 px-1.5 sm:px-2 h-6 sm:h-7"
          >
            {poli.length > 8 ? poli.slice(0, 8) : poli}
          </Button>
        ))}
      </div>

      <Card className="border bg-gradient-to-br from-accent/5 via-card to-secondary/5 overflow-hidden flex-1 flex flex-col">
        <CardHeader className="pb-1 pt-1.5 px-2 sm:px-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg sm:text-xl lg:text-base">Jadwal Dokter Per Poli - {selectedPoli}</CardTitle>
            {hasMoreThanTen && (
              <span className="text-xs text-muted-foreground">
                {autoScrollIndex + 1}-{Math.min(autoScrollIndex + 10, totalDoctors)} dari {totalDoctors}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-hidden flex flex-col">
          <div className="overflow-x-auto overflow-y-auto flex-1">
            <table className="w-full text-xs sm:text-xs">
              <thead>
                <tr className="border-b bg-muted/50 sticky top-0 z-20">
                  <th className="px-1.5 sm:px-2 py-1 sm:py-1.5 text-left font-semibold text-foreground sticky left-0 bg-muted/50 z-10 min-w-[70px] sm:min-w-[100px]">
                    Dokter
                  </th>
                  {daysOfWeek.map((day) => (
                    <th
                      key={day}
                      className="px-1 sm:px-2 py-1 sm:py-1.5 text-center font-semibold text-foreground min-w-[40px] sm:min-w-[50px] border-l text-xs"
                    >
                      <div className="uppercase tracking-tight text-muted-foreground text-xs">{day.slice(0, 3)}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayedDoctors.map((doctor) => (
                  <tr key={doctor.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-1.5 sm:px-2 py-1 sm:py-1.5 sticky left-0 bg-card z-10 font-medium">
                      <div className="space-y-0">
                        <p className="text-lg font-semibold text-foreground truncate">{doctor.name}</p>
                        {/* <p className="text-xs text-accent truncate hidden sm:block">{doctor.specialty}</p> */}
                      </div>
                    </td>
                    {daysOfWeek.map((day) => {
                      const daySchedule = doctor.schedule[day]
                      return (
                        <td key={`${doctor.id}-${day}`} className="px-1 sm:px-2 py-1 sm:py-1.5 text-center border-l">
                          {daySchedule ? (
                            <div className="space-y-0.5">
                              <div
                                className={`px-1 sm:px-1.5 py-0.5 rounded font-semibold whitespace-normal inline-block text-center text-base ${
                                  daySchedule.available
                                    ? "bg-green-400/20 text-green-700 dark:text-green-400"
                                    : "bg-amber-400/20 text-amber-700 dark:text-amber-400"
                                }`}
                              >
                                {daySchedule.time}
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-muted-foreground italic">-</div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground px-2 mt-2 sm:mt-2.5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-400/60"></div>
          <span>Dokter Tersedia</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-amber-400/60"></div>
          <span>Jadwal Terbatas</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="italic">-</span>
          <span>Tidak Bertugas</span>
        </div>
      </div>
    </div>
  )
}
