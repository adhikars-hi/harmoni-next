'use client'

import { Grain, Reveal } from '../../components/ui'

export default function Vision() {
  return (
    <section className="section sus-sec sus-vision">
      <div className="container">
        <Reveal as="h2" className="sus-h2 center">Sustainability Vision</Reveal>
        <Reveal delay={0.1} className="sus-vision-card">
          <Grain />
          <p>
            At Sonata, our sustainability vision, "<b>Make a Deep Impact and Transform</b>," reflects our<br /> commitment to delivering meaningful and lasting positive outcomes for<br /> <b>people, the planet, and prosperity.</b>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
