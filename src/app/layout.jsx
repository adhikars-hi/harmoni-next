// Fonts are bundled locally via @fontsource (no request to Google at runtime).
import '@fontsource/inter/latin-200.css'
import '@fontsource/inter/latin-300.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import '@fontsource/inter/latin-800.css'
import '@fontsource/roboto-mono/latin-300.css'
import '@fontsource/roboto-mono/latin-400.css'

// Order matters: base styles -> overrides -> responsive layer.
import '@/styles/globals.css'
import '@/styles/custom.css'
import '@/styles/mobile.css'

import Providers from './providers'

export const metadata = {
  title: 'Sonata Harmoni.AI — Engineering the AI Enterprise',
  description:
    'Sonata Harmoni.AI: responsible-first AI tooling for enterprise-scale engineering — Enterprise Workbench, Migration Studio, AgentBridge and Spina.',
  icons: { icon: '/favicon.svg' },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#191a1f',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
