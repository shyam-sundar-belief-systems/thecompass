export interface PMSReview {
  id: string;
  revieweeId: string;
  revieweeName: string;
  reviewerId: string;
  reviewerName: string;
  period: string;
  rating: 'EXCEEDS' | 'MEETS' | 'BELOW' | 'DISAPPOINTING';
  score: number;
  comments: string;
  createdAt: string;
}

export interface RatingScale {
  rating: 'EXCEEDS' | 'MEETS' | 'BELOW' | 'DISAPPOINTING';
  label: string;
  description: string;
  minScore: number;
  maxScore: number;
  color: string;
}

export const PMS_REVIEWS: PMSReview[] = [
  {
    id: 'review-1',
    revieweeId: 'user-1',
    revieweeName: 'John Smith',
    reviewerId: 'manager-1',
    reviewerName: 'Manager One',
    period: '2024-Q1',
    rating: 'MEETS',
    score: 3.5,
    comments: 'Good performance, meeting expectations consistently',
    createdAt: '2024-04-15T10:00:00Z',
  },
  {
    id: 'review-2',
    revieweeId: 'user-2',
    revieweeName: 'Jane Doe',
    reviewerId: 'manager-1',
    reviewerName: 'Manager One',
    period: '2024-Q1',
    rating: 'EXCEEDS',
    score: 4.2,
    comments: 'Exceptional performance, consistently exceeding targets',
    createdAt: '2024-04-15T11:00:00Z',
  },
  {
    id: 'review-3',
    revieweeId: 'user-3',
    revieweeName: 'Mike Johnson',
    reviewerId: 'manager-2',
    reviewerName: 'Manager Two',
    period: '2024-Q1',
    rating: 'BELOW',
    score: 2.8,
    comments: 'Performance needs improvement in key areas',
    createdAt: '2024-04-16T09:30:00Z',
  },
  {
    id: 'review-4',
    revieweeId: 'user-4',
    revieweeName: 'Sarah Williams',
    reviewerId: 'manager-2',
    reviewerName: 'Manager Two',
    period: '2024-Q1',
    rating: 'MEETS',
    score: 3.7,
    comments: 'Solid performance with room for growth',
    createdAt: '2024-04-16T10:00:00Z',
  },
];

export const RATING_SCALES: RatingScale[] = [
  {
    rating: 'EXCEEDS',
    label: 'Exceeds Expectations',
    description: 'Performance significantly exceeds job requirements',
    minScore: 4.0,
    maxScore: 5.0,
    color: 'green',
  },
  {
    rating: 'MEETS',
    label: 'Meets Expectations',
    description: 'Performance meets all job requirements',
    minScore: 3.0,
    maxScore: 3.99,
    color: 'blue',
  },
  {
    rating: 'BELOW',
    label: 'Below Expectations',
    description: 'Performance is below job requirements',
    minScore: 2.0,
    maxScore: 2.99,
    color: 'orange',
  },
  {
    rating: 'DISAPPOINTING',
    label: 'Disappointing',
    description: 'Performance is significantly below expectations',
    minScore: 1.0,
    maxScore: 1.99,
    color: 'red',
  },
];
