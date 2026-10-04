'use client'

import { motion } from 'framer-motion'

/* ---------- Icons ---------- */
export const Chevron = ({ dir = 'right', className = '' }) => (
  <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === 'right' ? <path d="M4.5 2.5 8 6l-3.5 3.5" /> : <path d="M7.5 2.5 4 6l3.5 3.5" />}
  </svg>
)
export const Caret = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6l5 5 5-5" /></svg>
)
export const DoubleChevron = ({ dir = 'right' }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === 'right'
      ? <><path d="M4 3.5 8.5 8 4 12.5" /><path d="M8 3.5 12.5 8 8 12.5" /></>
      : <><path d="M12 3.5 7.5 8l4.5 4.5" /><path d="M8 3.5 3.5 8 8 12.5" /></>}
  </svg>
)

/* ---------- Glow pill button (chevron hops from left to right on hover) ---------- */
export function GlowButton({ children, size = '', className = '', as = 'button', ...rest }) {
  const Tag = as
  return (
    <Tag className={`glow-btn ${size} ${className}`} {...rest}>
      <span className="fill" />
      <Chevron className="chev left" />
      <span>{children}</span>
      <Chevron className="chev right" />
    </Tag>
  )
}

/* ---------- Film grain overlay (SVG turbulence) ---------- */
const GRAIN = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`
)}")`
export const Grain = () => <div className="grain" style={{ backgroundImage: GRAIN }} />

/* ---------- Image placeholder (pass `src` to swap in a real image) ---------- */
export function ImagePlaceholder({ src, alt = '', label = 'Image placeholder', background, className = '', style, children }) {
  return (
    <div className={`img-ph ${className}`} style={{ background, ...style }}>
      {src ? <img src={src} alt={alt} /> : <span className="ph-label">{label}</span>}
      {children}
    </div>
  )
}

/* ---------- Section heading: "// Label" + hairline + big light title ---------- */
export function SectionHead({ label, title, center = false, right = null, titleStyle }) {
  return (
    <>
      <Reveal className={`eyebrow ${center ? 'center' : ''}`}>
        <span>{`// ${label}`}</span>
        {right}
      </Reveal>
      {title && (
        <Reveal as="h2" delay={0.08} className={`section-title ${center ? 'center' : ''}`} style={titleStyle}>
          {title}
        </Reveal>
      )}
    </>
  )
}

/* ---------- Scroll reveal (fade + rise, once) ---------- */
export function Reveal({ as = 'div', children, delay = 0, y = 34, className, style, amount = 0.3, ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </M>
  )
}
