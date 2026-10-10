'use client'

import { Reveal } from '../../components/ui'
import Eyebrow from './Eyebrow'

const FEATURES = [
  'Legacy data estate modernization across platforms',
  'AI Powered migration with Lightening Data Suite, IntelliConvert and IntelliMigrate',
  'Industry architecture blueprints for faster implementation',
  'PACE Strategy for structured modernization',
  'Harmoni.AI supporting responsible AI readiness',
  'Frontier™ Workbench for platformized service delivery',
  'Built-in governance for trusted AI-ready data',
  'Cross-platform approach aligned to existing estates',
]

export default function Features() {
  return (
    <section className="dm-sec dm-features">
      <div className="container">
        <Eyebrow>KEY FEATURES</Eyebrow>
        <Reveal as="h2" delay={0.08} className="dm-h2">Accelerate every step of data modernization</Reveal>
        <div className="dm-feat-grid">
          {FEATURES.map((t, i) => (
            <Reveal key={t} delay={(i % 4) * 0.07} className="dm-card dm-fcard">
              <span className="dm-badge">{String(i + 1).padStart(2, '0')}</span>
              <p>{t}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="dm-info">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.01" /></svg>
          <p>The source specifically positions Sonata across Microsoft Fabric, Databricks, Snowflake and AWS with platform selection based on the customer’s existing estate rather than a prescribed platform.</p>
        </Reveal>
      </div>
    </section>
  )
}
