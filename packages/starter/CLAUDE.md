# Blog Astro - Documentation Projet

Documentation technique pour le blog Astro avec TypeScript et Tailwind CSS.

## Getting Started

### Prerequisites
- Node.js 24+
- pnpm (package manager)

### Development
```bash
pnpm install       # Install dependencies
pnpm dev          # Start dev server (localhost:4321)
pnpm build        # Build for production
pnpm preview      # Preview production build
```

### Quality & Testing
```bash
pnpm quality      # Run all checks (typecheck + lint + format)
pnpm lint         # ESLint check
pnpm lint:fix     # ESLint with auto-fix
pnpm format       # Format with Prettier
pnpm test         # Run Vitest tests
```

## Tech Stack

- **Astro 5.13.3** - Modern web framework
- **TypeScript** - Strict mode with null checks
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **Vitest** - Unit testing framework
- **ESLint + Prettier** - Code quality and formatting
- **Husky + lint-staged** - Pre-commit hooks

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Navigation
│   └── ui/              # Reusable UI components
├── layouts/             # Page layout templates
├── pages/               # File-based routing
├── content/             # Blog posts and pages (Markdown)
├── styles/              # CSS and design tokens
└── config/              # Configuration files
```

## Key Features

- **Static Site Generation** with Astro
- **Content Collections** for blog posts
- **Responsive Design** mobile-first approach
- **SEO Optimized** with proper meta tags
- **Performance** optimized images and assets
- **Accessibility** WCAG 2.2 AA compliant

## Contributing

1. Follow existing code patterns and conventions
2. Run `pnpm quality` before committing
3. Write tests for new features
4. Ensure responsive design works on all breakpoints
5. Validate accessibility with screen readers

## Deployment

The site is built for static hosting. Run `pnpm build` to generate the production build in `./dist/`.
