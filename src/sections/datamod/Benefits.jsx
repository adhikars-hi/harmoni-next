'use client'

import { motion } from 'framer-motion'
import { Reveal } from '../../components/ui'
import Eyebrow from './Eyebrow'

const BENEFITS = [
  { v: '40-60%', pct: 60, d: 'Accelerate data modernization by 40–60% through Sonata’s modernization approach and accelerators' },
  { v: '20-30%', pct: 30, d: 'Reduce data platform run costs by 20–30% while creating a more efficient foundation' },
  { v: '100%', pct: 100, d: 'Establish one governed source of truth across the enterprise for trusted data consumption' },
  { v: '20-40%', pct: 40, d: 'Increase operational efficiency while lowering support costs by 20–40% through intelligent operations' },
]

export default function Benefits() {
  return (
    <section className="dm-sec dm-benefits">
      <div className="container">
        <Eyebrow>BENEFITS AND FEATURES</Eyebrow>
        <Reveal as="h2" delay={0.08} className="dm-h2">Modernize faster while reducing platform costs</Reveal>
        <div className="dm-ben-grid">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.v} delay={i * 0.08} className="dm-card dm-bcard">
              <b>{b.v}</b>
              <div className="dm-meter"><motion.i initial={{ width: 0 }} whileInView={{ width: `${b.pct}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} /></div>
              <p>{b.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
