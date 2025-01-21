import { defineCollection, z } from "astro:content";

const tutorials = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    heroImg: z.string(),
    tags: z.array(z.string()),
  }),
});

const toolsPj = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    heroImg: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { tutorials, toolsPj };
