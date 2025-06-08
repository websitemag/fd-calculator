export interface FDInput {
  principal: number;
  rate: number;
  tenure: number;
  tenureUnit: 'years' | 'months';
  compounding: 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';
}

export interface FDResult {
  maturityAmount: number;
  interestEarned: number;
  principal: number;
  effectiveRate: number;
  totalTenure: number;
  growth: number;
}

export function calculateFD(input: FDInput): FDResult {
  const { principal, rate, tenure, tenureUnit, compounding } = input;
  
  // Convert rate from percentage to decimal
  const annualRate = rate / 100;
  
  // Convert tenure to years
  const tenureInYears = tenureUnit === 'months' ? tenure / 12 : tenure;
  
  // Determine compounding frequency (n)
  let compoundingFrequency: number;
  switch (compounding) {
    case 'monthly':
      compoundingFrequency = 12;
      break;
    case 'quarterly':
      compoundingFrequency = 4;
      break;
    case 'half-yearly':
      compoundingFrequency = 2;
      break;
    case 'yearly':
      compoundingFrequency = 1;
      break;
    default:
      compoundingFrequency = 4;
  }
  
  // Compound Interest Formula: A = P(1 + r/n)^(nt)
  const maturityAmount = principal * Math.pow(
    1 + annualRate / compoundingFrequency,
    compoundingFrequency * tenureInYears
  );
  
  const interestEarned = maturityAmount - principal;
  const effectiveRate = (maturityAmount / principal - 1) / tenureInYears * 100;
  const growth = ((maturityAmount - principal) / principal) * 100;
  
  return {
    maturityAmount: Math.round(maturityAmount * 100) / 100,
    interestEarned: Math.round(interestEarned * 100) / 100,
    principal,
    effectiveRate: Math.round(effectiveRate * 100) / 100,
    totalTenure: tenureInYears,
    growth: Math.round(growth * 100) / 100,
  };
}

export function getDefaultValues(): FDInput {
  return {
    principal: 100000,
    rate: 7.5,
    tenure: 5,
    tenureUnit: 'years',
    compounding: 'quarterly',
  };
}

export function parseURLParams(searchParams: URLSearchParams): Partial<FDInput> {
  const params: Partial<FDInput> = {};
  
  const principal = searchParams.get('principal');
  if (principal && !isNaN(Number(principal))) {
    params.principal = Number(principal);
  }
  
  const rate = searchParams.get('rate');
  if (rate && !isNaN(Number(rate))) {
    params.rate = Number(rate);
  }
  
  const tenure = searchParams.get('tenure');
  if (tenure && !isNaN(Number(tenure))) {
    params.tenure = Number(tenure);
  }
  
  const tenureUnit = searchParams.get('tenureUnit');
  if (tenureUnit === 'years' || tenureUnit === 'months') {
    params.tenureUnit = tenureUnit;
  }
  
  const compounding = searchParams.get('compounding');
  if (compounding === 'monthly' || compounding === 'quarterly' || 
      compounding === 'half-yearly' || compounding === 'yearly') {
    params.compounding = compounding;
  }
  
  return params;
}

export function generateShareableURL(input: FDInput): string {
  const params = new URLSearchParams();
  params.set('principal', input.principal.toString());
  params.set('rate', input.rate.toString());
  params.set('tenure', input.tenure.toString());
  params.set('tenureUnit', input.tenureUnit);
  params.set('compounding', input.compounding);
  
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}