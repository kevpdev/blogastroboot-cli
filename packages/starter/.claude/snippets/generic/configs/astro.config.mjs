// Astro Configuration - Source of Truth
// Based on current project setup with Astro 5.13.3
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// Standard configuration for modern Astro blog
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.com',
  
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/draft/'),
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
  
  vite: {
    build: {
      sourcemap: true, // Development debugging
    },
  },
  
  build: {
    inlineStylesheets: 'auto', // Performance optimization
  },
  
  compressHTML: true,
  output: 'static',
});

// Performance optimization variant (for production)
export const productionConfig = defineConfig({
  site: process.env.SITE_URL || 'https://example.com',
  
  integrations: [
    mdx(),
    sitemap(),
    tailwind({ applyBaseStyles: false }),
  ],
  
  build: {
    inlineStylesheets: 'auto',
    assetsPrefix: '/assets/', // CDN prefix if needed
  },
  
  vite: {
    build: {
      sourcemap: false, // Disable in production
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['astro'],
            'ui': ['./src/components/ui/index.ts'],
            'utils': ['./src/utils/index.ts'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['astro', '@astrojs/markdown-remark'],
    },
  },
  
  compressHTML: true,
  output: 'static',
});

// Image optimization variant (for media-heavy sites)
export const imageOptimizedConfig = defineConfig({
  site: process.env.SITE_URL || 'https://example.com',
  
  integrations: [
    mdx(),
    sitemap(),
    tailwind({ applyBaseStyles: false }),
  ],
  
  image: {
    formats: ['avif', 'webp', 'jpg'],
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
    ],
  },
  
  vite: {
    build: { sourcemap: true },
  },
  
  compressHTML: true,
});