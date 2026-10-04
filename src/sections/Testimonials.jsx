'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { DoubleChevron, SectionHead } from '../components/ui'
import useIsMobile from '../components/useIsMobile'

const QUOTES = [
  { q: 'Over the years as our business grew, so did our dependency on technology. We had invested in a lot of customization to our existing applications to automate our mission-critical functions. What we needed was a futuristic application, an all-encompassing one that would help us in digital transformation and set us up to win in a competitive landscape. We needed this to be done with minimal disruption to existing operations. Thanks to Sonata’s team the transformation was smooth, and we were able to go live in eight months. Moving to a Microsoft Dynamics 365 F & O cloud-based solution has helped us to transform, and we are able to engage with our ecosystem, experiencing cost benefits without compromising performance or reliability. Sonata’s Platformation methodology for platform-based transformation provided us with the insights and roadmap to leverage our technology investments.', who: '- Director IT, A Hospitality, Sporting & Recreational Equipment, and Retail company, USA' },
  { q: 'Thank you very much for your effort and the remarkable work. It was not easy and the team has worked very hard to reach the target.', who: '- IT Manager, A Fortune 500 Retail Company' },
  { q: 'Our new solar business unit needed an ERP system deployed within 60 days, and it needed to be cloud-based and turnkey since internal IT resources were limited. Additional time for business-process modeling was not an option. Despite these challenges, Sonata came through big time to meet our timeline requirements.', who: '- CIO, US Energy Firm' },
  { q: 'Sonata brought engineering depth and a genuine partnership mindset. Their teams understood our processes from day one and helped us embed AI into the workflows that matter most to our customers.', who: '- VP Engineering, A Global ISV' },
]

const QuoteIcon = () => (
  <svg className="quote-ico" viewBox="0 0 52 52" fill="none" aria-hidden="true">
    <path d="M26 4a21 21 0 1 0 12.6 37.8L47 46l-2.6-8.6A21 21 0 0 0 26 4z" stroke="#2f47d8" strokeWidth="2.4" strokeLinejoin="round" />
    <circle cx="16.5" cy="25" r="3.6" stroke="#3a5af0" strokeWidth="2.2" />
    <circle cx="26" cy="25" r="3.6" stroke="#b12bd8" strokeWidth="2.2" />
    <circle cx="35.5" cy="25" r="3.6" stroke="#ef9b2a" strokeWidth="2.2" />
  </svg>
)

export default function Testimonials() {
  const isMobile = useIsMobile()
  // current slide + direction, and the previous ones (to detect wrap-around)
  const [{ i, dir, pi, pdir }, setNav] = useState({ i: 0, dir: 1, pi: 0, pdir: 1 })
  // Start from a fixed desktop width so server and client render the same
  // markup, then pick up the real width once mounted.
  const [w, setW] = useState(1400)
  useEffect(() => { const r = () => setW(window.innerWidth); r(); window.addEventListener('resize', r); return () => window.removeEventListener('resize', r) }, [])
  const n = QUOTES.length
  const cardW = Math.min(760, w * 0.86)
  const step = cardW + Math.max(24, w * 0.07)
  const go = (d) => setNav((s) => ({ i: (s.i + d + n) % n, dir: d, pi: s.i, pdir: s.dir }))

  /*
   * Card offsets around the active one (0 = centre, ±1 = peeking, ±2 = parked
   * off-screen). With 4 cards only one is parked, and it is parked on the
   * side it just left: after "next" the window is [-2..1], after "prev" it
   * is [-1..2]. When a parked card has to re-enter from the other side, it
   * jumps there instantly (while invisible) and then slides in, instead of
   * flying back across the whole carousel — which was the back-and-forth
   * glitch on the last slide.
   */
  const offsetOf = (k, at, d) => {
    const lo = d > 0 ? -2 : -1
    return ((((k - at - lo) % n) + n) % n) + lo
  }

  return (
    <section className="testi">
      <div className="glow-field" />
      <div className="container" style={{ zIndex: 1 }}>
        <SectionHead label="Testimonials" title="What They Say" center />
      </div>
      <div className="testi-viewport">
        {/* Mobile design shows a single card in normal flow with the arrows
            below it, so it grows with the quote instead of clipping. */}
        {isMobile ? (
          <figure className="testi-card is-single" style={{ margin: 0 }}>
            <QuoteIcon />
            <blockquote>{QUOTES[i].q}</blockquote>
            <figcaption className="who">{QUOTES[i].who}</figcaption>
          </figure>
        ) : QUOTES.map((t, k) => {
          const off = offsetOf(k, i, dir)
          const prev = offsetOf(k, pi, pdir)
          const visible = Math.abs(off) <= 1
          const op = visible ? (off === 0 ? 1 : 0.85) : 0
          const wrapped = Math.abs(off - prev) > 1
          // re-entering card: start just outside the edge it enters from
          const entry = (off + Math.sign(off - prev)) * step
          return (
            <motion.figure key={k} className="testi-card" style={{ margin: 0, marginLeft: -cardW / 2 }}
              animate={wrapped
                ? { x: [entry, off * step], opacity: [0, op], scale: off === 0 ? 1 : 0.94 }
                : { x: off * step, opacity: op, scale: off === 0 ? 1 : 0.94 }}
              transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden={off !== 0}>
              <QuoteIcon />
              <blockquote>{t.q}</blockquote>
              <figcaption className="who">{t.who}</figcaption>
            </motion.figure>
          )
        })}
      </div>
      <div className="testi-nav">
        <span className="arrows">
          <button className={`arrow-btn ${dir < 0 ? 'active' : ''}`} onClick={() => go(-1)} aria-label="Previous testimonial"><DoubleChevron dir="left" /></button>
          /
          <button className={`arrow-btn ${dir > 0 ? 'active' : ''}`} onClick={() => go(1)} aria-label="Next testimonial"><DoubleChevron /></button>
        </span>
      </div>
    </section>
  )
}
