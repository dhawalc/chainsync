// components/ProductTable.tsx
import React from 'react';

interface Product {
  product_id: number | string;
  description: string;
  base_uom: string;
}

interface ProductTableProps {
  products?: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products = [] }) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Product ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Description</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Base UOM</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((prod) => (
              <tr key={prod.product_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{prod.product_id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{prod.description}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{prod.base_uom}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProductTable;
