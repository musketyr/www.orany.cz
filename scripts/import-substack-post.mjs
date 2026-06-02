import fs from 'node:fs/promises';
import TurndownService from 'turndown';
import { JSDOM } from 'jsdom';

const slug = process.argv[2];
if (!slug) throw new Error('Usage: node scripts/import-substack-post.mjs <slug>');

const api = `https://telegraphic.substack.com/api/v1/posts/${slug}`;
const res = await fetch(api, { headers: { 'user-agent': 'Mozilla/5.0' } });
if (!res.ok) throw new Error(`Failed to fetch ${api}: ${res.status} ${res.statusText}`);
const post = await res.json();

const dom = new JSDOM(`<body>${post.body_html ?? ''}</body>`);
const document = dom.window.document;

document.querySelectorAll('script, style, button, form, iframe, input, .subscription-widget-wrap, .subscribe-widget, .captioned-button-wrap, .button-wrapper').forEach((el) => el.remove());

document.querySelectorAll('img').forEach((img) => {
  const src = img.getAttribute('src') || img.getAttribute('data-src') || img.getAttribute('data-attrs-src');
  if (src) img.setAttribute('src', src);
  if (!img.getAttribute('alt')) img.setAttribute('alt', '');
});

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

turndown.addRule('substackImageLink', {
  filter: (node) => node.nodeName === 'A' && node.childNodes.length === 1 && node.firstChild?.nodeName === 'IMG',
  replacement: (_content, node) => {
    const img = node.firstChild;
    const src = img.getAttribute('src') || '';
    const alt = img.getAttribute('alt') || '';
    return src ? `\n\n![${alt}](${src})\n\n` : '';
  },
});

let md = turndown.turndown(document.body.innerHTML)
  .replace(/\n\[\s*\n\s*(!\[[^\n]*\]\([^\n]+\))\s*\n\]\([^\n]+\)\n/g, '\n$1\n')
  .replace(/\n{3,}/g, '\n\n')
  .replace(/\\\[/g, '[')
  .replace(/\\\]/g, ']')
  .replace(/\\\./g, '.')
  .replace(/- {2,}/g, '- ')
  .replace(/\n +\n/g, '\n\n')
  .replace(/\n\[Subscribe now\]\([^\n]+\)\n?/gi, '\n')
  .replace(/Thanks for reading The Telegraphic Developer![\s\S]*$/i, '')
  .trim();

const date = post.post_date.slice(0, 10);
const outPath = `src/content/blog/${date}-${slug}.md`;
const title = post.title ?? slug;
const subtitle = post.subtitle || post.description || '';
const canonical = post.canonical_url || `https://telegraphic.substack.com/p/${slug}`;
const cover = post.cover_image ? `![](${post.cover_image})\n\n` : '';

const frontmatter = [
  '---',
  `title: ${JSON.stringify(title)}`,
  `date: ${date}`,
  'tags: ["ai", "agents", "product"]',
  'source: substack',
  `canonicalUrl: ${JSON.stringify(canonical)}`,
  '---',
  '',
].join('\n');

const subtitleBlock = subtitle ? `*${subtitle}*\n\n` : '';
await fs.writeFile(outPath, `${frontmatter}${subtitleBlock}${cover}${md}\n`);
console.log(JSON.stringify({ outPath, title, date, canonical, wordcount: post.wordcount }, null, 2));
