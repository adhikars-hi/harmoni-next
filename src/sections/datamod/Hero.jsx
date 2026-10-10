'use client'

import { motion } from 'framer-motion'
import { GlowButton, Reveal } from '../../components/ui'

export default function Hero() {
  return (
    <section className="dm-hero">
      <motion.img className="dm-hero-art" src="/data-modernization/hero-3d.webp" alt=""
        initial={{ opacity: 0, x: 40, scale: 1.03 }} animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
      <div className="container dm-hero-in">
        <Reveal as="h1">Modernize<br />legacy data for<br />AI readiness</Reveal>
        <Reveal as="p" delay={0.1}>Build a governed, future-ready data foundation</Reveal>
        <Reveal delay={0.2} className="dm-hero-cta">
          <GlowButton as="a" href="#solution">See it in action</GlowButton>
          <GlowButton as="a" href="#connect" className="ghost">Request a demo</GlowButton>
        </Reveal>
      </div>
    </section>
  )
}
