'use client'

import { Reveal } from '../../components/ui'
import { Gavel, LeafBolt, UsersGroup } from './Icons'

const COLUMNS = [
  { key: 'env', title: 'ENVIRONMENT', icon: <LeafBolt />, items: ['Green Building Certification', 'Sustainable Procurement', 'EHS (Environment, Health and Safety)', 'Use of Renewable Energy', 'Water Recycling', 'Resource Efficiency'] },
  { key: 'soc', title: 'SOCIAL', icon: <UsersGroup />, items: ['Diversity and Inclusion Council', 'Employee Engagement on Sustainability', 'Essential Trainings ESG Posh', 'Human Right Due Diligence', 'Supplier Engagement'] },
  { key: 'gov', title: 'GOVERNANCE', icon: <Gavel />, items: ['Climate Risk Assessment', 'Policy Awareness Through Training', 'Sonata Public Disclosure'] },
]

export default function SdgIndicators() {
  return (
    <section className="section sus-sec">
      <div className="container">
        <Reveal as="h2" className="sus-h2">ESG indicators aligning<br />with SDGs</Reveal>
        <div className="sus-sdg-grid">
          {COLUMNS.map((c, i) => (
            <Reveal key={c.key} delay={i * 0.1} className={`sus-sdg sus-sdg-${c.key}`}>
              <header>{c.icon}<h3>{c.title}</h3></header>
              <ul>{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
