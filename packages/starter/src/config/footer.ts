import type { FooterConfig } from '../types/navigation';
import { COMMON_LINKS, FOOTER_LINKS, SITE_CONFIG, type CommonLink } from './site';
import { socialLinksConfig } from './social';

// Combine les liens communs et spécifiques au footer
const combineFooterLinks = (): CommonLink[] => {
  const commonFooterLinks = COMMON_LINKS.filter(link =>
    ['About', 'Contact'].includes(link.label)
  );
  return [...commonFooterLinks, ...FOOTER_LINKS];
};

export const footerConfig: FooterConfig = {
  links: combineFooterLinks().map(link => ({
    label: link.label,
    href: link.href,
    enabled: link.enabled
  })),
  social: {
    enabled: true,
    links: socialLinksConfig,
    size: 'medium'
  },
  copyright: {
    enabled: true,
    text: 'Tous droits réservés.',
    year: new Date().getFullYear(),
    companyName: SITE_CONFIG.title // Utilise le titre du site
  }
};