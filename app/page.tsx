import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"
import { BiographySection } from "@/components/biography-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactSection } from "@/components/contact-section"
import { ParallaxMountains } from "@/components/parallax-mountains"
import { SpiralDecorations } from "@/components/spiral-decorations"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ParallaxMountains />
      <SpiralDecorations />
      <Navigation />
      <HeroSection />
      <BiographySection />
      <GallerySection />
      <ContactSection />
    </main>
  )
}
