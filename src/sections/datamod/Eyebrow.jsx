'use client'

import { Reveal } from '../../components/ui'

/** Cyan mono "// LABEL" used above each heading on the Data Modernization page. */
export default function Eyebrow({ children, strong = false }) {
  return <Reveal className={`dm-eyebrow ${strong ? 'strong' : ''}`}>{`// ${children}`}</Reveal>
}
