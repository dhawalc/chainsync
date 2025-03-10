import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Home, 
  LineChart, 
  Package, 
  Settings, 
  ShoppingCart, 
  Truck, 
  Users, 
  GitBranch,
  FileBarChart
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Product Report', href: '/product-report', icon: FileBarChart },
  { name: 'Time Phase', href: '/timephase', icon: LineChart },
  { name: 'Forecasting', href: '/forecasting', icon: BarChart3 },
  {
    name: 'Supply Chain',
    icon: Truck,
    children: [
      { name: 'Suppliers', href: '/suppliers' },
      { name: 'Inventory', href: '/inventory' },
      { name: 'Logistics', href: '/logistics' },
    ],
  },
  { name: 'What-If Analysis', href: '/what-if', icon: GitBranch },
  { name: 'Performance', href: '/performance', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-64">
      <div className="p-4 border-b border-gray-200">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold">ChainSync</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navigation.map((item) => {
            if (item.children) {
              return (
                <div key={item.name} className="space-y-1">
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md group ${
                      pathname.startsWith(item.href || '#')
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5 text-gray-500" />
                    <span className="flex-1">{item.name}</span>
                    <svg
                      className={`ml-3 h-4 w-4 transition-transform ${
                        openSubmenu === item.name ? 'transform rotate-90' : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                  {openSubmenu === item.name && (
                    <div className="pl-8 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                            pathname === child.href
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === item.href
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5 text-gray-500" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 