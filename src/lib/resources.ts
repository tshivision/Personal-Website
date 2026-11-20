import raw from '../data/resources.json';

export const TAGS = ['Money', 'Life Design', 'Travel'] as const;
export type Tag = (typeof TAGS)[number];

export interface Resource {
  id: string;
  title: string;
  subtitle: string;
  tag: Tag;
  status: 'live' | 'coming-soon';
  type: 'external' | 'page';
  url?: string;
  slug?: string;
  thumbnail: string;
  featured: boolean;
}

// Checks resources.json at build time so a typo fails the deploy loudly
// instead of shipping a broken card.
function validate(items: unknown[]): Resource[] {
  const ids = new Set<string>();
  return items.map((item, i) => {
    const r = item as Resource;
    const where = `resources.json item ${i + 1} (${r?.id ?? 'no id'})`;
    const fail = (msg: string) => {
      throw new Error(`${where}: ${msg}`);
    };
    for (const key of ['id', 'title', 'subtitle', 'thumbnail'] as const) {
      if (typeof r[key] !== 'string' || !r[key]) fail(`"${key}" is required`);
    }
    if (ids.has(r.id)) fail(`duplicate id "${r.id}"`);
    ids.add(r.id);
    if (!TAGS.includes(r.tag)) fail(`"tag" must be one of: ${TAGS.join(', ')}`);
    if (r.status !== 'live' && r.status !== 'coming-soon') fail(`"status" must be "live" or "coming-soon"`);
    if (r.type !== 'external' && r.type !== 'page') fail(`"type" must be "external" or "page"`);
    if (typeof r.featured !== 'boolean') fail(`"featured" must be true or false`);
    if (r.status === 'live' && r.type === 'external' && !r.url?.startsWith('http')) fail(`live external items need a full "url"`);
    if (r.status === 'live' && r.type === 'page' && !r.slug) fail(`live page items need a "slug"`);
    return r;
  });
}

export const resources = validate(raw as unknown[]);
export const featured = resources.find((r) => r.featured && r.status === 'live');

export function hrefFor(r: Resource): string | undefined {
  if (r.status !== 'live') return undefined;
  return r.type === 'page' ? `/${r.slug!.replace(/^\/+/, '')}` : r.url;
}
