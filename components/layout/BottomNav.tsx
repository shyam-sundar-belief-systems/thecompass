'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Target,
  TrendingUp,
  CheckSquare,
  User
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/objectives', label: 'Objectives', icon: Target },
  { href: '/kpis', label: 'KPIs', icon: TrendingUp },
  { href: '/approvals', label: 'Approvals', icon: CheckSquare },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="h-full flex items-center justify-around px-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-lg min-w-[56px] h-11 transition-all ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 active:bg-gray-100'
              }`}
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
