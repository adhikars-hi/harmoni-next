'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import useIsMobile from '../components/useIsMobile'
import KeyedVideo from '../components/KeyedVideo'

const ease = [0.22, 1, 0.36, 1]

/**
 * Hero. Phones get a plain stacked hero, larger screens a pinned,
 * scroll-driven one. They are separate components so each owns its own
 * scroll hooks and refs (Framer Motion requires a useScroll target ref to be
 * attached to an element that is actually rendered).
 */
export default function Hero() {
  const isMobile = useIsMobile()
  return isMobile ? <HeroMobile /> : <HeroDesktop />
}

/* ------------------------------ Mobile ------------------------------ */
function HeroMobile() {
  // Scroll-scrubbed head video: plays out while the hero scrolls off screen.
  const mRef = useRef(null)
  const { scrollYProgress: mRaw } = useScroll({ target: mRef, offset: ['start start', 'end start'] })
  const mSmooth = useSpring(mRaw, { stiffness: 120, damping: 30, mass: 0.4 })
  const mVideoP = useTransform(mSmooth, [0, 0.7], [0, 1], { clamp: true })

  return (
    <section
      ref={mRef}
      className="hero hero--static"
      aria-label="Sonata Harmoni.AI"
    >
      <div className="hero-copy">
        <motion.div
          className="sonata"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          SONATA
        </motion.div>

        <motion.h1
          className="harmoni"
          initial={{
            opacity: 0,
            y: 22,
            filter: 'blur(8px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 1,
            delay: 0.1,
            ease,
          }}
        >
          HARMONI.AI
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.24,
            ease,
          }}
        >
          <div className="eng">Engineering the</div>
          <div className="ent">AI Enterprise</div>
        </motion.div>
      </div>

      {/* Mobile Video */}
      <motion.div
        className="hero-media"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.1,
          delay: 0.32,
        }}
      >
        <KeyedVideo className="hero-video" src="/videos/hero-video-scrub.mp4" progress={mVideoP} />
      </motion.div>

      <motion.p
        className="hero-tagline"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.42,
          ease,
        }}
      >
        Responsible-first AI tooling
        <br />
        for Enterprise scale Engineering
      </motion.p>
    </section>
  )
}

/* ------------------------------ Desktop ----------------------------- */
function HeroDesktop() {
  const ref = useRef(null)

  const { scrollYProgress: raw } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const p = useSpring(raw, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  })

  /*
   * Scroll-scrubbed head video: the clip's frame follows scroll position, so
   * the full animation plays out while the visitor scrolls through the hero
   * over the first 80% of the pinned scroll (finishing before the head fades
   * out), and reverses when they scroll back up.
   */
  const videoP = useTransform(p, [0, 0.8], [0, 1], { clamp: true })

  const copyY = useTransform(p, [0, 0.3], ['0vh', '-22vh'])
  const copyO = useTransform(p, [0, 0.12, 0.28], [1, 1, 0])

  /*
   * Head video geometry, taken from the 1920px Figma frame and scaled with
   * the viewport (Figma's prototype scales the frame down to the window):
   *   - the video plays at full frame width (1920 x 1080 at 1920px)
   *   - the head's ink runs from y=195 to y=915 inside the video
   *   - the video's top sits 106px above the "AI ENTERPRISE" baseline,
   *     which puts the top of the head 89px below that line
   *   - the tagline sits 93px below the bottom of the head
   * At rest (scroll 0) the layout matches the Figma frame; as you scroll the
   * head and tagline rise together into the middle of the viewport, then
   * drift out as before.
   */
  const copyRef = useRef(null)
  const entRef = useRef(null)
  const tagRef = useRef(null)
  const geoRef = useRef({ d1: 0, d2: 0 })
  const [geo, setGeo] = useState(null)

  useLayoutEffect(() => {
    const measure = () => {
      const copy = copyRef.current, ent = entRef.current, tag = tagRef.current
      if (!copy || !ent) return
      const vw = window.innerWidth, vh = window.innerHeight
      const k = vw / 1920
      const fs = parseFloat(getComputedStyle(ent).fontSize) || 54
      // Baseline of "AI ENTERPRISE" inside the sticky stage. Walk the whole
      // offsetParent chain: while Framer animates the entrance it sets
      // will-change on the wrapper, which briefly makes it the offsetParent.
      const stage = copy.offsetParent
      let y = 0
      for (let e = ent; e && e !== stage; e = e.offsetParent) y += e.offsetTop
      const entBase = y + ent.offsetHeight - fs * 0.22
      const top0 = entBase - 106 * k
      const tagH = tag ? tag.offsetHeight : 62
      const headTopMid = Math.max(24, (vh - (720 * k + 93 * k + tagH)) / 2)
      const d1 = headTopMid - 195 * k - top0
      const d2 = d1 - vh * 0.34
      geoRef.current = { d1, d2 }
      setGeo({ top0, w: vw, h: vw * 0.5625, tagTop: top0 + (915 + 93) * k })
    }
    measure()
    // re-measure once styles/fonts have settled and whenever the title reflows
    const raf = requestAnimationFrame(measure)
    const fonts = document.fonts && document.fonts.ready
    if (fonts) fonts.then(measure)
    const ro = new ResizeObserver(measure)
    if (copyRef.current) ro.observe(copyRef.current)
    window.addEventListener('load', measure)
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('load', measure)
      window.removeEventListener('resize', measure)
    }
  }, [])

  const lerp3 = (v, a, b) => {
    if (v <= 0) return 0
    if (v <= 0.45) return (v / 0.45) * a
    if (v <= 0.9) return a + ((v - 0.45) / 0.45) * (b - a)
    return b
  }
  const mediaY = useTransform(p, (v) => lerp3(v, geoRef.current.d1, geoRef.current.d2))

  const mediaO = useTransform(
    p,
    [0, 0.55, 0.85],
    [1, 1, 0]
  )

  const tagO = useTransform(
    p,
    [0.35, 0.55, 0.85, 0.98],
    [0, 1, 1, 0]
  )

  return (
    <section
      ref={ref}
      className="hero"
      aria-label="Sonata Harmoni.AI"
    >
      <div className="hero-sticky">

        {/* Hero Copy */}
        <motion.div
          ref={copyRef}
          className="hero-copy"
          style={{
            y: copyY,
            opacity: copyO,
          }}
        >
          <motion.div
            className="sonata"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              ease,
            }}
          >
            SONATA
          </motion.div>

          <motion.h1
            className="harmoni"
            initial={{
              opacity: 0,
              y: 30,
              filter: 'blur(10px)',
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            transition={{
              duration: 1.2,
              delay: 0.12,
              ease,
            }}
          >
            HARMONI.AI
          </motion.h1>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease,
            }}
          >
            <div className="eng">ENGINEERING THE</div>
            <div className="ent" ref={entRef}>AI ENTERPRISE</div>
          </motion.div>
        </motion.div>

        {/* Desktop Video */}
        <motion.div
          className="hero-orb"
          style={{
            x: '-50%',
            y: mediaY,
            opacity: mediaO,
            top: geo ? geo.top0 : '30vh',
            width: geo ? geo.w : '100vw',
            height: geo ? geo.h : '56.25vw',
            visibility: geo ? 'visible' : 'hidden',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.4,
            delay: 0.4,
          }}
        >
          <KeyedVideo className="hero-video" src="/videos/hero-video-scrub.mp4" progress={videoP} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          ref={tagRef}
          className="hero-tagline"
          style={{
            y: mediaY,
            opacity: tagO,
            top: geo ? geo.tagTop : undefined,
            bottom: geo ? 'auto' : undefined,
          }}
        >
          Responsible-first AI tooling
          <br />
          for Enterprise scale Engineering
        </motion.p>

      </div>
    </section>
  )
}