// Case studies. Order here = order on the homepage.
//
// Images are referenced by key ("project/name") from src/data/images.json, which
// scripts/process-images.mjs generates from the originals in raw-import/.
// To add a case study: drop images into raw-import/<slug>/, run
// `node scripts/process-images.mjs`, then add an entry below.
import images from './images.json';

type ImageKey = keyof typeof images;

export type Block =
  /** A long Figma/PDF export, shown as one continuous document. */
  | { type: 'document'; image: ImageKey; label: string }
  | { type: 'heading'; text: string; kicker?: string }
  | { type: 'intro'; title: string; body: string[]; meta: { label: string; value: string }[] }
  | {
      type: 'text';
      title?: string;
      body?: string[];
      list?: { title?: string; items: string[] };
      callout?: { title: string; text: string };
      image?: ImageKey;
      alt?: string;
      flip?: boolean;
    }
  | { type: 'image'; image: ImageKey; alt: string; caption?: string; size?: 'wide' | 'narrow' }
  | { type: 'gallery'; images: ImageKey[]; alt: string; variant?: 'phones' | 'grid' }
  | { type: 'stats'; items: { value: number; label: string }[] }
  | { type: 'prototype'; url: string; title: string };

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  /** Two colours for the project's gradient tile. */
  colors: [string, string];
  /** Light text on the tile? */
  dark: boolean;
  cover:
    | { kind: 'screen'; image: ImageKey; alt: string }
    | { kind: 'phones'; images: ImageKey[]; alt: string };
  /** Facts shown under the case study title. */
  meta?: { label: string; value: string }[];
  blocks: Block[];
}

export const work: CaseStudy[] = [
  {
    slug: 'purefacts-dashboard',
    client: 'PureFacts',
    industry: 'Wealth Management',
    title: 'Dashboard Analytics & Reporting',
    summary: 'A configurable analytics dashboard for wealth firms, from widgets and flyout panels to user testing, handoff and a design system.',
    colors: ['#c9d0f0', '#2a3c92'],
    dark: true,
    cover: { kind: 'screen', image: 'purefacts/thumb', alt: 'PureFacts Financial optimization dashboard with AUM, fees and client cohort charts' },
    blocks: [
      { type: 'document', image: 'purefacts/body-1', label: 'Dashboard Analytics & Reporting case study' },
      {
        type: 'prototype',
        title: 'Pure Insights prototype',
        url: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F9RZ3PSlznBLDuPAIGmYw3K%2FPure-Insights%3Fpage-id%3D1095%253A4973%26node-id%3D1095-4975%26viewport%3D-1202%252C-1095%252C0.15%26t%3DaxBs06nKCZ85qKHh-1%26scaling%3Dscale-down-width%26content-scaling%3Dfixed%26starting-point-node-id%3D1095%253A4975',
      },
      { type: 'document', image: 'purefacts/body-2', label: 'Dashboard Analytics & Reporting, continued' },
    ],
  },
  {
    slug: 'sales-enablement',
    client: 'PureFacts',
    industry: 'Sales & Customer Success',
    title: 'Sales Enablement Hub',
    summary: 'A centralized sales enablement platform giving Account Executives frictionless access to demo environments, product content, training guides and customer stories.',
    meta: [{ label: 'Team', value: '1 Product Designer, 1 Developer, 1 Account Executive' }, { label: 'Tools', value: 'Figma, UX Pilot, Miro, Teams' }],
    colors: ['#e4e4e2', '#7d7f86'],
    dark: false,
    cover: { kind: 'screen', image: 'sales-enablement/thumb', alt: 'PureRevenue welcome screen listing PureFees, PureInsights and PureRevenue apps' },
    blocks: [
      { type: 'document', image: 'sales-enablement/body-1', label: 'Sales Enablement Hub case study' },
      { type: 'document', image: 'sales-enablement/body-2', label: 'Sales Enablement Hub screens' },
      { type: 'document', image: 'sales-enablement/body-3', label: 'Sales Enablement Hub screens, continued' },
    ],
  },
  {
    slug: 'pershingx-fee-billing',
    client: 'PershingX',
    industry: 'Asset Management',
    title: 'Fee Billing & Calculation',
    summary: 'Leading design for a major American investment company, focused on calculating fees for billions of dollars of assets under management.',
    meta: [{ label: 'Team', value: '2 Product Designers, 11 Engineers, 1 Product Manager, 1 Business Analyst' }, { label: 'My role', value: 'User Research, Journey Mapping, Sketching, Wireframing, Prototyping, User Flows, Usability Testing, Handoff' }, { label: 'Tools', value: 'Figma, FigJam, Whimsical, Teams, Sketch' }],
    colors: ['#33446b', '#111a33'],
    dark: true,
    cover: { kind: 'screen', image: 'pershingx/thumb', alt: 'Client information form for ABC Investments with default billing settings' },
    blocks: [{ type: 'document', image: 'pershingx/body-1', label: 'Fee Billing & Calculation case study' }],
  },
  {
    slug: 'wbi-digital-onboarding',
    client: 'WBI',
    industry: 'Banking',
    title: 'Digital Onboarding',
    summary: 'Lead designer on a client project that turned offline investment onboarding, run on paper forms and snail mail, into digital forms and submissions.',
    meta: [{ label: 'Team', value: '1 UX Designer, 4 Clients, 5 Engineers, 1 Business Consultant' }, { label: 'Tools', value: 'Figma, Teams, Sketch' }],
    colors: ['#e1efe3', '#3f8a55'],
    dark: true,
    cover: { kind: 'screen', image: 'wbi/thumb', alt: 'Digital onboarding funding setup step with progress tracker' },
    blocks: [{ type: 'document', image: 'wbi/body-1', label: 'Digital Onboarding case study' }],
  },
  {
    slug: 'zoom',
    client: 'Zoom',
    industry: 'Video Conferencing',
    title: 'Zoom Video Conferencing',
    summary: 'Finding the problems in an existing product and improving Zoom’s experience in a classroom setting, informed by 7 instructor interviews and 18 surveys.',
    meta: [{ label: 'Team', value: 'Tian Shi, Janice Cheng, Suzy Park, Charissa Ho' }, { label: 'My role', value: 'User Research, Affinity Mapping, Sketching, Wireframing, Design Ideation, User Flow, Prototyping, Usability Testing' }, { label: 'Timeline', value: '3 weeks' }, { label: 'Tools', value: 'Figma, Miro, Whimsical, Canva, Google Forms' }],
    colors: ['#3b5a9c', '#172a57'],
    dark: true,
    cover: { kind: 'screen', image: 'zoom/hero', alt: 'Zoom meeting window with a shared presentation and participant videos' },
    blocks: [{ type: 'document', image: 'zoom/body-1', label: 'Zoom Video Conferencing case study' }],
  },
  {
    slug: 'costco',
    client: 'Costco',
    industry: 'E-commerce',
    title: 'E-commerce Strategy',
    summary: 'Cutting the path to fresh groceries on Costco’s mobile site from 10 clicks to a few.',
    colors: ['#e0625c', '#a42f2c'],
    dark: true,
    meta: [{ label: 'Team', value: 'Tian Shi, Marielle Lacea, Megan Woolfrey, Tiziana Bucher' }],
    cover: {
      kind: 'phones',
      images: ['costco/carousel-1', 'costco/carousel-2', 'costco/carousel-3'],
      alt: 'Three screens of the redesigned Costco mobile shopping experience',
    },
    blocks: [
      {
        type: 'intro',
        title: 'Exploring the mobile & desktop e-commerce experience',
        body: [
          'The design challenge was to identify problems with the current e-commerce channel for Costco and improve it for both mobile and web experience.',
        ],
        meta: [
          { label: 'My role', value: 'User Research, Affinity Mapping, Wireframing, Design Ideation, User Flow, Information Architecture, Prototyping, Usability Testing' },
          { label: 'Timeline', value: '2 weeks' },
          { label: 'Tools', value: 'Figma, Whimsical, Canva, Google Docs' },
        ],
      },
      { type: 'image', image: 'costco/overview', alt: 'Project overview of the design process', size: 'narrow' },

      { type: 'heading', kicker: '01 · Discover', text: 'First, we started with discovery and research' },
      {
        type: 'text',
        title: 'Interviews',
        body: [
          'At the discovery phase of my project, we conducted user interviews in order to get a better understanding of the problem. We summarized our findings using Affinity Mapping to identify trends and patterns.',
          'We were curious to know what problems plagued our users during their online shopping experience and conducted user task interviews to further build a case.',
        ],
        list: {
          title: 'Key findings',
          items: [
            'Costco App had a 2.4 rating on App store',
            'Lots of inconsistencies from the online and in-store experience',
            'Styling inconsistencies throughout the website',
            'Glitches and bugs on mobile site and app',
            'Navigation menus and labelling were not clear and lead to poor user navigation',
          ],
        },
        image: 'costco/interviews',
        alt: 'Affinity map of interview findings',
      },

      { type: 'heading', kicker: '02 · Understand', text: 'Then, we researched our users and competitors' },
      {
        type: 'text',
        title: 'Personas',
        body: [
          'We wanted to better understand our target users, their motivations and behaviours so we can refer to them throughout the entire design process.',
          'The users that we encountered were predominantly Costco members who are young professionals with busy families that find convenience in shopping online (especially during the pandemic).',
        ],
        image: 'costco/personas',
        alt: 'User persona for a busy young professional Costco member',
        flip: true,
      },
      {
        type: 'text',
        title: 'Competitive analysis',
        body: ['We also wanted to better understand the company philosophy as a whole so we did some research into Costco’s strategy and competitors.'],
        list: {
          title: 'Key findings',
          items: [
            'Costco wants shoppers to shop in-store and has not shown great interest in the past to invest in its online infrastructure',
            'They prefer in-person shopping and purposely have the grocery section at the back of the warehouse so customers have to walk past new deals and products, encouraging impulse buys',
            'Costco moves items and products around to create a treasure hunting experience (which is hard to be replicated online)',
            'They make most of their profits from membership fees and try to pass savings to customers',
            'One of Costco’s biggest competitors is Walmart (Sam’s Club), which recently invested $3.5 billion in its e-commerce capabilities to deliver groceries',
          ],
        },
        image: 'costco/competitive',
        alt: 'Competitive analysis of Costco and Walmart',
      },

      { type: 'heading', kicker: '03 · Test', text: 'We created task interviews for users to complete' },
      {
        type: 'text',
        title: 'Can you find the apple?',
        body: ['We conducted task interviews asking users to shop for fresh fruits on the mobile website. Most of them couldn’t find it or took them a while to find its location.'],
        image: 'costco/find-apple',
        alt: 'Task interview screens: finding apples on the Costco mobile site',
        flip: true,
      },

      { type: 'heading', kicker: '04 · Define', text: 'We identified the key pain points of the users' },
      {
        type: 'text',
        title: 'Pain points with the mobile site',
        body: ['During our task interviews, we had identified numerous issues that users were experiencing and narrowed them down to these main pain points.'],
        callout: {
          title: 'Problem statement',
          text: 'Costco’s online grocery experience suffers from navigational issues that cause online shoppers to become confused and not complete their purchases on the site.',
        },
        image: 'costco/pain-points',
        alt: 'Annotated pain points on the Costco mobile site',
      },
      { type: 'image', image: 'costco/pain-points-2', alt: 'Summary of the main pain points', size: 'wide' },
      {
        type: 'text',
        title: 'Navigation in the hamburger menu',
        body: ['There is no specific category for perishable items like produce and dairy in the hamburger menu. We found poor information architecture in the menu choices to find items like fresh produce and groceries.'],
        list: { title: 'Redundant labels', items: ['Grocery & Household', 'CostcoGrocery', 'Same Day Delivery'] },
        image: 'costco/hamburger',
        alt: 'The original hamburger menu with redundant grocery labels',
        flip: true,
      },
      {
        type: 'image',
        image: 'costco/journey',
        alt: 'Customer journey map for buying fresh produce',
        caption: 'A customer’s journey when looking for fresh produce on Costco’s mobile site or app. It currently takes users 10 clicks to add apples to their cart and check out.',
        size: 'wide',
      },

      { type: 'heading', kicker: '05 · Ideate', text: 'It’s time to start ideating solutions' },
      {
        type: 'text',
        title: 'Redesigning the home page through sketches',
        body: [
          'I usually start the design process with paper and pen to get my ideas out quickly and then make improvements. For this part of the process, we conducted a Design Studio workshop as a group and created 48 variations of sketches that we later shared and critiqued.',
        ],
        image: 'costco/sketches',
        alt: 'Home page sketches from the Design Studio workshop',
      },
      { type: 'gallery', images: ['costco/sketch-photo-1', 'costco/sketch-photo-2'], alt: 'Paper sketches from the Design Studio workshop', variant: 'grid' },
      {
        type: 'text',
        title: 'Wireframes',
        body: [
          'Using the idea concepts from our sketches, we turned the sketches into low-fi wireframes so we can present this to users and conduct user testings.',
          'Different iterations of the home page screen (on mobile).',
        ],
        image: 'costco/wireframes',
        alt: 'Low-fidelity mobile wireframes of the home page',
        flip: true,
      },

      { type: 'heading', kicker: '06 · Iterate', text: 'Taking feedback from users, we iterated our designs' },
      { type: 'image', image: 'costco/iterate', alt: 'Design iterations based on user feedback', size: 'wide' },
      { type: 'gallery', images: ['costco/iterate-a', 'costco/iterate-b'], alt: 'Before and after iterations of the menu', variant: 'grid' },
      {
        type: 'text',
        title: 'Iterations',
        body: ['We made many iterations to the information architecture as our goal was for users to easily locate fresh produce using the hamburger menu.'],
        image: 'costco/iterations',
        alt: 'Information architecture iterations for the hamburger menu',
      },
      {
        type: 'text',
        title: 'Usability testing',
        body: [
          'We tested out various category names to see which word had the strongest association linked to fresh produce. We also created CTA buttons inside the hamburger menu to see if this would help users locate fresh produce easier. We interviewed 5 users for these prototypes to decide on our most optimal designs.',
        ],
        image: 'costco/usability',
        alt: 'Usability testing results for category names',
        flip: true,
      },

      { type: 'heading', kicker: '07 · Solve', text: 'The solutions we implemented' },
      { type: 'gallery', images: ['costco/solution-1', 'costco/solution-2', 'costco/solution-3'], alt: 'The implemented solutions', variant: 'grid' },

      { type: 'heading', kicker: '08 · Ship', text: 'The new and improved Costco e-commerce site' },
      { type: 'image', image: 'costco/final', alt: 'The redesigned Costco e-commerce site on desktop and mobile', size: 'wide' },
      { type: 'gallery', images: ['costco/carousel-1', 'costco/carousel-2', 'costco/final-3'], alt: 'Final mobile screens', variant: 'phones' },
      {
        type: 'stats',
        items: [
          { value: 32, label: 'Iterations' },
          { value: 48, label: 'Screens' },
          { value: 31, label: 'Users' },
          { value: 60, label: 'Cups of coffee' },
        ],
      },
    ],
  },
];

export const img = (key: ImageKey) => images[key] as { src: string; width: number; height: number };
export const doc = (key: ImageKey) => {
  const entry = images[key] as { slices?: { src: string; width: number; height: number }[]; src?: string; width?: number; height?: number };
  return entry.slices ?? [entry as { src: string; width: number; height: number }];
};
