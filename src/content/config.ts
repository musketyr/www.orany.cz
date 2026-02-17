import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional().default([]),
    source: z.enum(['medium', 'jbake', 'substack']),
    slug: z.string().optional(),
    mediumId: z.string().optional(),
  }),
});

export const collections = { blog };
