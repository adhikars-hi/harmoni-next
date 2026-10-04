'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Logo } from './Navbar'

const COLS = [
  ['AI SOLUTIONS', ['Harmoni.AI', 'Migration Studio', 'AgentBridge™', 'Spina']],
  ['SERVICES', ['Consulting', 'Engineering', 'Managed Services', 'Customer Experience']],
  ['INDUSTRIES', ['Retail', 'Healthcare', 'Distribution', 'Banking, Financial Services and Insurance']],
  ['ABOUT US', ['Our Story', 'Leadership', 'Careers', 'Investor Relations']],
]
const SOCIAL = [
  ['Facebook', <path key="f" d="M13.5 21v-7.5H16l.5-3h-3V8.6c0-.9.3-1.6 1.6-1.6h1.6V4.3A21 21 0 0 0 14.3 4c-2.4 0-4 1.4-4 4.1v2.4H7.8v3h2.5V21z" fill="currentColor" />],
  ['LinkedIn', <path key="l" d="M5 9h3v11H5zM6.5 4a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4zM10 9h2.9v1.5c.4-.8 1.4-1.7 3-1.7 3.1 0 3.6 2 3.6 4.7V20h-3v-5.8c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V20h-3z" fill="currentColor" />],
  ['Instagram', <g key="i" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17" cy="7" r=".6" fill="currentColor" /></g>],
  ['X', <path key="x" d="M4 4h4.5l3.6 5 4.2-5H19l-5.5 6.6L20 20h-4.5l-4-5.5L6.8 20H4.2l6-7z" fill="currentColor" />],
  ['YouTube', <path key="y" d="M21 8.2a2.6 2.6 0 0 0-1.8-1.8C17.6 6 12 6 12 6s-5.6 0-7.2.4A2.6 2.6 0 0 0 3 8.2 27 27 0 0 0 2.6 12c0 1.3.1 2.6.4 3.8a2.6 2.6 0 0 0 1.8 1.8C6.4 18 12 18 12 18s5.6 0 7.2-.4a2.6 2.6 0 0 0 1.8-1.8c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8zM10.2 14.6V9.4l4.6 2.6z" fill="currentColor" />],
]

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['45%', '3%'])
  return (
    <>
      <div className="wordmark" ref={ref} aria-hidden="true">
        <div className="inner"><motion.h2 style={{ y }}>HARMONI.AI</motion.h2></div>
      </div>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-about">
              <Logo />
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset’s Body Type sheets.</p>
            </div>
            {COLS.map(([h, items]) => (
              <div key={h}>
                <h6>{h}</h6>
                <ul>{items.map((it) => <li key={it}><a href="#">{it}</a></li>)}</ul>
              </div>
            ))}
          </div>
          <hr className="footer-rule" />
          <div className="socials">
            {SOCIAL.map(([name, icon]) => <a key={name} href="#" aria-label={name}><svg viewBox="0 0 24 24">{icon}</svg></a>)}
          </div>
        </div>
        <div className="subfooter">
          <div className="container">
            <nav><a href="#">Sitemap</a>|<a href="#">Disclaimer</a>|<a href="#">Privacy Statement</a></nav>
            <small>SONATA SOFTWARE © 2026</small>
          </div>
        </div>
      </footer>
    </>
  )
}
