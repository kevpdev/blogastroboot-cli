import { getCollection, type CollectionEntry } from 'astro:content';

export interface TagCount {
  name: string;
  count: number;
  slug: string;
}

/**
 * Extrait tous les tags des articles de blog et compte leurs occurrences
 */
export async function getPopularTags(limit = 6): Promise<TagCount[]> {
  const allPosts = await getCollection('blog');
  const tagCounts = new Map<string, number>();

  // Compter les occurrences de chaque tag
  allPosts.forEach((post) => {
    const tags = post.data.tags || [];
    tags.forEach((tag: string) => {
      const normalizedTag = tag.trim().toLowerCase();
      tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) || 0) + 1);
    });
  });

  // Convertir en tableau et trier par popularité
  const sortedTags = Array.from(tagCounts.entries())
    .map(([name, count]) => ({
      name: capitalizeTag(name),
      count,
      slug: slugifyTag(name)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  return sortedTags;
}

/**
 * Obtient tous les articles ayant un tag spécifique
 */
export async function getPostsByTag(tag: string): Promise<CollectionEntry<'blog'>[]> {
  const allPosts = await getCollection('blog');
  const normalizedTag = tag.toLowerCase();

  return allPosts.filter((post) => {
    const postTags = post.data.tags || [];
    return postTags.some((postTag: string) => 
      postTag.toLowerCase() === normalizedTag
    );
  }).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Capitalise la première lettre d'un tag
 */
function capitalizeTag(tag: string): string {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}

/**
 * Convertit un tag en slug pour les URLs
 */
function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Obtient tous les tags uniques triés alphabétiquement
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getCollection('blog');
  const allTags = new Set<string>();

  allPosts.forEach((post) => {
    const tags = post.data.tags || [];
    tags.forEach((tag: string) => {
      allTags.add(tag.trim());
    });
  });

  return Array.from(allTags).sort();
}