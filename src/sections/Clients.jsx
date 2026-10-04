'use client'

import Marquee from '../components/Marquee'
import { Reveal } from '../components/ui'
import { PARTNERS } from '../components/logos'

const ROWS = [
  ['azure', 'aws', 'anthropic', 'hf', 'perplexity', 'n8n', 'llama'],
  ['aws', 'azure', 'hf', 'anthropic', 'n8n', 'llama', 'perplexity'],
  ['hf', 'aws', 'azure', 'llama', 'anthropic', 'perplexity', 'n8n'],
  ['perplexity', 'n8n', 'aws', 'anthropic', 'llama', 'azure', 'hf'],
]

const LOGOS = {
  azure: 'ms-azure.png',
  aws: 'aws.png',
  anthropic: 'anthropic.png',
  hf: 'hugging-face.png',
  perplexity: 'perplexity.png',
  n8n: 'n8n.png',
  llama: 'llama-4.png',
}

const Logo = ({ k }) => {
  const p = PARTNERS[k]
  return <div className={`client-logo ${p.cls || ''}`}><img src={`/client-logos/${LOGOS[k]}`} alt={`${p.name} logo`} /></div>
}

export default function Clients() {
  return (
    <section className="section clients" style={{ paddingTop: 40 }}>
      <div className="container">
        <Reveal className="eyebrow center"><span>{'// Our Clients'}</span></Reveal>
        <Reveal as="h2" className="section-title center">Our Clients</Reveal>
      </div>
      <div className="container">
        {ROWS.map((row, i) => (
          <Marquee key={i} className="client-row" duration={34 + i * 4} reverse={i % 2 === 1}>
            {[...row, ...row].map((k, j) => <Logo key={j} k={k} />)}
          </Marquee>
        ))}
      </div>
    </section>
  )
}
