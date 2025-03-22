import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables');
}

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
  default: "gpt-3.5-turbo-instruct", // or "gpt-4" if that's accessible
  fast: "gpt-3.5-turbo-instruct",
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
  models: {
    default: 'gpt-3.5-turbo',
    fast: 'gpt-3.5-turbo',
    embedding: 'text-embedding-3-small'
  },
  maxTokens: 4000,
  temperature: 0.7
}; 