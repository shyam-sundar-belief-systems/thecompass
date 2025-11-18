import { TopBar } from '@/components/layout/TopBar';
import { SidebarCyclePanel } from '@/components/layout/SidebarCyclePanel';
import { SidebarMain } from '@/components/layout/SidebarMain';
import { BottomNav } from '@/components/layout/BottomNav';
import { FabQuickEntry } from '@/components/layout/FabQuickEntry';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <TopBar />

      <div className="flex-1 flex overflow-hidden">
        <SidebarCyclePanel />
        <SidebarMain />

        <main className="flex-1 overflow-y-auto bg-gray-50 pb-16 md:pb-0">
          {children}
        </main>
      </div>

      <BottomNav />
      <FabQuickEntry />
    </div>
  );
}
