'use client'

import { MotionConfig } from 'framer-motion'

/** Client-side providers shared by every page. */
export default function Providers({ children }) {
  // Respect the visitor's "reduce motion" OS setting for all Framer Motion animations.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
