import Navbar from '@/sections/Navbar'
import Connect from '@/sections/Connect'
import Footer from '@/sections/Footer'
import Hero from '@/sections/datamod/Hero'
import Problem from '@/sections/datamod/Problem'
import Solution from '@/sections/datamod/Solution'
import Features from '@/sections/datamod/Features'
import Benefits from '@/sections/datamod/Benefits'
import Stories from '@/sections/datamod/Stories'
import Insights from '@/sections/datamod/Insights'
import Faq from '@/sections/datamod/Faq'
import '@/styles/datamod.css'

export const metadata = {
  title: 'Modernize legacy data for AI readiness — Sonata Software',
  description: 'Build a governed, future-ready data foundation with Sonata’s Data Platform Modernization approach.',
}

export default function DataModernizationPage() {
  return (
    <div className="dm-page">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <Benefits />
        <Stories />
        <Insights />
        <Faq />
        <Connect
          className="dm-connect"
          preface="Ready to modernize your legacy data foundation?"
          subtitle={null}
          submitLabel="Get in touch"
        />
      </main>
      <Footer />
    </div>
  )
}
