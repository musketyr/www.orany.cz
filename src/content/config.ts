import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional().default([]),
    source: z.enum(['medium', 'jbake', 'substack']),
    canonicalUrl: z.string().url().optional(),
    slug: z.string().optional(),
    mediumId: z.string().optional(),
  }),
});

const cz = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional().default([]),
    source: z.enum(['substack']),
    originalUrl: z.string().url(),
    originalTitle: z.string(),
  }),
});

export const collections = { blog, cz };
