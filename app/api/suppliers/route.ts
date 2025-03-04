import { NextResponse } from 'next/server';

// Mock suppliers data
const mockSuppliersData = [
  {
    id: 'SUP001',
    name: 'TechComponents Inc.',
    contact_person: 'John Smith',
    email: 'john.smith@techcomponents.com',
    phone: '+1-555-123-4567',
    address: '123 Tech Blvd, San Jose',
    country: 'USA',
    category: 'Electronics',
    performance_score: 92,
    on_time_delivery_rate: 95,
    quality_rating: 9.3,
    response_time: 4,
    status: 'Active',
    last_order_date: '2023-05-15T10:30:00Z'
  },
  {
    id: 'SUP002',
    name: 'Global Logistics Partners',
    contact_person: 'Sarah Johnson',
    email: 'sarah.j@globallogistics.com',
    phone: '+1-555-987-6543',
    address: '456 Shipping Lane, Seattle',
    country: 'USA',
    category: 'Logistics',
    performance_score: 88,
    on_time_delivery_rate: 90,
    quality_rating: 8.7,
    response_time: 6,
    status: 'Active',
    last_order_date: '2023-05-10T14:45:00Z'
  },
  {
    id: 'SUP003',
    name: 'Precision Manufacturing Ltd.',
    contact_person: 'Michael Wong',
    email: 'm.wong@precisionmfg.com',
    phone: '+852-5555-1234',
    address: '789 Industrial Road, Kowloon',
    country: 'Hong Kong',
    category: 'Manufacturing',
    performance_score: 95,
    on_time_delivery_rate: 97,
    quality_rating: 9.5,
    response_time: 3,
    status: 'Active',
    last_order_date: '2023-05-18T09:15:00Z'
  },
  {
    id: 'SUP004',
    name: 'EcoPackaging Solutions',
    contact_person: 'Emma Garcia',
    email: 'emma@ecopackaging.com',
    phone: '+34-555-789-0123',
    address: '101 Green Street, Barcelona',
    country: 'Spain',
    category: 'Packaging',
    performance_score: 79,
    on_time_delivery_rate: 82,
    quality_rating: 7.8,
    response_time: 8,
    status: 'Under Review',
    last_order_date: '2023-04-25T11:30:00Z'
  },
  {
    id: 'SUP005',
    name: 'Advanced Materials GmbH',
    contact_person: 'Klaus Mueller',
    email: 'klaus@advancedmaterials.de',
    phone: '+49-555-456-7890',
    address: '234 Science Park, Munich',
    country: 'Germany',
    category: 'Raw Materials',
    performance_score: 91,
    on_time_delivery_rate: 93,
    quality_rating: 9.0,
    response_time: 5,
    status: 'Active',
    last_order_date: '2023-05-12T15:20:00Z'
  },
  {
    id: 'SUP006',
    name: 'Digital Solutions Co.',
    contact_person: 'Raj Patel',
    email: 'raj@digitalsolutions.com',
    phone: '+91-555-234-5678',
    address: '567 Tech Park, Bangalore',
    country: 'India',
    category: 'Software',
    performance_score: 85,
    on_time_delivery_rate: 88,
    quality_rating: 8.5,
    response_time: 7,
    status: 'Active',
    last_order_date: '2023-05-05T10:00:00Z'
  },
  {
    id: 'SUP007',
    name: 'Reliable Shipping Co.',
    contact_person: 'Lisa Chen',
    email: 'lisa@reliableshipping.com',
    phone: '+1-555-345-6789',
    address: '890 Harbor Drive, Long Beach',
    country: 'USA',
    category: 'Logistics',
    performance_score: 76,
    on_time_delivery_rate: 80,
    quality_rating: 7.5,
    response_time: 9,
    status: 'Under Review',
    last_order_date: '2023-04-20T13:45:00Z'
  },
  {
    id: 'SUP008',
    name: 'Innovative Electronics Ltd.',
    contact_person: 'David Kim',
    email: 'david@innovativeelectronics.com',
    phone: '+82-555-678-9012',
    address: '321 Innovation Street, Seoul',
    country: 'South Korea',
    category: 'Electronics',
    performance_score: 94,
    on_time_delivery_rate: 96,
    quality_rating: 9.4,
    response_time: 2,
    status: 'Active',
    last_order_date: '2023-05-17T08:30:00Z'
  },
  {
    id: 'SUP009',
    name: 'Budget Components Co.',
    contact_person: 'Tom Wilson',
    email: 'tom@budgetcomponents.com',
    phone: '+1-555-567-8901',
    address: '432 Discount Avenue, Phoenix',
    country: 'USA',
    category: 'Electronics',
    performance_score: 65,
    on_time_delivery_rate: 70,
    quality_rating: 6.5,
    response_time: 12,
    status: 'Inactive',
    last_order_date: '2023-03-10T09:45:00Z'
  },
  {
    id: 'SUP010',
    name: 'Premium Materials Inc.',
    contact_person: 'Olivia Brown',
    email: 'olivia@premiummaterials.com',
    phone: '+1-555-890-1234',
    address: '765 Quality Road, Boston',
    country: 'USA',
    category: 'Raw Materials',
    performance_score: 89,
    on_time_delivery_rate: 92,
    quality_rating: 8.9,
    response_time: 6,
    status: 'Active',
    last_order_date: '2023-05-08T11:15:00Z'
  }
];

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true,
      data: mockSuppliersData
    });
  } catch (error: any) {
    console.error('Error fetching suppliers data:', error);
    
    return NextResponse.json({ 
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { supplier } = body;
    
    if (!supplier || !supplier.name || !supplier.email || !supplier.category) {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid request body. Required fields: name, email, category' 
      }, { status: 400 });
    }
    
    // In a real app, this would add the supplier to the database
    // For now, we'll just return success
    
    return NextResponse.json({ 
      success: true,
      message: 'Supplier added successfully',
      data: {
        id: `SUP${Math.floor(1000 + Math.random() * 9000)}`,
        ...supplier,
        performance_score: 0,
        on_time_delivery_rate: 0,
        quality_rating: 0,
        response_time: 0,
        last_order_date: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error('Error adding supplier:', error);
    
    return NextResponse.json({ 
      success: false,
      error: error.message
    }, { status: 500 });
  }
} 