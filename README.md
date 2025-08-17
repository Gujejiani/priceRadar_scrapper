# 🏥 PharmacyRadar - Smart Pharmacy Price Comparison Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-24.11.1-green)](https://pptr.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.18.2-lightgrey)](https://expressjs.com/)

> **Find the best pharmaceutical prices across Georgian pharmacies in real-time**

PharmacyRadar is a modern, full-stack web application that scrapes and compares medicine prices from major Georgian pharmacy chains, helping users find the most affordable options instantly.

![PharmacyRadar Demo](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=PharmacyRadar+Demo)

## ✨ Features

### 🔍 **Smart Search**
- Real-time product search across multiple pharmacy websites
- Georgian keyboard layout auto-translation
- Intelligent fuzzy matching for product names
- Similarity-based filtering and ranking

### 💰 **Price Comparison**
- Live price scraping from major Georgian pharmacies:
  - **PSP** (psp.ge)
  - **Aversi** (aversi.ge) 
  - **GPC** (gpc.ge)
  - **Pharmadepot** (pharmadepot.ge)
- Automatic price sorting (lowest to highest)
- Product availability checking

### 🚀 **Modern Architecture**
- Decoupled frontend and backend architecture
- Headless browser automation with anti-bot protection
- Stealth mode scraping with realistic browser headers
- Responsive Georgian-first UI/UX

### 🛡️ **Robust Scraping**
- Puppeteer with stealth plugin for anti-detection
- Custom browser headers and user agents
- Timeout handling and error recovery
- Modular scraper architecture for easy expansion

## 🏗️ Architecture

```mermaid
graph TD
    A[Next.js Frontend] -->|API Request| B[Express Backend]
    B -->|Scrape| C[PSP Scraper]
    B -->|Scrape| D[Aversi Scraper]
    B -->|Scrape| E[GPC Scraper]
    B -->|Scrape| F[Pharmadepot Scraper]
    C -->|Results| G[String Similarity Engine]
    D -->|Results| G
    E -->|Results| G
    F -->|Results| G
    G -->|Filtered & Sorted| B
    B -->|JSON Response| A
```

### 📁 Project Structure

```
pharmacy-scrapper/
├── scrapping-client/          # Next.js Frontend
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   │   ├── api/scrape/   # API proxy route
│   │   │   └── page.tsx      # Main landing page
│   │   ├── components/       # React components
│   │   │   └── client/       # Client-side components
│   │   ├── ui/               # Reusable UI components
│   │   ├── core/             # Business logic & utilities
│   │   │   ├── key-map.ts    # Georgian keyboard mapping
│   │   │   └── string-utils.ts
│   │   └── models/           # TypeScript interfaces
│   └── package.json
│
└── scraping-server/          # Node.js Backend
    ├── src/
    │   ├── puppeteer/        # Scraper modules
    │   │   ├── withBrowser.ts      # Puppeteer HOF with stealth
    │   │   ├── pspScraper.ts       # PSP pharmacy scraper
    │   │   ├── aversiScraper.ts    # Aversi pharmacy scraper
    │   │   ├── gpcScraper.ts       # GPC pharmacy scraper
    │   │   └── pharmadepotScraper.ts
    │   ├── models/           # Data models
    │   ├── string-utils.ts   # Similarity matching engine
    │   └── index.ts          # Express server entry point
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm/yarn/pnpm**
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/pharmacy-scrapper.git
cd pharmacy-scrapper
```

2. **Install dependencies for both frontend and backend**
```bash
# Install backend dependencies
cd scraping-server
npm install

# Install frontend dependencies  
cd ../scrapping-client
npm install
```

3. **Start the development servers**

**Terminal 1 - Backend Server:**
```bash
cd scraping-server
npm run dev
# Server runs on http://localhost:8080
```

**Terminal 2 - Frontend Server:**
```bash
cd scrapping-client  
npm run dev
# Frontend runs on http://localhost:3000
```

4. **Open your browser**
   
   Navigate to `http://localhost:3000` and start searching for medicines!

## 🔧 Technical Implementation

### Backend (Node.js + Express)

```typescript
// Easily enable/disable pharmacies
const enabledPharmacies = [
  { name: 'psp', scraper: scrapePsp },
  { name: 'aversi', scraper: scrapeAversi },
  { name: 'gpc', scraper: scrapeGpc },
  // { name: 'pharmadepot', scraper: scrapePharmadepot },
];
```

### Anti-Bot Protection

```typescript
// Stealth mode with realistic headers
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());

await page.setExtraHTTPHeaders({
  'referer': 'https://www.google.com/',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'accept-language': 'en-US,en;q=0.9',
});
```

### Smart Search Algorithm

```typescript
// Fuzzy string matching with similarity threshold
export const filterAndSortProducts = (
  query: string,
  products: Product[],
  similarityThreshold = 0.2
) => {
  const normalizedQuery = normalizeName(query);
  
  const ratedProducts = products.map((product) => ({
    ...product,
    similarity: stringSimilarity.compareTwoStrings(
      normalizedQuery,
      normalizeName(product.name)
    ),
  }));

  return ratedProducts
    .filter(product => product.similarity >= similarityThreshold)
    .sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
};
```

## 🎨 User Interface

### Georgian Language Support
- **Native Georgian UI** with proper localization
- **Automatic keyboard translation** from English to Georgian layout
- **Georgian product name handling** with proper text rendering

### Responsive Design
- **Mobile-first approach** with Tailwind CSS
- **Grid-based product layout** that adapts to screen size
- **Loading states and error handling** for optimal UX

## 🔬 API Documentation

### Search Endpoint

```http
GET /api/scrape?query={search_term}
```

**Response Format:**
```json
[
  {
    "name": "პარაცეტამოლი 500მგ #20",
    "price": "2.50₾",
    "imageUrl": "https://example.com/image.jpg",
    "link": "https://pharmacy.ge/product/123",
    "source": "PSP",
    "similarity": 0.95
  }
]
```

## 🚀 Deployment

### Backend Deployment (DigitalOcean/VPS)

1. **Install system dependencies**
```bash
sudo apt-get update
sudo apt-get install -y wget ca-certificates fonts-liberation libappindicator3-1 \
  libasound2t64 libatk-bridge2.0-0t64 libatk1.0-0t64 libcups2t64 libdbus-1-3 \
  libdrm2 libgbm1 libnspr4 libnss3 libx11-xcb1 libxcomposite1 libxdamage1 \
  libxrandr2 xdg-utils libu2f-udev libvulkan1
```

2. **Deploy with PM2**
```bash
npm install -g pm2
pm2 start src/index.ts --name scraping-server --interpreter ts-node
pm2 save
pm2 startup
```

### Frontend Deployment (Vercel/Netlify)

```bash
npm run build
npm start
```

## 🧪 Testing

```bash
# Run backend tests
cd scraping-server
npm test

# Run frontend tests  
cd scrapping-client
npm test
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
PORT=8080
NODE_ENV=production
PROXY_URL=http://username:password@proxy:port  # Optional
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 🎯 Roadmap

### Phase 1 ✅
- [x] Core scraping functionality for 4 major pharmacies
- [x] Real-time price comparison
- [x] Georgian language support
- [x] Responsive UI with Tailwind CSS
- [x] Anti-bot protection with Puppeteer stealth

### Phase 2 🚧  
- [ ] User accounts and favorite products
- [ ] Price history tracking and alerts
- [ ] Advanced filtering (brand, dosage, form)
- [ ] Mobile app (React Native)
- [ ] Pharmacy store locator integration

### Phase 3 🔮
- [ ] AI-powered medicine recommendations
- [ ] Prescription upload and OCR
- [ ] Integration with Georgian healthcare APIs
- [ ] B2B features for pharmacies
- [ ] Analytics dashboard

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards

- **TypeScript** for type safety
- **ESLint + Prettier** for code formatting
- **SOLID principles** for business logic
- **Component-driven development** for UI

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Your Name](https://github.com/yourusername)
- **Design**: UI/UX focused on Georgian users
- **Architecture**: Scalable monorepo structure

## 🙏 Acknowledgments

- **Georgian Pharmacy Partners** for providing accessible web interfaces
- **Open Source Community** for amazing tools like Puppeteer and Next.js
- **Georgian Tech Community** for inspiration and feedback

---

<div align="center">

**Made with ❤️ for the Georgian healthcare community**

[🌐 Live Demo](https://pharmacy-radar.vercel.app) • [📊 Analytics](https://analytics.pharmacy-radar.com) • [📱 Mobile App](https://apps.pharmacy-radar.com)

</div>
