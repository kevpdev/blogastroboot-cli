// Virtual mock for astro:assets
import { vi } from 'vitest';

export const Image = vi.fn(({ src, alt }: any) => `<img src="${src}" alt="${alt}" />`);
export const getImage = vi.fn();