import nextVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextVitals,
  {
    rules: {
      // The page uses plain <img> for the logo walls and card artwork.
      '@next/next/no-img-element': 'off',
    },
  },
  { ignores: ['.next/**', 'out/**', 'node_modules/**'] },
]

export default config
