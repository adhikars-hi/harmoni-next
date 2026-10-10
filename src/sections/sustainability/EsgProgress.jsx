'use client'

import { Reveal } from '../../components/ui'
import { BadgeCheck, Leaf, ShieldLock, UsersGroup } from './Icons'

const COLUMNS = [
  {
    key: 'env', title: 'ENVIRONMENT', icon: <Leaf />,
    items: [
      ['41%', 'Reduction in electrical consumption from baseline year 2019-20'],
      ['65%', 'Reduction in carbon emission from Baseline year 2019-20'],
      ['58.2%', 'Recycled water usage in FY 2025-26'],
    ],
  },
  {
    key: 'soc', title: 'SOCIAL', icon: <UsersGroup />,
    items: [
      ['INR 8.22 Crores', 'Investment made to communities'],
      ['356060 +', 'Beneficiaries in CSR activities'],
      ['4423', 'Participated in Sustainability / Environmental Health and Safety (EHS )'],
      ['30%', 'Woman Diversity in Workforce'],
    ],
  },
  {
    key: 'gov', title: 'GOVERNANCE', icon: <ShieldLock />,
    items: [
      ['42.86%', 'Independent Board of Directors'],
      ['Zero', 'Cases of disciplinary action for bribery or corruption'],
      ['Board Level', 'ESG committee & Risk management Committee'],
      ['Robust', 'Governance Policies'],
    ],
  },
]

const DISCLOSURES = ['CDP', 'Ecovadis', 'DJSI', 'BRSR', 'ESG databook', 'Sustainibility Report', 'UNGC']

export default function EsgProgress() {
  return (
    <section className="section sus-sec">
      <div className="container">
        <Reveal as="h2" className="sus-h2">ESG Progress FY25-26</Reveal>
        <div className="sus-esg-grid">
          {COLUMNS.map((c, i) => (
            <Reveal key={c.key} delay={i * 0.1} className={`sus-esg sus-esg-${c.key}`}>
              <header>
                <span className="sus-orb">{c.icon}</span>
                <h3>{c.title}</h3>
              </header>
              <ul>
                {c.items.map(([v, l]) => (
                  <li key={v}><b>{v}</b><span>{l}</span></li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="sus-disclosures">
          <span className="lbl"><BadgeCheck />PUBLIC DISCLOSURES</span>
          <div>{DISCLOSURES.map((d) => <a key={d} href="#">{d}</a>)}</div>
        </Reveal>
      </div>
    </section>
  )
}
