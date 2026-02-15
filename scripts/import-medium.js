import fs from 'fs/promises';
import path from 'path';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

const MEDIUM_DIR = '/tmp/medium-export/posts';
const OUTPUT_DIR = './src/content/blog';

async function parseMediumPost(filename) {
  // Skip drafts
  if (filename.startsWith('draft_')) return null;
  
  const filePath = path.join(MEDIUM_DIR, filename);
  const html = await fs.readFile(filePath, 'utf-8');
  
  // Parse filename: YYYY-MM-DD_Title-slug-hash.html
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})_(.+)-([a-f0-9]+)\.html$/);
  if (!match) {
    console.warn(`Skipping invalid filename: ${filename}`);
    return null;
  }
  
  const [, date, titleSlug, hash] = match;
  const slug = titleSlug.toLowerCase().replace(/_/g, '-');
  
  // Parse HTML
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  
  // Extract title
  const titleEl = doc.querySelector('h1, h2, h3, title');
  const title = titleEl ? titleEl.textContent.trim() : titleSlug.replace(/-/g, ' ');
  
  // Extract content (skip the title if it's in the body)
  const article = doc.querySelector('article, body');
  if (!article) return null;
  
  // Remove the first heading if it matches the title
  const firstHeading = article.querySelector('h1, h2, h3');
  if (firstHeading && firstHeading.textContent.trim() === title) {
    firstHeading.remove();
  }
  
  // Get text content for length check
  const textContent = article.textContent.trim();
  if (textContent.length < 500) {
    console.log(`Skipping short post: ${filename} (${textContent.length} chars)`);
    return null;
  }
  
  // Convert to markdown
  const markdown = turndownService.turndown(article.innerHTML);
  
  // Extract tags (from meta keywords or guesswork)
  const metaKeywords = doc.querySelector('meta[name="keywords"]');
  const tags = metaKeywords 
    ? metaKeywords.getAttribute('content').split(',').map(t => t.trim())
    : [];
  
  // Create frontmatter
  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: ${date}`,
    `slug: ${slug}`,
    tags.length > 0 ? `tags: [${tags.map(t => `"${t}"`).join(', ')}]` : '',
    `source: medium`,
    `mediumId: ${hash}`,
    '---',
    '',
  ].filter(Boolean).join('\n');
  
  return {
    filename: `${date}-${slug}.md`,
    content: frontmatter + markdown,
  };
}

async function main() {
  const files = await fs.readdir(MEDIUM_DIR);
  const posts = [];
  
  for (const file of files) {
    try {
      const post = await parseMediumPost(file);
      if (post) {
        posts.push(post);
      }
    } catch (error) {
      console.error(`Error parsing ${file}:`, error.message);
    }
  }
  
  console.log(`Parsed ${posts.length} Medium posts`);
  
  // Write to output directory
  for (const post of posts) {
    const outputPath = path.join(OUTPUT_DIR, post.filename);
    await fs.writeFile(outputPath, post.content, 'utf-8');
    console.log(`Written: ${post.filename}`);
  }
  
  console.log(`\nImported ${posts.length} Medium articles`);
}

main().catch(console.error);
