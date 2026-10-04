'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { DoubleChevron, Reveal } from '../components/ui'
import useIsMobile from '../components/useIsMobile'

const SLIDES = [
  {
    title: <>AI won’t define the winners.<br />Enterprise Velocity will.</>,
    body: [
      'The true value of AI isn’t hours saved or jobs automated. It is the speed at which an organization converts intelligence into better decisions, superior customer experiences, resilience, and growth.',
      'AI is the catalyst. Enterprise velocity is the competitive advantage.',
    ],
  },
  {
    title: <>Engineering<br />The AI Enterprise</>,
    sub: 'Powered by Platformation™',
    body: [
      'Accessing AI is easy. Embedding it into your business is the real challenge.',
      'True AI transformation requires a rare mix: deep engineering, process understanding, and repeatable IP. As a 40-year-old startup built on product engineering DNA, solving these complex problems is what we do. We don’t just build tech; we integrate AI into the products, processes, and ecosystems that power your growth.',
    ],
  },
]

export default function PointOfView() {
  const isMobile = useIsMobile()
  const ref = useRef(null)
  const [[i, dir], set] = useState([0, 1])
  // The first slide reveals with the section (rise + fade). Once the slides
  // start changing, the copy is rendered plain so only the dissolve plays.
  const [changed, setChanged] = useState(false)
  const go = (d) => {
    setChanged(true)
    set(([cur]) => {
      const next = (cur + d + SLIDES.length) % SLIDES.length
      return [next, d]
    })
  }
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    // On mobile the section collapses to its content, so there is no scroll
    // range to drive the slides — the arrows control them instead.
    if (isMobile) return
    const next = Math.min(SLIDES.length - 1, Math.floor(progress * SLIDES.length))
    set((current) => {
      if (current[0] === next) return current
      setChanged(true)
      return [next, next > current[0] ? 1 : -1]
    })
  })

  const s = SLIDES[i]
  return (
    <section ref={ref} className="pov">
      {/* The amber/blue glow lives inside the pinned stage so it stays in view
          for the whole pinned scroll, instead of scrolling away with the
          200vh section. */}
      <div className="pov-sticky">
        <div className="glow-field" />
        <div className="container">
          {/* Mobile design centres the eyebrow and drops the arrows to the
              bottom of the section; desktop keeps them on the eyebrow row. */}
          <Reveal className={`eyebrow ${isMobile ? 'center' : ''}`}>
            <span>{'// Our Point of View'}</span>
            {!isMobile && <span className="arrows">
              <button className={`arrow-btn ${dir < 0 ? 'active' : ''}`} onClick={() => go(-1)} aria-label="Previous"><DoubleChevron dir="left" /></button>
              /
              <button className={`arrow-btn ${dir > 0 ? 'active' : ''}`} onClick={() => go(1)} aria-label="Next"><DoubleChevron /></button>
            </span>}
          </Reveal>
          <div className="pov-stage">
            {/* Figma uses a Dissolve between slides: the copy stays in place
                while the new text fades in over the old one and the old one
                fades out. Both slides share one grid cell so they overlap. */}
            <AnimatePresence initial={false}>
              <motion.div key={i} className="pov-slide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] } }}
                exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.4, 0.0, 1, 1] } }}>
                {changed ? (
                  <>
                    <h2>{s.title}</h2>
                    {s.sub && <div className="sub">{s.sub}</div>}
                    {s.body.map((b, k) => <p key={k}>{b}</p>)}
                  </>
                ) : (
                  <>
                    <Reveal as="h2">{s.title}</Reveal>
                    {s.sub && <div className="sub">{s.sub}</div>}
                    {s.body.map((b, k) => <Reveal as="p" delay={.12 + k * .08} key={k}>{b}</Reveal>)}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          {isMobile && (
            <div className="pov-nav">
              <span className="arrows">
              <button className={`arrow-btn ${dir < 0 ? 'active' : ''}`} onClick={() => go(-1)} aria-label="Previous"><DoubleChevron dir="left" /></button>
              /
              <button className={`arrow-btn ${dir > 0 ? 'active' : ''}`} onClick={() => go(1)} aria-label="Next"><DoubleChevron /></button>
            </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
