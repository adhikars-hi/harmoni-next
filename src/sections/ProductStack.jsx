'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GlowButton } from '../components/ui'
import useIsMobile from '../components/useIsMobile'

const COPY = 'The unified AI command center for enterprise transformation. Orchestrate models, agents, workflows, and knowledge — from one secure, governed workspace.'

const PRODUCTS = [
  { name: 'Enterprise Workbench', bg: '/product-assets/enterprise-workbench-BG.png' },
  { name: 'Migration Studio', bg: '/product-assets/migration-studio-BG.png' },
  { name: 'AgentBridge™', bg: '/product-assets/agentbridge-BG.png' },
  { name: 'Spina', bg: '/product-assets/spina-BG.png' },
]

function StackCard({ i, total, progress, product }) {
  // Earlier cards shrink slightly and dim as later ones slide over them
  const start = i / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - 1 - i) * 0.035])
  const brightness = useTransform(progress, [start, 1], [1, 1 - (total - 1 - i) * 0.12])
  const filter = useTransform(brightness, (b) => `brightness(${b})`)
  // Mobile design is a plain vertical list, so drop the sticky offset and the
  // scroll-driven shrink/dim that make the desktop cards stack.
  const isMobile = useIsMobile()
  return (
    <div className="stack-card-wrap" style={isMobile ? undefined : { top: `calc(12vh + ${i * 22}px)` }}>
      <motion.article className="stack-card" style={isMobile ? undefined : { scale, filter }}
        initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }}
        transition={{ duration: .9, ease: [0.22, 1, 0.36, 1] }}>
        <div className="grad" style={{ backgroundImage: `url(${product.bg})` }} />
        <h3>Sonata Harmoni.AI<b>{product.name}</b></h3>
        <div>
          <p>{COPY}</p>
          <GlowButton size="sm">Know More</GlowButton>
        </div>
      </motion.article>
    </div>
  )
}

export default function ProductStack() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section className="stack">
      <div className="container" ref={ref}>
        {PRODUCTS.map((p, i) => <StackCard key={p.name} i={i} total={PRODUCTS.length} progress={scrollYProgress} product={p} />)}
        {/* desktop only: room for the last card to finish stacking (see .stack-tail) */}
        <div className="stack-tail" aria-hidden="true" />
      </div>
    </section>
  )
}
