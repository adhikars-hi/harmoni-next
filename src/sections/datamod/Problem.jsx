'use client'

import { Reveal } from '../../components/ui'
import Eyebrow from './Eyebrow'

const PROBLEMS = [
  'Fragmented legacy estates drive higher TCO and technical debt',
  'Data silos prevent a unified enterprise data layer',
  'Manual migrations slow modernization and AI adoption',
  'Governance and lineage gaps limit trusted data',
  'Rising platform and licensing costs increase operational pressure',
]

export default function Problem() {
  return (
    <section className="dm-sec dm-problem">
      <div className="container">
        <div className="dm-split">
          <div>
            <Eyebrow strong>THE BUSINESS PROBLEM</Eyebrow>
            <Reveal as="h2" delay={0.08} className="dm-h2">Legacy data estates are holding modernization back</Reveal>
          </div>
          <Reveal as="p" delay={0.12} className="dm-lead">Fragmented legacy data estates increase TCO, technical debt and siloed insights, while manual database, ETL and reporting migrations slow modernization. Governance and lineage gaps further prevent enterprises from creating the trusted, AI-ready data foundation needed for transformation.</Reveal>
        </div>
        <hr className="dm-rule" />
        <div className="dm-problem-grid">
          {PROBLEMS.map((t, i) => (
            <Reveal key={t} delay={i * 0.07} className="dm-card dm-pcard">
              <span className="dm-num">{String(i + 1).padStart(2, '0')}</span>
              <p>{t}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="dm-note">
          Legacy environments including SQL Server, Azure Syanpse, Hadoop/Cloudera Ecosystem, DB2, along with SSIS, ADF, Alteryx, Talend and Informatica SaaS ETLs – Matillion, etc., Spark-based Pro-code, Abinitio &amp; DataStage, SSRS, Tableau, DOMO estates, can further complicate the path to a modern data platform.
        </Reveal>
      </div>
    </section>
  )
}
