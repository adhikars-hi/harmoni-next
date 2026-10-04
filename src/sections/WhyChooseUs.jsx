'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHead } from '../components/ui'
import useIsMobile from '../components/useIsMobile'

const LOREM = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since 1966.'
const CARDS = [
  { t: 'Innovation', strip: 'linear-gradient(90deg, #3a1a10, #c95a2a 35%, #e9ddd6 55%, #2a6ee0 80%, #0f1c44)' },
  { t: 'Experience', strip: 'linear-gradient(90deg, #2a1a08, #d48a2a 30%, #e8e4d8 52%, #3a6ee6 75%, #1236c0)' },
  { t: 'Speed',      strip: 'linear-gradient(90deg, #d6452a, #f1d9d0 40%, #e45a2a 60%, #3a1a14 78%, #2a5ad8)' },
  { t: 'Solution',   strip: 'linear-gradient(90deg, #111a3a, #2a6ee6 30%, #d2e2f4 55%, #e0a040 80%, #b86a1a)' },
  { t: 'Support',    strip: 'linear-gradient(90deg, #0f1c5a, #1d3fd8 30%, #9fc4f4 55%, #2a4ad8 78%, #0f1640)' },
  { t: 'Scale',      strip: 'linear-gradient(90deg, #3a0f5a, #7a3cf0 30%, #e8d8f0 52%, #e0843a 76%, #5a2a0f)' },
]

/** Auto-advancing focus carousel: centre card sharp & lifted, neighbours progressively blurred. */
export default function WhyChooseUs() {
  const isMobile = useIsMobile()
  const [i, setI] = useState(1)
  const [paused, setPaused] = useState(false)
  const [w, setW] = useState(typeof window !== 'undefined' ? innerWidth : 1400)
  useEffect(() => { const r = () => setW(innerWidth); addEventListener('resize', r); return () => removeEventListener('resize', r) }, [])
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setI((c) => (c + 1) % CARDS.length), 2600)
    return () => clearInterval(id)
  }, [paused])
  const n = CARDS.length
  const step = w < 600 ? 220 : 268
  return (
    <section className="section why">
      <div className="container">
        <SectionHead label="USP’s" title="Why Choose Us" center />
      </div>
      <div className="why-stage" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {/* Mobile design shows a single card, so skip the depth carousel. */}
        {isMobile ? (
          <article className="why-card is-single">
            <div className="body">
              <h5>{CARDS[i].t}</h5>
              <p>{LOREM}</p>
            </div>
            <div className="strip" style={{ background: CARDS[i].strip, filter: 'blur(3px)', transform: 'scale(1.1)' }} />
          </article>
        ) : CARDS.map((c, k) => {
          let off = k - i
          if (off > n / 2) off -= n
          if (off < -n / 2) off += n
          const a = Math.abs(off)
          const wrapping = a >= 3 // card jumping from one edge to the other
          return (
            <motion.article key={c.t} className="why-card" onClick={() => setI(k)}
              animate={{
                x: off * step, y: a === 0 ? -8 : 0, scale: a === 0 ? 1.03 : 0.96,
                filter: `blur(${a === 0 ? 0 : a === 1 ? 2.6 : 6}px)`,
                opacity: a === 0 ? 1 : a === 1 ? 0.72 : a === 2 ? 0.5 : 0,
                zIndex: 10 - a,
              }}
              transition={wrapping ? { duration: 0 } : { duration: .8, ease: [0.22, 1, 0.36, 1] }}
              style={{ cursor: 'pointer' }}>
              <div className="body">
                <h5>{c.t}</h5>
                <p>{LOREM}</p>
              </div>
              <div className="strip" style={{ background: c.strip, filter: 'blur(3px)', transform: 'scale(1.1)' }} />
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
