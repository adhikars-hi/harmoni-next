'use client'

import { motion } from 'framer-motion'
import { Reveal } from '../../components/ui'

export default function Hero() {
  return (
    <section className="ld-hero">
      <motion.img className="ld-hero-art" src="/leadership/hero-chess.jpg" alt=""
        initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }} />
      <div className="container ld-hero-in">
        <Reveal className="ld-crumb"><a href="#">About Us</a><i>/</i><span>Executive Leadership</span></Reveal>
        <Reveal as="h1" delay={0.08}>Executive<br />Leadership</Reveal>
        <Reveal as="p" delay={0.16}>The visionaries driving Sonata’s AI-first<br />transformation agenda</Reveal>
      </div>
    </section>
  )
}
