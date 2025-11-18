'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  Bell,
  ChevronDown,
  FileText,
  Target,
  Star,
  CheckSquare,
  BarChart3,
  Settings as SettingsIcon,
} from 'lucide-react';

interface DropdownItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavBadge {
  label: string;
  items?: DropdownItem[];
  href?: string;
}

const NAV_ITEMS: NavBadge[] = [
  {
    label: 'Gap Analysis',
    items: [
      { label: 'View All', href: '/gap-analysis', icon: <FileText className="w-4 h-4" /> },
      { label: 'Create New', href: '/gap-analysis/new', icon: <FileText className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Objectives & KPIs',
    items: [
      { label: 'Objectives', href: '/objectives', icon: <Target className="w-4 h-4" /> },
      { label: 'KPIs', href: '/kpis', icon: <BarChart3 className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Reviews',
    items: [
      { label: 'PMS Reviews', href: '/pms', icon: <Star className="w-4 h-4" /> },
      { label: 'Performance Reports', href: '/reports', icon: <FileText className="w-4 h-4" /> },
    ],
  },
  { label: 'Approvals', href: '/approvals' },
  {
    label: 'Reports',
    items: [
      { label: 'KPI Reports', href: '/reports/kpi', icon: <BarChart3 className="w-4 h-4" /> },
      { label: 'Executive Summary', href: '/dashboard/executive', icon: <BarChart3 className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Admin',
    items: [
      { label: 'Dashboard', href: '/dashboard/admin', icon: <SettingsIcon className="w-4 h-4" /> },
      { label: 'Tenant Settings', href: '/settings/tenant', icon: <SettingsIcon className="w-4 h-4" /> },
      { label: 'Rating Scale', href: '/settings/rating-scale', icon: <SettingsIcon className="w-4 h-4" /> },
    ],
  },
];

export function TopBar() {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [tenantDropdownOpen, setTenantDropdownOpen] = useState(false);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside = dropdownRefs.current.every(
        (ref) => ref && !ref.contains(event.target as Node)
      );
      if (clickedOutside) {
        setActiveDropdown(null);
        setTenantDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setTenantDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setTenantDropdownOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Building2 className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Belief Systems
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
          {NAV_ITEMS.map((item, index) => (
            <div
              key={item.label}
              className="relative"
              ref={(el) => {
                dropdownRefs.current[index] = el;
              }}
            >
              {item.items ? (
                <button
                  onClick={() => toggleDropdown(index)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
                    activeDropdown === index
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-expanded={activeDropdown === index}
                  aria-haspopup="true"
                  aria-label={`${item.label} menu`}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      activeDropdown === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                  aria-label={item.label}
                >
                  <span>{item.label}</span>
                </Link>
              )}

              {item.items && activeDropdown === index && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {item.items.map((subItem, subIndex) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      onClick={() => setActiveDropdown(null)}
                      tabIndex={0}
                    >
                      {subItem.icon}
                      <span>{subItem.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative" ref={(el) => {
          dropdownRefs.current[NAV_ITEMS.length] = el;
        }}>
          <button
            onClick={() => {
              setTenantDropdownOpen(!tenantDropdownOpen);
              setActiveDropdown(null);
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Tenant switcher"
            aria-expanded={tenantDropdownOpen}
          >
            <span className="font-medium text-gray-700">Acme Corporation</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${tenantDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {tenantDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-semibold">Current Tenant</p>
              </div>
              <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 text-gray-700 font-medium">
                Acme Corporation
              </button>
            </div>
          )}
        </div>

        <button
          className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
            JD
          </div>
          <div className="hidden lg:block">
            <div className="text-sm font-medium text-gray-800">John Doe</div>
            <div className="text-xs text-gray-500 font-medium">ADMIN</div>
          </div>
        </div>
      </div>
    </header>
  );
}
