import stringSimilarity from 'string-similarity';
import { Product } from '@/models/product';


// 1. Normalize product names for better comparison
const normalizeName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .replace(/(\d+)\s?(mg|ml)/g, '$1$2') // Normalize dosage units (e.g., 500 mg -> 500mg)
    .trim();
};

// 2. Parse price strings to numbers for comparison
const parsePrice = (price: string): number => {
  if (price.toLowerCase() === 'n/a') {
    return Infinity;
  }
  const match = price.replace(',', '.').match(/(\d+(\.\d+)?)/);
  return match ? parseFloat(match[0]) : Infinity;
};

// 3. Filter and sort products based on string similarity and price
export const filterAndSortProducts = (
  query: string,
  products: Product[],
  similarityThreshold = 0.2 // Adjust this threshold as needed
): Product[] => {
  const normalizedQuery = normalizeName(query);

  const ratedProducts = products.map((product) => ({
    ...product,
    similarity: stringSimilarity.compareTwoStrings(
      normalizedQuery,
      normalizeName(product.name)
    ),
  }));

  // Filter out products below the similarity threshold
  const filteredProducts = ratedProducts.filter(
    (product) => product.similarity >= similarityThreshold
  );

  // Sort by price in ascending order
  const sortedProducts = filteredProducts.sort(
    (a, b) => parsePrice(a.price) - parsePrice(b.price)
  );

  return sortedProducts;
};
