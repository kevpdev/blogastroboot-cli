import type { CollectionEntry } from 'astro:content';

/**
 * Helper function to safely access array elements in tests
 * Throws descriptive error if element doesn't exist
 */
export function getPostAt(posts: CollectionEntry<'blog'>[], index: number): CollectionEntry<'blog'> {
  const post = posts[index];
  if (!post) {
    throw new Error(`Expected post at index ${index}, but got ${posts.length} posts`);
  }
  return post;
}

/**
 * Helper function to safely access tag data in tests
 */
export function getTagAt(tags: any[], index: number): any {
  const tag = tags[index];
  if (!tag) {
    throw new Error(`Expected tag at index ${index}, but got ${tags.length} tags`);
  }
  return tag;
}

/**
 * Helper to assert array has expected length and return first element
 */
export function expectLengthAndGetFirst<T>(array: T[], expectedLength: number): T {
  if (array.length !== expectedLength) {
    throw new Error(`Expected array length ${expectedLength}, but got ${array.length}`);
  }
  const first = array[0];
  if (!first) {
    throw new Error('Expected first element to exist');
  }
  return first;
}