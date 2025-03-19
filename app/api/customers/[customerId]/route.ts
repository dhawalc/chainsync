import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/customers/[customerId]
export async function GET(
  request: Request,
  { params }: { params: { customerId: string } }
) {
  try {
    const customer = await prisma.customer.findFirst({
      where: {
        OR: [
          { id: params.customerId },
          { domain: `${params.customerId}.chainsync.info` }
        ]
      }
    });

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...customer,
      enabledFeatures: JSON.parse(customer.enabledFeatures)
    });
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 });
  }
}

// PATCH /api/customers/[customerId]
export async function PATCH(
  request: Request,
  { params }: { params: { customerId: string } }
) {
  try {
    const body = await request.json();
    const { enabledFeatures } = body;

    const customer = await prisma.customer.update({
      where: {
        domain: `${params.customerId}.chainsync.info`
      },
      data: {
        enabledFeatures: JSON.stringify(enabledFeatures)
      }
    });

    return NextResponse.json({
      ...customer,
      enabledFeatures: JSON.parse(customer.enabledFeatures)
    });
  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 });
  }
} 