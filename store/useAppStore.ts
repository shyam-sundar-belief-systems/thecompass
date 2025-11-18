import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  activeCycle: string;
  quickApproveMode: boolean;
  selectedKPIs: string[];
  selectedObjectives: string[];
  isLoading: boolean;

  setActiveCycle: (cycle: string) => void;
  setQuickApproveMode: (enabled: boolean) => void;
  toggleKPISelection: (kpiId: string) => void;
  toggleObjectiveSelection: (objectiveId: string) => void;
  clearSelections: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeCycle: 'Apr',
      quickApproveMode: false,
      selectedKPIs: [],
      selectedObjectives: [],
      isLoading: false,

      setActiveCycle: (cycle) => set({ activeCycle: cycle }),

      setQuickApproveMode: (enabled) => set({ quickApproveMode: enabled }),

      toggleKPISelection: (kpiId) =>
        set((state) => ({
          selectedKPIs: state.selectedKPIs.includes(kpiId)
            ? state.selectedKPIs.filter((id) => id !== kpiId)
            : [...state.selectedKPIs, kpiId],
        })),

      toggleObjectiveSelection: (objectiveId) =>
        set((state) => ({
          selectedObjectives: state.selectedObjectives.includes(objectiveId)
            ? state.selectedObjectives.filter((id) => id !== objectiveId)
            : [...state.selectedObjectives, objectiveId],
        })),

      clearSelections: () =>
        set({ selectedKPIs: [], selectedObjectives: [] }),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'belief-app-storage',
      partialize: (state) => ({
        activeCycle: state.activeCycle,
        quickApproveMode: state.quickApproveMode,
      }),
    }
  )
);
