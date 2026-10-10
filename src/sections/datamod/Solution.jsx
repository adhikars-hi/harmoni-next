'use client'

import { Grain, Reveal } from '../../components/ui'
import Eyebrow from './Eyebrow'

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ex ipsum, iaculis ac lacus sit amet, tincidunt lacinia dui. Nam ipsum, iaculis ac lacus sit amet, tincidunt lacinia dui. Nam.'
const ITEMS = [
  'Sonata Lightening Data Suite IP',
  'Industry architecture blueprints and data mappings',
  'PACE Strategy and Harmoni.AI',
  'Frontier™ Workbench for accelerated modernization',
]

export default function Solution() {
  return (
    <section className="dm-sec dm-solution" id="solution">
      {/* Decorative amber/blue glow behind the cards (the Figma shows it as a
          noisy 3D blob; painted here as blurred gradients + grain). */}
      <div className="dm-blob dm-blob-sol" aria-hidden="true"><Grain /></div>
      <div className="container dm-sol-grid">
        <div className="dm-sol-copy">
          <Eyebrow strong>OUR SOLUTION</Eyebrow>
          <Reveal as="h2" delay={0.08} className="dm-h2">Modernize legacy data with a governed approach</Reveal>
          <Reveal as="p" delay={0.12} className="dm-lead">Sonata’s Data Platform Modernization approach transforms legacy data estates into a unified, governed cloud data platform and business-ready data products aligned to enterprise strategy. A platformized delivery approach, supported by Sonata IP, accelerators and architecture blueprints, helps accelerate modernization while establishing an AI-ready foundation.</Reveal>
        </div>
        <div className="dm-sol-cards">
          {ITEMS.map((t, i) => (
            <Reveal key={t} delay={0.1 + i * 0.08} className="dm-card dm-scard">
              <span className="dm-tag">{`// 0${i + 1}`}</span>
              <h3>{t}</h3>
              <p>{LOREM}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
