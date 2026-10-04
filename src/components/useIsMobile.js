'use client'

import { useSyncExternalStore } from 'react'

/**
 * True when the viewport is at or below `breakpoint` (px).
 *
 * Several sections render different markup on phones (static hero, industries
 * accordion, single testimonial card...). The server can't know the viewport,
 * so it always renders the desktop markup; useSyncExternalStore then switches
 * to the real value on the client as part of hydration, without a hydration
 * mismatch error and before the first paint of the hydrated tree.
 */
export default function useIsMobile(breakpoint = 768) {
  const query = `(max-width: ${breakpoint}px)`
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches, // client
    () => false,                            // server / hydration
  )
}
