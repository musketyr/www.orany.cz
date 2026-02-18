# Telegraphic Design System

A consistent design language for all Telegraphic properties.

## Brand

- **Name:** The Telegraphic Developer
- **Tagline:** `by Vladimír Oraný_`
- **Logo:** `>_` terminal prompt + `telegraphic.dev`
- **Emoji:** ⌨️ (keyboard)

## Colors

### Core Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0d1117` | Page background |
| `--bg-secondary` | `#161b22` | Nav, footer, cards |
| `--bg-tertiary` | `#1c2128` | Input fields, code blocks |
| `--text-primary` | `#e6edf3` | Main text |
| `--text-secondary` | `#8b949e` | Muted text, labels |
| `--accent` | `#d4a855` | Gold - links, CTAs, branding |
| `--accent-hover` | `#e0ba6a` | Gold hover state |
| `--border` | `#30363d` | Borders, dividers |
| `--code-bg` | `#161b22` | Code background |

### Traffic Lights

Used as decorative elements mimicking macOS window controls.

| Color | Hex | CSS Class |
|-------|-----|-----------|
| Red | `#ff5f56` | `.red` |
| Yellow | `#ffbd2e` | `.yellow` |
| Green | `#27c93f` | `.green` |

```html
<div class="traffic-lights">
  <span class="red"></span>
  <span class="yellow"></span>
  <span class="green"></span>
</div>
```

```css
.traffic-lights {
  display: flex;
  gap: 6px;
}
.traffic-lights span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.traffic-lights .red { background: #ff5f56; }
.traffic-lights .yellow { background: #ffbd2e; }
.traffic-lights .green { background: #27c93f; }
```

## Typography

### Fonts

| Font | Usage | Weight |
|------|-------|--------|
| **JetBrains Mono** | Headings, code, logo, buttons | 400, 700 |
| **Inter** | Body text | 300, 400, 600 |

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
```

### Scale

| Element | Size | Font |
|---------|------|------|
| h1 | 2.5rem (mobile: 2rem) | JetBrains Mono 700 |
| h2 | 2rem (mobile: 1.5rem) | JetBrains Mono 700 |
| h3 | 1.5rem (mobile: 1.25rem) | JetBrains Mono 700 |
| Body | 1rem | Inter 400 |
| Small | 0.875rem | Inter 400 |

### Line Height

- Headings: `1.2`
- Body: `1.7`

## Components

### Navigation

```html
<nav>
  <div class="container">
    <a href="/" class="logo">
      <span class="terminal-prompt">>_</span>
      telegraphic.dev
    </a>
    <div class="nav-links">
      <a href="/blog">Blog</a>
      <a href="/talks">Talks</a>
      <a href="/projects">Projects</a>
      <a href="/about">About</a>
    </div>
  </div>
</nav>
```

- Background: `--bg-secondary`
- Border bottom: `1px solid var(--border)`
- Logo: JetBrains Mono, `--text-primary`
- Terminal prompt (`>_`): `--accent`
- Nav links: `--text-secondary`, hover: `--text-primary`
- Sticky top, z-index: 100

### Footer

```html
<footer>
  <div class="container">
    <p>© 2026 Telegraphic. All rights reserved.</p>
    <div class="social-links">
      <a href="...">Substack</a>
      <a href="...">Bluesky</a>
      <a href="...">X</a>
      <a href="...">GitHub</a>
    </div>
  </div>
</footer>
```

- Background: `--bg-secondary`
- Border top: `1px solid var(--border)`
- Text: `--text-secondary`

### Buttons

**Primary (Gold CTA):**
```css
.btn-primary {
  background: var(--accent);
  color: var(--bg-primary);
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  padding: 1rem 1.5rem;
  border-radius: 6px;
  border: none;
}
.btn-primary:hover {
  background: var(--accent-hover);
}
```

**Secondary (Outline):**
```css
.btn-secondary {
  background: transparent;
  color: var(--accent);
  border: 1px solid var(--accent);
  font-family: 'JetBrains Mono', monospace;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
}
```

### Cards

```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
}
```

With traffic lights header:
```html
<div class="card">
  <div class="traffic-lights">
    <span class="red"></span>
    <span class="yellow"></span>
    <span class="green"></span>
  </div>
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>
```

### Form Inputs

```css
input, textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 1rem;
}
input:focus, textarea:focus {
  outline: none;
  border-color: var(--accent);
}
input::placeholder, textarea::placeholder {
  color: var(--text-secondary);
}
```

### Links

```css
a {
  color: var(--accent);
  text-decoration: none;
  transition: color 0.2s;
}
a:hover {
  color: var(--accent-hover);
}
```

### Blinking Cursor

Used after the byline to create a terminal effect.

```css
.blinking-cursor::after {
  content: '_';
  animation: blink 1s step-end infinite;
  color: var(--accent);
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

## Layout

### Container

```css
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
```

### Spacing

| Size | Value |
|------|-------|
| xs | 0.5rem |
| sm | 1rem |
| md | 1.5rem |
| lg | 2rem |
| xl | 3rem |
| 2xl | 4rem |

## Responsive Breakpoints

| Name | Width |
|------|-------|
| Mobile | < 640px |
| Tablet | 640px - 1024px |
| Desktop | > 1024px |

### Mobile Adaptations

- Logo text hidden, show only `>_`
- Navigation links remain inline (4 items max)
- Hamburger menu for more links
- Footer stacks vertically
- Headings scale down

## Usage Across Properties

| Property | URL | Notes |
|----------|-----|-------|
| Main site | telegraphic.dev | Full layout |
| Ask | ask.telegraphic.dev | Form-focused, same nav/footer |
| Mentor | mentor.telegraphic.app | Dashboard variant |

## Assets

- **Logo PNG:** `/logo-256.png`, `/logo-512.png`
- **Favicon:** `/favicon.ico`
- **Apple Touch Icon:** `/apple-touch-icon.png`

## Social

- **Substack:** telegraphic.substack.com
- **Bluesky:** @telegraphic.dev
- **X/Twitter:** @telegraphic_dev
- **GitHub:** musketyr
