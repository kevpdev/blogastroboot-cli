import { vi } from 'vitest';
import { mockBlogPosts, mockPostsWithTags, mockRelatedPosts } from './blog-posts';

/**
 * Mock implementation of getCollection from astro:content
 */
export const mockGetCollection = vi.fn();

/**
 * Setup mock for different test scenarios
 */
export function setupGetCollectionMock(scenario: 'default' | 'withTags' | 'related' | 'empty' = 'default') {
  switch (scenario) {
    case 'withTags':
      mockGetCollection.mockResolvedValue(mockPostsWithTags);
      break;
    case 'related':
      mockGetCollection.mockResolvedValue(mockRelatedPosts);
      break;
    case 'empty':
      mockGetCollection.mockResolvedValue([]);
      break;
    case 'default':
    default:
      mockGetCollection.mockResolvedValue(mockBlogPosts);
      break;
  }
}

/**
 * Setup mock for getEntry
 */
export const mockGetEntry = vi.fn();

/**
 * Mock Zod schema helpers
 */
export const mockZod = {
  string: vi.fn(() => ({ optional: vi.fn(() => ({})) })),
  date: vi.fn(() => ({ optional: vi.fn(() => ({})) })),
  array: vi.fn(() => ({ default: vi.fn(() => ({})) })),
  object: vi.fn(() => ({})),
  coerce: {
    date: vi.fn(() => ({ optional: vi.fn(() => ({})) }))
  }
};

/**
 * Reset all astro:content mocks
 */
export function resetAstroContentMocks() {
  mockGetCollection.mockClear();
  mockGetEntry.mockClear();
  Object.values(mockZod).forEach(mock => {
    if (typeof mock === 'function') {
      (mock as any).mockClear?.();
    }
  });
}