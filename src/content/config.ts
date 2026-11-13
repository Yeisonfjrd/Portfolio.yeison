import { defineCollection, z } from "astro:content";

// One Markdown file per project. The body is the story; the frontmatter is what the page lays out.
const screen = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number(),
  height: z.number(),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    year: z.number(),
    stack: z.array(z.string()),
    // featured: big block with its screens. Otherwise: one line in "Otros proyectos".
    featured: z.boolean().default(false),
    order: z.number(),
    summary: z.string(),
    github: z.string().url().optional(),
    links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
    // Shown instead of the links when the code can't be public
    privateNote: z.string().optional(),
    figures: z
      .array(
        z.object({
          kind: z.enum(["shot", "phones"]),
          screens: z.array(screen).min(1),
          caption: z.string(),
        }),
      )
      .default([]),
    // Short real facts shown as cells next to the story
    facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    // Only a real quote from the person, never written by me
    testimonial: z.object({ quote: z.string(), author: z.string(), role: z.string() }).optional(),
    numbers: z
      .object({
        columns: z.array(z.string()),
        rows: z.array(z.object({ label: z.string(), values: z.array(z.string()) })),
        note: z.string(),
      })
      .optional(),
  }),
});

export const collections = { projects };
