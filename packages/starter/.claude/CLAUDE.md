# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands are run from the root of the project using pnpm:

### Development

- `pnpm dev` - Start development server at localhost:4321
- `pnpm build` - Build production site to ./dist/
- `pnpm preview` - Preview build locally
- `pnpm astro` - Run Astro CLI commands (e.g., `pnpm astro add`, `pnpm astro check`)

### Quality & Testing

- `pnpm lint` - Run ESLint on .js, .ts, .astro files
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm typecheck` - Run Astro type checking
- `pnpm test` - Run Vitest tests
- `pnpm test:watch` - Run Vitest in watch mode
- `pnpm quality` - Run typecheck, lint, and format check

### Claude Commands

- `/implement-feature [name] [type]` - Structured feature implementation
- `/create-content [type] [title]` - Content creation workflow
- `/commit-push-smart [message?]` - Smart commit and push
- `/bootstrap-quality` - Setup quality tools and configs
- `/debug-issue` - Debug workflow with inputs analysis

## Architecture Overview

This is a modern Astro blog with TypeScript strict configuration, following component-based architecture with design tokens and mobile-first responsive design.

### Layout Architecture (Composable Design)

**Base Layout System**:

- `BaseLayout.astro` - Core HTML structure, shared head/body/footer
- `BlogLayout.astro` - Blog post layout with hero image, metadata, tags
- `BlogListLayout.astro` - Layout component
- `FormationsLayout.astro` - Layout component
- `HomeLayout.astro` - Homepage-specific layout extending BaseLayout
- `PageLayout.astro` - Static page layout for content pages

**Component System**:

```
src/components/
│   ├── layout/
│   │   ├── FooterNew.astro
│   │   ├── Header.astro # Site header
│   │   ├── Navigation.astro # Navigation menu
│   ├── ui/
│   │   ├── Badge.astro
│   │   ├── BaseHead.astro
│   │   ├── Button.astro # Button variants
```

### Routing

- `src/pages/[...slug].astro` - Dynamic pages from content collections
- `src/pages/about.astro` - About page
- `src/pages/contact.astro` - contact page
- `src/pages/index.astro` - Homepage
- `src/pages/meilleures-formations-seo-business.astro` - meilleures-formations-seo-business page
- `src/pages/blog/index.astro` - Blog listing page
- `src/pages/blog/[...slug].astro` - Individual blog posts
- `src/pages/rss.xml.js` - RSS feed generation

### Configuration

**Core Stack**:

- **Astro 5.13.3** with TypeScript strict mode and null checks
- **Tailwind CSS 4.1.13** with Vite plugin for performance
- **Vitest** for unit testing with @testing-library/dom
- **ESLint** flat config with TypeScript support
- **Husky + lint-staged** for pre-commit quality control

## Development Best Practices

### Code Quality & Standards

**Automated Quality Control**:

- **ESLint**: Static analysis with auto-fix (`pnpm lint:fix`)
- **Prettier**: Code formatting with consistent style
- **TypeScript**: Strict mode with null checks enabled
- **Pre-commit Hooks**: Husky + lint-staged (validates only modified files)
- **Quality Command**: `pnpm quality` runs typecheck + lint + format check

**Architecture Principles**:

- **DRY (Don't Repeat Yourself)**: Shared components and layouts
- **Component-Based**: Reusable, configurable components
- **Mobile-First**: Progressive enhancement from mobile to desktop
- **Design System**: Centralized tokens for consistency
- **Semantic HTML**: Proper markup with accessibility in mind

### Core Standards Summary

**Clean Code**:

- Write no comments
- Use strict types only
- Max 30 lines per function, 5 params max
- Use explicit constants, no magic numbers
- Long, readable variable names

**TypeScript**:

- Strict configuration enabled
- Explicit interfaces over implicit types
- Prefer `type` for unions, `interface` for objects
- Avoid `any`, prefer `unknown`

**Astro Patterns**:

- Props interface at component top
- Semantic HTML structure
- Scoped styles when needed
- Performance-first approach

### Performance & UX

**Technical Stack**:

- **Package Manager**: pnpm with Node.js 24+ support
- **Testing**: Vitest with @testing-library/dom for component testing
- **Build**: Optimized production builds with Astro's static generation
- **Assets**: WebP images with responsive sizing and lazy loading

**Core Web Vitals Targets**:

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## Context Organization & Loading Strategy

The `.claude/` directory is organized with thematic subfolders for optimal context loading and performance:

### **Core Context (Always Loaded)**

- **`core/project-overview.mdx`** - Essential architecture, tech stack, project structure
- **`core/development-workflow.mdx`** - Commands, quality workflow, essential practices
- **`CLAUDE.md`** (this file) - Central orchestration and project context

### **Specialized Rules (Contextual Loading by Theme)**

- **`rules/generic/`** - Reusable across projects
  - `code-quality/` - Clean code, TypeScript standards, naming conventions
  - `testing/` - Testing organization, coverage, frontend testing patterns
  - `error-handling/` - Error handling patterns, monitoring, validation
  - `security/` - Frontend security, dependency management
  - `performance/` - Core Web Vitals, optimization strategies
- **`rules/astro/`** - Framework-specific patterns
  - `components/` - Component architecture, error components, props patterns
  - `layouts/` - Layout system, slot patterns
  - `styling/` - Tailwind config, design tokens, responsive design
  - `content/` - Content collections, frontmatter, images
  - `performance/` - SEO optimization, build optimization
  - `testing/` - Astro testing patterns, component testing
- **`rules/workflows/`** - Process and methodology
  - `feature-implementation.md` - Feature development process
  - `content-creation.md` - Content creation workflow

### **Code Generation**

- **`templates/generic/`** - Universal templates
  - `command-template.mdx` - Command structure template
  - `test-template.spec.ts.mdx` - Unit test template
- **`templates/astro/`** - Astro-specific templates
  - `component-template.astro.mdx` - Astro component template
  - `page-template.astro.mdx` - Astro page template
- **`templates/content/`** - Content templates
  - `blog-post-template.md` - Blog post structure

### **Code Fragments & Configs**

- **`snippets/generic/`** - Universal code snippets
  - `typescript-types.md` - Common TypeScript patterns
  - `vitest.config.ts` + `vitest-config-guide.md` - Testing configuration & aliases
  - `settings.local.json` - Claude Code permissions
  - `prettier.json`, `tsconfig.json` - Configuration files
- **`snippets/astro/`** - Astro-specific snippets
  - `component-patterns.md` - Astro component fragments
  - `frontmatter-schemas.md` - Content Collection schemas
- **`snippets/css/`** - CSS and styling snippets
  - `responsive-patterns.md` - Mobile-first responsive patterns

### **Operational Commands**

- **`commands/`** - Essential Claude operations (5 max for performance)
  - `implement-feature.md` - Structured feature development
  - `create-content.md` - Content creation with SEO optimization
  - `commit-push-smart.md` - Smart git operations
  - `bootstrap-quality.md` - Quality tooling setup
  - `debug-issue.md` - Systematic debugging workflow

### **Debug & Analysis**

- **`inputs/`** - Temporary files for debugging
  - `screenshots/` - Visual debugging captures
  - `logs/` - Error logs and system output
  - `configs/` - Configuration files for analysis
  - Auto-cleanup after 7 days to prevent repo pollution

### **Context Loading Optimization**

- **Level 1 (Always)**: `core/` + `CLAUDE.md` (~400 lines)
- **Level 2 (Contextual)**: Specific `rules/` subfolder (~100-150 lines each)
- **Level 3 (As Needed)**: `templates/` + `snippets/` (~50-100 lines each)
- **Total Optimized**: ~400-700 lines per context vs. previous 2,163 lines (70% reduction)

## Claude Code Workflow Integration

### **Command Usage Patterns**

```bash
# Feature Development
/implement-feature search-component component
# → References: core/astro-patterns.mdx, templates/astro/component-template.astro.mdx

# Content Creation
/create-content tutorial "Astro Performance Guide"
# → References: templates/content/blog-post-template.md, snippets/astro/frontmatter-schemas.md

# Smart Git Operations
/commit-push-smart "feat: add search functionality"
# → Automatic analysis + conventional commits

# Debug Issues
/debug-issue css "Navigation mobile broken"
# → Uses inputs/ for screenshots/logs analysis

# Quality Bootstrap
/bootstrap-quality
# → Sets up ESLint, Prettier, Husky, Vitest configuration
```

### **Context Referencing Strategy**

- **Before editing**: Check `core/` for essential patterns and workflow
- **During development**: Reference specific `rules/` subfolders by domain
- **For components**: Use `rules/astro/components/` and `templates/astro/`
- **For testing**: Use `rules/generic/testing/` and `rules/astro/testing/`
- **For errors**: Use `rules/generic/error-handling/` and `rules/astro/components/error-components.mdx`
- **For styling**: Use `rules/astro/styling/` for Tailwind configuration
- **For performance**: Use `rules/generic/performance/` for Core Web Vitals
- **For security**: Use `rules/generic/security/` for frontend security
- **For debugging**: Utilize `inputs/` and relevant `snippets/` subfolders
- **Code generation**: Use domain-specific `templates/` subfolders

### **Performance Optimization**

- Load only relevant context based on task type
- Prefer specific snippets over full rule loading
- Use templates for rapid prototyping
- Leverage inputs/ for visual debugging workflow

## Important Instructions

**File Operations**:

- ALWAYS prefer editing existing files over creating new ones
- NEVER create documentation files unless explicitly requested
- Use existing patterns and conventions from `core/` and `rules/`
- Reference `templates/` for new file structure

**Quality Control Workflow**:

- Run `pnpm quality` before committing (enforced by pre-commit hooks)
- Follow standards defined in `rules/generic/code-quality/`
- Apply Astro patterns from `rules/astro/`
- Validate accessibility and performance against targets from `rules/generic/performance/`

**Architecture Compliance**:

- Follow component-based design patterns from `rules/astro/components/`
- Respect layout hierarchy defined in `core/project-overview.mdx`
- Use design tokens consistently from `rules/astro/styling/`
- Maintain mobile-first approach with Tailwind breakpoints
- Apply TypeScript strict patterns from `rules/generic/code-quality/typescript.mdx`
- Use error handling patterns from `rules/generic/error-handling/`

## Context Maintenance

**Automatic CLAUDE.md Updates**:

- Claude MUST automatically check and update CLAUDE.md after any structural modification
- Update triggers: .claude/ structure changes, new components/pages, new commands, workflow modifications
- Sections to maintain: Architecture Overview, Commands, Context Organization, Context Referencing Strategy
- Process: Read current state → Note impacts → Update immediately → Validate references
- Goal: Keep CLAUDE.md always synchronized with actual project state

**Update Responsibility**:

- Claude is responsible for maintaining documentation accuracy
- No manual intervention required from user
- Updates must happen in the same session as modifications
- All references and file paths must remain valid and current
