'use client'

import { Grain, Reveal } from '../../components/ui'
import { Award, BarChart, ShieldCheck } from './Icons'

const AWARDS = [
  {
    tone: 'teal', icon: <Award />, badge: 'EcoVadis MAR 2026 Silver', t: 'Eco Vadis ESG Rating 2026',
    d: "Received Silver Medal from Ecovadis ESG Rating . This showcases our performance in ESG policies, measures, impact and disclosures recognizing Sonata Software's performance in ESG management",
    l: 'SILVER MEDAL TIER', r: 'VALIDATED 2026',
  },
  {
    tone: 'purple', icon: <ShieldCheck />, badge: 'CDP Discloser 2026 Management Level B', t: 'CDP Climate Change 2026',
    d: 'Sonata received a B Rating, achieving the Management Level, which recognizes its structured approach to managing climate-related risks and opportunities through strong governance, emissions management, environmental policies, and sustainability disclosures.',
    l: 'LEVEL B MANAGEMENT', r: 'VALIDATED 2026',
  },
  {
    tone: 'mauve', icon: <BarChart />, badge: 'S&P Global ESG Score 63', t: 'S&P Global ESG Score',
    d: 'Received ESG score of 63, which reflects Sonata’s strong performance in environment, social and governance practices.',
    l: '63 / 100 AUDITED', r: 'VALIDATED 2026',
  },
]

export default function Awards() {
  return (
    <section className="sus-awards">
      <div className="container">
        <div className="sus-awards-head">
          <Reveal as="h2" className="sus-h2">Awards &amp;<br />Recognitions</Reveal>
          <Reveal as="p" delay={0.1}>In our sustainability journey, Sonata consistently upholds high standards, reflecting our dedication to environmental, social, and governance (ESG) principles. All awards and recognition showcase Sonata's comprehensive approach to sustainability, emphasizing our ongoing efforts to drive positive change across our operations.</Reveal>
        </div>
        <div className="sus-award-grid">
          {AWARDS.map((a, i) => (
            <Reveal key={a.t} delay={i * 0.1} className={`sus-award ${a.tone}`}>
              <Grain />
              <span className="ico">{a.icon}</span>
              <em className="badge">{a.badge}</em>
              <h3>{a.t}</h3>
              <p>{a.d}</p>
              <footer><span>{a.l}</span><b>{a.r}</b></footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
