'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Caret, GlowButton, Reveal } from '../components/ui'

const Field = ({ name, label, required, type = 'text', full, textarea }) => (
  <div className={`field ${full ? 'full' : ''}`}>
    {textarea
      ? <textarea name={name} placeholder=" " aria-label={label} required={required} />
      : <input name={name} type={type} placeholder=" " aria-label={label} required={required} />}
    <span className="ph">{label}{required && <em> *</em>}</span>
  </div>
)

export default function Connect() {
  const [msg, setMsg] = useState(null)
  const [type, setType] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const missing = ['first', 'email', 'last', 'company'].filter((k) => !String(f.get(k) || '').trim())
    if (missing.length) return setMsg({ err: true, text: 'Fill in the fields marked * to send your enquiry.' })
    if (!/^\S+@\S+\.\S+$/.test(f.get('email'))) return setMsg({ err: true, text: 'Enter an email address like name@company.com.' })
    setMsg({ err: false, text: 'Thanks — your enquiry was sent. We’ll be in touch shortly.' })
    e.currentTarget.reset(); setType('')
  }
  return (
    <section className="connect" id="connect">
      <div className="container">
        <div>
          <Reveal as="h2">Let’s Connect</Reveal>
          <Reveal as="p" delay={.1}>Let’s start the journey, together.</Reveal>
        </div>
        <Reveal delay={.15}>
          <form className="form" onSubmit={onSubmit} noValidate>
            <Field name="first" label="Your Name" required />
            <Field name="email" label="Email" type="email" required />
            <Field name="last" label="Your Last Name" required />
            <Field name="phone" label="Phone" type="tel" />
            <Field name="company" label="Company Name" required />
            <div className="field">
              <select name="type" aria-label="Enquiry type" value={type} onChange={(e) => setType(e.target.value)} className={type ? 'chosen' : ''}>
                <option value="" disabled>Select Enquire Type</option>
                <option>AI Solutions</option><option>Services</option><option>Partnerships</option><option>Careers</option><option>Other</option>
              </select>
              <Caret className="caret" />
            </div>
            <Field name="message" label="Your Message" full textarea />
            <label className="consent">
              <input type="checkbox" name="sms" />
              <span>OPTIONAL: I agree to receive text messages from Sonata Software regarding my inquiry, requested services, consultations, events, webinars, product updates, and other relevant business communications. Message frequency varies. Message and data rates may apply. Reply HELP for help or STOP to cancel. Consent is not a condition of purchase. View our Privacy Policy and Terms &amp; Conditions.</span>
            </label>
            <div className="form-actions"><GlowButton size="lg" type="submit">SUBMIT</GlowButton></div>
            <AnimatePresence>
              {msg && (
                <motion.div className={`form-msg ${msg.err ? 'err' : ''}`} role="status"
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{msg.text}</motion.div>
              )}
            </AnimatePresence>
            <div className="privacy"><a href="#">Click here</a> to read our full Privacy Policy</div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
