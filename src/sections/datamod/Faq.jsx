'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Caret, Grain, Reveal } from '../../components/ui'

const FAQS = [
  ['What is Sonata’s approach to legacy data modernization?', 'Sonata modernizes legacy data estates into a unified, governed cloud data platform and business-ready data products aligned to the enterprise’s strategic vision.'],
  ['Which legacy data platforms can Sonata modernize?', 'SQL Server, Azure Synapse, Hadoop/Cloudera, DB2 and Spark-based pro-code estates, along with legacy ETL and reporting tools such as SSIS, ADF, Alteryx, Talend, Informatica, Matillion, Abinitio, DataStage, SSRS, Tableau and DOMO.'],
  ['How does Sonata accelerate data modernization?', 'Through Sonata IP — the Lightening Data Suite, IntelliConvert and IntelliMigrate — a platformized delivery approach, industry architecture blueprints and the PACE strategy for structured modernization.'],
  ['How much can Sonata accelerate modernization?', 'Customers can accelerate data modernization by 40–60% through Sonata’s modernization approach and accelerators.'],
  ['Can modernization help reduce data platform costs?', 'Yes. Data platform run costs can be reduced by 20–30% while creating a more efficient foundation.'],
  ['Does Sonata support multiple modern data platforms?', 'Yes. Sonata works across Microsoft Fabric, Databricks, Snowflake and AWS, with platform selection based on the customer’s existing estate rather than a prescribed platform.'],
  ['How does modernization support AI readiness?', 'It establishes one governed source of truth across the enterprise, so trusted data with built-in governance is ready for AI consumption.'],
]

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="dm-sec dm-faq">
      {/* Amber/blue glow behind the list, continuing down behind the form. */}
      <div className="dm-blob dm-blob-faq" aria-hidden="true"><Grain /></div>
      <div className="container">
        <div className="dm-faq-head">
          <Reveal as="h2" className="dm-h2">FAQs</Reveal>
          <Reveal as="span" delay={0.1} className="dm-orange-pill">KNOWLEDGE REPOSITORY</Reveal>
        </div>
        <hr className="dm-rule" />
        <div className="dm-acc">
          {FAQS.map(([q, a], i) => {
            const isOpen = open === i
            return (
              <Reveal key={q} delay={i * 0.05} y={20} className={`dm-acc-item ${isOpen ? 'open' : ''}`}>
                <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{q}</span>
                  <Caret className="caret" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div className="dm-acc-body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                      <p>{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
