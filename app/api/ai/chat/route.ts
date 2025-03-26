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
    
    if (!openai) {
      console.error('OpenAI client not initialized. Check your API key configuration.');
      return NextResponse.json(
        { error: 'AI service is not available. Please check your configuration.' },
        { status: 503 }
      );
    }

    const { message, history }: ChatRequest = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    console.log('Sending request to OpenAI...');
    try {
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

      if (!completion.choices?.[0]?.message?.content) {
        throw new Error('No response content from OpenAI');
      }

      const responseContent = completion.choices[0].message.content;
      console.log('Received response from OpenAI:', responseContent);

      return NextResponse.json({ message: responseContent });
    } catch (openAiError) {
      console.error('OpenAI API error:', openAiError);
      return NextResponse.json(
        { error: 'Failed to get response from AI service' },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error('Error in chat:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 