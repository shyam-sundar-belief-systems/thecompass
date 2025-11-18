'use client';

import { CyclePanelController } from '@/components/layout/CyclePanelController';

export default function KPIsPage() {
  return (
    <>
      <CyclePanelController show={true} />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">KPIs</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">KPIs list placeholder</p>
        </div>
      </div>
    </>
  );
}
