// Everything you might want to swap lives here. No layout code needed.
export const SITE = {
  name: 'Tian Shi',
  handle: '@tianstravel',
  tagline: 'Nomad, Money & Lifemaxxing',
  proof: '25+ countries · $100K+ invested',
  intro: 'Free tools and guided exercises to help you design a richer life: money, travel, and what comes next.',
  description:
    'Free tools and guided exercises from Tian Shi (@tianstravel) to help you design a richer life: money, travel, and life planning.',

  // Put a square photo at public/tian.jpg and set this to '/tian.jpg'. Empty = monogram.
  photo: '',

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
