import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { customerConfigs } from '../../../config/features';

const prisma = new PrismaClient();

// GET /api/customers
export async function GET() {
  try {
    const customers = await prisma.customer.findMany();
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

// POST /api/customers
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, domain, enabledFeatures } = body;

    const customer = await prisma.customer.create({
      data: {
        name,
        domain,
        enabledFeatures: JSON.stringify(enabledFeatures)
      }
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
  }
}

// Initialize database with default customers if empty
async function initializeDatabase() {
  const count = await prisma.customer.count();
  if (count === 0) {
    // Add default customers from config
    for (const [id, config] of Object.entries(customerConfigs)) {
      await prisma.customer.create({
        data: {
          name: config.name,
          domain: config.domain,
          enabledFeatures: JSON.stringify(config.enabledFeatures)
        }
      });
    }
  }
}

// Initialize database when the API route is first loaded
initializeDatabase().catch(console.error); 