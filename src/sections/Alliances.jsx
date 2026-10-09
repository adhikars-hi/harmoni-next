'use client'

import Marquee from '../components/Marquee'
import { Reveal } from '../components/ui'
import { PARTNERS } from '../components/logos'

const ROW1 = ['aws', 'anthropic', 'hf', 'perplexity', 'n8n', 'llama']
const ROW2 = ['fabric', 'servicenow', 'sap', 'agentforce', 'gcloud', 'llama']
const LOGOS = {
  aws: 'aws.png',
  anthropic: 'anthropic.png',
  hf: 'hugging-face.png',
  perplexity: 'perplexity.png',
  n8n: 'n8n.png',
  llama: 'llama-4.png',
  fabric: 'ms-fabric.png',
  servicenow: 'servicenow-now-assist.png',
  sap: 'sap-joule.png',
  agentforce: 'agentforce.png',
  gcloud: 'google-cloud.png',
}

const ACADEMIC = [
  {
    name: 'Wharton',
    sub: 'AI & Analytics Initiative',
    body: 'The collaboration aims to foster innovation and research in the emerging field of agentic AI, which will bring together academic and industry perspectives on enterprise-grade AI orchestration.',
  },
  {
    name: 'IISc',
    sub: 'Foundation of Science Innovation and Development',
    body: 'The collaboration focuses on advancing AI-driven scientific research, promoting educational outreach, upgrading infrastructure, and incubating AI startups.',
  },
]

const Box = ({ k }) => {
  const p = PARTNERS[k]
  return <div className="ally-box"><img src={`/alliance-logos/${LOGOS[k]}`} alt={`${p.name} logo`} /></div>
}

export default function Alliances() {
  return (
    <section className="alliances">
      <div className="container">
        <Reveal className="eyebrow center"><span>{'// Partners'}</span></Reveal>
        <Reveal as="h2" className="section-title center">Our Strategic AI Alliances</Reveal>
      </div>
      <Marquee className="ally-row" duration={38}>{[...ROW1, ...ROW1].map((k, i) => <Box key={i} k={k} />)}</Marquee>
      <Marquee className="ally-row" duration={42} reverse>{[...ROW2, ...ROW2].map((k, i) => <Box key={i} k={k} />)}</Marquee>
      <div className="ally-edu">
        {ACADEMIC.map((a, i) => (
          <Reveal key={a.name} delay={i * 0.1} className="ally-edu-card">
            <h3>{a.name}</h3>
            <h4>{a.sub}</h4>
            <p>{a.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
