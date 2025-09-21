import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Interface pour représenter un article avec score de pertinence
 */
interface ScoredPost {
  post: CollectionEntry<'blog'>;
  score: number;
}

/**
 * Trouve les articles liés basés sur les tags partagés
 * @param currentPost - L'article actuel
 * @param limit - Nombre maximum d'articles à retourner (défaut: 3)
 * @returns Promise<CollectionEntry<'blog'>[]>
 */
export async function getRelatedPosts(
  currentPost: CollectionEntry<'blog'>, 
  limit = 3
): Promise<CollectionEntry<'blog'>[]> {
  const allPosts = await getCollection('blog');
  
  // Obtenir les tags de l'article actuel
  const currentTags = (currentPost.data.tags || []).map((tag: string) => 
    tag.toLowerCase().trim()
  );
  
  // Si pas de tags, retourner les 3 derniers articles (excluant l'actuel)
  if (currentTags.length === 0) {
    return allPosts
      .filter(post => post.slug !== currentPost.slug)
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .slice(0, limit);
  }
  
  // Calculer le score de pertinence pour chaque article
  const scoredPosts: ScoredPost[] = [];
  
  allPosts.forEach(post => {
    // Exclure l'article actuel
    if (post.slug === currentPost.slug) return;
    
    const postTags = (post.data.tags || []).map((tag: string) => 
      tag.toLowerCase().trim()
    );
    
    // Calculer le score basé sur les tags partagés
    const sharedTags = postTags.filter(tag => currentTags.includes(tag));
    
    if (sharedTags.length > 0) {
      // Score = nombre de tags partagés + bonus pour la fraîcheur
      const tagScore = sharedTags.length;
      const daysSincePublish = Math.floor(
        (Date.now() - post.data.pubDate.valueOf()) / (1000 * 60 * 60 * 24)
      );
      const freshnessBonus = Math.max(0, 30 - daysSincePublish) / 100; // Bonus jusqu'à 30 jours
      
      const totalScore = tagScore + freshnessBonus;
      
      scoredPosts.push({
        post,
        score: totalScore
      });
    }
  });
  
  // Trier par score décroissant, puis par date décroissante
  scoredPosts.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }
    return b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf();
  });
  
  // Retourner les meilleurs résultats
  const relatedPosts = scoredPosts.slice(0, limit).map(item => item.post);
  
  // Si on n'a pas assez d'articles liés, compléter avec les plus récents
  if (relatedPosts.length < limit) {
    const remainingSlots = limit - relatedPosts.length;
    const excludedSlugs = new Set([
      currentPost.slug, 
      ...relatedPosts.map(post => post.slug)
    ]);
    
    const recentPosts = allPosts
      .filter(post => !excludedSlugs.has(post.slug))
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .slice(0, remainingSlots);
    
    relatedPosts.push(...recentPosts);
  }
  
  return relatedPosts;
}

/**
 * Calcule les tags partagés entre deux articles
 * @param post1 - Premier article
 * @param post2 - Deuxième article
 * @returns string[] - Liste des tags partagés
 */
export function getSharedTags(
  post1: CollectionEntry<'blog'>, 
  post2: CollectionEntry<'blog'>
): string[] {
  const tags1 = (post1.data.tags || []).map((tag: string) => tag.toLowerCase().trim());
  const tags2 = (post2.data.tags || []).map((tag: string) => tag.toLowerCase().trim());
  
  return tags1.filter(tag => tags2.includes(tag));
}

/**
 * Obtient des statistiques sur les articles liés
 * @param currentPost - L'article actuel
 * @returns Promise<{totalRelated: number, topSharedTag: string | null}>
 */
export async function getRelatedPostsStats(
  currentPost: CollectionEntry<'blog'>
): Promise<{totalRelated: number, topSharedTag: string | null}> {
  const relatedPosts = await getRelatedPosts(currentPost, 10); // Plus large échantillon
  
  // Compter les occurrences de chaque tag dans les articles liés
  const tagCounts = new Map<string, number>();
  
  relatedPosts.forEach(post => {
    const sharedTags = getSharedTags(currentPost, post);
    sharedTags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  
  // Trouver le tag le plus partagé
  let topSharedTag = null;
  let maxCount = 0;
  
  for (const [tag, count] of tagCounts.entries()) {
    if (count > maxCount) {
      maxCount = count;
      topSharedTag = tag;
    }
  }
  
  return {
    totalRelated: relatedPosts.length,
    topSharedTag
  };
}