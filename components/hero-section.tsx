"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center z-20">
      <div
        className="text-center px-6"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          opacity: Math.max(0, 1 - scrollY / 500),
        }}
      >
        <p className="text-primary text-sm md:text-base uppercase tracking-[0.3em] mb-4 animate-fade-in">
          Artista Escénica
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-foreground">
          Luna 
          <span className="block text-primary">Kuyen</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto mb-8 leading-relaxed">
          Teatro • Danza • Performance
        </p>
        <div className="flex items-center justify-center gap-6">
          <a
            href="#biografia"
            className="px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest hover:bg-accent transition-colors duration-300"
          >
            Descubrir
          </a>
          <a
            href="#contacto"
            className="px-8 py-3 border border-foreground/30 text-foreground text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-colors duration-300"
          >
            Contacto
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#biografia"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce"
        aria-label="Desplázate hacia abajo"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  )
}
