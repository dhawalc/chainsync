import { NextResponse } from 'next/server';
import { openai, AI_MODELS } from '@/lib/ai-config';

interface InventoryData {
  sku: string;
  productName: string;
  currentStock: number;
  historicalDemand: number[];
  leadTime: number;
  holdingCost: number;
  stockoutCost: number;
}

interface InventoryOptimizationRequest {
  inventoryData: InventoryData[];
}

export async function POST(request: Request) {
  try {
    const body: InventoryOptimizationRequest = await request.json();
    const { inventoryData } = body;

    const systemPrompt = `You are an expert supply chain analyst specializing in inventory optimization.
Your task is to analyze inventory data and provide actionable recommendations for optimizing stock levels.
Consider factors like:
- Historical demand patterns and variability
- Lead times and supply reliability
- Holding costs and stockout costs
- Service level requirements
- Economic order quantity (EOQ)
- Safety stock calculations

Format your response as a valid JSON array of recommendations with the following structure:
{
  "recommendations": [
    {
      "sku": "product SKU",
      "productName": "product name",
      "currentStock": number,
      "recommendedStock": number,
      "reorderPoint": number,
      "safetyStock": number,
      "confidenceScore": number between 0-100,
      "reasoning": "detailed explanation of the recommendation",
      "potentialSavings": number (estimated cost savings),
      "actions": ["action 1", "action 2", ...]
    }
  ]
}

Ensure each recommendation is data-driven and includes clear, actionable steps.`;

    const userPrompt = `Analyze the following inventory data and provide optimization recommendations:

${JSON.stringify(inventoryData, null, 2)}

For each product:
1. Calculate optimal inventory levels using EOQ and safety stock formulas
2. Consider demand variability and lead time uncertainty
3. Estimate potential cost savings from optimization
4. Provide specific actions to implement the recommendations

Please ensure the response is a valid JSON object matching the specified format.`;

    const completion = await openai.chat.completions.create({
      model: AI_MODELS.default,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    });

    const responseContent = completion.choices[0].message.content ?? '{"recommendations": []}';
    const recommendations = JSON.parse(responseContent);

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error('Error generating inventory optimizations:', error);
    return NextResponse.json(
      { error: 'Failed to generate inventory optimizations' },
      { status: 500 }
    );
  }
} 