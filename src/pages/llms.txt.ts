import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  const sorted = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const lines = [
    '# telegraphic.dev',
    '',
    '> Personal website of Vladimir Orany — principal software engineer, open source contributor, and AI enthusiast.',
    '> Topics: Java, Groovy, Micronaut, Spring, cloud infrastructure, AI/LLM tooling, OpenClaw.',
    '',
    '## Blog Posts',
    '',
    'All posts are available as markdown by appending `.md` to the URL.',
    '',
    ...sorted.map((post) => {
      const date = post.data.date.toISOString().split('T')[0];
      const tags = post.data.tags.length > 0 ? ` [${post.data.tags.join(', ')}]` : '';
      return `- [${post.data.title}](https://telegraphic.dev/blog/${post.slug}.md) (${date})${tags}`;
    }),
    '',
    '## Other Pages',
    '',
    '- [About](https://telegraphic.dev/about/)',
    '- [Projects](https://telegraphic.dev/projects/)',
    '- [Talks](https://telegraphic.dev/talks/)',
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
