import genAI from './geminiClient';

/**
 * Comprehensive price estimation context for Australian trade jobs
 */
const PRICING_CONTEXT = {
  baseRates: {
    'Plumber': { min: 90, max: 200, unit: 'hour' },
    'Electrician': { min: 110, max: 250, unit: 'hour' },
    'Painter': { min: 60, max: 120, unit: 'hour' },
    'Roofer': { min: 150, max: 400, unit: 'hour' },
    'AC Specialist': { min: 120, max: 300, unit: 'hour' },
    'Handyman': { min: 50, max: 100, unit: 'hour' },
    'Gardener': { min: 45, max: 90, unit: 'hour' },
    'Cleaner': { min: 35, max: 80, unit: 'hour' }
  },
  
  locationMultipliers: {
    'Sydney': { inner: 1.3, outer: 1.1, remote: 0.9 },
    'Melbourne': { inner: 1.25, outer: 1.05, remote: 0.85 },
    'Brisbane': { inner: 1.2, outer: 1.0, remote: 0.8 },
    'Perth': { inner: 1.15, outer: 0.95, remote: 0.75 },
    'Adelaide': { inner: 1.1, outer: 0.9, remote: 0.7 },
    'Canberra': { inner: 1.35, outer: 1.15, remote: 0.9 },
    'Darwin': { inner: 1.4, outer: 1.2, remote: 1.0 },
    'Hobart': { inner: 1.05, outer: 0.85, remote: 0.7 }
  },
  
  urgencyMultipliers: {
    'urgent': 1.5,     // Same day/emergency
    'soon': 1.2,       // Within 2-3 days
    'flexible': 1.0    // Within a week or more
  },
  
  complexityFactors: {
    'basic': 1.0,      // Simple repairs, basic installation
    'moderate': 1.4,   // Standard renovations, complex repairs
    'complex': 2.0,    // Major renovations, specialized work
    'expert': 3.0      // Highly specialized, certified work only
  },

  commonJobTypes: {
    'Plumber': {
      'Basic tap repair': { hours: 1, complexity: 'basic', materials: 50 },
      'Toilet installation': { hours: 2, complexity: 'moderate', materials: 200 },
      'Bathroom renovation': { hours: 40, complexity: 'complex', materials: 3000 },
      'Emergency leak repair': { hours: 2, complexity: 'basic', materials: 150 },
      'Hot water system': { hours: 4, complexity: 'moderate', materials: 800 }
    },
    'Electrician': {
      'Power point installation': { hours: 1, complexity: 'basic', materials: 80 },
      'Light fitting': { hours: 1, complexity: 'basic', materials: 120 },
      'Safety inspection': { hours: 2, complexity: 'moderate', materials: 0 },
      'Electrical rewiring': { hours: 20, complexity: 'complex', materials: 1200 },
      'Smart home setup': { hours: 6, complexity: 'expert', materials: 800 }
    },
    'Painter': {
      'Single room paint': { hours: 8, complexity: 'basic', materials: 200 },
      'Exterior house paint': { hours: 30, complexity: 'moderate', materials: 800 },
      'Feature wall': { hours: 4, complexity: 'basic', materials: 150 },
      'Commercial painting': { hours: 50, complexity: 'complex', materials: 1500 }
    }
  }
};

/**
 * Generates AI-powered price estimates for trade jobs using Gemini AI
 * @param {Object} jobDetails - Job specification details
 * @param {string} jobDetails.description - Detailed job description
 * @param {string} jobDetails.tradeCategory - Trade category (e.g., 'Plumber', 'Electrician')
 * @param {string} jobDetails.suburb - Suburb location
 * @param {string} jobDetails.state - State (default: 'NSW')
 * @param {string} jobDetails.urgency - Job urgency ('urgent', 'soon', 'flexible')
 * @param {number} jobDetails.estimatedHours - Optional: user's hour estimate
 * @param {boolean} jobDetails.materialsIncluded - Whether materials are included in quote
 * @returns {Promise<Object>} Comprehensive price estimate with breakdown
 */
export async function generatePriceEstimate(jobDetails) {
  try {
    // Input validation
    if (!jobDetails?.description?.trim()) {
      throw new Error('Job description is required for price estimation');
    }
    
    if (!jobDetails?.tradeCategory) {
      throw new Error('Trade category is required for price estimation');
    }

    // Get base pricing data for the trade
    const basePricing = PRICING_CONTEXT?.baseRates?.[jobDetails?.tradeCategory];
    if (!basePricing) {
      throw new Error(`Pricing data not available for trade category: ${jobDetails.tradeCategory}`);
    }

    // Create comprehensive prompt for Gemini AI
    const estimationPrompt = createPriceEstimationPrompt(jobDetails);
    
    const model = genAI?.getGenerativeModel({ model: 'gemini-2.5-pro' });
    
    // Safety settings for content filtering
    const safetySettings = [
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_LOW_AND_ABOVE"
      }
    ];

    const generationConfig = {
      temperature: 0.3, // Lower temperature for more consistent pricing
      topP: 0.8,
      topK: 32,
      maxOutputTokens: 2048,
    };

    const result = await model?.generateContent({
      contents: [{
        role: "user",
        parts: [{ text: estimationPrompt }]
      }],
      generationConfig,
      safetySettings
    });

    const response = await result?.response;
    const aiResponse = response?.text();
    
    // Parse AI response and create structured estimate
    const estimate = parseAIEstimate(aiResponse, jobDetails, basePricing);
    
    return estimate;
    
  } catch (error) {
    console.error('Error in price estimation:', error);
    
    // Fallback to basic calculation if AI fails
    if (error?.message?.includes('API') || error?.message?.includes('network')) {
      return generateFallbackEstimate(jobDetails);
    }
    
    throw error;
  }
}

/**
 * Creates a comprehensive prompt for AI price estimation
 */
function createPriceEstimationPrompt(jobDetails) {
  const { description, tradeCategory, suburb, state = 'NSW', urgency = 'flexible' } = jobDetails;
  
  const basePricing = PRICING_CONTEXT?.baseRates?.[tradeCategory];
  const locationData = getLocationContext(suburb, state);
  const jobTypeContext = PRICING_CONTEXT?.commonJobTypes?.[tradeCategory] || {};
  
  return `
You are a professional trade pricing expert in Australia. Provide a detailed price estimate for the following job:

JOB DETAILS:
- Trade: ${tradeCategory}
- Description: "${description}"
- Location: ${suburb}, ${state}
- Urgency: ${urgency}
- Materials included: ${jobDetails?.materialsIncluded ? 'Yes' : 'No'}

PRICING CONTEXT:
- Base hourly rate for ${tradeCategory}: $${basePricing?.min}-${basePricing?.max} AUD
- Location multiplier: ${locationData?.multiplier}x
- Urgency factor: ${PRICING_CONTEXT?.urgencyMultipliers?.[urgency]}x

SIMILAR JOB EXAMPLES:
${Object.entries(jobTypeContext)?.map(([jobType, details]) => 
  `- ${jobType}: ~${details?.hours}hrs, ${details?.complexity} complexity, materials: $${details?.materials}`
)?.join('\n')}

ANALYSIS REQUIREMENTS:
1. Estimate total hours needed based on job description
2. Assess job complexity (basic/moderate/complex/expert)
3. Consider location-specific pricing in ${suburb}, ${state}
4. Factor in urgency level (${urgency})
5. Estimate material costs if applicable
6. Consider any special requirements or challenges

RESPONSE FORMAT:
Provide your analysis in this exact JSON structure:
{
  "estimatedHours": [number],
  "complexity": "[basic/moderate/complex/expert]",
  "hourlyRate": [number],
  "laborCost": [number],
  "materialCost": [number],
  "totalCost": [number],
  "priceRange": {
    "min": [number],
    "max": [number]
  },
  "breakdown": {
    "baseLabor": [number],
    "urgencyPremium": [number],
    "locationAdjustment": [number],
    "complexityFactor": [number]
  },
  "confidence": "[high/medium/low]",
  "reasoning": "[brief explanation of estimate]",
  "assumptions": ["[assumption 1]", "[assumption 2]"],
  "recommendations": ["[recommendation 1]", "[recommendation 2]"]
}

Important: Only respond with valid JSON. No additional text before or after.
  `?.trim();
}

/**
 * Gets location-specific pricing context
 */
function getLocationContext(suburb, state) {
  // Determine city based on state and common suburbs
  let city = state;
  const multipliers = PRICING_CONTEXT?.locationMultipliers;
  
  // Major city detection logic
  if (state === 'NSW') city = 'Sydney';
  else if (state === 'VIC') city = 'Melbourne';
  else if (state === 'QLD') city = 'Brisbane';
  else if (state === 'WA') city = 'Perth';
  else if (state === 'SA') city = 'Adelaide';
  else if (state === 'ACT') city = 'Canberra';
  else if (state === 'NT') city = 'Darwin';
  else if (state === 'TAS') city = 'Hobart';
  
  const cityData = multipliers?.[city] || { inner: 1.0, outer: 0.9, remote: 0.8 };
  
  // Determine area type based on common suburb patterns
  const innerSuburbs = ['CBD', 'City', 'Inner', 'Central', 'Surry Hills', 'Paddington', 'Bondi'];
  const isInner = innerSuburbs?.some(area => suburb?.includes(area));
  
  return {
    city,
    multiplier: isInner ? cityData?.inner : cityData?.outer,
    areaType: isInner ? 'inner' : 'outer'
  };
}

/**
 * Parses AI response and creates structured estimate
 */
function parseAIEstimate(aiResponse, jobDetails, basePricing) {
  try {
    // Try to extract JSON from AI response
    let jsonStart = aiResponse?.indexOf('{');
    let jsonEnd = aiResponse?.lastIndexOf('}') + 1;
    
    if (jsonStart === -1 || jsonEnd === 0) {
      throw new Error('No JSON found in AI response');
    }
    
    const jsonStr = aiResponse?.slice(jsonStart, jsonEnd);
    const aiEstimate = JSON.parse(jsonStr);
    
    // Validate and enhance the estimate
    const estimate = {
      jobId: generateJobId(),
      timestamp: new Date()?.toISOString(),
      jobDetails: {
        description: jobDetails?.description,
        tradeCategory: jobDetails?.tradeCategory,
        location: `${jobDetails?.suburb}, ${jobDetails?.state || 'NSW'}`,
        urgency: jobDetails?.urgency || 'flexible'
      },
      
      // Core pricing data from AI
      estimatedHours: Math.max(0.5, aiEstimate?.estimatedHours || 2),
      complexity: aiEstimate?.complexity || 'moderate',
      hourlyRate: Math.max(basePricing?.min, Math.min(basePricing?.max, aiEstimate?.hourlyRate || basePricing?.min)),
      
      // Cost breakdown
      costs: {
        labor: Math.max(50, aiEstimate?.laborCost || 200),
        materials: Math.max(0, aiEstimate?.materialCost || 0),
        total: Math.max(50, aiEstimate?.totalCost || 200),
      },
      
      // Price range
      priceRange: {
        min: Math.max(50, aiEstimate?.priceRange?.min || 150),
        max: Math.max(100, aiEstimate?.priceRange?.max || 400)
      },
      
      // Detailed breakdown
      breakdown: {
        baseLabor: aiEstimate?.breakdown?.baseLabor || 0,
        urgencyPremium: aiEstimate?.breakdown?.urgencyPremium || 0,
        locationAdjustment: aiEstimate?.breakdown?.locationAdjustment || 0,
        complexityFactor: aiEstimate?.breakdown?.complexityFactor || 0
      },
      
      // AI analysis
      confidence: aiEstimate?.confidence || 'medium',
      reasoning: aiEstimate?.reasoning || 'Estimate based on typical job requirements',
      assumptions: aiEstimate?.assumptions || [],
      recommendations: aiEstimate?.recommendations || [],
      
      // Additional context
      locationMultiplier: getLocationContext(jobDetails?.suburb, jobDetails?.state)?.multiplier,
      urgencyMultiplier: PRICING_CONTEXT?.urgencyMultipliers?.[jobDetails?.urgency || 'flexible'],
      
      // Metadata
      source: 'ai_generated',
      model: 'gemini-2.5-pro',
      version: '1.0'
    };
    
    return estimate;
    
  } catch (parseError) {
    console.warn('Failed to parse AI response, using fallback:', parseError);
    return generateFallbackEstimate(jobDetails);
  }
}

/**
 * Generates fallback estimate when AI fails
 */
function generateFallbackEstimate(jobDetails) {
  const basePricing = PRICING_CONTEXT?.baseRates?.[jobDetails?.tradeCategory];
  const locationContext = getLocationContext(jobDetails?.suburb, jobDetails?.state || 'NSW');
  
  // Basic calculation
  const estimatedHours = 3; // Conservative estimate
  const baseHourlyRate = (basePricing?.min + basePricing?.max) / 2;
  const adjustedRate = baseHourlyRate * locationContext?.multiplier * PRICING_CONTEXT?.urgencyMultipliers?.[jobDetails?.urgency || 'flexible'];
  
  const laborCost = estimatedHours * adjustedRate;
  const materialCost = jobDetails?.materialsIncluded ? laborCost * 0.4 : 0;
  const totalCost = laborCost + materialCost;
  
  return {
    jobId: generateJobId(),
    timestamp: new Date()?.toISOString(),
    jobDetails: {
      description: jobDetails?.description,
      tradeCategory: jobDetails?.tradeCategory,
      location: `${jobDetails?.suburb}, ${jobDetails?.state || 'NSW'}`,
      urgency: jobDetails?.urgency || 'flexible'
    },
    
    estimatedHours,
    complexity: 'moderate',
    hourlyRate: Math.round(adjustedRate),
    
    costs: {
      labor: Math.round(laborCost),
      materials: Math.round(materialCost),
      total: Math.round(totalCost),
    },
    
    priceRange: {
      min: Math.round(totalCost * 0.8),
      max: Math.round(totalCost * 1.4)
    },
    
    breakdown: {
      baseLabor: Math.round(estimatedHours * baseHourlyRate),
      urgencyPremium: Math.round(laborCost - (estimatedHours * baseHourlyRate * locationContext?.multiplier)),
      locationAdjustment: Math.round(estimatedHours * baseHourlyRate * (locationContext?.multiplier - 1)),
      complexityFactor: 0
    },
    
    confidence: 'medium',
    reasoning: 'Fallback estimate based on industry averages',
    assumptions: [
      'Standard complexity job',
      'Typical material requirements',
      'Normal site access'
    ],
    recommendations: [
      'Get multiple quotes for comparison',
      'Confirm material requirements with tradie',
      'Ask about additional costs upfront'
    ],
    
    locationMultiplier: locationContext?.multiplier,
    urgencyMultiplier: PRICING_CONTEXT?.urgencyMultipliers?.[jobDetails?.urgency || 'flexible'],
    
    source: 'fallback_calculation',
    model: 'basic_formula',
    version: '1.0'
  };
}

/**
 * Generates unique job ID for estimates
 */
function generateJobId() {
  return `est_${Date.now()}_${Math.random()?.toString(36)?.substr(2, 6)}`;
}

/**
 * Validates price estimate data
 */
export function validateEstimate(estimate) {
  const requiredFields = ['estimatedHours', 'hourlyRate', 'costs', 'priceRange'];
  const missing = requiredFields?.filter(field => !estimate?.[field]);
  
  if (missing?.length > 0) {
    throw new Error(`Invalid estimate: missing ${missing.join(', ')}`);
  }
  
  if (estimate?.costs?.total <= 0) {
    throw new Error('Invalid estimate: total cost must be positive');
  }
  
  if (estimate?.priceRange?.min > estimate?.priceRange?.max) {
    throw new Error('Invalid estimate: min price cannot exceed max price');
  }
  
  return true;
}

/**
 * Formats estimate for display
 */
export function formatEstimateForDisplay(estimate) {
  const formatCurrency = (amount) => `$${Math.round(amount)?.toLocaleString()}`;
  
  return {
    ...estimate,
    formattedCosts: {
      labor: formatCurrency(estimate?.costs?.labor),
      materials: formatCurrency(estimate?.costs?.materials),
      total: formatCurrency(estimate?.costs?.total)
    },
    formattedRange: {
      min: formatCurrency(estimate?.priceRange?.min),
      max: formatCurrency(estimate?.priceRange?.max)
    },
    formattedHourlyRate: formatCurrency(estimate?.hourlyRate)
  };
}