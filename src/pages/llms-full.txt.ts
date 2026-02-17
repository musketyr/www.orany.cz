import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  const sorted = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const sections = [
    '# telegraphic.dev — Full Content',
    '',
    '> Personal website of Vladimir Orany — principal software engineer, open source contributor, and AI enthusiast.',
    '',
  ];

  for (const post of sorted) {
    const date = post.data.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const tags = post.data.tags.length > 0 ? `Tags: ${post.data.tags.join(', ')}` : '';
    sections.push(`---`);
    sections.push('');
    sections.push(`## ${post.data.title}`);
    sections.push('');
    sections.push(`*${date}*${tags ? ' | ' + tags : ''}`);
    sections.push('');
    sections.push(post.body || '');
    sections.push('');
  }

  return new Response(sections.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
