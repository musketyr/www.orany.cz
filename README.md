# orany.cz - Personal Portfolio & Blog

A modern, minimal dark-themed portfolio site built with Astro.

## 🚀 Features

- **Modern Static Site**: Built with Astro for lightning-fast performance
- **Dark Terminal Aesthetic**: Minimalist design with JetBrains Mono and Inter fonts
- **Content Rich**: 
  - 81 articles from Medium
  - 11 articles from legacy JBake blog
  - 6 conference talks (YouTube embeds)
  - 30+ open source projects
- **Responsive**: Mobile-friendly design
- **Fast**: Minimal JavaScript, optimized for speed
- **SEO Ready**: Proper meta tags and semantic HTML

## 📁 Structure

```
/
├── public/
│   ├── CNAME           # Custom domain configuration
│   └── favicon.svg
├── src/
│   ├── content/
│   │   ├── blog/       # Blog posts (markdown)
│   │   └── config.ts   # Content collections schema
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro       # Homepage
│   │   ├── blog/
│   │   │   ├── index.astro   # Blog listing
│   │   │   └── [...slug].astro  # Blog post template
│   │   ├── talks/
│   │   ├── projects/
│   │   └── about/
│   └── styles/
├── scripts/           # Import scripts for content migration
└── .github/workflows/ # GitHub Actions for deployment
```

## 🛠 Development

### Prerequisites

- Node.js 20+
- npm

### Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Content Management

### Adding Blog Posts

Create a new markdown file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
date: 2026-02-15
tags: ["groovy", "micronaut"]
source: manual
---

Your content here...
```

### Importing Content

Scripts are available in `scripts/` for importing from:
- Medium exports
- JBake blogs
- Other sources

## 🚢 Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `master` or `redesign-2026` branch.

Deployment is handled by `.github/workflows/deploy.yml`.

## 🎨 Design

- **Colors**: GitHub Dark theme (#0d1117 background, #58a6ff accent)
- **Fonts**: 
  - JetBrains Mono (headings, code)
  - Inter (body text)
- **Style**: Terminal/developer-focused aesthetic

## 📊 Content Sources

- **Medium**: 81 articles (2017-2025)
- **JBake**: 11 articles (2013-2017) about Gaelyk
- **Talks**: 6 conference presentations
- **Projects**: Personal, Agorapulse, and testing libraries

## 🔧 Technical Details

- **Framework**: Astro 5.17+
- **Content**: MDX support
- **Build**: Static site generation
- **Hosting**: GitHub Pages
- **Domain**: orany.cz
- **Analytics**: None (privacy-focused)

## 📄 License

Content © Vladimír Oraný. All rights reserved.

---

Built with ❤️ using Astro
