"use client"

import { useEffect, useRef, useState } from "react"

export function BiographySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="biografia" ref={sectionRef} className="relative z-20 py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="aspect-[3/4] bg-card overflow-hidden">
              <img
                src="/bio.jpg"
                alt="Valentina Reyes - Retrato artístico"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-primary -z-10" />
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4">Sobre Mí</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Una vida dedicada al arte escénico</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Con más de 15 años de experiencia en las artes escénicas, mi pasión por el teatro y la danza ha sido el
                motor que impulsa cada una de mis creaciones. Formada en la Escuela Nacional de Arte Dramático, he
                tenido el privilegio de trabajar con reconocidos directores y compañías tanto nacionales como
                internacionales.
              </p>
              <p>
                Mi trabajo explora la intersección entre el cuerpo, la emoción y el espacio, buscando crear experiencias
                que trasciendan las barreras del lenguaje y conecten directamente con el alma del espectador.
              </p>
              <p>
                Creo firmemente que el arte tiene el poder de transformar, sanar y unir a las personas. Cada proyecto
                que emprendo es una oportunidad para explorar nuevos territorios expresivos y compartir historias que
                necesitan ser contadas.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
              <div>
                <p className="text-3xl font-bold text-primary">15+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Años</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Obras</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">8</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Premios</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
