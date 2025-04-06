import { type CalibratorValues, type SliderParams } from "@/types/demo-calibrator";

// Calculate optimal ranges based on industry and other parameters
export function getOptimalRanges(industry: string, currentValues: CalibratorValues): Record<string, [number, number]> {
  const baseRanges: Record<string, [number, number]> = {
    technical: [60, 80],
    maturity: [40, 70],
    stage: [50, 80],
    authority: [60, 90],
  };
  
  // Industry-specific adjustments
  switch (industry) {
    case "Healthcare":
      return {
        technical: [50, 70], // Less technical focus for healthcare
        maturity: [60, 90], // Higher maturity expectation for healthcare
        stage: baseRanges.stage,
        authority: [70, 95], // Higher authority focus for healthcare
      };
    case "Fintech":
      return {
        technical: [70, 90], // Higher technical focus for fintech
        maturity: [60, 85],
        stage: baseRanges.stage,
        authority: [65, 85],
      };
    case "Retail":
      return {
        technical: [40, 65], // Lower technical focus for retail
        maturity: [50, 80],
        stage: [60, 85], // Higher focus on buying stage for retail
        authority: baseRanges.authority,
      };
    case "SaaS":
      return {
        technical: [60, 85],
        maturity: [50, 75],
        stage: [55, 85],
        authority: [50, 80], // More varied authority levels in SaaS
      };
    case "Manufacturing":
      return {
        technical: [65, 85],
        maturity: [70, 90], // Higher maturity for manufacturing
        stage: [40, 70],
        authority: [65, 90],
      };
    default:
      return baseRanges;
  }
}

// Calculate script emphasis distribution based on parameter values
export function calculateScriptEmphasis(values: CalibratorValues): Record<string, number> {
  const total = Object.values(values).reduce((sum, value) => sum + value, 0);
  const average = total / Object.values(values).length;
  
  // Calculate percentage allocation for each section
  return {
    technicalSection: Math.round((values.technical / average) * 25),
    businessSection: Math.round((values.authority / average) * 25),
    solutionSection: Math.round((values.maturity / average) * 25),
    implementationSection: Math.round((values.stage / average) * 25),
  };
}

// Get visual indicator for slider position relative to optimal range
export function getSliderPositionIndicator(
  value: number, 
  optimalRange: [number, number]
): 'below' | 'optimal' | 'above' {
  if (value < optimalRange[0]) return 'below';
  if (value > optimalRange[1]) return 'above';
  return 'optimal';
}

// Calculate time allocation for different demo sections based on params
export function calculateTimeAllocation(values: CalibratorValues): Record<string, number> {
  const total = 100; // 100% of demo time
  
  // Base allocation
  let technicalTime = 25;
  let businessTime = 25;
  let solutionTime = 25;
  let implementationTime = 25;
  
  // Adjust based on technical sophistication
  if (values.technical > 80) {
    technicalTime += 10;
    businessTime -= 5;
    solutionTime -= 5;
  } else if (values.technical < 40) {
    technicalTime -= 10;
    businessTime += 5;
    solutionTime += 5;
  }
  
  // Adjust based on maturity
  if (values.maturity > 80) {
    solutionTime += 10;
    implementationTime -= 5;
    businessTime -= 5;
  } else if (values.maturity < 40) {
    solutionTime -= 10;
    businessTime += 5;
    implementationTime += 5;
  }
  
  // Adjust based on buying stage
  if (values.stage > 80) {
    implementationTime += 10;
    technicalTime -= 5;
    solutionTime -= 5;
  } else if (values.stage < 40) {
    implementationTime -= 10;
    businessTime += 5;
    solutionTime += 5;
  }
  
  // Adjust based on authority
  if (values.authority > 80) {
    businessTime += 10;
    technicalTime -= 5;
    implementationTime -= 5;
  } else if (values.authority < 40) {
    businessTime -= 10;
    technicalTime += 5;
    implementationTime += 5;
  }
  
  // Ensure no negative values
  technicalTime = Math.max(10, technicalTime);
  businessTime = Math.max(10, businessTime);
  solutionTime = Math.max(10, solutionTime);
  implementationTime = Math.max(10, implementationTime);
  
  // Normalize to ensure total is 100%
  const currentTotal = technicalTime + businessTime + solutionTime + implementationTime;
  const normalizer = total / currentTotal;
  
  return {
    technical: Math.round(technicalTime * normalizer),
    business: Math.round(businessTime * normalizer),
    solution: Math.round(solutionTime * normalizer),
    implementation: Math.round(implementationTime * normalizer),
  };
}

export function getSavedPreferences(): { layout: string, lastIndustry: string } | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const saved = localStorage.getItem('demoCalibrator');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error retrieving saved preferences:', error);
  }
  
  return null;
}

export function savePreferences(preferences: { layout: string, lastIndustry: string }): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('demoCalibrator', JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving preferences:', error);
  }
}
