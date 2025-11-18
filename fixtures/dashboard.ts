export interface DashboardMetric {
  label: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface ExecutiveMetric {
  department: string;
  totalKPIs: number;
  onTrack: number;
  atRisk: number;
  behind: number;
  overallScore: number;
}

export const ADMIN_METRICS: DashboardMetric[] = [
  {
    label: 'Total Users',
    value: 156,
    change: 12,
    trend: 'up',
    icon: 'Users',
  },
  {
    label: 'Active KPIs',
    value: 87,
    change: 5,
    trend: 'up',
    icon: 'TrendingUp',
  },
  {
    label: 'Objectives',
    value: 24,
    change: 2,
    trend: 'up',
    icon: 'Target',
  },
  {
    label: 'Pending Approvals',
    value: 15,
    change: -3,
    trend: 'down',
    icon: 'CheckSquare',
  },
];

export const EXECUTIVE_METRICS: ExecutiveMetric[] = [
  {
    department: 'Sales',
    totalKPIs: 12,
    onTrack: 8,
    atRisk: 3,
    behind: 1,
    overallScore: 82,
  },
  {
    department: 'Marketing',
    totalKPIs: 10,
    onTrack: 7,
    atRisk: 2,
    behind: 1,
    overallScore: 78,
  },
  {
    department: 'Operations',
    totalKPIs: 15,
    onTrack: 12,
    atRisk: 2,
    behind: 1,
    overallScore: 88,
  },
  {
    department: 'Customer Success',
    totalKPIs: 8,
    onTrack: 5,
    atRisk: 2,
    behind: 1,
    overallScore: 75,
  },
  {
    department: 'Engineering',
    totalKPIs: 18,
    onTrack: 14,
    atRisk: 3,
    behind: 1,
    overallScore: 85,
  },
];

export const HEATMAP_DATA = [
  { month: 'Apr', sales: 95, marketing: 88, operations: 92, cs: 78, engineering: 85 },
  { month: 'May', sales: 88, marketing: 90, operations: 95, cs: 80, engineering: 87 },
  { month: 'Jun', sales: 92, marketing: 85, operations: 90, cs: 82, engineering: 90 },
  { month: 'Jul', sales: 85, marketing: 92, operations: 88, cs: 85, engineering: 88 },
  { month: 'Aug', sales: 90, marketing: 88, operations: 93, cs: 87, engineering: 92 },
  { month: 'Sep', sales: 87, marketing: 90, operations: 91, cs: 84, engineering: 89 },
];
