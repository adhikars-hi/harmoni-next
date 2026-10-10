'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from '../sustainability/Icons'

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

// Only the CEO's copy is in the design; the other three use placeholder text until the final bios arrive.
const PEOPLE = [
  {
    id: 'ceo', name: 'Rajsekhar Datta Roy', role: ['Chief Executive Officer,', 'Sonata Software Ltd.'], short: 'Chief Executive Officer',
    thumb: '/leadership/ceo-thumb.jpg', photo: '/leadership/ceo-large.jpg', first: 'Mr. Rajsekhar Datta Roy',
    bio: [
      'Raj brings more than three decades of experience in scaling technology practices and leading global delivery organizations for large enterprise clients. He has played a pivotal role in expanding Sonata Software’s Dynamics and Microsoft practices into some of the company’s largest industry-focused offerings, while driving strategy, delivery, and go-to-market initiatives.',
      'Over the years, Raj has spearheaded key delivery portfolios across product engineering, enterprise systems deployment, and large-scale digital transformation programs. Over the past year, he has been instrumental in advancing Sonata Software’s transformation into an AI-first organization. He has also led initiatives around the company’s Responsible-first AI approach and the development of Sonata Harmoni.AI. In addition, Raj has played a key role in improving operational margins over the past few quarters through focused execution and technology-led efficiencies.',
    ],
  },
  { id: 'sujit', name: 'Sujit Mohanty', role: ['Managing Director & Chief Executive', 'Officer, Sonata Information Technology Ltd.'], short: 'Managing Director & Chief Executive Officer, Sonata Information Technology Ltd.', thumb: '/leadership/sujit-thumb.jpg', photo: '/leadership/sujit-thumb.jpg', first: 'Mr. Sujit Mohanty', bio: [LOREM, LOREM] },
  { id: 'jagannathan', name: 'Jagannathan CN', role: ['Chief Financial Officer,', 'Sonata Software'], short: 'Chief Financial Officer, Sonata Software', thumb: '/leadership/jagannathan-thumb.jpg', photo: '/leadership/jagannathan-thumb.jpg', first: 'Mr. Jagannathan CN', bio: [LOREM, LOREM] },
  { id: 'balaji', name: 'Balaji Kumar', role: ['Chief Human Resource Officer,', 'Sonata Software'], short: 'Chief Human Resource Officer, Sonata Software', thumb: '/leadership/balaji-thumb.jpg', photo: '/leadership/balaji-thumb.jpg', first: 'Mr. Balaji Kumar', bio: [LOREM, LOREM] },
]

const pad = (n) => String(n).padStart(2, '0')

const Linkedin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="9" width="3.4" height="11" /><circle cx="5.7" cy="5.4" r="1.7" /><path d="M10 9h3.2v1.6c.6-1 1.7-1.8 3.3-1.8 3 0 3.6 2 3.6 4.6V20h-3.4v-5.4c0-1.3-.1-2.7-1.8-2.7s-2 1.3-2 2.6V20H10z" /></svg>
)

export default function Profiles() {
  const [i, setI] = useState(0)
  const [prog, setProg] = useState(0)
  const p = PEOPLE[i]
  const bioRef = useRef(null)
  const onScroll = (e) => {
    const el = e.currentTarget
    setProg(el.scrollHeight > el.clientHeight ? el.scrollTop / (el.scrollHeight - el.clientHeight) : 0)
  }
  const choose = (k) => {
    setI(k); setProg(0)
    if (bioRef.current) bioRef.current.scrollTop = 0
  }

  return (
    <>
      <section className="ld-profile">
        <div className="ld-glow" aria-hidden="true" />
        <div className="container ld-profile-in">
          <div className="ld-photo">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img key={p.id} src={p.photo} alt={p.name}
                initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} />
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={p.id} className="ld-info"
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
              <h2>{p.name}</h2>
              <div className="ld-role">{p.role.map((r) => <span key={r}>{r}</span>)}</div>
              <i className="ld-rule" />
              <div className="ld-bio-wrap">
                <div className="ld-bio" ref={bioRef} onScroll={onScroll} tabIndex={0}>
                  {p.bio.map((b, k) => <p key={k}>{b}</p>)}
                </div>
                <div className="ld-track" aria-hidden="true"><b style={{ top: `${prog * 82}%` }} /></div>
              </div>
              <div className="ld-connect">
                <span>Connect with {p.first} on</span>
                <a href="#" aria-label="LinkedIn"><Linkedin /></a>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="ld-count"><span>{pad(i + 1)} / {pad(PEOPLE.length)}</span><i /></div>
          <a className="ld-scroll" href="#team">SCROLL <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true"><path d="M6 2v8M3 7l3 3 3-3" /></svg></a>
        </div>
      </section>

      <section className="ld-strip" id="team">
        <div className="container ld-cards">
          {PEOPLE.map((m, k) => (
            <button key={m.id} className={`ld-card ${k === i ? 'on' : ''}`} onClick={() => choose(k)} aria-pressed={k === i}>
              <img src={m.thumb} alt="" />
              <span className="txt">
                <b>{m.name}</b>
                <em>{m.short}</em>
                <u>VIEW PROFILE <ArrowRight /></u>
              </span>
            </button>
          ))}
        </div>
      </section>
    </>
  )
}
