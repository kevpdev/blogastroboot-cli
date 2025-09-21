// Virtual mock for astro:content
import { vi } from 'vitest';

export const getCollection = vi.fn();
export const getEntry = vi.fn();
export const defineCollection = vi.fn();

// Mock Zod
export const z = {
  string: vi.fn(() => ({ optional: vi.fn(() => ({})) })),
  date: vi.fn(() => ({ optional: vi.fn(() => ({})) })),
  array: vi.fn(() => ({ default: vi.fn(() => ({})) })),
  object: vi.fn(() => ({})),
  coerce: {
    date: vi.fn(() => ({ optional: vi.fn(() => ({})) }))
  }
};

export type CollectionEntry<T extends string> = {
  id: string;
  slug: string;
  body: string;
  collection: T;
  data: any;
  render: () => Promise<{
    Content: any;
    headings: any[];
    remarkPluginFrontmatter: Record<string, any>;
  }>;
};