// Small stroke icon set for the Sustainability page (24px grid, currentColor).
const Svg = ({ children, className = '', strokeWidth = 1.7, ...rest }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    {children}
  </svg>
)

export const Leaf = (p) => <Svg {...p}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></Svg>
export const LeafBolt = (p) => <Svg {...p}><path d="M20.5 12.5a8.5 8.5 0 1 1-8.2-8.6c2.9-.1 5.2-.9 7.2-2.4.9 2.2 1.4 4.2 1 11Z" /><path d="m12.5 7.5-3 5h4l-3 5" /></Svg>
export const Users = (p) => <Svg {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Svg>
export const UsersGroup = (p) => <Svg {...p}><circle cx="12" cy="8" r="3" /><circle cx="5" cy="9.5" r="2.2" /><circle cx="19" cy="9.5" r="2.2" /><path d="M6.5 20v-1.5A4 4 0 0 1 10.5 14.5h3a4 4 0 0 1 4 4V20" /><path d="M1.5 18.5v-.8a3 3 0 0 1 3-3M22.5 18.5v-.8a3 3 0 0 0-3-3" /></Svg>
export const ShieldLock = (p) => <Svg {...p}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><circle cx="12" cy="11" r="2.4" /><path d="M13.8 12.8 15.5 14.5" /></Svg>
export const ShieldCheck = (p) => <Svg {...p}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></Svg>
export const ShieldPlus = (p) => <Svg {...p}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="M12 9v6M9 12h6" /></Svg>
export const ShieldFill = (p) => <svg className={p.className} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="M12 5v15" stroke="#14151a" strokeWidth="1.4" /></svg>
export const Medal = (p) => <Svg {...p}><path d="M7 3h10v6a5 5 0 0 1-10 0z" /><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" /><path d="M12 14v3" /><path d="m12 7.5.7 1.4 1.5.2-1.1 1 .3 1.5-1.4-.8-1.4.8.3-1.5-1.1-1 1.5-.2z" /><path d="M8.5 21h7" /></Svg>
export const Award = (p) => <Svg {...p}><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" /><circle cx="12" cy="8" r="6" /></Svg>
export const BarChart = (p) => <Svg {...p}><path d="M5 21v-6M12 21V3M19 21V9" /></Svg>
export const FileText = (p) => <Svg {...p}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" /><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8" /></Svg>
export const FileLines = (p) => <Svg {...p}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></Svg>
export const Table = (p) => <Svg {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 3v18M3 9h18M3 15h18" /></Svg>
export const Gavel = (p) => <Svg {...p}><path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8" /><path d="m16 16 6-6M8 8l6-6M9 7l8 8M21 11l-8-8" /></Svg>
export const Download = (p) => <Svg {...p}><path d="M12 15V3M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5" /></Svg>
export const ArrowLeft = (p) => <Svg {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></Svg>
export const ArrowRight = (p) => <Svg {...p}><path d="M5 12h14M12 5l7 7-7 7" /></Svg>
export const BadgeCheck = (p) => <Svg {...p}><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></Svg>
