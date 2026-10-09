'use client'

import { motion } from 'framer-motion'
import { Grain, Reveal, SectionHead } from '../components/ui'

const COLUMNS = [
  {
    key: 'outcome',
    title: <>Outcome-led<br />Business Transformation</>,
    groups: [
      {
        name: 'AI Business Solutions',
        items: [
          'Business Apps Modernization on Dynamics - AX, GP, NAV, CRM, Legacy, SAP, SFDC Migrations',
          'Industry Process Re-Engineering – Consulting, IP led Engineering Services',
          'App innovation and automation on Copilot Studio',
        ],
      },
      {
        name: 'Service Experience Transformation',
        items: [
          'Digital Contact Center as a Service',
          'Intelligent IOT Driven Field Service',
          'Customer Experience Assessment and Measurement',
          'Human Centered Design and UX services',
          'Business Process Automation – AI & RPA',
        ],
      },
    ],
  },
  {
    key: 'platforms',
    title: <>AI-first<br />Technology Platforms</>,
    groups: [
      {
        name: 'Cloud',
        items: ['AI Led Application Modernization', 'Cloud Infrastructure Modernization for AI', 'Application Migration to Cloud'],
      },
      {
        name: 'Data',
        items: ['Data Platform Modernization for AI', 'Database Migration to Cloud', 'Data Strategy and Consulting', 'MDM – Customer, Supplier and Product'],
      },
      {
        name: 'AI',
        items: ['Resilient AI COE Services', 'Model Management & Tokenomics', 'Agents Ops and Observability', 'FDE Driven Value Realization'],
      },
    ],
  },
  {
    key: 'delivery',
    title: <>AI-native<br />Service Delivery & Support</>,
    groups: [
      {
        name: 'Engineering Services',
        items: ['Application Development, Support & Maintenance', 'DevOps & Cloud SecOps', 'Multi-Cloud DevOps Implementation', 'Quality Engineering'],
      },
      {
        name: 'Managed Services',
        items: ['Infrastructure and Operations', 'Agentic Front Desk', 'FinOps & SecOps', 'Business Operations Modernization'],
      },
    ],
  },
]

export default function CoreCompetencies() {
  return (
    <section className="section comp">
      <div className="container">
        <SectionHead label="Advantage Sonata" title="Sonata Core Competencies" />
        <Reveal as="p" delay={0.16} className="comp-sub">
          Sonata’s core competencies mapped to our AI-first portfolio – delivering business agility, experience and productivity for Enterprises
        </Reveal>

        <div className="comp-grid">
          {COLUMNS.map((c, i) => (
            <motion.article key={c.key} className={`comp-card comp-${c.key}`}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}>
              <header className="comp-head">
                <Grain />
                <h3>{c.title}</h3>
              </header>
              <div className="comp-body">
                {c.groups.map((g) => (
                  <div className="comp-group" key={g.name}>
                    <h4>{g.name}</h4>
                    <ul>
                      {g.items.map((it) => <li key={it}>{it}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
