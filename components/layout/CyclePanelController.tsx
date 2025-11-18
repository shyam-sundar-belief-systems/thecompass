'use client';

import { useEffect } from 'react';
import { useCyclePanelStore } from '@/store/useCyclePanelStore';

interface CyclePanelControllerProps {
  show: boolean;
}

export function CyclePanelController({ show }: CyclePanelControllerProps) {
  const { setShowCyclePanel } = useCyclePanelStore();

  useEffect(() => {
    setShowCyclePanel(show);
  }, [show, setShowCyclePanel]);

  return null;
}
