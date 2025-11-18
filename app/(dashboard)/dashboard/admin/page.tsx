import { Users, TrendingUp, Target, CheckSquare } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Card } from '@/components/ui/card';

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">System overview and management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Users" value={156} change={12} trend="up" icon={Users} />
        <MetricCard label="Active KPIs" value={87} change={5} trend="up" icon={TrendingUp} />
        <MetricCard label="Objectives" value={24} change={2} trend="up" icon={Target} />
        <MetricCard label="Pending Approvals" value={15} change={-3} trend="down" icon={CheckSquare} />
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">System Activity</h2>
        <div className="h-64 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded">
          Bar Chart - Recharts integration pending (Batch 3)
        </div>
      </Card>
    </div>
  );
}
