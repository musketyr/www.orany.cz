import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const post = (props as any).post;

  // post.id is the filename (e.g. "2026-02-08-finding-jean-a-new-home.md")
  const filePath = path.resolve('src/content/blog', post.id);

  if (!fs.existsSync(filePath)) {
    return new Response('Not found', { status: 404 });
  }

  const raw = fs.readFileSync(filePath, 'utf-8');

  // Strip frontmatter
  const secondDash = raw.indexOf('---', 3);
  const body = secondDash >= 0 ? raw.slice(secondDash + 3).trim() : raw;

  const date = post.data.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const tags = post.data.tags.length > 0 ? `\nTags: ${post.data.tags.join(', ')}` : '';
  const url = `https://telegraphic.dev/blog/${post.slug}/`;
  const markdown = `# ${post.data.title}\n\n*${date}* | [Original](${url})${tags}\n\n${body}`;

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
