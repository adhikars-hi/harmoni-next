'use client'

import { motion } from 'framer-motion'
import { Reveal } from '../../components/ui'

export default function Hero() {
  return (
    <section className="sus-hero">
      <div className="container sus-hero-in">
        <div>
          <Reveal as="h1">Sustainability<br />at Sonata</Reveal>
          <Reveal as="p" delay={0.1}>Towards Shared Growth and a<br />Prosperous Future</Reveal>
        </div>
        <Reveal delay={0.2} className="sus-index">
          <div className="sus-index-top">
            <span><i className="dot cyan" />ESG MATURITY INDEX</span>
            <span className="cyan">FY25-26 AUDITED</span>
          </div>
          <div className="sus-index-score"><b>63</b><span>/ 100 S&amp;P Global</span></div>
          <div className="sus-bar"><motion.i initial={{ width: 0 }} whileInView={{ width: '63%' }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} /></div>
          <div className="sus-index-foot">
            <span><i className="dot violet" />MANAGEMENT LEVEL: B (CDP)</span>
            <span><i className="dot cyan" />SILVER MEDAL (ECOVADIS)</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
