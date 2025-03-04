// app/products/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  PRODUCT_ID: string | number;
  DESCRIPTION?: string;
}

interface Category {
  CATEGORY_ID: string | number;
  CATEGORY_NAME: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products
  const fetchProducts = async (categoryId?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = categoryId 
        ? `/api/products?category=${categoryId}`
        : '/api/products';
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      } else {
        setError(data.error || 'Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('An error occurred while fetching products');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/products/categories');
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // When category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    } else {
      fetchProducts();
    }
  }, [selectedCategory]);

  return (
    <div className="container mx-auto py-6 px-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Products</h1>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      
      {/* Category filter */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-300">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Filter by Category</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === null 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            All
          </button>
          
          {categories.map(category => (
            <button
              key={category.CATEGORY_ID}
              onClick={() => setSelectedCategory(String(category.CATEGORY_ID))}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === String(category.CATEGORY_ID) 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {category.CATEGORY_NAME || `Category ${category.CATEGORY_ID}`}
            </button>
          ))}
        </div>
      </div>
      
      {/* Products list */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-700">Products</h2>
          <Link href="/timephase" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Cycle Times
          </Link>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8 text-gray-700">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-8 text-gray-700 bg-gray-50 rounded-md border border-gray-200">
            No products found.
          </div>
        ) : (
          <div className="border rounded-md overflow-x-auto border-gray-300 shadow">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                    Product ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.PRODUCT_ID}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                      {product.PRODUCT_ID}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {product.DESCRIPTION || `Product ${product.PRODUCT_ID}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link 
                        href={`/timephase?product=${product.PRODUCT_ID}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Cycle Times
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
