"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Bed } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RoomData {
  id: string
  poli: string
  totalBeds: number
  availableBeds: number
  occupiedBeds: number
  rooms: RoomDetail[]
}

interface RoomDetail {
  name: string
  total: number
  available: number
  occupied: number
  occupancyRate: number
}

const bedData: RoomData[] = [
  {
    id: "1",
    poli: "Jantung",
    totalBeds: 24,
    availableBeds: 8,
    occupiedBeds: 16,
    rooms: [
      { name: "Ruang Jantung A", total: 12, available: 4, occupied: 8, occupancyRate: 67 },
      { name: "Ruang Jantung B", total: 12, available: 4, occupied: 8, occupancyRate: 67 },
    ],
  },
  {
    id: "2",
    poli: "Penyakit Dalam",
    totalBeds: 32,
    availableBeds: 12,
    occupiedBeds: 20,
    rooms: [
      { name: "Ruang PD A", total: 16, available: 6, occupied: 10, occupancyRate: 63 },
      { name: "Ruang PD B", total: 16, available: 6, occupied: 10, occupancyRate: 63 },
    ],
  },
  {
    id: "3",
    poli: "Bedah",
    totalBeds: 20,
    availableBeds: 3,
    occupiedBeds: 17,
    rooms: [
      { name: "Ruang Bedah A", total: 10, available: 1, occupied: 9, occupancyRate: 90 },
      { name: "Ruang Bedah B", total: 10, available: 2, occupied: 8, occupancyRate: 80 },
    ],
  },
  {
    id: "4",
    poli: "Anak",
    totalBeds: 18,
    availableBeds: 7,
    occupiedBeds: 11,
    rooms: [
      { name: "Ruang Anak A", total: 9, available: 3, occupied: 6, occupancyRate: 67 },
      { name: "Ruang Anak B", total: 9, available: 4, occupied: 5, occupancyRate: 56 },
    ],
  },
  {
    id: "5",
    poli: "Saraf",
    totalBeds: 16,
    availableBeds: 6,
    occupiedBeds: 10,
    rooms: [{ name: "Ruang Saraf", total: 16, available: 6, occupied: 10, occupancyRate: 63 }],
  },
  {
    id: "6",
    poli: "Kulit",
    totalBeds: 14,
    availableBeds: 9,
    occupiedBeds: 5,
    rooms: [{ name: "Ruang Kulit", total: 14, available: 9, occupied: 5, occupancyRate: 36 }],
  },
]

export default function BedAvailabilityGrid() {
  const [expandedPoli, setExpandedPoli] = useState<string | null>(null)

  const getStatusColor = (occupancyRate: number) => {
    if (occupancyRate >= 85) return "bg-red-400/20 text-red-600 dark:text-red-400"
    if (occupancyRate >= 70) return "bg-yellow-400/20 text-yellow-600 dark:text-yellow-400"
    return "bg-green-400/20 text-green-600 dark:text-green-400"
  }

  const getProgressColor = (occupancyRate: number) => {
    if (occupancyRate >= 85) return "bg-red-500"
    if (occupancyRate >= 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  const totalBeds = bedData.reduce((sum, poli) => sum + poli.totalBeds, 0)
  const totalAvailable = bedData.reduce((sum, poli) => sum + poli.availableBeds, 0)
  const totalOccupied = bedData.reduce((sum, poli) => sum + poli.occupiedBeds, 0)
  const overallOccupancy = Math.round((totalOccupied / totalBeds) * 100)

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">Total Tempat Tidur</p>
              <p className="text-3xl font-bold text-foreground">{totalBeds}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">Tempat Tidur Tersedia</p>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{totalAvailable}</p>
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mb-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">Tempat Tidur Terisi</p>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{totalOccupied}</p>
                <TrendingDown className="w-5 h-5 text-orange-600 dark:text-orange-400 mb-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">Tingkat Okupansi</p>
              <div className="space-y-3">
                <p className="text-3xl font-bold text-secondary">{overallOccupancy}%</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-secondary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${overallOccupancy}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Poliklinik Beds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bedData.map((poli) => {
          const occupancyRate = Math.round((poli.occupiedBeds / poli.totalBeds) * 100)
          const isExpanded = expandedPoli === poli.id

          return (
            <div key={poli.id} className="space-y-2">
              <Card
                className={`cursor-pointer transition-all duration-300 border-0 hover:shadow-lg ${
                  isExpanded ? "ring-2 ring-primary/50" : ""
                }`}
                onClick={() => setExpandedPoli(isExpanded ? null : poli.id)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bed className="w-5 h-5 text-secondary" />
                    Poli {poli.poli}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Quick Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tersedia</span>
                      <span className="font-bold text-green-600 dark:text-green-400">
                        {poli.availableBeds}/{poli.totalBeds}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Terisi</span>
                      <span className="font-bold text-orange-600 dark:text-orange-400">{poli.occupiedBeds}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Okupansi</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(occupancyRate)}`}>
                          {occupancyRate}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`${getProgressColor(occupancyRate)} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${occupancyRate}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expanded View - Room Details */}
                  {isExpanded && (
                    <div className="space-y-3 border-t border-border/30 pt-3">
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Detail Ruangan</p>
                      {poli.rooms.map((room, idx) => {
                        const roomOccupancy = Math.round((room.occupied / room.total) * 100)
                        return (
                          <div key={idx} className="bg-muted/30 rounded-lg p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-foreground">{room.name}</span>
                              <span
                                className={`text-xs font-bold px-2 py-0.5 rounded ${getStatusColor(roomOccupancy)}`}
                              >
                                {room.available}/{room.total}
                              </span>
                            </div>
                            <div className="w-full bg-border/50 rounded-full h-1.5">
                              <div
                                className={`${getProgressColor(
                                  roomOccupancy,
                                )} h-1.5 rounded-full transition-all duration-500`}
                                style={{ width: `${roomOccupancy}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
