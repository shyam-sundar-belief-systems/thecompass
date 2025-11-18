export function calculateKPIAggregation(
  values: number[],
  method: 'SUM' | 'AVERAGE'
): number {
  if (values.length === 0) return 0;

  if (method === 'SUM') {
    return values.reduce((sum, val) => sum + val, 0);
  }

  if (method === 'AVERAGE') {
    const sum = values.reduce((sum, val) => sum + val, 0);
    return sum / values.length;
  }

  return 0;
}

export function calculateKPIProgress(current: number, target: number): number {
  if (target === 0) return 0;

  const progress = (current / target) * 100;

  return Math.min(progress, 150);
}

export function getKPIStatus(
  progress: number
): 'ON_TRACK' | 'AT_RISK' | 'BEHIND' {
  if (progress >= 90) return 'ON_TRACK';
  if (progress >= 70) return 'AT_RISK';
  return 'BEHIND';
}
