'use client';

import { SearchInput } from '@/ui/SearchInput';
import React, { useState } from 'react';
import { Product } from '@/models/product';
import axios from 'axios';

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) return;

    console.log('Searching for:', searchTerm);
    setLoading(true);
    setProducts([]);
    try {
      const response = await axios.get('/api/scrape', {
        params: { query: searchTerm },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={handleSearch}
      />
      {loading && <p className="text-center mt-4">Loading...</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {products.map((product) => (
          <div key={product.link} className="border rounded-lg p-4 relative">
            <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              {product.source}
            </div>
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-xl font-bold text-green-600">{product.price}</p>
            <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              View Product
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
