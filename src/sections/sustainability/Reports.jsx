'use client'

import { Reveal } from '../../components/ui'
import { Download, FileLines, FileText, Gavel, Table } from './Icons'

const REPORTS = [
  { icon: <FileLines />, t: 'BRSR Report FY 25-26', badge: 'NEW / FY 25-26', d: 'Business Responsibility and Sustainability Reporting compliant with SEBI master framework.', size: '8.4 MB', featured: true },
  { icon: <FileText />, t: 'TCFD Report FY 24-25', tag: 'CLIMATE DISCLOSURE', d: 'Task Force on Climate-related Financial Disclosures alignment and scenario forecasting.', size: '4.1 MB' },
  { icon: <FileText />, t: 'CDP Report FY 24-25', tag: 'CARBON ARCHIVE', d: 'Audited Scope 1, Scope 2, and initial Scope 3 emissions registry and risk mitigation logs.', size: '3.6 MB' },
  { icon: <FileText />, t: 'Sustainability Report FY 24-25', tag: 'INTEGRATED ANNUAL', d: 'Annual narrative and audited KPI scorecard covering human capital, community and climate.', size: '12.8 MB' },
  { icon: <Table />, t: 'ESG Databook FY 24-25', tag: 'QUANTITATIVE EXCEL', d: 'Granular multi-year raw data tables covering historical trends from baseline year 2019-20.', size: '1.2 MB' },
  { icon: <Gavel />, t: 'Corporate Social Responsibility (CSR) Policy', tag: 'GOVERNANCE DIRECTIVE', d: 'Board-approved charter guiding social investment, partner selection, and impact assessment.', size: '540 KB' },
]

export default function Reports() {
  return (
    <section className="section sus-sec sus-reports">
      <div className="container">
        <div className="sus-head-row">
          <Reveal as="h2" className="sus-h2">Reports &amp; Disclosures</Reveal>
          <Reveal as="p" delay={0.1} className="sus-head-note">Access comprehensive governance publications, climate transition plans, and auditable sustainability data sheets.</Reveal>
        </div>
        <div className="sus-report-list">
          {REPORTS.map((r, i) => (
            <Reveal key={r.t} delay={i * 0.06} y={20} className={`sus-report ${r.featured ? 'featured' : ''}`}>
              <span className="ico">{r.icon}</span>
              <div className="body">
                <h3>{r.t}{r.badge ? <em className="new">{r.badge}</em> : <em className="tag">{r.tag}</em>}</h3>
                <p>{r.d}</p>
              </div>
              <span className="size"><FileText />PDF • {r.size}</span>
              <a className="dl" href="#">DOWNLOAD <Download /></a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
