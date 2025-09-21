// Configuration principale du site
export const SITE_CONFIG = {
  title: 'Mon Blog',
  description: 'Un blog moderne sur le développement web et les technologies',
  url: 'https://monblog.com',
  lang: 'fr',
  locale: 'fr-FR',
  defaultImage: '/images/og-image.jpg',
} as const;

// Informations de l'auteur centralisées
export const AUTHOR_CONFIG = {
  name: 'AuthorName',
  email: 'contact@monblog.com',
  bio: 'Développeur web passionné par les technologies modernes et l\'optimisation des performances. Je partage mes connaissances et expériences à travers ce blog.',
  avatar: '/images/avatar.jpg',
  jobTitle: 'Développeur Web Full-Stack',
  company: 'Freelance',
  website: SITE_CONFIG.url,
  phone: '+33 1 23 45 67 89',
  location: 'Paris, France',
  twitterHandle: '@monhandle',
  linkedinUrl: 'https://linkedin.com/in/monprofil'
} as const;

// Liens communs utilisés dans navigation et footer
export interface CommonLink {
  label: string;
  href: string;
  enabled: boolean;
  external?: boolean;
}

export const COMMON_LINKS: CommonLink[] = [
  {
    label: 'Home',
    href: '/',
    enabled: true
  },
  {
    label: 'About',
    href: '/about',
    enabled: true
  },
  {
    label: 'Meilleures formations seo / business',
    href: '/meilleures-formations-seo-business',
    enabled: true
  },
  {
    label: 'Blog',
    href: '/blog',
    enabled: true
  },
  {
    label: 'Contact',
    href: '/contact',
    enabled: true
  }
];

// Liens spécifiques au footer
export const FOOTER_LINKS: CommonLink[] = [
  {
    label: 'Mentions légales',
    href: '/mentions-legales',
    enabled: true
  },
  {
    label: 'Politique de confidentialité',
    href: '/politique-confidentialite',
    enabled: true
  },
  {
    label: 'Conditions d\'utilisation',
    href: '/conditions-utilisation',
    enabled: true
  },
  {
    label: 'Plan du site',
    href: '/sitemap',
    enabled: false
  }
];

// Configuration des réseaux sociaux (URLs de base)
export const SOCIAL_CONFIG = {
  twitter: 'https://x.com/votrecompte',
  youtube: 'https://youtube.com/@votrechaine',
  instagram: 'https://instagram.com/votrecompte',
  tiktok: 'https://tiktok.com/@votrecompte',
  github: 'https://github.com/votrecompte',
  mastodon: 'https://mastodon.social/@votrecompte'
} as const;