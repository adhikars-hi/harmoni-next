'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Grain, SectionHead } from '../components/ui'

const PILLARS = [
  { n: '01', t: <>Engineering for Enterprise Transformation</>, d: 'Solve complex technology and modernization problems — not just staff projects.' },
  { n: '02', t: <>Activate ecosystems</>, d: 'Bring the power of partners like Microsoft to customers in a practical, outcome-led way.' },
  { n: '03', t: <>Transform with AI</>, d: 'Combine engineering, process depth, IP and AI to accelerate meaningful business change.' },
]

const CARDS = [
  { t: <>Modernized<br />platforms</>, d: 'Legacy estates re-platformed and made AI-ready with cloud-native resilience.' },
  { t: <>Reimagined<br />processes</>, d: 'Core workflows redesigned around predictive, autonomous business outcomes.' },
  { t: <>Enabled<br />experiences</>, d: 'Customer-facing commerce and CX transformed with contextual generative agents.' },
  { t: <>Scaled partner<br />technologies</>, d: 'Ecosystem products adopted, co-engineered, and taken to global market speed.' },
]

// Connector lines in a 1050 x 70 box: each starts at the bottom-centre of a
// card and sweeps into the dot at the top of the "Enterprise velocity" panel.
const LINES = [
  { d: 'M127 2 C140 34 420 40 525 70', color: '#ffb066', size: 8 },
  { d: 'M392 2 C392 30 500 40 525 70', color: '#8fb4ff', size: 9 },
  { d: 'M658 2 C658 30 550 40 525 70', color: '#d9a6ff', size: 9 },
  { d: 'M923 2 C910 34 630 40 525 70', color: '#4aa3ff', size: 8 },
]

function Flow({ active, reduced }) {
  return (
    <svg className="adv-flow" viewBox="0 0 1050 70" aria-hidden="true">
      {LINES.map((l, i) => (
        <g key={i} className={active === i ? 'on' : ''}>
          <path className="adv-line" d={l.d} stroke={l.color} />
          <circle cx={[127, 392, 658, 923][i]} cy="2" r="3.5" fill={l.color} />
          {!reduced && (
            <rect x={-l.size / 2} y={-l.size / 2} width={l.size} height={l.size} rx="2" fill={l.color}>
              <animateMotion dur="3.4s" begin={`${i * 0.55}s`} repeatCount="indefinite" path={l.d} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.85;1" dur="3.4s" begin={`${i * 0.55}s`} repeatCount="indefinite" />
            </rect>
          )}
        </g>
      ))}
      <circle className="adv-hub" cx="525" cy="70" r="5" />
    </svg>
  )
}

export default function AdvantageSonata() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(-1)
  return (
    <section className="section adv">
      <div className="container">
        <SectionHead label="Advantage Sonata" title={<>Trusted Engineering<br />Partner for Enterprises</>} />

        <div className="adv-grid">
          <motion.aside className="adv-panel"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <Grain />
            {PILLARS.map((p) => (
              <div className="adv-pillar" key={p.n}>
                <span className="adv-num">{p.n}</span>
                <div>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </div>
            ))}
            <p className="adv-note">Sonata helps enterprises convert AI ambition into engineered, ecosystem-powered transformation.</p>
          </motion.aside>

          <div className="adv-diagram">
            <div className="adv-cards">
              {CARDS.map((c, i) => (
                <motion.article key={i} className="adv-card"
                  onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(-1)}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                  <h4>{c.t}</h4>
                  <p>{c.d}</p>
                </motion.article>
              ))}
            </div>
            <Flow active={active} reduced={reduced} />
            <motion.div className="adv-core"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <div className="adv-core-in">
                <h4>Enterprise velocity</h4>
                <p>Faster delivery<br />Higher quality<br />Lower cost</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
