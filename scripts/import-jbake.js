import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const OUTPUT_DIR = './src/content/blog';

async function fetchJBakeContent() {
  console.log('Fetching JBake blog repository...');
  
  // Clone the repo temporarily
  const tmpDir = '/tmp/jbake-blog-temp';
  try {
    await fs.rm(tmpDir, { recursive: true, force: true });
  } catch {}
  
  await execAsync(`gh repo clone musketyr/blog ${tmpDir}`);
  
  // Find all content files
  const contentDir = path.join(tmpDir, 'src/jbake/content');
  const files = await fs.readdir(contentDir, { recursive: true, withFileTypes: true });
  
  const posts = [];
  
  for (const file of files) {
    if (!file.isFile()) continue;
    
    const ext = path.extname(file.name);
    if (!['.adoc', '.md', '.markdown'].includes(ext)) continue;
    
    const filePath = path.join(file.path || contentDir, file.name);
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Parse frontmatter (JBake format)
    let title, date, tags, status;
    const lines = content.split('\n');
    
    // AsciiDoc format
    if (ext === '.adoc') {
      for (const line of lines) {
        if (line.startsWith('= ')) {
          title = line.substring(2).trim();
        } else if (line.startsWith(':jbake-date:')) {
          date = line.split(':')[2].trim();
        } else if (line.startsWith(':jbake-tags:')) {
          tags = line.split(':')[2].trim().split(',').map(t => t.trim());
        } else if (line.startsWith(':jbake-status:')) {
          status = line.split(':')[2].trim();
        }
      }
      
      // Skip drafts
      if (status !== 'published') {
        console.log(`Skipping draft: ${file.name}`);
        continue;
      }
      
      // Remove AsciiDoc frontmatter
      const contentStart = lines.findIndex(line => line.trim() === '' && lines.slice(0, lines.indexOf(line)).some(l => l.startsWith('=')));
      const bodyContent = lines.slice(contentStart + 1).join('\n').trim();
      
      // Convert basic AsciiDoc to Markdown
      let markdown = bodyContent
        .replace(/^====\s+(.+)$/gm, '#### $1')
        .replace(/^===\s+(.+)$/gm, '### $1')
        .replace(/^==\s+(.+)$/gm, '## $1')
        .replace(/\*\*(.+?)\*\*/g, '**$1**')
        .replace(/\*(.+?)\*/g, '*$1*')
        .replace(/`(.+?)`/g, '`$1`')
        .replace(/\[source,(\w+)\]\n----\n([\s\S]+?)\n----/g, '```$1\n$2\n```')
        .replace(/link:([^\[]+)\[([^\]]+)\]/g, '[$2]($1)');
      
      posts.push({ title, date, tags, content: markdown, filename: file.name });
      
    } else if (['.md', '.markdown'].includes(ext)) {
      // Markdown with JBake frontmatter (between ~~~ markers)
      const frontmatterMatch = content.match(/^~~~\n([\s\S]+?)\n~~~\n/);
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const body = content.substring(frontmatterMatch[0].length);
        
        // Parse JBake properties
        for (const line of frontmatter.split('\n')) {
          const [key, ...valueParts] = line.split('=');
          const value = valueParts.join('=').trim();
          
          if (key === 'title') title = value;
          else if (key === 'date') date = value;
          else if (key === 'tags') tags = value.split(',').map(t => t.trim());
          else if (key === 'status') status = value;
        }
        
        if (status !== 'published') {
          console.log(`Skipping draft: ${file.name}`);
          continue;
        }
        
        posts.push({ title, date, tags, content: body.trim(), filename: file.name });
      }
    }
  }
  
  console.log(`Found ${posts.length} JBake posts`);
  
  // Write to output directory
  for (const post of posts) {
    if (!post.date || !post.title) {
      console.warn(`Skipping post without date/title: ${post.filename}`);
      continue;
    }
    
    // Parse date (format: yyyy-MM-dd or other formats)
    let dateStr = post.date;
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}/)) {
      dateStr = dateStr.substring(0, 10);
    } else {
      // Try parsing other formats
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        dateStr = d.toISOString().substring(0, 10);
      } else {
        console.warn(`Invalid date for ${post.filename}: ${dateStr}`);
        continue;
      }
    }
    
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    const frontmatter = [
      '---',
      `title: "${post.title.replace(/"/g, '\\"')}"`,
      `date: ${dateStr}`,
      `slug: ${slug}`,
      post.tags && post.tags.length > 0 ? `tags: [${post.tags.map(t => `"${t}"`).join(', ')}]` : '',
      `source: jbake`,
      '---',
      '',
    ].filter(Boolean).join('\n');
    
    const outputFilename = `${dateStr}-${slug}.md`;
    const outputPath = path.join(OUTPUT_DIR, outputFilename);
    
    await fs.writeFile(outputPath, frontmatter + post.content, 'utf-8');
    console.log(`Written: ${outputFilename}`);
  }
  
  // Cleanup
  await fs.rm(tmpDir, { recursive: true, force: true });
  
  console.log(`\nImported ${posts.length} JBake articles`);
}

fetchJBakeContent().catch(console.error);
