import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Display Jadwal Dokter - RS Marzoeki Mahdi",
  description: "Dashboard manajemen jadwal dokter dan ketersediaan tempat tidur rumah sakit",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "https://rsmmbogor.com/cfind/thumbs/images/thumb_32_32_contain_favicon-aedf.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "https://rsmmbogor.com/cfind/thumbs/images/thumb_32_32_contain_favicon-aedf.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "https://rsmmbogor.com/cfind/thumbs/images/thumb_32_32_contain_favicon-aedf.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
