// DEPRECATED: Ce fichier est remplacé par AUTHOR_CONFIG dans src/config/site.ts
// Gardé pour compatibilité, sera supprimé dans une future version

import { AUTHOR_CONFIG } from './site';

export interface AuthorConfig {
  // Informations personnelles
  name: string;
  bio: string;
  avatar?: string;
  
  // Contact
  email: string;
  phone?: string;
  location?: string;
  
  // Professionnel
  jobTitle: string;
  company?: string;
  website: string;
  
  // SEO & Meta
  twitterHandle?: string;
  linkedinUrl?: string;
}

// Redirection vers la configuration centralisée
export const authorConfig: AuthorConfig = AUTHOR_CONFIG;