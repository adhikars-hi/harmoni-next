'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GlowButton, ImagePlaceholder } from '../components/ui'

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: .5 }, transition: { duration: .9, delay: d, ease: [0.22, 1, 0.36, 1] },
})

export default function Winner() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '8%'])
  return (
    <section className="winner" ref={ref} aria-label="Careers">
      <motion.div style={{ position: 'absolute', inset: 0, y }}>
        <ImagePlaceholder src="/winner-assets/career-bg.jpg" alt="A chess player planning a winning move" />
      </motion.div>
      <div className="winner-copy">
        <motion.div className="there" {...fade(0)}>THERE IS A WINNER IN</motion.div>
        <motion.div className="you" initial={{ opacity: 0, scale: .82, filter: 'blur(12px)' }} whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: .5 }} transition={{ duration: 1.1, delay: .1, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: 'left center' }}>YOU</motion.div>
        <motion.div className="move" {...fade(.25)}>MAKE<br />YOUR<br />MOVE</motion.div>
        <motion.div className="lbb" {...fade(.4)}>
          <span className="g">LEARN</span><span className="dot" /><span className="g b2">BELIEVE</span><span className="dot" /><span className="g">BECOME</span>
        </motion.div>
        <motion.div className="join" {...fade(.55)}>
          Join Us <GlowButton>Apply Now</GlowButton>
        </motion.div>
      </div>
    </section>
  )
}
