import { describe, test, expect, beforeEach, vi } from 'vitest';
import { getPopularTags, getPostsByTag, getAllTags } from './tags';
import { createMockPost } from '../__tests__/mocks/blog-posts';
import { getCollection } from 'astro:content';

const mockGetCollection = vi.mocked(getCollection);

describe('Tags Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPopularTags', () => {
    test('should return popular tags sorted by count', async () => {
      // Arrange
      const mockPosts = [
        createMockPost({ tags: ['javascript', 'typescript'] }),
        createMockPost({ tags: ['javascript', 'react'] }),
        createMockPost({ tags: ['typescript', 'astro'] }),
        createMockPost({ tags: ['javascript'] }),
      ];
      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const popularTags = await getPopularTags(3);

      // Assert
      expect(popularTags).toHaveLength(3);
      expect(popularTags[0]).toEqual({
        name: 'Javascript',
        count: 3,
        slug: 'javascript'
      });
      expect(popularTags[1]).toEqual({
        name: 'Typescript',
        count: 2,
        slug: 'typescript'
      });
      expect(popularTags[2]).toEqual({
        name: 'React',
        count: 1,
        slug: 'react'
      });
    });

    test('should handle posts without tags', async () => {
      // Arrange
      const mockPosts = [
        createMockPost({ tags: undefined }),
        createMockPost({ tags: [] }),
        createMockPost({ tags: ['javascript'] }),
      ];
      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const popularTags = await getPopularTags();

      // Assert
      expect(popularTags).toHaveLength(1);
      expect(popularTags[0]!.name).toBe('Javascript');
    });

    test('should normalize tag casing', async () => {
      // Arrange
      const mockPosts = [
        createMockPost({ tags: ['JavaScript'] }),
        createMockPost({ tags: ['javascript'] }),
        createMockPost({ tags: ['JAVASCRIPT'] }),
      ];
      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const popularTags = await getPopularTags();

      // Assert
      expect(popularTags).toHaveLength(1);
      expect(popularTags[0]).toEqual({
        name: 'Javascript',
        count: 3,
        slug: 'javascript'
      });
    });

    test('should respect the limit parameter', async () => {
      // Arrange
      const mockPosts = [
        createMockPost({ tags: ['a', 'b', 'c', 'd', 'e'] }),
      ];
      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const popularTags = await getPopularTags(3);

      // Assert
      expect(popularTags).toHaveLength(3);
    });
  });

  describe('getPostsByTag', () => {
    test('should return posts filtered by tag', async () => {
      // Arrange
      const mockPosts = [
        createMockPost({ 
          title: 'JS Post 1',
          tags: ['javascript', 'frontend'],
          pubDate: new Date('2024-01-20')
        }),
        createMockPost({ 
          title: 'JS Post 2',
          tags: ['javascript', 'backend'],
          pubDate: new Date('2024-01-25')
        }),
        createMockPost({ 
          title: 'React Post',
          tags: ['react', 'frontend'],
          pubDate: new Date('2024-01-15')
        }),
      ];
      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const jsPosts = await getPostsByTag('javascript');

      // Assert
      expect(jsPosts).toHaveLength(2);
      expect(jsPosts[0]!.data.title).toBe('JS Post 2'); // More recent first
      expect(jsPosts[1]!.data.title).toBe('JS Post 1');
    });

    test('should be case insensitive', async () => {
      // Arrange
      const mockPosts = [
        createMockPost({ tags: ['JavaScript'] }),
        createMockPost({ tags: ['javascript'] }),
        createMockPost({ tags: ['JAVASCRIPT'] }),
      ];
      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const jsPosts = await getPostsByTag('JavaScript');

      // Assert
      expect(jsPosts).toHaveLength(3);
    });

    test('should return empty array for non-existent tag', async () => {
      // Arrange
      const mockPosts = [
        createMockPost({ tags: ['javascript'] }),
      ];
      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const posts = await getPostsByTag('nonexistent');

      // Assert
      expect(posts).toHaveLength(0);
    });

    test('should handle posts without tags', async () => {
      // Arrange
      const mockPosts = [
        createMockPost({ tags: undefined }),
        createMockPost({ tags: [] }),
        createMockPost({ tags: ['javascript'] }),
      ];
      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const jsPosts = await getPostsByTag('javascript');

      // Assert
      expect(jsPosts).toHaveLength(1);
    });
  });

  describe('getAllTags', () => {
    test('should return unique tags sorted alphabetically', async () => {
      // Arrange
      const mockPosts = [
        createMockPost({ tags: ['typescript', 'javascript'] }),
        createMockPost({ tags: ['react', 'javascript'] }),
        createMockPost({ tags: ['astro'] }),
      ];
      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const allTags = await getAllTags();

      // Assert
      expect(allTags).toEqual(['astro', 'javascript', 'react', 'typescript']);
    });

    test('should handle duplicate tags', async () => {
      // Arrange
      const mockPosts = [
        createMockPost({ tags: ['javascript', 'javascript'] }),
        createMockPost({ tags: ['javascript'] }),
      ];
      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const allTags = await getAllTags();

      // Assert
      expect(allTags).toEqual(['javascript']);
    });

    test('should trim whitespace from tags', async () => {
      // Arrange
      const mockPosts = [
        createMockPost({ tags: [' javascript ', 'typescript'] }),
        createMockPost({ tags: ['javascript', ' react '] }),
      ];
      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const allTags = await getAllTags();

      // Assert
      expect(allTags).toEqual(['javascript', 'react', 'typescript']);
    });

    test('should handle empty posts array', async () => {
      // Arrange
      mockGetCollection.mockResolvedValue([]);

      // Act
      const allTags = await getAllTags();

      // Assert
      expect(allTags).toEqual([]);
    });
  });

  describe('Tag normalization edge cases', () => {
    test('should handle accented characters in tags', async () => {
      // Arrange
      const mockPosts = [
        createMockPost({ tags: ['développement', 'français'] }),
      ];
      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const popularTags = await getPopularTags();

      // Assert
      expect(popularTags[0]!.slug).toBe('developpement');
      expect(popularTags[1]!.slug).toBe('francais');
    });

    test('should handle special characters in tags', async () => {
      // Arrange
      const mockPosts = [
        createMockPost({ tags: ['C++', 'Node.js', 'Vue.js 3'] }),
      ];
      mockGetCollection.mockResolvedValue(mockPosts);

      // Act
      const popularTags = await getPopularTags();

      // Assert
      expect(popularTags.find(tag => tag.name === 'C++')?.slug).toBe('c');
      expect(popularTags.find(tag => tag.name === 'Node.js')?.slug).toBe('node-js');
      expect(popularTags.find(tag => tag.name === 'Vue.js 3')?.slug).toBe('vue-js-3');
    });
  });
});