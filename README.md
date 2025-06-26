# Pharmacy Price Scraper

This is a Next.js application that scrapes pharmacy websites to compare product prices.

## Features

- **Product Search**: Users can search for products across multiple pharmacy websites.
- **Price Comparison**: The application displays prices from different pharmacies, allowing users to find the best deals.
- **Real-time Scraping**: The app scrapes data in real-time to provide the most up-to-date information.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Scraping**: [Puppeteer](https://pptr.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/pharmacy-scrapper.git
    cd pharmacy-scrapper
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

### Running the Application

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## How It Works

The application uses a simple API endpoint that takes a search query. This endpoint then uses Puppeteer to launch headless browser instances to scrape data from the following pharmacies:

-   [PSP](https://psp.ge/)
-   [Aversi](https://aversi.ge/)

The scraped data is then returned to the client and displayed in a user-friendly format.

## Project Structure

```
/src
|-- /app
|   |-- /api/scrape       # API route for scraping
|   |-- page.tsx          # Main page
|-- /components/client
|   |-- Search.tsx        # Search component with client-side logic
|-- /core/puppeteer
|   |-- pspScraper.ts     # Scraper for PSP
|   |-- aversiScraper.ts  # Scraper for Aversi
|-- /models
|   |-- product.ts        # Product data model
|-- /ui
|   |-- SearchInput.tsx   # Reusable search input component
```

## Future Improvements

- Add more pharmacy scrapers.
- Implement a caching layer to reduce redundant scraping.
- Add unit and integration tests.
- Improve error handling and logging.
