import Dust from '@/components/Dust'
import Navbar from '@/sections/Navbar'
import Connect from '@/sections/Connect'
import Footer from '@/sections/Footer'
import Hero from '@/sections/leadership/Hero'
import Profiles from '@/sections/leadership/Profiles'
import '@/styles/leadership.css'

export const metadata = {
  title: 'Executive Leadership — Sonata Software',
  description: 'The visionaries driving Sonata’s AI-first transformation agenda.',
}

export default function ExecutiveLeadershipPage() {
  return (
    <div className="ld-page">
      <Dust />
      <Navbar />
      <main>
        <Hero />
        <Profiles />
        <Connect />
      </main>
      <Footer />
    </div>
  )
}
