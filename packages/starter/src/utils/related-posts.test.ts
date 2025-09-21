import { describe, test, expect, beforeEach, vi } from 'vitest';
import { getRelatedPosts } from './related-posts';
import { createMockPost } from '../__tests__/mocks/blog-posts';
import { getCollection } from 'astro:content';

const mockGetCollection = vi.mocked(getCollection);

describe('Related Posts Utility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getRelatedPosts', () => {
    test('should return related posts based on shared tags', async () => {
      // Arrange
      const currentPost = createMockPost({
        title: 'Current Post',
        tags: ['typescript', 'testing'],
        pubDate: new Date('2024-01-15')
      });

      const mockPosts = [
        currentPost, // Should be excluded from results
        createMockPost({
          title: 'Related Post 1',
          tags: ['typescript', 'javascript'],
          pubDate: new Date('2024-01-20')
        }),
        createMockPost({
          title: 'Related Post 2',
          tags: ['testing', 'vitest'],
          pubDate: new Date('2024-01-25')
        }),
        createMockPost({
          title: 'Related Post 3',
          tags: ['typescript', 'testing', 'react'], // Highest score (2 matches)
          pubDate: new Date('2024-01-10')
        }),
        createMockPost({
          title: 'Unrelated Post',
          tags: ['css', 'design'],
          pubDate: new Date('2024-01-30')
        }),
      ];

      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const relatedPosts = await getRelatedPosts(currentPost, 3);

      // Assert
      expect(relatedPosts).toHaveLength(3);
      expect(relatedPosts[0]!.data.title).toBe('Related Post 3'); // Highest score first
      expect(relatedPosts[1]!.data.title).toBe('Related Post 2'); // More recent among same score
      expect(relatedPosts[2]!.data.title).toBe('Related Post 1');
      
      // Should not include the current post
      expect(relatedPosts.find(post => post.data.title === 'Current Post')).toBeUndefined();
      
      // Should not include unrelated post
      expect(relatedPosts.find(post => post.data.title === 'Unrelated Post')).toBeUndefined();
    });

    test('should return recent posts when current post has no tags', async () => {
      // Arrange
      const currentPost = createMockPost({
        title: 'Current Post',
        tags: [],
        pubDate: new Date('2024-01-15')
      });

      const mockPosts = [
        currentPost,
        createMockPost({
          title: 'Recent Post 1',
          pubDate: new Date('2024-01-25')
        }),
        createMockPost({
          title: 'Recent Post 2',
          pubDate: new Date('2024-01-20')
        }),
        createMockPost({
          title: 'Old Post',
          pubDate: new Date('2024-01-01')
        }),
      ];

      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const relatedPosts = await getRelatedPosts(currentPost, 2);

      // Assert
      expect(relatedPosts).toHaveLength(2);
      expect(relatedPosts[0]!.data.title).toBe('Recent Post 1');
      expect(relatedPosts[1]!.data.title).toBe('Recent Post 2');
    });

    test('should handle undefined tags in current post', async () => {
      // Arrange
      const currentPost = createMockPost({
        title: 'Current Post',
        tags: undefined,
        pubDate: new Date('2024-01-15')
      });

      const mockPosts = [
        currentPost,
        createMockPost({
          title: 'Recent Post',
          pubDate: new Date('2024-01-20')
        }),
      ];

      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const relatedPosts = await getRelatedPosts(currentPost, 3);

      // Assert
      expect(relatedPosts).toHaveLength(1);
      expect(relatedPosts[0]!.data.title).toBe('Recent Post');
    });

    test('should normalize tags for case-insensitive matching', async () => {
      // Arrange
      const currentPost = createMockPost({
        title: 'Current Post',
        tags: ['JavaScript', 'TypeScript'],
      });

      const mockPosts = [
        currentPost,
        createMockPost({
          title: 'Related Post',
          tags: ['javascript', 'typescript'], // Lowercase
        }),
        createMockPost({
          title: 'Another Related Post',
          tags: ['JAVASCRIPT', 'React'], // Uppercase
        }),
      ];

      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const relatedPosts = await getRelatedPosts(currentPost, 3);

      // Assert
      expect(relatedPosts).toHaveLength(2);
      expect(relatedPosts[0]!.data.title).toBe('Related Post'); // Higher score (2 matches)
      expect(relatedPosts[1]!.data.title).toBe('Another Related Post'); // Lower score (1 match)
    });

    test('should handle posts with undefined or empty tags', async () => {
      // Arrange
      const currentPost = createMockPost({
        title: 'Current Post',
        tags: ['typescript'],
      });

      const mockPosts = [
        currentPost,
        createMockPost({
          title: 'Post with undefined tags',
          tags: undefined,
          pubDate: new Date('2024-01-20')
        }),
        createMockPost({
          title: 'Post with empty tags',
          tags: [],
          pubDate: new Date('2024-01-25')
        }),
        createMockPost({
          title: 'Related Post',
          tags: ['typescript', 'javascript'],
          pubDate: new Date('2024-01-15')
        }),
      ];

      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const relatedPosts = await getRelatedPosts(currentPost, 3);

      // Assert
      // Should return the related post with matching tags, then recent posts without tags
      expect(relatedPosts).toHaveLength(3);
      expect(relatedPosts[0]!.data.title).toBe('Related Post'); // Has matching tag
    });

    test('should respect the limit parameter', async () => {
      // Arrange
      const currentPost = createMockPost({
        title: 'Current Post',
        tags: ['typescript'],
      });

      const mockPosts = [
        currentPost,
        ...Array.from({ length: 5 }, (_, i) => createMockPost({
          title: `Related Post ${i + 1}`,
          tags: ['typescript'],
          pubDate: new Date(`2024-01-${20 + i}`)
        })),
      ];

      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const relatedPosts = await getRelatedPosts(currentPost, 2);

      // Assert
      expect(relatedPosts).toHaveLength(2);
    });

    test('should exclude current post from results', async () => {
      // Arrange
      const currentPost = createMockPost({
        title: 'Current Post',
        tags: ['typescript'],
      });

      const mockPosts = [
        currentPost,
        createMockPost({
          title: 'Related Post',
          tags: ['typescript'],
        }),
      ];

      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const relatedPosts = await getRelatedPosts(currentPost, 3);

      // Assert
      expect(relatedPosts).toHaveLength(1);
      expect(relatedPosts[0]!.data.title).toBe('Related Post');
      expect(relatedPosts[0]!.id).not.toBe(currentPost.id);
    });

    test('should sort by score first, then by date', async () => {
      // Arrange
      const currentPost = createMockPost({
        title: 'Current Post',
        tags: ['typescript', 'testing'],
      });

      const mockPosts = [
        currentPost,
        createMockPost({
          title: 'Score 1, Older',
          tags: ['typescript'],
          pubDate: new Date('2024-01-10')
        }),
        createMockPost({
          title: 'Score 1, Newer',
          tags: ['typescript'],
          pubDate: new Date('2024-01-20')
        }),
        createMockPost({
          title: 'Score 2',
          tags: ['typescript', 'testing'],
          pubDate: new Date('2024-01-05') // Oldest but highest score
        }),
      ];

      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const relatedPosts = await getRelatedPosts(currentPost, 3);

      // Assert
      expect(relatedPosts).toHaveLength(3);
      expect(relatedPosts[0]!.data.title).toBe('Score 2'); // Highest score first
      expect(relatedPosts[1]!.data.title).toBe('Score 1, Newer'); // Same score, more recent
      expect(relatedPosts[2]!.data.title).toBe('Score 1, Older'); // Same score, older
    });

    test('should return recent posts when no tags match', async () => {
      // Arrange
      const currentPost = createMockPost({
        title: 'Current Post',
        tags: ['unique-tag'],
        pubDate: new Date('2024-01-15')
      });

      const mockPosts = [
        currentPost,
        createMockPost({
          title: 'Unrelated Post 1',
          tags: ['different-tag'],
          pubDate: new Date('2024-01-20')
        }),
        createMockPost({
          title: 'Unrelated Post 2',
          tags: ['another-tag'],
          pubDate: new Date('2024-01-25')
        }),
      ];

      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const relatedPosts = await getRelatedPosts(currentPost, 3);

      // Assert
      // When no tags match, it should return recent posts (fallback behavior)
      expect(relatedPosts).toHaveLength(2);
      expect(relatedPosts[0]!.data.title).toBe('Unrelated Post 2'); // Most recent
      expect(relatedPosts[1]!.data.title).toBe('Unrelated Post 1');
    });

    test('should handle empty blog collection', async () => {
      // Arrange
      const currentPost = createMockPost({
        title: 'Current Post',
        tags: ['typescript'],
      });

      mockGetCollection.mockResolvedValue([]);

      // Act
      const relatedPosts = await getRelatedPosts(currentPost, 3);

      // Assert
      expect(relatedPosts).toHaveLength(0);
    });

    test('should trim and normalize tag whitespace', async () => {
      // Arrange
      const currentPost = createMockPost({
        title: 'Current Post',
        tags: [' typescript ', '\tjavascript\t'],
      });

      const mockPosts = [
        currentPost,
        createMockPost({
          title: 'Related Post',
          tags: ['typescript', 'javascript '], // With trailing space
        }),
      ];

      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const relatedPosts = await getRelatedPosts(currentPost, 3);

      // Assert
      expect(relatedPosts).toHaveLength(1);
      expect(relatedPosts[0]!.data.title).toBe('Related Post');
    });
  });
});