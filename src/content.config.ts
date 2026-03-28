import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const authors = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/authors",
    generateId: ({ entry }) => entry.replace(/\.json$/u, ""),
  }),
  schema: z.object({
    name: z.string(),
    reading: z.string(),
    tagline: z.string(),
    bio: z.string(),
    avatar: z.string(),
    sortOrder: z.number().int().nonnegative().default(0),
  }),
});

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/posts",
    generateId: ({ entry }) => entry.replace(/\.md$/u, ""),
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { authors, posts };

