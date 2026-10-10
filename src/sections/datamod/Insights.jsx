'use client'

import { GlowButton, Reveal } from '../../components/ui'
import Eyebrow from './Eyebrow'

const POSTS = [
  { tone: 'amber', tag: 'CLOUD STRATEGY', t: 'The Future of Data Lakes', d: 'Discover how modern data lakes are evolving into real-time data platforms, enabling faster decision-making and deeper insights across your organization.' },
  { tone: 'sky', tag: 'ARCHITECTURE', t: 'Microservices vs Monoliths', d: 'A deep dive into the trade-offs between monolithic architecture and microservices, and how to choose the right approach for your next application.' },
  { tone: 'plum', tag: 'SECURITY', t: 'Zero-Trust Infrastructure', d: 'Learn how zero-trust models are redefining enterprise security in the age of remote work and cloud-native applications.' },
]

export default function Insights() {
  return (
    <section className="dm-sec dm-insights">
      <div className="container">
        <Eyebrow strong>INSIGHTS</Eyebrow>
        <Reveal as="h2" delay={0.08} className="dm-h2">Thought leadership / Insights</Reveal>
        <hr className="dm-rule" />
        <div className="dm-post-grid">
          {POSTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.1} className={`dm-post ${p.tone}`}>
              <span className="dm-pill">{p.tag}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
              <GlowButton as="a" href="#" size="sm">Read more</GlowButton>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
