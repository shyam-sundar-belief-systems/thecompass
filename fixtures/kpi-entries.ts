export interface KPIEntryFixture {
  id: string;
  kpiId: string;
  kpiTitle: string;
  userId: string;
  userName: string;
  month: string;
  value: number;
  target: number;
  unit: string;
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt?: string;
}

export const KPI_ENTRIES_FIXTURE: KPIEntryFixture[] = [
  {
    id: 'entry-1',
    kpiId: 'kpi-1',
    kpiTitle: 'Monthly Sales Revenue',
    userId: 'user-1',
    userName: 'John Smith',
    month: 'Apr',
    value: 95000,
    target: 100000,
    unit: 'USD',
    status: 'PENDING',
    submittedAt: '2024-05-02T10:30:00Z',
  },
  {
    id: 'entry-2',
    kpiId: 'kpi-2',
    kpiTitle: 'Customer Acquisition',
    userId: 'user-1',
    userName: 'John Smith',
    month: 'Apr',
    value: 48,
    target: 50,
    unit: 'customers',
    status: 'PENDING',
    submittedAt: '2024-05-02T10:35:00Z',
  },
  {
    id: 'entry-3',
    kpiId: 'kpi-3',
    kpiTitle: 'Customer Satisfaction Score',
    userId: 'user-2',
    userName: 'Jane Doe',
    month: 'Apr',
    value: 4.5,
    target: 4.8,
    unit: 'score',
    status: 'APPROVED',
    submittedAt: '2024-05-01T14:20:00Z',
  },
  {
    id: 'entry-4',
    kpiId: 'kpi-1',
    kpiTitle: 'Monthly Sales Revenue',
    userId: 'user-1',
    userName: 'John Smith',
    month: 'May',
    value: 105000,
    target: 100000,
    unit: 'USD',
    status: 'APPROVED',
    submittedAt: '2024-06-02T09:15:00Z',
  },
  {
    id: 'entry-5',
    kpiId: 'kpi-4',
    kpiTitle: 'Support Ticket Resolution Time',
    userId: 'user-3',
    userName: 'Mike Johnson',
    month: 'Apr',
    value: 3.2,
    target: 2.5,
    unit: 'hours',
    status: 'REJECTED',
    submittedAt: '2024-05-03T11:45:00Z',
  },
  {
    id: 'entry-6',
    kpiId: 'kpi-5',
    kpiTitle: 'Product Delivery Time',
    userId: 'user-4',
    userName: 'Sarah Williams',
    month: 'Apr',
    value: 5.5,
    target: 7.0,
    unit: 'days',
    status: 'PENDING',
    submittedAt: '2024-05-02T16:30:00Z',
  },
];
