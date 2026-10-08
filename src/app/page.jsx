import Dust from '@/components/Dust'
import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import PointOfView from '@/sections/PointOfView'
import ProductStack from '@/sections/ProductStack'
import LatestUpdates from '@/sections/LatestUpdates'
import Clients from '@/sections/Clients'
import Testimonials from '@/sections/Testimonials'
import Alliances from '@/sections/Alliances'
import FeaturedBlogs from '@/sections/FeaturedBlogs'
import Industries from '@/sections/Industries'
import WhyChooseUs from '@/sections/WhyChooseUs'
import Recognitions from '@/sections/Recognitions'
import Winner from '@/sections/Winner'
import Connect from '@/sections/Connect'
import Footer from '@/sections/Footer'
import { getHomeContent } from '@/lib/drupal'

// Home page. This file is a Server Component and loads CMS content (Drupal); each section is a Client
// Component ('use client') because it animates with Framer Motion.
export default async function HomePage() {
  const cms = await getHomeContent()
  return (
    <>
      <Dust />
      <Navbar />
      <main>
        <Hero />
        <PointOfView />
        <ProductStack />
        <LatestUpdates />
        <Clients />
        <Testimonials quotes={cms.testimonials} />
        <Alliances />
        <FeaturedBlogs />
        <Industries />
        <WhyChooseUs />
        <Recognitions />
        <Winner />
        <Connect />
      </main>
      <Footer />
    </>
  )
}
