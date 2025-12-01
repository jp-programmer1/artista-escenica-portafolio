"use client"

import { useEffect, useState } from "react"

export function SpiralDecorations() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Left spiral */}
      <svg
        className="absolute left-4 top-1/4 w-24 h-24 md:w-32 md:h-32 opacity-20"
        viewBox="0 0 100 100"
        style={{ transform: `rotate(${scrollY * 0.1}deg)` }}
      >
        <path
          d="M50,50 m0,-45 a45,45 0 1,1 0,90 a40,40 0 1,0 0,-80 a35,35 0 1,1 0,70 a30,30 0 1,0 0,-60 a25,25 0 1,1 0,50 a20,20 0 1,0 0,-40 a15,15 0 1,1 0,30 a10,10 0 1,0 0,-20 a5,5 0 1,1 0,10"
          fill="none"
          stroke="oklch(0.75 0.15 40)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Right spiral */}
      <svg
        className="absolute right-4 top-2/3 w-20 h-20 md:w-28 md:h-28 opacity-15"
        viewBox="0 0 100 100"
        style={{ transform: `rotate(${-scrollY * 0.08}deg)` }}
      >
        <path
          d="M50,50 m0,-45 a45,45 0 1,1 0,90 a40,40 0 1,0 0,-80 a35,35 0 1,1 0,70 a30,30 0 1,0 0,-60 a25,25 0 1,1 0,50 a20,20 0 1,0 0,-40 a15,15 0 1,1 0,30 a10,10 0 1,0 0,-20 a5,5 0 1,1 0,10"
          fill="none"
          stroke="oklch(0.65 0.12 40)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Small accent spiral */}
      <svg
        className="absolute left-1/4 top-1/2 w-16 h-16 opacity-10 hidden md:block"
        viewBox="0 0 100 100"
        style={{ transform: `rotate(${scrollY * 0.15}deg)` }}
      >
        <path
          d="M50,50 m0,-45 a45,45 0 1,1 0,90 a40,40 0 1,0 0,-80 a35,35 0 1,1 0,70 a30,30 0 1,0 0,-60 a25,25 0 1,1 0,50 a20,20 0 1,0 0,-40"
          fill="none"
          stroke="oklch(0.75 0.15 40)"
          strokeWidth="1"
        />
      </svg>

      {/* Bottom right spiral */}
      <svg
        className="absolute right-1/3 bottom-1/4 w-20 h-20 opacity-10 hidden lg:block"
        viewBox="0 0 100 100"
        style={{ transform: `rotate(${-scrollY * 0.12}deg)` }}
      >
        <path
          d="M50,50 m0,-45 a45,45 0 1,1 0,90 a40,40 0 1,0 0,-80 a35,35 0 1,1 0,70 a30,30 0 1,0 0,-60 a25,25 0 1,1 0,50"
          fill="none"
          stroke="oklch(0.65 0.12 40)"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  )
}
