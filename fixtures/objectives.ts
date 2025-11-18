export interface KPIFixture {
  id: string;
  title: string;
  description: string;
  unit: string;
  target: number;
  frequency: 'DAILY' | 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY';
  currentValue: number;
  progress: number;
  assignedTo: string;
  weightage: number;
  status: 'ON_TRACK' | 'AT_RISK' | 'BEHIND';
}

export interface ObjectiveFixture {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  assignedTo: string;
  overallProgress: number;
  kpis: KPIFixture[];
}

export const OBJECTIVES_FIXTURE: ObjectiveFixture[] = [
  {
    id: 'obj-1',
    title: 'Increase Revenue Growth',
    description: 'Achieve 20% YoY revenue growth through strategic initiatives',
    startDate: '2024-04-01',
    endDate: '2025-03-31',
    assignedTo: 'Sales Team',
    overallProgress: 75,
    kpis: [
      {
        id: 'kpi-1',
        title: 'Monthly Sales Revenue',
        description: 'Track monthly sales revenue in USD',
        unit: 'USD',
        target: 100000,
        frequency: 'MONTHLY',
        currentValue: 95000,
        progress: 95,
        assignedTo: 'John Smith',
        weightage: 40,
        status: 'ON_TRACK',
      },
      {
        id: 'kpi-2',
        title: 'Customer Acquisition',
        description: 'Number of new customers acquired each month',
        unit: 'customers',
        target: 50,
        frequency: 'MONTHLY',
        currentValue: 48,
        progress: 96,
        assignedTo: 'John Smith',
        weightage: 30,
        status: 'ON_TRACK',
      },
      {
        id: 'kpi-3',
        title: 'Average Deal Size',
        description: 'Average value of closed deals',
        unit: 'USD',
        target: 15000,
        frequency: 'MONTHLY',
        currentValue: 12500,
        progress: 83,
        assignedTo: 'Jane Doe',
        weightage: 30,
        status: 'AT_RISK',
      },
    ],
  },
  {
    id: 'obj-2',
    title: 'Improve Customer Satisfaction',
    description: 'Enhance customer experience and satisfaction scores',
    startDate: '2024-04-01',
    endDate: '2025-03-31',
    assignedTo: 'Customer Success',
    overallProgress: 60,
    kpis: [
      {
        id: 'kpi-4',
        title: 'Customer Satisfaction Score',
        description: 'CSAT score from surveys',
        unit: 'score',
        target: 4.8,
        frequency: 'MONTHLY',
        currentValue: 4.5,
        progress: 94,
        assignedTo: 'Sarah Williams',
        weightage: 50,
        status: 'ON_TRACK',
      },
      {
        id: 'kpi-5',
        title: 'Support Ticket Resolution Time',
        description: 'Average time to resolve support tickets',
        unit: 'hours',
        target: 2.5,
        frequency: 'WEEKLY',
        currentValue: 3.2,
        progress: 78,
        assignedTo: 'Mike Johnson',
        weightage: 50,
        status: 'BEHIND',
      },
    ],
  },
  {
    id: 'obj-3',
    title: 'Operational Excellence',
    description: 'Streamline operations and reduce delivery times',
    startDate: '2024-04-01',
    endDate: '2025-03-31',
    assignedTo: 'Operations',
    overallProgress: 85,
    kpis: [
      {
        id: 'kpi-6',
        title: 'Product Delivery Time',
        description: 'Average time from order to delivery',
        unit: 'days',
        target: 7.0,
        frequency: 'MONTHLY',
        currentValue: 5.5,
        progress: 127,
        assignedTo: 'Operations Team',
        weightage: 100,
        status: 'ON_TRACK',
      },
    ],
  },
];
