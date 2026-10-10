'use client'

import { GlowButton, Reveal } from '../../components/ui'
import Eyebrow from './Eyebrow'

const STORIES = [
  {
    tone: 'violet', tag: 'MANUFACTURING',
    t: 'Reducing customer wait times for a global industrial belt manufacturer',
    d: 'Sonata accelerated a D365 F&O global rollout across 60 entities in 47 countries, replacing multiple legacy ERPs with a standardized global template that reduced customer wait times by 20%, supply chain and inventory holding by 25%, and month-end reconciliation effort by 35%.',
    stats: [['20%', 'Wait Time Reduction'], ['25%', 'Inventory Holding Drop'], ['35%', 'Faster Reconciliation'], ['60 / 47', 'Entities in 47 Countries']],
  },
  {
    tone: 'blue', tag: 'SPORTS & ENTERTAINMENT',
    t: 'Building a connected finance platform for a professional basketball franchise',
    d: 'Sonata modernized Great Plains ERP to D365 Finance across 13 legal entities, enabling connected finance operations, automated workflows and paperless transactions that accelerated decision-making by 25%, improved revenue uptake through upsell and cross-sell by 15%, and reduced operational costs by 20%.',
    stats: [['25%', 'Accelerated Decision-making'], ['15%', 'Revenue Uptake'], ['20%', 'Lower Operational Costs'], ['13', 'Legal Entities']],
  },
]

export default function Stories() {
  return (
    <section className="dm-sec dm-stories">
      <div className="container">
        <Eyebrow>CLIENT SUCCESS STORIES</Eyebrow>
        <Reveal as="h2" delay={0.08} className="dm-h2">Can we have a heading here?</Reveal>
        <div className="dm-story-grid">
          {STORIES.map((s, i) => (
            <Reveal key={s.tag} delay={i * 0.1} className={`dm-card dm-story ${s.tone}`}>
              <span className="dm-pill">{s.tag}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <div className="dm-stats">
                {s.stats.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}
              </div>
              <GlowButton as="a" href="#" size="sm">Read more</GlowButton>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
