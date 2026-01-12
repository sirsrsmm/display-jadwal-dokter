"use client"

import { Bed } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface PoliData {
  id: string
  poli: string
  totalBeds: number
  availableBeds: number
  occupiedBeds: number
}

const getOccupancyColor = (rate: number) => {
  if (rate >= 85) return "bg-red-500"
  if (rate >= 70) return "bg-yellow-500"
  return "bg-green-500"
}

const getOccupancyBadgeColor = (rate: number) => {
  if (rate >= 85) return "bg-red-400/20 text-red-600 dark:text-red-400"
  if (rate >= 70) return "bg-yellow-400/20 text-yellow-600 dark:text-yellow-400"
  return "bg-green-400/20 text-green-600 dark:text-green-400"
}

export default function BedAvailabilityCompact() {
  const [bedData, setBedData] = useState<PoliData[]>([])
  const [autoScrollIndex, setAutoScrollIndex] = useState(0)
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const totalBeds = bedData.length
  const hasMoreThanFive = totalBeds > 5

  useEffect(() => {
    const fetchBedAvailability = async () => {
      try {
        const response = await fetch("https://rsmmbogor.com/api/bed-availability")
        const data = await response.json()
        setBedData(data.map((poli: any) => ({
          id: poli.id_tt + poli.id_t_tt,
          poli: poli.nama_ruangan,
          totalBeds: poli.jumlah,
          availableBeds: poli.jumlah - poli.jumlah_tt_terpakai,
          occupiedBeds: poli.jumlah_tt_terpakai,
        })));
      } catch (error) {
        console.error("Failed to fetch bed availability:", error)
      }
    }
    fetchBedAvailability();
  }, [])

  useEffect(() => {
    if (!hasMoreThanFive) {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current)
      }
      setAutoScrollIndex(0)
      return
    }

    scrollIntervalRef.current = setInterval(() => {
      setAutoScrollIndex((prev) => (prev + 1) % (totalBeds - 4))
    }, 4000)

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current)
      }
    }
  }, [hasMoreThanFive, totalBeds])
  
  const displayedBeds = bedData.slice(autoScrollIndex, autoScrollIndex + 6)
  
  return (
    <div className="space-y-1 sm:space-y-1.5 h-full flex flex-col">
      {hasMoreThanFive && (
        <span className="text-xs text-muted-foreground text-right">
          {autoScrollIndex + 1}-{Math.min(autoScrollIndex + 10, totalBeds)} dari {totalBeds}
        </span>
      )}
      <div className="space-y-1 sm:space-y-1.5 flex-1 overflow-y-auto">
        {displayedBeds.map((poli) => {
          const occupancyRate = Math.round((poli.occupiedBeds / poli.totalBeds) * 100)
          return (
            <Card key={poli.poli} className="border bg-card/50 hover:bg-card/80 transition-colors">
              <CardContent className="p-1.5 sm:p-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1 flex-1 min-w-0">
                    <Bed className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-secondary flex-shrink-0" />
                    <h4 className="text-xs sm:text-xs font-semibold text-foreground truncate">{poli.poli}</h4>
                  </div>
                  <span
                    className={`text-xs font-bold px-1.5 py-0.25 rounded-full flex-shrink-0 ${getOccupancyBadgeColor(occupancyRate)}`}
                  >
                    {occupancyRate}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{poli.availableBeds}</span> /{" "}
                    {poli.totalBeds}
                  </span>
                  <span className="text-orange-600 dark:text-orange-400 font-semibold text-xs">
                    {poli.occupiedBeds}
                  </span>
                </div>

                <div className="w-full bg-muted rounded-full h-1">
                  <div
                    className={`${getOccupancyColor(occupancyRate)} h-1 rounded-full transition-all duration-500`}
                    style={{ width: `${occupancyRate}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
