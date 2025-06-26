---
applyTo: '**'
---
🧠 Project Context & AI Coding Standards
✅ Project Domain
We're building a pharmacy price comparison platform. Users will enter product names via a search field, and we will return scraped price data from various pharmacy websites.

The main use case is searching products and comparing prices from multiple pharmacies.

We need reliable, fast, and accurate scrapers.

SEO is a priority: we want pages to be easily discoverable on search engines (Google, Bing, etc.).

🛠 Tech Stack
Framework: Next.js (React 19+)

Scraping: Puppeteer (headless browser-based scraping in Node.js)

Language: TypeScript



Use a clean and scalable structure like:

bash
Copy
Edit
/pages            → Next.js routing pages
/ui               → Reusable UI components
/modules          → Business logic & feature modules (e.g., /pharmacy, /search)
/core             → Shared core logic, helpers, constants
/lib              → API clients, puppeteer setup, etc.
/models            → Global TypeScript types & interfaces



Example:

bash
Copy
Edit
/ui/SearchInput.tsx
/modules/pharmacy/scraper.ts
/core/logger.ts





⚙️ Coding Standards & AI Preferences
🔁 Principles to Follow
Apply SOLID principles in all business logic

Follow KISS, DRY, and YAGNI best practices

Ensure code is modular, testable, and readable

Prefer composition over inheritance

✨ TypeScript & React Guidelines
Always use strict typing

Prefer React functional components with hooks

Split logic and presentation where possible (e.g., containers vs. components)

Avoid anonymous default exports — name everything

Use eslint, prettier, and tsconfig that align with strict standards

🧪 Testing
All logic-heavy modules (like scrapers) should have unit tests

Use Jest or Playwright where applicable

🌐 SEO Best Practices
Use next/head to include meta tags

Ensure proper semantic HTML

Render important content on the server when possible (SSR/SSG)

Add structured data (Schema.org) for product listings if useful


