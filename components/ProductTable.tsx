// components/ProductTable.tsx
import React from 'react';

interface Category {
  CATEGORYID: number;
  CATEGORYNAME: string;
}

interface Product {
  PRODUCTID: number;
  SKU: string;
  NAME: string;
  CATEGORYID: number;
  BASEPRICE: number;
  STATUS: string;
}

interface ProductTableProps {
  products?: Product[];
  categories?: Category[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products = [], categories = [] }) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">ProductID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">SKU</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Category</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">BasePrice</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((prod) => {
              const cat = categories.find((c) => c.CATEGORYID === prod.CATEGORYID);
              return (
                <tr key={prod.PRODUCTID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{prod.PRODUCTID}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{prod.SKU}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{prod.NAME}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{cat ? cat.CATEGORYNAME : 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">${prod.BASEPRICE?.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      prod.STATUS === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {prod.STATUS}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProductTable;
