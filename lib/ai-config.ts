import OpenAI from 'openai';

let openai: OpenAI | null = null;

function initializeOpenAI() {
  if (typeof window === 'undefined') {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY not set in environment variables. AI features will not work.');
      return null;
    }

    try {
      return new OpenAI({ 
        apiKey,
        timeout: 30000, // 30 second timeout
        maxRetries: 3   // Retry failed requests up to 3 times
      });
    } catch (error) {
      console.error('Failed to initialize OpenAI client:', error);
      return null;
    }
  }
  return null;
}

// Initialize OpenAI instance
openai = initializeOpenAI();

export { openai };

// AI Feature flags and configurations
export const AI_FEATURES = {
    dynamicBOM: true,
    dataQuality: true,
    demandForecasting: true,
    riskAnalysis: true,
    conversationalAI: true,
    supplierNegotiation: true,
    anomalyDetection: true,
    scenarioPlanning: true,
};

// AI Models configuration
export const AI_MODELS = {
  default: "gpt-3.5-turbo", // or "gpt-4" if that's accessible
  fast: "gpt-3.5-turbo",
  embedding: "text-embedding-3-small"
};

// Prompt templates
export const PROMPT_TEMPLATES = {
    bomGeneration: `You are an expert in Bill of Materials creation. Analyze the following product requirements and constraints to generate an optimal BOM:`,
    dataQuality: `You are a data quality expert. Analyze the following data for inconsistencies, errors, and improvement opportunities:`,
    riskAnalysis: `You are a supply chain risk analyst. Evaluate the following data and identify potential risks and mitigation strategies:`,
    demandForecasting: `You are a demand forecasting expert. Analyze the following historical data and market conditions to predict future demand:`,
};

// AI feature flags and configurations
export const aiFeatures = {
  enabled: true,
  models: AI_MODELS,
  maxTokens: 4000,
  temperature: 0.7
}; 