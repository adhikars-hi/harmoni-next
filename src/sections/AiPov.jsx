'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Grain, Reveal, SectionHead } from '../components/ui'

const STEPS = [
  { t: 'System of Record', d: 'Capture & transact' },
  { t: 'System of Intelligence', d: 'Sense & decide' },
  { t: 'System of Autonomous Action', d: 'Act & orchestrate' },
]

const ECOSYSTEMS = [
  { t: 'Compute Ecosystem', d: 'Cloud + GPU readiness, AI provisioning, agent runtime environments.' },
  { t: 'Knowledge Ecosystem', d: 'Data products, RAG + semantic layers, enterprise knowledge systems.' },
  { t: 'Governance Ecosystem', d: 'Compliance, observability, AI governance, human-in-the-loop controls.' },
]

const DRIVERS = [
  'Legacy Modernization & Knowledge Democratization',
  'SaaS Disintermediation & Process Transformation',
  'Front-End Transformation & Personalization',
]

// Dotted arc from the previous step's top-right corner up and over into the
// top-left of this step, ending in an arrowhead.
const Arc = () => (
  <svg className="aip-arc" width="96" height="58" viewBox="0 0 96 58" fill="none" aria-hidden="true">
    <defs>
      <marker id="aip-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M1 1 9 5 1 9z" fill="#19c3ec" />
      </marker>
    </defs>
    <path d="M2 56 C4 24 36 4 90 24" stroke="#19c3ec" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#aip-arrow)" />
  </svg>
)

const Label = ({ children }) => (
  <Reveal className="aip-label"><i /><span>{children}</span><i /></Reveal>
)

export default function AiPov() {
  const [hot, setHot] = useState(0)
  return (
    <section className="section aip">
      <div className="container">
        <SectionHead label="Our AI POV" title="From Systems of Record to Systems of Autonomous Action" />
        <Reveal delay={0.16} className="aip-sub">
          <b>Value at speed. Trust by design.</b>
          <p>Human + AI collaboration that compounds enterprise intelligence</p>
        </Reveal>

        <div className="aip-steps" onMouseLeave={() => setHot(0)}>
          {STEPS.map((s, i) => (
            <motion.div key={s.t} className={`aip-step ${hot === i ? 'is-hot' : ''}`}
              onMouseEnter={() => setHot(i)}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}>
              {i > 0 && <Arc />}
              <span className="aip-tab" />
              <div className="aip-face">
                <Grain />
                <h3>{s.t}</h3>
                <hr />
                <p>{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <Label>POWERED BY THREE AI ECOSYSTEMS</Label>
        <div className="aip-grid aip-eco">
          {ECOSYSTEMS.map((e, i) => (
            <Reveal key={e.t} delay={i * 0.08} className="aip-box">
              <h4>{e.t}</h4>
              <p>{e.d}</p>
            </Reveal>
          ))}
        </div>

        <Label>DRIVEN BY</Label>
        <div className="aip-grid aip-drv">
          {DRIVERS.map((d, i) => (
            <Reveal key={d} delay={i * 0.08} className="aip-box"><p>{d}</p></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
