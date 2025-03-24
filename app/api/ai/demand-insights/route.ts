import { NextResponse } from 'next/server';
import { openai, AI_MODELS, aiFeatures } from '@/lib/ai-config';

interface DemandInsightRequest {
  productId?: string;
  historicalData: Array<{
    period: string;
    actual_demand: number;
  }>;
  forecastData: Array<{
    period: string;
    forecasted_demand: number;
    lower_bound: number;
    upper_bound: number;
  }>;
}

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET() {
  try {
    if (!aiFeatures.enabled || !openai) {
      return NextResponse.json({
        error: 'AI features are not enabled. Please configure OpenAI API key.',
        mockData: {
          insights: [
            { type: "trend", description: "Mock trend insight" },
            { type: "seasonality", description: "Mock seasonality insight" },
            { type: "anomaly", description: "Mock anomaly insight" }
          ]
        }
      }, { status: 503 });
    }

    // Your actual OpenAI logic here
    return NextResponse.json({
      insights: [
        { type: "trend", description: "Mock trend insight" },
        { type: "seasonality", description: "Mock seasonality insight" },
        { type: "anomaly", description: "Mock anomaly insight" }
      ]
    });
  } catch (error) {
    console.error('Error generating demand insights:', error);
    return NextResponse.json({ error: 'Failed to generate demand insights' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: DemandInsightRequest = await request.json();
    const { productId, historicalData, forecastData } = body;

    // Construct the prompt for the OpenAI API
    const systemPrompt = `You are an expert demand forecasting analyst with deep knowledge of supply chain and market dynamics.
Your task is to analyze the provided historical demand data and forecasts to generate meaningful insights.
Consider factors like:
- Seasonality and trends
- Demand patterns and anomalies
- Forecast accuracy and reliability
- Market dynamics and external factors
- Potential risks and opportunities

Format your response as a valid JSON array of insight categories with the following structure:
[
  {
    "title": "category title",
    "description": "brief overview of the insights in this category",
    "confidence": number between 0-100,
    "details": ["detailed insight 1", "detailed insight 2", ...]
  }
]`;

    const userPrompt = `Analyze the following demand data and provide insights:

Historical Demand:
${JSON.stringify(historicalData, null, 2)}

Forecast Data:
${JSON.stringify(forecastData, null, 2)}

${productId ? `Product ID: ${productId}` : 'Analysis for all products'}

Please ensure the response is a valid JSON array matching the specified format.`;

    const completion = await openai.chat.completions.create({
      model: AI_MODELS.default,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    });

    const responseContent = completion.choices[0].message.content ?? '{"insights": []}';
    const insights = JSON.parse(responseContent);

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Error generating demand insights:', error);
    return NextResponse.json(
      { error: 'Failed to generate demand insights' },
      { status: 500 }
    );
  }
} 