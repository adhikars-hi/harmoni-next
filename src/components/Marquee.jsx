'use client'

import { motion } from 'framer-motion'

/** Seamless infinite marquee. `reverse` scrolls left-to-right. */
export default function Marquee({ children, duration = 40, reverse = false, className = '' }) {
  return (
    <div className={`marquee ${className}`}>
      <motion.div
        className="marquee-track"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}
