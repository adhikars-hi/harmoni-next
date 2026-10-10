import Dust from '@/components/Dust'
import Navbar from '@/sections/Navbar'
import Connect from '@/sections/Connect'
import Footer from '@/sections/Footer'
import Hero from '@/sections/sustainability/Hero'
import Vision from '@/sections/sustainability/Vision'
import EsgProgress from '@/sections/sustainability/EsgProgress'
import Certifications from '@/sections/sustainability/Certifications'
import Awards from '@/sections/sustainability/Awards'
import Reports from '@/sections/sustainability/Reports'
import EsgTimeline from '@/sections/sustainability/EsgTimeline'
import SdgIndicators from '@/sections/sustainability/SdgIndicators'
import '@/styles/sustainability.css'

export const metadata = {
  title: 'Sustainability at Sonata — Towards Shared Growth and a Prosperous Future',
  description: 'Sonata Software sustainability: ESG progress, certifications, awards, reports and community initiatives.',
}

export default function SustainabilityPage() {
  return (
    <>
      <Dust />
      <Navbar />
      <main>
        <Hero />
        <Vision />
        <EsgProgress />
        <Certifications />
        <Awards />
        <Reports />
        <EsgTimeline />
        <SdgIndicators />
        <Connect />
      </main>
      <Footer />
    </>
  )
}
