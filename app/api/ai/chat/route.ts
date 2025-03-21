import { NextResponse } from 'next/server';
import { openai } from '@/lib/ai-config';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  message: string;
  history: ChatMessage[];
}

export async function POST(request: Request) {
  try {
    console.log('Starting chat...');
    const { message, history }: ChatRequest = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    console.log('Sending request to OpenAI...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI assistant specializing in supply chain management and operations. You can help with:

- Inventory optimization and management
- Demand forecasting and planning
- Supply chain risk analysis
- Bill of materials (BOM) creation
- Supplier management
- Logistics and transportation
- Cost optimization
- Quality control
- Sustainability initiatives

Provide clear, concise, and actionable advice based on supply chain best practices. If you need more information to give a proper answer, ask clarifying questions.`
        },
        ...history,
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseContent = completion.choices[0].message.content || 'I apologize, but I am unable to provide a response at this time.';
    console.log('Received response from OpenAI:', responseContent);

    return NextResponse.json({ message: responseContent });
  } catch (error) {
    console.error('Error in chat:', error);
    return NextResponse.json(
      { error: 'Failed to get response' },
      { status: 500 }
    );
  }
} 