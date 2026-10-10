'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from '../components/ui'

const NAV = ['About Us', 'Careers', 'Contact Us', 'Locations']
const LEGAL = ['Sitemap', 'Disclaimer', 'Privacy Statement']

// Icons are drawn with the violet -> magenta gradient defined once in <Defs/>.
const G = 'url(#ft-grad)'
const SOCIAL = [
  ['Facebook', <path key="f" d="M13.5 21v-7.5H16l.5-3h-3V8.6c0-.9.3-1.6 1.6-1.6h1.6V4.3A21 21 0 0 0 14.3 4c-2.4 0-4 1.4-4 4.1v2.4H7.8v3h2.5V21z" fill={G} />],
  ['LinkedIn', <g key="l" fill="none" stroke={G} strokeWidth="1.2" strokeLinejoin="round"><circle cx="6.5" cy="5.6" r="1.7" /><path d="M5 9.5h3V20H5zM10.5 9.5h2.9V11c.5-.9 1.5-1.7 3-1.7 3 0 3.5 2 3.5 4.7V20h-3v-5.6c0-1.4-.1-2.9-1.9-2.9s-2.1 1.4-2.1 2.9V20h-3z" /></g>],
  ['Instagram', <g key="i" fill="none" stroke={G} strokeWidth="1.8"><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17" cy="7" r=".6" fill={G} /></g>],
  ['X', <path key="x" d="M4 4h4.5l3.6 5 4.2-5H19l-5.5 6.6L20 20h-4.5l-4-5.5L6.8 20H4.2l6-7z" fill="none" stroke={G} strokeWidth="1.2" strokeLinejoin="round" />],
  ['YouTube', <g key="y" fill="none" stroke={G} strokeWidth="1.6" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="3.6" /><path d="M10 9.4v5.2l4.4-2.6z" /></g>],
]

const Defs = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
    <defs>
      <linearGradient id="ft-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#b3169a" />
        <stop offset="1" stopColor="#6a2bd0" />
      </linearGradient>
    </defs>
  </svg>
)

const FooterLogo = () => (
  <a href="/" className="ft-logo" aria-label="Sonata Software home">
    <span className="ft-mark">
      <span className="word">SONATA</span>
      <span className="keys">{Array.from({ length: 10 }, (_, i) => <i key={i} />)}</span>
      <span className="sub">SONATA SOFTWARE</span>
    </span>
    <span className="ft-tag">The Modernization<br />Engineering Company</span>
  </a>
)

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['22%', '0%'])
  return (
    <footer className="ft">
      <Defs />
      <div className="ft-hero" ref={ref}>
        <Reveal as="h2" className="ft-stay">Stay Ahead with</Reveal>
        <div className="ft-word" aria-hidden="true">
          <motion.div style={{ y }}>
            {/* Drawn as SVG so the word is exactly the viewport wide whatever font
                the browser falls back to: textLength pins S to the left edge and
                the I of AI to the right edge. */}
            <svg className="ft-svg" viewBox="0 0 1000 176" preserveAspectRatio="xMidYMin meet">
              <defs>
                <linearGradient id="ft-fill" gradientUnits="userSpaceOnUse" x1="0" y1="35" x2="0" y2="188">
                  <stop offset="0" stopColor="#fff" stopOpacity=".04" />
                  <stop offset=".29" stopColor="#fff" stopOpacity=".12" />
                  <stop offset=".48" stopColor="#fff" stopOpacity=".3" />
                  <stop offset=".68" stopColor="#fff" stopOpacity=".55" />
                  <stop offset=".87" stopColor="#fff" stopOpacity=".85" />
                  <stop offset="1" stopColor="#fff" />
                </linearGradient>
                <linearGradient id="ft-fill-ai" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="84">
                  <stop offset="0" stopColor="#fff" stopOpacity=".06" />
                  <stop offset=".5" stopColor="#fff" stopOpacity=".35" />
                  <stop offset="1" stopColor="#fff" stopOpacity=".85" />
                </linearGradient>
              </defs>
              <text className="ft-t" x="1" y="188" fontSize="213" textLength="900" lengthAdjust="spacingAndGlyphs" fill="url(#ft-fill)">SONATA</text>
              <text className="ft-t" x="883" y="84" fontSize="117" textLength="117" lengthAdjust="spacingAndGlyphs" fill="url(#ft-fill-ai)">AI</text>
            </svg>
          </motion.div>
        </div>
      </div>

      <div className="ft-body">
        <div className="container">
          <div className="ft-top">
            <FooterLogo />
            <nav className="ft-nav" aria-label="Footer">
              {NAV.map((n) => <a key={n} href="#">{n}</a>)}
            </nav>
          </div>
          <hr className="ft-rule" />
          <div className="ft-bottom">
            <nav className="ft-legal" aria-label="Legal">
              {LEGAL.map((n) => <a key={n} href="#">{n}</a>)}
            </nav>
            <div className="ft-social">
              {SOCIAL.map(([name, icon]) => <a key={name} href="#" aria-label={name}><svg viewBox="0 0 24 24">{icon}</svg></a>)}
            </div>
          </div>
        </div>
      </div>

      <div className="ft-copy"><small>SONATA SOFTWARE © 2026</small></div>
    </footer>
  )
}
