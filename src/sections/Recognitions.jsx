'use client'

import { useRef } from 'react'
import { motion, useAnimationFrame, useScroll, useTransform } from 'framer-motion'
import { ImagePlaceholder } from '../components/ui'
import useIsMobile from '../components/useIsMobile'

const AWARDS = [
  <><span>Sonata recognized as a</span><b>Major Contender</b><span>In Everest Group’s</span><small>PEAK Matrix® Assessment 2025</small><b>Cloud Services</b></>,
  <><span>Sonata recognized as a</span><b>Major Contender</b><span>In Everest Group’s</span><small>PEAK Matrix® Assessment 2026</small><b>Software Product Engineering Services</b></>,
  <><span>Sonata recognized as a</span><b>Star Performer <span style={{ display: 'inline', fontWeight: 300 }}>and</span> Major Contender</b><span>In Everest Group’s</span><small>PEAK Matrix® Assessment 2025</small><b>Enterprise Quality Engineering (QE) Services</b></>,
  <><span>Sonata recognized as an</span><b>Enterprise Innovator</b><span>In HFS Horizons 2024</span><b>Healthcare Payer Service Providers</b></>,
  <><span>Sonata recognized as a</span><b>Disruptor</b><span>In HFS Horizons 2025</span><b>Best Service Providers for Mortgage Reinvention</b></>,
  <><span>Sonata recognized as a</span><b>GCC Builder</b><span>In HFS Horizons 2026</span><b>GCC Services</b></>,
  <><span>Sonata won</span><b>CII AI Awards</b><span>for</span><b>Best AI Solution Showcase</b></>,
]
/** Cylindrical, inside-of-a-drum marquee: cards grow & angle toward you at the edges. */
function Cylinder() {
  const track = useRef(null)
  const offset = useRef(0)
  const hover = useRef(false)
  useAnimationFrame((_, delta) => {
    const el = track.current
    if (!el) return
    const cards = el.children
    const W = el.clientWidth
    const cardW = W < 700 ? 280 : 360
    const total = cards.length * cardW
    offset.current = (offset.current + (hover.current ? 0.012 : 0.05) * delta) % total
    for (let k = 0; k < cards.length; k++) {
      let x = k * cardW - offset.current
      x = ((x % total) + total) % total - total / 2 // centre around 0
      const d = Math.max(-1.25, Math.min(1.25, x / (W / 2)))
      const rot = -d * 26
      const z = d * d * 140
      const sy = 1 + d * d * 0.16
      cards[k].style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rot}deg) scaleY(${sy})`
      cards[k].style.opacity = Math.abs(d) > 1.2 ? 0 : 1
    }
  })
  return (
    <div className="recog-track" ref={track} onMouseEnter={() => (hover.current = true)} onMouseLeave={() => (hover.current = false)}>
      {AWARDS.map((a, k) => (
        <div className="recog-card" key={k}>
          <div className="grad" style={{ backgroundImage: "url('/recognition-assets/industry-recognition-card-BG.png')" }} />
          {a}
        </div>
      ))}
    </div>
  )
}

export default function Recognitions() {
  const isMobile = useIsMobile()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '12%'])
  const imgS = useTransform(scrollYProgress, [0, 0.5], [1.15, 1])
  return (
    <section className="recog" ref={ref}>
      <div className="recog-visual">
        <motion.div style={{ position: 'absolute', inset: 0, y: imgY, scale: imgS }}>
          <ImagePlaceholder src="/recognition-assets/industry-recognition-bg.jpg" alt="Industry recognition trophy" />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,13,17,.3), rgba(13,13,17,0) 30%, rgba(13,13,17,.7) 85%)' }} />
        <motion.h2 className="recog-title" initial={{ opacity: 0, y: 40, letterSpacing: '0.08em' }} whileInView={{ opacity: 1, y: 0, letterSpacing: '0em' }}
          viewport={{ once: true, amount: .6 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
          Industry Recognitions
        </motion.h2>
      </div>
      <div className="recog-band">
        <svg className="arcs" viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="arcg" x1="0" x2="1"><stop offset="0" stopColor="#de933a" /><stop offset=".45" stopColor="#6a6aa0" /><stop offset="1" stopColor="#3a7af0" /></linearGradient>
          </defs>
          <path d="M0 10 Q500 120 1000 10 L1000 420 L0 420Z" fill="#0d0d11" />
          <path d="M0 10 Q500 120 1000 10" fill="none" stroke="url(#arcg)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
          <path d="M0 400 Q500 300 1000 400" fill="none" stroke="url(#arcg)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
          <path d="M0 400 Q500 300 1000 400 L1000 420 L0 420Z" fill="#0d0d11" />
        </svg>
        {/* Mobile design shows one full-width award card, not the angled drum.
            Its top and bottom edges are shallow arcs with a warm-to-cool
            hairline, matching the curved band in the Figma frame. */}
        {isMobile ? (
          <>
          <svg className="recog-arc recog-arc-top" viewBox="0 0 393 50" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="arcm" x1="0" x2="1">
                <stop offset="0" stopColor="#de933a" /><stop offset=".45" stopColor="#8a8ab0" /><stop offset="1" stopColor="#3a7af0" />
              </linearGradient>
            </defs>
            <path d="M0 0 H393 V4 Q196.5 50 0 4 Z" fill="#0d0d11" />
            <path d="M0 4 Q196.5 50 393 4" fill="none" stroke="url(#arcm)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          </svg>
          <svg className="recog-arc recog-arc-bottom" viewBox="0 0 393 50" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 46 Q196.5 0 393 46 V50 H0 Z" fill="#0d0d11" />
            <path d="M0 46 Q196.5 0 393 46" fill="none" stroke="url(#arcm)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="recog-card recog-single">
            <div className="grad" style={{ backgroundImage: "url('/recognition-assets/industry-recognition-card-BG.png')" }} />
            {AWARDS[0]}
          </div>
          </>
        ) : <Cylinder />}
      </div>
    </section>
  )
}
