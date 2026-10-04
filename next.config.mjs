/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't auto-generate AGENTS.md / CLAUDE.md in the project root on `next dev`.
  agentRules: false,
}

export default nextConfig
