import { NextResponse } from 'next/server';
import { openai } from '@/lib/ai-config';

interface BOMGenerationRequest {
  productName: string;
  productDescription: string;
}

export async function POST(request: Request) {
  try {
    console.log('Starting BOM generation...');
    const { productName, productDescription }: BOMGenerationRequest = await request.json();

    if (!productName || !productDescription) {
      return NextResponse.json(
        { error: 'Product name and description are required' },
        { status: 400 }
      );
    }

    console.log('Sending request to OpenAI...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a supply chain expert specializing in bill of materials (BOM) creation. Your task is to generate a detailed BOM for a given product, including component specifications, quantities, units, suppliers, and estimated costs. Format your response as a JSON object with a components array.

Each component should have:
- id: unique string
- name: component name
- quantity: number
- unit: unit of measurement
- description: brief description
- specifications: technical specifications
- supplier: suggested supplier
- cost: estimated cost in USD

Example format:
{
  "components": [
    {
      "id": "comp-1",
      "name": "Steel Frame",
      "quantity": 1,
      "unit": "piece",
      "description": "Main structural frame",
      "specifications": "Carbon steel, powder coated",
      "supplier": "SteelCo Inc",
      "cost": 150.00
    }
  ]
}`
        },
        {
          role: "user",
          content: `Generate a detailed BOM for the following product:
Name: ${productName}
Description: ${productDescription}`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseContent = completion.choices[0].message.content || '{"components": []}';
    console.log('Received response from OpenAI:', responseContent);

    try {
      const parsedResponse = JSON.parse(responseContent);
      return NextResponse.json(parsedResponse);
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse BOM data' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in BOM generation:', error);
    return NextResponse.json(
      { error: 'Failed to generate BOM' },
      { status: 500 }
    );
  }
} 