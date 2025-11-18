'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { approveKPIEntry, rejectKPIEntry } from '@/actions/kpi-actions';
import { useRouter } from 'next/navigation';
import { CyclePanelController } from '@/components/layout/CyclePanelController';

interface KPIEntry {
  id: string;
  kpi: {
    id: string;
    title: string;
    target: number;
    unit: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  month: string;
  value: number;
  status: string;
}

export default function ApprovalsPage() {
  const router = useRouter();
  const { quickApproveMode, setQuickApproveMode } = useAppStore();
  const [entries, setEntries] = useState<KPIEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingEntries();
  }, []);

  const fetchPendingEntries = async () => {
    try {
      const response = await fetch('/api/approvals');
      if (response.ok) {
        const data = await response.json();
        setEntries(data.entries || []);
      }
    } catch (error) {
      console.error('Error fetching approvals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (entryId: string) => {
    setProcessing(entryId);
    const result = await approveKPIEntry(entryId);

    if (result.success) {
      setEntries((prev) => prev.filter((e) => e.id !== entryId));
      router.refresh();
    } else {
      alert(result.error || 'Failed to approve entry');
    }
    setProcessing(null);
  };

  const handleReject = async (entryId: string) => {
    setProcessing(entryId);
    const result = await rejectKPIEntry(entryId);

    if (result.success) {
      setEntries((prev) => prev.filter((e) => e.id !== entryId));
      router.refresh();
    } else {
      alert(result.error || 'Failed to reject entry');
    }
    setProcessing(null);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <CyclePanelController show={false} />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Approvals</h1>
          <p className="text-gray-600 mt-1">{entries.length} pending KPI entries</p>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <span className="text-sm font-medium text-gray-700">Quick Approve Mode</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={quickApproveMode}
              onChange={(e) => setQuickApproveMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </div>
        </label>
      </div>

      {entries.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-gray-500">No pending approvals</p>
        </Card>
      ) : (
        <Card className="p-6">
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{entry.kpi.title}</h3>
                  <p className="text-sm text-gray-600">
                    {entry.user.name} • {entry.month} • {entry.value.toLocaleString()} {entry.kpi.unit}
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    Target: {entry.kpi.target.toLocaleString()} {entry.kpi.unit} • Progress:{' '}
                    {((entry.value / entry.kpi.target) * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(entry.id)}
                    disabled={processing === entry.id}
                    className="p-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                    title="Approve"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleReject(entry.id)}
                    disabled={processing === entry.id}
                    className="p-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                    title="Reject"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      </div>
    </>
  );
}
