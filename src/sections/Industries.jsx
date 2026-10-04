'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { GlowButton, SectionHead } from '../components/ui'
import useIsMobile from '../components/useIsMobile'

const ICONS = {
  retail: '/industry-assets/retail-icon.png',
  distribution: '/industry-assets/rmd-icon.png',
  health: '/industry-assets/hls-icon.png',
  banking: '/industry-assets/bfsi-icon.png',
}

const LOREM = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since 1966.'
const COPY = {
  retail: 'From smart shelves to hyper-personalised commerce, we help retailers modernise inventory, loyalty, and omnichannel operations with AI-native platforms.',
  distribution: 'We connect planning, warehousing, and delivery into one intelligent network so distributors can see and act on demand in real time.',
  health: 'From patient engagement to claims, we bring AI-native workflows to healthcare and life sciences without disturbing compliance.',
  banking: 'We modernise core banking, lending, and insurance operations with agentic AI that is auditable, explainable, and secure by design.',
}
const TABS = [
  { key: 'retail', label: 'Retail' },
  { key: 'distribution', label: 'Distribution' },
  { key: 'health', label: 'Healthcare & Life Science' },
  { key: 'banking', label: 'Banking, Financial Services, and Insurance' },
]

export default function Industries() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const isMobile = useIsMobile()
  const selectTab = (index) => setActive(index)

  /*
   * Desktop: the section is pinned (see .ind-pin in custom.css) and the scroll
   * position inside it picks the tab — one equal slice of the pinned distance
   * per tab. Plain page scrolling drives it, so trackpads, mouse wheels,
   * keyboard and the scrollbar all behave the same, and the page only moves
   * on to the next section after the last tab.
   */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (isMobile) return
    const next = Math.min(TABS.length - 1, Math.max(0, Math.floor(p * TABS.length)))
    setActive((cur) => (cur === next ? cur : next))
  })
  // Clicking a tab scrolls to that tab's slice, so scroll position and tab agree.
  const goToTab = (i) => {
    const el = ref.current
    if (isMobile || !el) return selectTab(i)
    const top = el.getBoundingClientRect().top + window.scrollY
    const range = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + range * ((i + 0.5) / TABS.length), behavior: 'smooth' })
  }

  const t = TABS[active]
  return (
    <section ref={ref} className={`section ${isMobile ? '' : 'ind-pin'}`}
      style={isMobile ? undefined : { height: `${100 + (TABS.length - 1) * 60}vh` }}>
      <div className={isMobile ? undefined : 'ind-sticky'}>
      <div className="container">
        <SectionHead label="Industries" title="Industries We Serve" />
        {isMobile ? (
          /* Mobile design replaces the tab list + card with a numbered
             accordion: the open item shows its copy and a Know More button. */
          <div className="ind-accordion">
            {TABS.map((tab, i) => (
              <div key={tab.key} className={`ind-item ${i === active ? 'open' : ''}`}>
                <button className="ind-item-head" aria-expanded={i === active}
                  onClick={() => selectTab(i === active ? -1 : i)}>
                  <span className="ind-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ind-label">{tab.label}</span>
                  <svg className="ind-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor"
                    strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 6.5 8 10.5l4-4" />
                  </svg>
                </button>
                {i === active && (
                  <div className="ind-item-body">
                    <p>{COPY[tab.key]}</p>
                    <GlowButton size="sm" className="solid-text">Know More</GlowButton>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
        <div className="ind-body">
          <ul className="ind-list" role="tablist">
            {TABS.map((tab, i) => (
              <li key={tab.key} className={i === active ? 'active' : ''}>
                <button role="tab" aria-selected={i === active} onClick={() => goToTab(i)} onMouseEnter={() => selectTab(i)}>{tab.label}</button>
                {i === active && <motion.span layoutId="ind-underline" className="ind-underline" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
              </li>
            ))}
          </ul>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .9, ease: [0.22, 1, 0.36, 1] }}>
            <div className="ind-card" role="tabpanel">
              <AnimatePresence mode="wait">
                <motion.div key={t.key}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: .35, ease: [0.22, 1, 0.36, 1] }}>
                  <motion.div className="ind-icon" initial={{ scale: .8, rotate: -8 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
                    <img src={ICONS[t.key]} alt="" />
                  </motion.div>
                  <p>{LOREM}</p>
                  <GlowButton size="sm" className="solid-text">Know More</GlowButton>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        )}
      </div>
      </div>
    </section>
  )
}
