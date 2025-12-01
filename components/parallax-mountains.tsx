"use client"

import { useEffect, useState } from "react"

export function ParallaxMountains() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted" />

      {/* Stars */}
      <div className="absolute inset-0 opacity-40" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Far mountains - slowest parallax */}
      <svg
        className="absolute bottom-0 w-full h-[60vh] opacity-30"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <path
          d="M0,600 L0,400 Q180,200 360,350 Q540,150 720,280 Q900,100 1080,250 Q1260,180 1440,320 L1440,600 Z"
          fill="oklch(0.15 0.02 280)"
        />
      </svg>

      {/* Middle mountains - medium parallax */}
      <svg
        className="absolute bottom-0 w-full h-[50vh] opacity-50"
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <path
          d="M0,500 L0,350 Q120,180 240,300 Q400,100 560,250 Q720,80 880,200 Q1040,120 1200,280 Q1320,200 1440,300 L1440,500 Z"
          fill="oklch(0.12 0.015 280)"
        />
      </svg>

      {/* Near mountains - faster parallax */}
      <svg
        className="absolute bottom-0 w-full h-[40vh] opacity-70"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        style={{ transform: `translateY(${scrollY * 0.35}px)` }}
      >
        <path
          d="M0,400 L0,280 Q100,150 200,240 Q350,80 500,200 Q650,50 800,180 Q950,100 1100,220 Q1250,140 1440,250 L1440,400 Z"
          fill="oklch(0.1 0.01 280)"
        />
      </svg>

      {/* Foreground silhouette */}
      <svg
        className="absolute bottom-0 w-full h-[25vh]"
        viewBox="0 0 1440 250"
        preserveAspectRatio="none"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <path
          d="M0,250 L0,200 Q80,120 160,180 Q280,80 400,150 Q520,60 640,140 Q760,90 880,160 Q1000,100 1120,170 Q1240,120 1440,180 L1440,250 Z"
          fill="oklch(0.08 0.01 280)"
        />
      </svg>
    </div>
  )
}
