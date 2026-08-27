import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    role: z.string(),
    timeframe: z.string().optional(),
    tags: z.array(z.string()),
    stack: z.array(z.string()),
    status: z.enum(['shipped', 'in-progress', 'archived']).default('shipped'),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    links: z
      .array(z.object({ label: z.string(), href: z.string().url() }))
      .default([]),
    metrics: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .default([]),
  }),
});

export const collections = { work };
