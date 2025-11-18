import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { PMS_REVIEWS, RATING_SCALES } from '@/fixtures/pms';

const RATING_COLORS = {
  EXCEEDS: 'bg-green-100 text-green-800 border-green-300',
  MEETS: 'bg-blue-100 text-blue-800 border-blue-300',
  BELOW: 'bg-orange-100 text-orange-800 border-orange-300',
  DISAPPOINTING: 'bg-red-100 text-red-800 border-red-300',
};

export default function PMSPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Reviews</h1>
          <p className="text-gray-600 mt-1">{PMS_REVIEWS.length} reviews completed</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          + New Review
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {PMS_REVIEWS.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{review.revieweeName}</h3>
                  <p className="text-sm text-gray-600">Reviewed by {review.reviewerName}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${RATING_COLORS[review.rating]}`}>
                  {RATING_SCALES.find(r => r.rating === review.rating)?.label}
                </span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= review.score ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm font-semibold text-gray-700">{review.score.toFixed(1)}</span>
              </div>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{review.comments}</p>
              <div className="mt-3 text-xs text-gray-500">
                Period: {review.period} \u2022 {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </Card>
          ))}
        </div>

        <div>
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Rating Scale</h2>
            <div className="space-y-3">
              {RATING_SCALES.map((scale) => (
                <div key={scale.rating} className={`p-3 rounded-lg border ${RATING_COLORS[scale.rating]}`}>
                  <p className="font-semibold text-sm">{scale.label}</p>
                  <p className="text-xs mt-1 opacity-90">{scale.description}</p>
                  <p className="text-xs mt-2 font-semibold">{scale.minScore} - {scale.maxScore}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
