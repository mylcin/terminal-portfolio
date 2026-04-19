# Terminal Portfolio

A modern, interactive developer portfolio featuring a unique terminal interface alongside a classic view mode. Built with Next.js 16, TypeScript, and a feature-based architecture.

---

## Features

- **Dual Interface** — Seamless switching between Terminal and Classic modes
- **Interactive Terminal** — Linux-like command system with autocomplete, history, and tab completion
- **Blog System** — MDX-powered blog with syntax highlighting, filtering, and pagination
- **Fully Typed** — End-to-end TypeScript for type safety
- **Responsive** — Mobile-first design with adaptive layouts
- **Dark Mode** — Built-in theme switching with system preference detection
- **SEO Friendly** — Optimized metadata, Open Graph, and semantic structure

---

## Tech Stack

| Category           | Technology                    |
|--------------------|-------------------------------|
| Framework          | Next.js 16 (App Router)       |
| Language           | TypeScript                    |
| Styling            | Tailwind CSS + shadcn/ui      |
| Animations         | Framer Motion                 |
| Blog               | Contentlayer + MDX            |
| State Management   | Zustand                       |
| Code Quality       | ESLint + Prettier + Husky     |
| Deployment         | Vercel                        |

---

## Installation

```bash
# Clone repository
git clone https://github.com/mylcin/terminal-portfolio.git
cd terminal-portfolio

# Install dependencies
npm install

# Setup Husky
npm run prepare

# Create environment file
cp .env.local.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Terminal Commands

| Command           | Description                        |
|--------------------|------------------------------------|
| `help`             | Display all available commands     |
| `echo`             | Print text to terminal             |
| `about`            | Learn more about me                |
| `experience`       | View work experience               |
| `projects`         | See my projects                    |
| `skills`           | View technical skills              |
| `education`        | Display educational background     |
| `certifications`   | List certifications                |
| `contact`          | Get contact information            |
| `blog`             | Read blog posts                    |
| `social`           | View social media links            |
| `resume`           | Download resume                    |
| `clear`            | Clear terminal                     |
| `ascii`            | Display ASCII art                  |
| `mode [type]`      | Change mode (terminal/classic)     |
| `theme [type]`     | Change theme (dark/light)          |

---

## Blog Posts

Blog posts are written in MDX and stored in `content/blog/`.

Create a new post:

```bash
# Create file: content/blog/my-post.mdx
---
title: "My Post Title"
description: "Post description"
date: "2024-01-01"
published: true
tags: ["nextjs", "react"]
author: 'Mustafa Yalcin'
---

Your content here...
```

---

## Project Structure

The project follows a **feature-based architecture** where each domain feature encapsulates its own components, logic, configuration, and types.

```
terminal-portfolio/
├── content/                       # Blog posts (MDX)
├── public/                        # Static files
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── blog/
│   │   │   ├── [slug]/page.tsx    # Blog detail page
│   │   │   └── page.tsx           # Blog listing page
│   │   ├── globals.css            # Global styles & design tokens
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Home page
│   │
│   ├── features/                  # Feature modules
│   │   ├── terminal/              # Terminal feature
│   │   │   ├── components/        # Terminal UI components
│   │   │   ├── lib/               # Command execution, parser, formatter
│   │   │   ├── store/             # Zustand terminal store
│   │   │   ├── config/            # Commands & ASCII config
│   │   │   └── types/             # Terminal type definitions
│   │   │
│   │   ├── blog/                  # Blog feature
│   │   │   ├── components/        # Blog UI + MDX renderer
│   │   │   ├── lib/               # Blog utilities
│   │   │   └── types/             # Blog type definitions
│   │   │
│   │   └── classic/               # Classic portfolio mode
│   │       └── components/        # Section components (hero, about, etc.)
│   │
│   └── shared/                    # Cross-feature shared code
│       ├── components/            # Mode toggle, theme toggle, providers
│       ├── ui/                    # shadcn/ui primitives
│       ├── lib/                   # Utilities (cn, formatDate, storage)
│       └── config/                # Personal info configs (about, skills, etc.)
│
├── .contentlayer/                 # Generated by Contentlayer
└── ...
```

---

## Deployment

### Environment Variables

Set these in your Vercel dashboard:

```bash
NEXT_PUBLIC_SITE_URL='localhost:3000'
```

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

MIT License — feel free to use this project for your portfolio!
