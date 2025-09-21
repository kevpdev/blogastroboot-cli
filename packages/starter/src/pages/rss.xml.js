import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { handleError, logError } from '../utils/error-handler';

export async function GET(context) {
  try {
    const posts = await getCollection('blog');
    return rss({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      site: context.site,
      items: posts.map((post) => ({
        ...post.data,
        link: `/blog/${post.slug}/`,
      })),
    });
  } catch (error) {
    const appError = handleError(error);
    logError(appError, 'RSS feed generation');

    // Return error RSS feed
    return rss({
      title: `${SITE_TITLE} - Erreur`,
      description: 'Une erreur est survenue lors de la génération du flux RSS.',
      site: context.site,
      items: [],
    });
  }
}
