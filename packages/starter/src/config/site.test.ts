import { describe, test, expect } from 'vitest';
import { SITE_CONFIG, AUTHOR_CONFIG, COMMON_LINKS, FOOTER_LINKS, SOCIAL_CONFIG } from './site';

describe('Site Configuration', () => {
  describe('SITE_CONFIG', () => {
    test('should have required site properties', () => {
      expect(SITE_CONFIG).toMatchObject({
        title: expect.any(String),
        description: expect.any(String),
        url: expect.any(String),
        lang: expect.any(String),
        locale: expect.any(String),
        defaultImage: expect.any(String),
      });
    });

    test('should have valid URL format', () => {
      expect(SITE_CONFIG.url).toMatch(/^https?:\/\/.+/);
    });

    test('should have valid locale format', () => {
      expect(SITE_CONFIG.locale).toMatch(/^[a-z]{2}-[A-Z]{2}$/);
    });

    test('should have valid language code', () => {
      expect(SITE_CONFIG.lang).toMatch(/^[a-z]{2}$/);
    });

    test('should have non-empty required fields', () => {
      expect(SITE_CONFIG.title).toBeTruthy();
      expect(SITE_CONFIG.description).toBeTruthy();
      expect(SITE_CONFIG.url).toBeTruthy();
    });
  });

  describe('AUTHOR_CONFIG', () => {
    test('should have required author properties', () => {
      expect(AUTHOR_CONFIG).toMatchObject({
        name: expect.any(String),
        email: expect.any(String),
        bio: expect.any(String),
        avatar: expect.any(String),
        jobTitle: expect.any(String),
        company: expect.any(String),
        website: expect.any(String),
        phone: expect.any(String),
        location: expect.any(String),
        twitterHandle: expect.any(String),
        linkedinUrl: expect.any(String),
      });
    });

    test('should have valid email format', () => {
      expect(AUTHOR_CONFIG.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    test('should have valid website URL', () => {
      expect(AUTHOR_CONFIG.website).toMatch(/^https?:\/\/.+/);
      expect(AUTHOR_CONFIG.website).toBe(SITE_CONFIG.url);
    });

    test('should have valid LinkedIn URL format', () => {
      expect(AUTHOR_CONFIG.linkedinUrl).toMatch(/^https:\/\/(www\.)?linkedin\.com\/in\/.+/);
    });

    test('should have valid Twitter handle format', () => {
      expect(AUTHOR_CONFIG.twitterHandle).toMatch(/^@.+/);
    });

    test('should have valid phone format', () => {
      expect(AUTHOR_CONFIG.phone).toMatch(/^\+\d+/);
    });

    test('should have non-empty required fields', () => {
      expect(AUTHOR_CONFIG.name).toBeTruthy();
      expect(AUTHOR_CONFIG.email).toBeTruthy();
      expect(AUTHOR_CONFIG.bio).toBeTruthy();
      expect(AUTHOR_CONFIG.jobTitle).toBeTruthy();
    });
  });

  describe('COMMON_LINKS', () => {
    test('should be an array of link objects', () => {
      expect(Array.isArray(COMMON_LINKS)).toBe(true);
      expect(COMMON_LINKS.length).toBeGreaterThan(0);
    });

    test('should have valid link structure', () => {
      COMMON_LINKS.forEach(link => {
        expect(link).toMatchObject({
          label: expect.any(String),
          href: expect.any(String),
          enabled: expect.any(Boolean),
        });

        // Optional external property
        if ('external' in link) {
          expect(typeof link.external).toBe('boolean');
        }
      });
    });

    test('should have valid href formats', () => {
      COMMON_LINKS.forEach(link => {
        // Should be either absolute path or full URL
        expect(link.href).toMatch(/^(\/|https?:\/\/)/);
      });
    });

    test('should have non-empty labels', () => {
      COMMON_LINKS.forEach(link => {
        expect(link.label.trim()).toBeTruthy();
      });
    });

    test('should have home link as first item', () => {
      expect(COMMON_LINKS[0]).toMatchObject({
        label: 'Home',
        href: '/',
        enabled: true,
      });
    });

    test('should include blog link', () => {
      const blogLink = COMMON_LINKS.find(link => link.href === '/blog');
      expect(blogLink).toBeDefined();
      expect(blogLink?.label).toBe('Blog');
    });
  });

  describe('FOOTER_LINKS', () => {
    test('should be an array of legal links', () => {
      expect(Array.isArray(FOOTER_LINKS)).toBe(true);
      expect(FOOTER_LINKS.length).toBeGreaterThan(0);
    });

    test('should have valid link structure', () => {
      FOOTER_LINKS.forEach(link => {
        expect(link).toMatchObject({
          label: expect.any(String),
          href: expect.any(String),
          enabled: expect.any(Boolean),
        });
      });
    });

    test('should include required legal pages', () => {
      const requiredPages = ['mentions-legales', 'politique-confidentialite', 'conditions-utilisation'];
      
      requiredPages.forEach(page => {
        const link = FOOTER_LINKS.find(link => link.href.includes(page));
        expect(link).toBeDefined();
      });
    });

    test('should have valid href paths', () => {
      FOOTER_LINKS.forEach(link => {
        expect(link.href).toMatch(/^\/[a-z-]+$/);
      });
    });
  });

  describe('SOCIAL_CONFIG', () => {
    test('should have social media URLs', () => {
      expect(SOCIAL_CONFIG).toMatchObject({
        twitter: expect.any(String),
        youtube: expect.any(String),
        instagram: expect.any(String),
        tiktok: expect.any(String),
        github: expect.any(String),
        mastodon: expect.any(String),
      });
    });

    test('should have valid social media URL formats', () => {
      expect(SOCIAL_CONFIG.twitter).toMatch(/^https:\/\/(www\.)?x\.com\/.+/);
      expect(SOCIAL_CONFIG.youtube).toMatch(/^https:\/\/(www\.)?youtube\.com\/@.+/);
      expect(SOCIAL_CONFIG.instagram).toMatch(/^https:\/\/(www\.)?instagram\.com\/.+/);
      expect(SOCIAL_CONFIG.tiktok).toMatch(/^https:\/\/(www\.)?tiktok\.com\/@.+/);
      expect(SOCIAL_CONFIG.github).toMatch(/^https:\/\/(www\.)?github\.com\/.+/);
      expect(SOCIAL_CONFIG.mastodon).toMatch(/^https:\/\/.+\/@.+/);
    });

    test('should have all URLs as strings', () => {
      Object.values(SOCIAL_CONFIG).forEach(url => {
        expect(typeof url).toBe('string');
        expect(url.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Configuration Integration', () => {
    test('should have consistent author website and site URL', () => {
      expect(AUTHOR_CONFIG.website).toBe(SITE_CONFIG.url);
    });

    test('should not have duplicate links in common links', () => {
      const hrefs = COMMON_LINKS.map(link => link.href);
      const uniqueHrefs = [...new Set(hrefs)];
      expect(hrefs.length).toBe(uniqueHrefs.length);
    });

    test('should not have duplicate links in footer links', () => {
      const hrefs = FOOTER_LINKS.map(link => link.href);
      const uniqueHrefs = [...new Set(hrefs)];
      expect(hrefs.length).toBe(uniqueHrefs.length);
    });

    test('should have configuration objects as const', () => {
      // These should be readonly objects (TypeScript const assertion)
      // We can't test the type directly, but we can verify the structure
      expect(typeof SITE_CONFIG).toBe('object');
      expect(typeof AUTHOR_CONFIG).toBe('object');
      expect(typeof SOCIAL_CONFIG).toBe('object');
    });
  });

  describe('Configuration Validation', () => {
    test('should have reasonable string lengths', () => {
      expect(SITE_CONFIG.title.length).toBeLessThan(100);
      expect(SITE_CONFIG.description.length).toBeLessThan(500);
      expect(AUTHOR_CONFIG.name.length).toBeLessThan(100);
      expect(AUTHOR_CONFIG.bio.length).toBeLessThan(1000);
    });

    test('should not contain placeholder values', () => {
      const placeholderPatterns = [
        /example\.com/,
        /your-?name/i,
        /placeholder/i,
        /todo/i,
        /fixme/i,
      ];

      const configValues = [
        SITE_CONFIG.title,
        SITE_CONFIG.description,
        SITE_CONFIG.url,
        AUTHOR_CONFIG.name,
        AUTHOR_CONFIG.email,
        AUTHOR_CONFIG.bio,
      ];

      configValues.forEach(value => {
        placeholderPatterns.forEach(pattern => {
          expect(value).not.toMatch(pattern);
        });
      });
    });
  });
});