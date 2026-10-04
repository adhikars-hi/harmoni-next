'use client'

import { motion } from 'framer-motion'
import { GlowButton, Grain, ImagePlaceholder, SectionHead } from '../components/ui'

const CARDS = [
  { tag: '// AGENTIC_AI', title: 'AI-native in practice: Redesigning enterprise workflows with Agentic AI on Dynamics 365', body: 'McKinsey’s 2025 global survey found that 88% of organizations now use AI in at least one function.',
    bg: '/blog-assets/blog1-bg.png' },
  { tag: '// PARTNER', title: 'Driving cost efficiency and faster time-to-value with Microsoft Fabric migration using IntelliConvert', body: 'Modernize to Microsoft Fabric faster and cheaper with IntelliConvert, Sonata Software’s migration accelerator.',
    bg: '/blog-assets/blog2-bg.png' },
  { tag: '// AGENTIC_AI', title: 'Building an AI-ready data platform Data agents, Ontology, and governance in Microsoft Fabric', body: 'Move beyond “data in one place” to data structured for intelligent reasoning.',
    bg: '/blog-assets/blog3-bg.png' },
]

const HERO_BG = '/blog-assets/main-blog-BG.png'

export default function FeaturedBlogs() {
  return (
    <section className="section" style={{ paddingBottom: 60 }}>
      <div className="container">
        <SectionHead label="Insights" title="Featured Blogs" />
        <motion.article className="blog-hero"
          initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }}
          transition={{ duration: .9, ease: [0.22, 1, 0.36, 1] }}>
          <ImagePlaceholder src="/blog-assets/main-blog-image.jpg" alt="AI and human profiles blended with digital technology" />
          <div className="copy">
            <div className="grad" style={{ backgroundImage: `url(${HERO_BG})` }} />
            <Grain />
            <div className="tag">[ // AI_CORE ]</div>
            <h4>The next evolution of enterprise AI</h4>
            <p>A new generation of AI agents is shifting enterprise applications from systems that record transactions to systems that actively participate in business processes.</p>
            <div><GlowButton size="sm">Read More</GlowButton></div>
          </div>
        </motion.article>
        <div className="blog-grid">
          {CARDS.map((c, i) => (
            <motion.article key={i} className="blog-card"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }}
              transition={{ duration: .8, delay: i * .1, ease: [0.22, 1, 0.36, 1] }}>
              <div className="grad" style={{ backgroundImage: `url(${c.bg})` }} />
              <Grain />
              <div className="tag">[ {c.tag} ]</div>
              <h4>{c.title}</h4>
              <p>{c.body}</p>
              <div><GlowButton size="sm">Read More</GlowButton></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
