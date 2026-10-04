'use client'

import { motion } from 'framer-motion'
import { GlowButton, SectionHead } from '../components/ui'

const ITEMS = [
  { tag: '01 // AI_CORE', title: 'Sonata Accelerate AI-native Infrastructure for global enterprises.', meta: 'AUG 2026 // 04 MIN READ', rim: 'linear-gradient(135deg, #e0452f, #f06a2a 40%, #b0242f)' },
  { tag: '02 // TRUST', title: 'A new blueprint for responsible enterprise intelligence.', meta: 'AUG 2026 // INSIGHT', rim: 'linear-gradient(135deg, #b2227e, #e0306e 45%, #6d2ad6)' },
  { tag: '03 // SCALE', title: 'Engineering resilient eco-systems for always-on business.', meta: 'AUG 2026 // REPORT', rim: 'linear-gradient(135deg, #2f4df0, #6a3cf0 55%, #d0307a)' },
]

export default function LatestUpdates() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead label="Placeholder" title="Latest Updates" />
        <div className="updates-grid">
          {ITEMS.map((it, i) => (
            <motion.article key={it.tag} className="update-card" style={{ '--hover-rim': it.rim }}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }}
              transition={{ duration: .8, delay: i * .1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.025, transition: { duration: .35 } }}>
              <span className="halo" />
              <div className="tag">[ {it.tag} ]</div>
              <h4>{it.title}</h4>
              <div className="meta">{it.meta}</div>
              <GlowButton size="sm">Read More</GlowButton>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
