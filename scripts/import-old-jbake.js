import fs from 'fs/promises';
import path from 'path';

const OLD_JBAKE_DIR = '/tmp/old-jbake-content';
const OUTPUT_DIR = './src/content/blog';

async function parseJBakePost(filename) {
  const filePath = path.join(OLD_JBAKE_DIR, filename);
  const content = await fs.readFile(filePath, 'utf-8');
  
  // Parse JBake frontmatter (format: key=value ... ~~~~~~)
  const match = content.match(/^([\s\S]+?)\n~~~~~~\n([\s\S]+)$/);
  if (!match) {
    console.warn(`Could not parse frontmatter: ${filename}`);
    return null;
  }
  
  const [, frontmatterRaw, body] = match;
  const frontmatter = {};
  
  for (const line of frontmatterRaw.split('\n')) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length) {
      frontmatter[key.trim()] = valueParts.join('=').trim();
    }
  }
  
  if (frontmatter.status !== 'published') {
    console.log(`Skipping unpublished: ${filename}`);
    return null;
  }
  
  const title = frontmatter.title || 'Untitled';
  const date = frontmatter.date;
  const tags = frontmatter.tags ? frontmatter.tags.split(',').map(t => t.trim()) : [];
  
  // Create Astro frontmatter
  const newFrontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: ${date}`,
    tags.length > 0 ? `tags: [${tags.filter(t => t !== 'blog').map(t => `"${t}"`).join(', ')}]` : '',
    `source: jbake`,
    '---',
    '',
  ].filter(Boolean).join('\n');
  
  // Generate slug from filename
  const slug = filename.replace(/\.(md|adoc)$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  
  return {
    filename: `${date}-${slug}.md`,
    content: newFrontmatter + body.trim(),
  };
}

async function main() {
  const files = await fs.readdir(OLD_JBAKE_DIR);
  const posts = [];
  
  for (const file of files) {
    try {
      const post = await parseJBakePost(file);
      if (post) {
        posts.push(post);
      }
    } catch (error) {
      console.error(`Error parsing ${file}:`, error.message);
    }
  }
  
  console.log(`Parsed ${posts.length} old JBake posts`);
  
  // Write to output directory
  for (const post of posts) {
    const outputPath = path.join(OUTPUT_DIR, post.filename);
    await fs.writeFile(outputPath, post.content, 'utf-8');
    console.log(`Written: ${post.filename}`);
  }
  
  console.log(`\nImported ${posts.length} old JBake articles`);
}

main().catch(console.error);
