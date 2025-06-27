import { Product } from '@/models/product';
import stringSimilarity from 'string-similarity';

// 1. Normalize product names for better comparison
const normalizeName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .replace(/(\d+)\s?(mg|ml)/g, '$1$2') // Normalize dosage units (e.g., 500 mg -> 500mg)
    .trim();
};

// 2. Filter and sort products based on string similarity
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

  // Sort by similarity in descending order
  const sortedProducts = filteredProducts.sort(
    (a, b) => b.similarity - a.similarity
  );

  return sortedProducts;
};
