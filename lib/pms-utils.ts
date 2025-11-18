export type PMSRating = 'EXCEEDS' | 'MEETS' | 'BELOW' | 'DISAPPOINTING';

export function calculatePMSRating(score: number): PMSRating {
  if (score >= 4.0) return 'EXCEEDS';
  if (score >= 3.0) return 'MEETS';
  if (score >= 2.0) return 'BELOW';
  return 'DISAPPOINTING';
}

export function getRatingLabel(rating: PMSRating): string {
  const labels: Record<PMSRating, string> = {
    EXCEEDS: 'Exceeds Expectations',
    MEETS: 'Meets Expectations',
    BELOW: 'Below Expectations',
    DISAPPOINTING: 'Disappointing',
  };
  return labels[rating];
}

export function getRatingColor(rating: PMSRating): string {
  const colors: Record<PMSRating, string> = {
    EXCEEDS: 'green',
    MEETS: 'blue',
    BELOW: 'orange',
    DISAPPOINTING: 'red',
  };
  return colors[rating];
}

export function generatePMSReport(reviewData: any): string {
  return `PMS Report - Placeholder (Batch 4)`;
}
