'use client'

import { useState } from 'react'
import { Reveal } from '../../components/ui'
import { ArrowLeft, ArrowRight, Award, ShieldCheck, ShieldFill, ShieldPlus } from './Icons'

const CERTS = [
  { tone: 'cyan', icon: <ShieldCheck />, t: 'IGBC Platinum Certificate', d: 'IGBC Green Interiors (New Interiors) #GI233397 in Bengaluru office for energy efficiency, occupational safety and wellbeing.', tag: 'BENGALURU HEADQUARTERS' },
  { tone: 'pink', icon: <ShieldPlus />, t: 'ISO 14001 & ISO 45001', d: 'Certified management of environmental responsibilities and occupational health and safety risks through systematic processes and continual improvement.', tag: 'EHS STANDARDS COMPLIANT' },
  { tone: 'rose', icon: <Award />, t: 'Social Impact Assessment', d: 'Platinum Certification to Sonata CSR projects for Governance and impact of the projects by BlueSky.', tag: 'COMMUNITY ASSURANCE' },
  { tone: 'sky', icon: <ShieldFill />, t: 'ISO 9001 & ISO 27001', d: 'Quality Management and Information Security Management systems ensuring highest governance standards.', tag: 'GLOBAL ISO REGIME' },
]
const MAX = 1

export default function Certifications() {
  const [i, setI] = useState(0)
  return (
    <section className="section sus-sec">
      <div className="container">
        <div className="sus-head-row">
          <Reveal as="h2" className="sus-h2">Certifications</Reveal>
          <div className="sus-arrows">
            <button onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0} aria-label="Previous"><ArrowLeft /></button>
            <button onClick={() => setI((v) => Math.min(MAX, v + 1))} disabled={i === MAX} aria-label="Next"><ArrowRight /></button>
          </div>
        </div>
        <div className="sus-cert-viewport">
          <div className="sus-cert-track" style={{ transform: `translateX(calc(${-i} * (var(--cert-w) + var(--cert-gap))))` }}>
            {CERTS.map((c) => (
              <article key={c.t} className={`sus-cert ${c.tone}`}>
                <span className="ico">{c.icon}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                <footer><i />{c.tag}</footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
