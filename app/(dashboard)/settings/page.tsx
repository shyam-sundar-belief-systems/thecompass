'use client';

import { CyclePanelController } from '@/components/layout/CyclePanelController';

export default function SettingsPage() {
  return (
    <>
      <CyclePanelController show={false} />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Settings placeholder</p>
        </div>
      </div>
    </>
  );
}
