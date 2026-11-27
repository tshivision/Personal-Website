// Everything you might want to swap lives here. No layout code needed.
export const SITE = {
  name: 'Tian Shi',
  role: 'Product Designer',
  roleDetail: 'UX/UI + AI',
  location: 'APAC-based',
  email: 'tian.s@live.com',
  // Your LinkedIn profile URL. Empty = the LinkedIn link is hidden.
  linkedin: 'https://www.linkedin.com/in/tianshi',
  resume: '/resume.pdf',
  // The scrolling strip under the homepage hero: AI tools and skills.
  marquee: [
    'Claude Code',
    'AI-enabled workflows',
    'Figma',
    'UX Pilot',
    'Product design',
    'Design systems',
    'Rapid prototyping',
    'UX research',
    'Content creation',
  ],
  // Figma deck with your most recent work.
  recentWorkDeck: 'https://www.figma.com/deck/3o9zZC3RrbXIIcTl4vxScw',

  description:
    'Tian Shi is an APAC-based product designer crafting elegant, intuitive experiences through systems thinking, first-principles design, and AI-enabled workflows.',

  // ── Link-in-bio (/links) ──────────────────────────────────────────────
  handle: '@tianstravel',
  tagline: 'Nomad, Money & Lifemaxxing',
  proof: '25+ countries · $100K+ invested',
  intro: 'Free tools and guided exercises to help you design a richer life: money, travel, and what comes next.',
  linksDescription:
    'Free tools and guided exercises from Tian Shi (@tianstravel) to help you design a richer life: money, travel, and life planning.',

  photo: '/work/common/avatar.webp',
  // Square crop of your face, used for small round avatars.
  avatar: '/work/common/avatar-face.webp',

  // Email signup. Paste your Kit or Beehiiv form action URL here. Empty = signup shows a "coming soon" note.
  emailFormAction: '',
  // The name your provider expects on the email input. Kit uses 'email_address', Beehiiv uses 'email'.
  emailFieldName: 'email_address',

  // Calendly inline embed for /coaching.
  calendlyUrl: 'https://calendly.com/your-handle/intro-call',

  // Cloudflare Web Analytics token (Cloudflare dashboard → Analytics & Logs → Web Analytics).
  // Leave as-is until you have one; the script is skipped while it's the placeholder.
  cfAnalyticsToken: 'YOUR_CLOUDFLARE_WEB_ANALYTICS_TOKEN',

  socials: [
    { label: 'Instagram', url: 'https://www.instagram.com/tianstravel', icon: 'instagram' },
    { label: 'TikTok', url: 'https://www.tiktok.com/@tianstravel', icon: 'tiktok' },
    { label: 'YouTube', url: 'https://www.youtube.com/@tianstravel', icon: 'youtube' },
  ],
} as const;
