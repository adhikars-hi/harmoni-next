// Drupal JSON:API client + mappers (server-only: import from Server Components).
//
// Endpoint: {DRUPAL_API_URL}/jsonapi/node/home_page
// One `node--home_page` resource; its text content lives in attributes:
//   field_testimonials  -> [{ value, format, processed }]  (HTML string per item)
// Each testimonials item is a <figure class="testi-card"> wrapping
//   <blockquote><p>QUOTE</p></blockquote> and <figcaption class="who">WHO</figcaption>
// The editors pasted our rendered card, so it also carries inline styles,
// aria-hidden and an SVG icon. We read only the two text values and render
// them as plain React text, so none of that markup (or any script a
// compromised CMS might add) reaches the page.

const BASE_URL = process.env.DRUPAL_API_URL || 'https://devcms.sonata-software.com'
const REVALIDATE_SECONDS = Number(process.env.DRUPAL_REVALIDATE || 300)

const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', ndash: '–', mdash: '—', hellip: '…' }

export function decodeEntities(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') {
      const cp = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)
      return Number.isFinite(cp) && cp > 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : m
    }
    return NAMED[e.toLowerCase()] ?? m
  })
}

// HTML fragment -> plain text (tags dropped, <br> and block ends become spaces).
export function htmlToText(html = '') {
  return decodeEntities(
    html
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
      .replace(/<svg[\s\S]*?<\/svg>/gi, '')
      .replace(/<br\s*\/?>|<\/p>/gi, ' ')
      .replace(/<[^>]+>/g, ''),
  ).replace(/\s+/g, ' ').trim()
}

const inner = (html, tag) => {
  const m = html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  return m ? m[1] : ''
}

/**
 * field_testimonials -> [{ q, who }]  (the shape <Testimonials quotes={…}/> uses)
 * Items missing a quote are skipped.
 */
export function mapTestimonials(items) {
  if (!Array.isArray(items)) return []
  return items
    .map((it) => {
      const html = it?.processed || it?.value || ''
      return { q: htmlToText(inner(html, 'blockquote')), who: htmlToText(inner(html, 'figcaption')) }
    })
    .filter((t) => t.q)
}

async function getHomePageNode() {
  const res = await fetch(`${BASE_URL}/jsonapi/node/home_page`, {
    headers: { Accept: 'application/vnd.api+json' },
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) throw new Error(`Drupal responded ${res.status}`)
  const json = await res.json()
  const node = Array.isArray(json.data) ? json.data.find((n) => n.attributes?.status !== false) : json.data
  if (!node) throw new Error('No published home_page node')
  return node
}

/**
 * Home-page content from Drupal. Every key is null when it could not be
 * loaded, so callers fall back to the built-in copy and the page never breaks
 * because the CMS is down.
 */
export async function getHomeContent() {
  try {
    const { attributes } = await getHomePageNode()
    const testimonials = mapTestimonials(attributes.field_testimonials)
    return { testimonials: testimonials.length ? testimonials : null }
  } catch (err) {
    console.warn('[drupal] using built-in content:', err.message)
    return { testimonials: null }
  }
}
