import { NextResponse } from 'next/server';
import { openai, AI_MODELS } from '@/lib/ai-config';

interface RiskAnalysisRequest {
  productId: string;
  supplyData: any;
  demandData: any;
  inventoryData: any;
}

export async function POST(request: Request) {
  try {
    console.log('Starting risk analysis...');
    const body: RiskAnalysisRequest = await request.json();
    console.log('Request body:', JSON.stringify(body, null, 2));

    const { productId, supplyData, demandData, inventoryData } = body;

    const systemPrompt = `You are an expert supply chain risk analyst. Your task is to analyze supply chain data and identify potential risks and mitigation strategies.
Please consider:
- Supply chain disruptions
- Demand volatility
- Inventory management issues
- Supplier reliability
- Market conditions
- Transportation risks
- Quality control issues

Format your response as a JSON object with this structure:
{
  "risks": [
    {
      "id": "unique-id",
      "category": "supply|demand|inventory|quality|logistics",
      "severity": "high|medium|low",
      "probability": "high|medium|low",
      "description": "Detailed description of the risk",
      "impact": "Potential business impact",
      "mitigation": "Recommended mitigation strategy"
    }
  ],
  "summary": "Brief summary of key risks",
  "riskScore": number (0-100)
}`;

    const userPrompt = `Analyze the following supply chain data for product ${productId}:

Supply Data:
${JSON.stringify(supplyData, null, 2)}

Demand Data:
${JSON.stringify(demandData, null, 2)}

Inventory Data:
${JSON.stringify(inventoryData, null, 2)}

Please provide a comprehensive risk analysis following the specified JSON format.`;

    console.log('Sending request to OpenAI...');
    const completion = await openai.chat.completions.create({
      model: AI_MODELS.default,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    });

    console.log('Received response from OpenAI');
    const responseContent = completion.choices[0].message.content;
    console.log('OpenAI response:', responseContent);

    if (!responseContent) {
      console.error('No content in OpenAI response');
      throw new Error('No content in response');
    }

    const risks = JSON.parse(responseContent);
    console.log('Parsed risks:', risks);

    return NextResponse.json(risks);
  } catch (error) {
    console.error('Error in risk analysis:', error);
    return NextResponse.json(
      { error: 'Failed to analyze risks', details: error.message },
      { status: 500 }
    );
  }
} 