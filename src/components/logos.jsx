/* Text wordmark placeholders for partner / client logos.
   Swap each `node` for the official SVG logo files from each brand's press kit. */
const Dots = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="4" cy="12" r="2.6"/><circle cx="12" cy="7" r="2.6"/><circle cx="20" cy="12" r="2.6"/><path d="M6.4 11 9.8 8.2M14.3 8.2 17.6 11"/></svg>)
const Face = () => (<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" opacity=".85"/><circle cx="9" cy="10" r="1.3" fill="#191a1f"/><circle cx="15" cy="10" r="1.3" fill="#191a1f"/><path d="M8.5 14.5q3.5 3 7 0" stroke="#191a1f" strokeWidth="1.4" fill="none"/></svg>)
const Burst = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2v20M4 6l16 12M20 6 4 18M2 12h20"/></svg>)
const Tile = () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" opacity=".8"/></svg>)
const Cloud = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 18h10a4 4 0 0 0 .6-8A6 6 0 0 0 6.2 9.5 4.3 4.3 0 0 0 7 18z"/></svg>)
const Loop = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M4 12c0-3 2-5 4-5 4 0 4 10 8 10 2 0 4-2 4-5s-2-5-4-5c-4 0-4 10-8 10-2 0-4-2-4-5z"/></svg>)

export const PARTNERS = {
  azure:      { name: 'Microsoft Azure', icon: <Tile /> },
  aws:        { name: 'aws', cls: 'aws' },
  anthropic:  { name: 'ANTHROPIC', cls: 'caps' },
  hf:         { name: 'Hugging Face', icon: <Face /> },
  perplexity: { name: 'perplexity', icon: <Burst /> },
  n8n:        { name: 'n8n', icon: <Dots /> },
  llama:      { name: 'Llama 4', icon: <Loop /> },
  gcloud:     { name: 'Google Cloud', icon: <Cloud /> },
  fabric:     { name: 'Microsoft Fabric', icon: <Tile /> },
  servicenow: { name: 'servicenow' },
  sap:        { name: 'SAP Joule' },
  agentforce: { name: 'Agentforce', icon: <Cloud /> },
}
