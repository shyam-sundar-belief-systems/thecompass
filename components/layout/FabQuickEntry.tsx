'use client';

import { Zap } from 'lucide-react';

export function FabQuickEntry() {
  const handleClick = () => {
  };

  return (
    <button
      onClick={handleClick}
      className="md:hidden fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 active:scale-95 transition-all flex items-center justify-center z-40 ring-4 ring-white"
      aria-label="Quick Entry"
      style={{ minHeight: '56px', minWidth: '56px' }}
    >
      <Zap className="w-6 h-6" fill="currentColor" />
    </button>
  );
}
