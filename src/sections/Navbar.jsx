'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GlowButton } from '../components/ui'

// Logo lives in /public/brand so it is served as a plain static file.
const logoImg = '/brand/sonata-blk-logo.png'

export const Logo = () => (
  <a href="#top" className="logo" aria-label="Sonata Software home">
    <img 
      src={logoImg} 
      alt="Sonata Software" 
      className="logo-img"
    />
  </a>
)

const MENU = [
  ['AI Solutions', ['Harmoni.AI', 'Migration Studio', 'AgentBridge™', 'Spina']],
  ['Services', ['Consulting', 'Engineering', 'Managed Services', 'Customer Experience']],
  ['Industries', ['Retail', 'Distribution', 'Healthcare & Life Science', 'Banking, Financial Services & Insurance']],
  ['Investors', ['Financials', 'Annual Reports', 'Shareholder Info']],
  ['Alliances', ['Microsoft', 'AWS', 'Google Cloud', 'AI Partners']],
  ['Insights', ['Blogs', 'Case Studies', 'Whitepapers']],
  ['About Us', ['Our Story', 'Leadership', 'Careers', 'Investor Relations']],
]

export default function Navbar() {
  const [open, setOpen] = useState(null)
  const [mobile, setMobile] = useState(false)
  return (
    <header id="top" className={`nav ${mobile ? 'open' : ''}`}>
      <div className="container">
        <Logo />
        <ul className="nav-links">
          {MENU.map(([label, items]) => (
            <li key={label} className="nav-item" onMouseEnter={() => setOpen(label)} onMouseLeave={() => setOpen(null)}>
              <button aria-expanded={open === label} onClick={() => setOpen(open === label ? null : label)}>
                {label}
                <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3.5 5 6.5l3-3" /></svg>
              </button>
              <AnimatePresence>
                {open === label && (
                  <motion.div className="dropdown"
                    initial={{ opacity: 0, y: 8, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: .98 }}
                    transition={{ duration: .22, ease: [0.22, 1, 0.36, 1] }}>
                    {items.map((it) => <a key={it} href="#">{it}</a>)}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
          <li className="nav-item"><a href="#">Careers</a></li>
        </ul>
        <GlowButton as="a" href="#connect">Let’s Connect</GlowButton>
        <button className="burger" aria-label="Menu" onClick={() => setMobile(!mobile)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d={mobile ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'} /></svg>
        </button>
      </div>
    </header>
  )
}
