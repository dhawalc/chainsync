// app/products/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Products</h1>
          <Card className="bg-white shadow-sm border-0">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-blue-600 mb-4">Filter by Category</h2>
              <div className="space-x-2">
                <Button variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700">
                  All
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <Card className="bg-white shadow-sm border-0">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Products</h2>
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                View Cycle Times
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] font-semibold text-gray-900">PRODUCT ID</TableHead>
                  <TableHead className="font-semibold text-gray-900">DESCRIPTION</TableHead>
                  <TableHead className="w-[200px] font-semibold text-gray-900">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.PRODUCT_ID}>
                    <TableCell className="font-medium">{product.PRODUCT_ID}</TableCell>
                    <TableCell>{product.DESCRIPTION || `Product ${product.PRODUCT_ID}`}</TableCell>
                    <TableCell>
                      <Link 
                        href={`/timephase?product=${product.PRODUCT_ID}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        View Cycle Times
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
