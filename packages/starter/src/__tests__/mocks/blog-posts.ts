import type { CollectionEntry } from 'astro:content';

/**
 * Factory function to create mock blog posts
 */
export function createMockPost(
  overrides: Partial<CollectionEntry<'blog'>['data']> = {}
): CollectionEntry<'blog'> {
  return {
    id: `test-post-${Math.random().toString(36).substring(2, 11)}`,
    slug: overrides.title?.toLowerCase().replace(/\s+/g, '-') || 'test-post',
    body: 'This is a test post content',
    collection: 'blog',
    data: {
      title: 'Test Post',
      description: 'A test blog post',
      pubDate: new Date('2024-01-15'),
      updatedDate: undefined,
      heroImage: undefined,
      tags: ['test', 'javascript'],
      author: 'Test Author',
      ...overrides,
    },
    render: async () => ({
      Content: () => 'Mock Content' as any,
      headings: [],
      remarkPluginFrontmatter: {},
    } as any),
  };
}

/**
 * Create multiple mock posts with different data
 */
export function createMockPosts(count: number): CollectionEntry<'blog'>[] {
  const posts: CollectionEntry<'blog'>[] = [];
  
  for (let i = 0; i < count; i++) {
    posts.push(createMockPost({
      title: `Test Post ${i + 1}`,
      pubDate: new Date(`2024-01-${String(i + 1).padStart(2, '0')}`),
      tags: i % 2 === 0 ? ['javascript', 'typescript'] : ['react', 'astro'],
      author: i % 3 === 0 ? 'Custom Author' : undefined,
    }));
  }
  
  return posts;
}

/**
 * Mock blog posts for different test scenarios
 */
export const mockBlogPosts: CollectionEntry<'blog'>[] = [
  createMockPost({
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript',
    pubDate: new Date('2024-01-15'),
    tags: ['javascript', 'fundamentals'],
    author: 'John Doe'
  }),
  createMockPost({
    title: 'TypeScript Advanced',
    description: 'Advanced TypeScript concepts',
    pubDate: new Date('2024-01-20'),
    tags: ['typescript', 'advanced'],
    author: 'Jane Smith'
  }),
  createMockPost({
    title: 'React Best Practices',
    description: 'Best practices for React development',
    pubDate: new Date('2024-01-25'),
    tags: ['react', 'best-practices'],
  }),
  createMockPost({
    title: 'Astro Guide',
    description: 'Complete guide to Astro framework',
    pubDate: new Date('2024-02-01'),
    tags: ['astro', 'guide'],
    author: 'Bob Wilson'
  }),
  createMockPost({
    title: 'CSS Modern Techniques',
    description: 'Modern CSS techniques and patterns',
    pubDate: new Date('2024-02-05'),
    tags: ['css', 'modern'],
  }),
];

/**
 * Mock posts with specific tags for testing tag functionality
 */
export const mockPostsWithTags: CollectionEntry<'blog'>[] = [
  createMockPost({
    title: 'JavaScript Article 1',
    tags: ['javascript', 'frontend'],
  }),
  createMockPost({
    title: 'JavaScript Article 2', 
    tags: ['javascript', 'backend'],
  }),
  createMockPost({
    title: 'TypeScript Article',
    tags: ['typescript', 'javascript'],
  }),
  createMockPost({
    title: 'React Article',
    tags: ['react', 'frontend'],
  }),
  createMockPost({
    title: 'CSS Article',
    tags: ['css', 'design'],
  }),
];

/**
 * Mock posts for related posts testing
 */
export const mockRelatedPosts: CollectionEntry<'blog'>[] = [
  createMockPost({
    title: 'Current Post',
    tags: ['typescript', 'testing', 'vitest'],
  }),
  createMockPost({
    title: 'Related Post 1',
    tags: ['typescript', 'javascript'],
  }),
  createMockPost({
    title: 'Related Post 2', 
    tags: ['testing', 'jest'],
  }),
  createMockPost({
    title: 'Related Post 3',
    tags: ['vitest', 'testing'],
  }),
  createMockPost({
    title: 'Unrelated Post',
    tags: ['react', 'css'],
  }),
];