"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Phone, MapPin, Instagram, Youtube } from "lucide-react"

export function ContactSection() {
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
    <section id="contacto" ref={sectionRef} className="relative z-20 py-32 px-6 bg-card/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4">Hablemos</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Contacto</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            ¿Tienes un proyecto en mente? Me encantaría escuchar tus ideas y explorar nuevas oportunidades de
            colaboración.
          </p>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Email</h3>
                <a
                  href="mailto:contacto@valentinareyes.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  contacto@valentinareyes.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Teléfono</h3>
                <a href="tel:+34600123456" className="text-muted-foreground hover:text-primary transition-colors">
                  +34 600 123 456
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Ubicación</h3>
                <p className="text-muted-foreground">Madrid, España</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-border">
              <h3 className="font-semibold text-foreground mb-4">Sígueme</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-input border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-input border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 bg-input border border-border focus:border-primary focus:outline-none transition-colors resize-none text-foreground"
                placeholder="Cuéntame sobre tu proyecto..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-primary text-primary-foreground uppercase tracking-widest text-sm hover:bg-accent transition-colors duration-300"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">© 2025 Valentina Reyes. Todos los derechos reservados.</p>
        </div>
      </div>
    </section>
  )
}
