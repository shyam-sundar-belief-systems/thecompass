import { create } from 'zustand';

interface CyclePanelStore {
  showCyclePanel: boolean;
  currentMonth: string;
  setShowCyclePanel: (show: boolean) => void;
  setCurrentMonth: (month: string) => void;
}

export const useCyclePanelStore = create<CyclePanelStore>((set) => ({
  showCyclePanel: false,
  currentMonth: 'Apr',
  setShowCyclePanel: (show) => set({ showCyclePanel: show }),
  setCurrentMonth: (month) => set({ currentMonth: month }),
}));
