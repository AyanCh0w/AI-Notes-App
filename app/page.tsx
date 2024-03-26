"use client"
import Image from "next/image"
import localFont from "next/font/local"
import Audio from "@/components/Audio"

const supreme = localFont({ src: "../public/fonts/Supreme-Variable.ttf" })

export default function Home() {
  return (
    <main>
      <Audio />
    </main>
  )
}
