import OpenAI from 'openai';

// Initialize OpenAI client with optional API key
export const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

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
  enabled: process.env.OPENAI_API_KEY ? true : false,
  models: AI_MODELS,
  maxTokens: 4000,
  temperature: 0.7
}; 