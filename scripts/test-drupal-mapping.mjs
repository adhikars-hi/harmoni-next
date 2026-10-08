// Run: node scripts/test-drupal-mapping.mjs
// Uses a fixture shaped like the live field_testimonials items (synthetic text).
import assert from 'node:assert/strict'
import { mapTestimonials } from '../src/lib/drupal.js'

const card = (q, who) =>
  `<figure class="testi-card" style="margin:0px 0px 0px -380px;opacity:1;transform:none;" aria-hidden="false"><svg class="quote-ico" viewbox="0 0 52 52" fill="none" aria-hidden="true"><path d="M26 4"/></svg><blockquote><p>${q}</p></blockquote><figcaption class="who">${who}</figcaption></figure>`

const items = [
  { value: card('Moving to Dynamics 365 F &amp; O wasn’t hard.', '- Director IT, USA'), format: 'full_html' },
  { value: 'x', processed: card('Plain quote.', '- IT Manager'), format: 'full_html' },
  { value: card('<strong>Bold</strong> &#039;quoted&#039;<br>second line', '- CIO &amp; Co'), format: 'full_html' },
  { value: '<figure><figcaption>no quote</figcaption></figure>' },
  { value: card('<script>alert(1)</script>Safe', '- X') },
]
const out = mapTestimonials(items)
assert.deepEqual(out.map((t) => t.q), ['Moving to Dynamics 365 F & O wasn’t hard.', 'Plain quote.', "Bold 'quoted' second line", 'Safe'])
assert.equal(out[0].who, '- Director IT, USA')
assert.equal(out[2].who, '- CIO & Co')
assert.deepEqual(mapTestimonials(null), [])
assert.ok(out.every((t) => !/[<>]/.test(t.q + t.who)))
console.log('ok —', out.length, 'testimonials mapped')
