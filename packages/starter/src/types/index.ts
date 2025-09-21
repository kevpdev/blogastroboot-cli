// Global TypeScript definitions

export interface BlogPost {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  heroImage?: string;
  tags?: string[];
  slug: string;
}

export interface Page {
  title: string;
  description: string;
  updatedDate?: Date;
  heroImage?: string;
  slug: string;
}

export interface NavigationItem {
  href: string;
  label: string;
}

export interface SocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
  youtube?: string;
  instagram?: string;
}

export type Theme = 'light' | 'dark' | 'system';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';