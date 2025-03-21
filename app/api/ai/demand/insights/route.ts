import { NextResponse } from 'next/server';
import { openai } from '@/lib/ai-config';

interface DemandInsightsRequest {
  timeRange: string;
  productCategory: string;
}

export async function POST(request: Request) {
  try {
    console.log('Starting demand insights generation...');
    const { timeRange, productCategory }: DemandInsightsRequest = await request.json();

    if (!timeRange || !productCategory) {
      return NextResponse.json(
        { error: 'Time range and product category are required' },
        { status: 400 }
      );
    }

    console.log('Sending request to OpenAI...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a demand forecasting expert specializing in analyzing supply chain data. Your task is to generate detailed insights about demand patterns, trends, anomalies, and forecasts. Format your response as a JSON object with an insights array.

Each insight should have:
- id: unique string
- type: one of ['trend', 'anomaly', 'forecast']
- title: concise insight title
- description: detailed explanation
- impact: one of ['high', 'medium', 'low']
- recommendation: actionable suggestion
- confidence: number between 0-100

Example format:
{
  "insights": [
    {
      "id": "ins-1",
      "type": "trend",
      "title": "Seasonal Demand Peak",
      "description": "Historical data shows consistent 40% increase in demand during summer months",
      "impact": "high",
      "recommendation": "Increase inventory levels by 50% starting May",
      "confidence": 85
    }
  ]
}`
        },
        {
          role: "user",
          content: `Generate demand insights for the following parameters:
Time Range: ${timeRange}
Product Category: ${productCategory}

Consider factors like:
- Seasonal patterns
- Growth trends
- Demand volatility
- Market conditions
- External factors (events, weather, etc.)
- Supply chain constraints`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseContent = completion.choices[0].message.content || '{"insights": []}';
    console.log('Received response from OpenAI:', responseContent);

    try {
      const parsedResponse = JSON.parse(responseContent);
      return NextResponse.json(parsedResponse);
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse insights data' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in insights generation:', error);
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
} 