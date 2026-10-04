'use client'

import { useEffect, useRef } from 'react'

/**
 * Drifting dust specks behind the whole page (the "starfield" in the video).
 *
 * Tuning:
 *   density    specks per 100,000 CSS px of screen   (video ≈ 12, default 18)
 *   brightness 0–1 multiplier on speck opacity       (default 1)
 *   color      speck colour                          (default cool white)
 *
 * Specks are snapped to whole device pixels so they stay sharp on retina
 * screens instead of being smeared into an invisible blur.
 */
export default function Dust({ density = 20, brightness = 1, color = '220, 225, 238' }) {
  const ref = useRef(null)

  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w, h, dpr, parts = [], raf

    const make = () => {
      const r = Math.random()
      // 65% fine 1px specks, 28% 2px specks, 7% soft glowing motes
      const kind = r < 0.65 ? 'fine' : r < 1 ? 'mid' : 'glow'
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        kind,
        size: (kind === 'fine' ? 1 : kind === 'mid' ? 2 : 3) * dpr,
        a: kind === 'fine' ? 0.35 + Math.random() * 0.35
         : kind === 'mid'  ? 0.45 + Math.random() * 0.50
         :                   0.55 + Math.random() * 0.35,
        vx: (Math.random() - 0.5) * 0.08 * dpr,
        vy: (-0.03 - Math.random() * 0.07) * dpr, // slow upward drift
        tw: Math.random() * Math.PI * 2,
        tws: 0.008 + Math.random() * 0.02,
      }
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = c.width = Math.round(innerWidth * dpr)
      h = c.height = Math.round(innerHeight * dpr)
      c.style.width = innerWidth + 'px'
      c.style.height = innerHeight + 'px'
      const n = Math.round((innerWidth * innerHeight) / 100000 * density)
      parts = Array.from({ length: n }, make)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.tw += p.tws
        if (p.x < -4) p.x = w + 4; if (p.x > w + 4) p.x = -4
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w }
        if (p.y > h + 4) p.y = -4

        const alpha = Math.min(1, p.a * brightness * (0.6 + 0.4 * Math.sin(p.tw)))
        const x = Math.round(p.x), y = Math.round(p.y)

        if (p.kind === 'glow') {
          const R = p.size * 2.2
          const g = ctx.createRadialGradient(x, y, 0, x, y, R)
          g.addColorStop(0, `rgba(${color}, ${alpha})`)
          g.addColorStop(0.35, `rgba(${color}, ${alpha * 0.45})`)
          g.addColorStop(1, `rgba(${color}, 0)`)
          ctx.fillStyle = g
          ctx.fillRect(x - R, y - R, R * 2, R * 2)
        } else {
          ctx.fillStyle = `rgba(${color}, ${alpha})`
          ctx.fillRect(x, y, p.size, p.size)
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    resize(); draw()
    addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize) }
  }, [density, brightness, color])

  return <canvas ref={ref} className="dust" aria-hidden="true" />
}
