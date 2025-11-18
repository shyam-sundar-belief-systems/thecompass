import { Card } from '@/components/ui/card';
import { HeatmapGrid } from '@/components/dashboard/HeatmapGrid';
import { HEATMAP_DATA, EXECUTIVE_METRICS } from '@/fixtures/dashboard';

export default function ExecutiveDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
        <p className="text-gray-600 mt-1">Organization-wide performance overview</p>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Department Performance Heatmap</h2>
        <HeatmapGrid
          data={HEATMAP_DATA}
          departments={['Sales', 'Marketing', 'Operations', 'CS', 'Engineering']}
        />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Trend Analysis</h2>
          <div className="h-64 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded">
            Trend Chart - Recharts (Batch 3)
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Top 5 At-Risk KPIs</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">At-Risk KPI #{i}</p>
                  <p className="text-xs text-gray-600">Department • 72% of target</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
