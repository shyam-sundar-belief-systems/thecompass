'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, Circle } from 'lucide-react';

const MONTHS = [
  'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'
];

export function SidebarCyclePanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('Apr');

  useEffect(() => {
    const saved = localStorage.getItem('belief_cycle_panel_collapsed');
    if (saved) setIsCollapsed(JSON.parse(saved));

    const savedMonth = localStorage.getItem('belief_current_month');
    if (savedMonth) setCurrentMonth(savedMonth);
  }, []);

  const toggleCollapse = () => {
    const newValue = !isCollapsed;
    setIsCollapsed(newValue);
    localStorage.setItem('belief_cycle_panel_collapsed', JSON.stringify(newValue));
  };

  const selectMonth = (month: string) => {
    setCurrentMonth(month);
    localStorage.setItem('belief_current_month', month);
  };

  if (isCollapsed) {
    return (
      <div className="hidden lg:flex flex-col w-20 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 transition-all duration-300 ease-in-out">
        <button
          onClick={toggleCollapse}
          className="p-3 hover:bg-gray-200 flex items-center justify-center border-b border-gray-200 transition-colors"
          aria-label="Expand cycle panel"
          title="Expand cycle months"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex-1 overflow-y-auto scrollbar-hide p-2 space-y-2">
          {MONTHS.map((month) => (
            <button
              key={month}
              onClick={() => selectMonth(month)}
              className={`w-full flex items-center justify-center p-2 rounded-lg transition-all duration-200 group relative ${
                currentMonth === month
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'hover:bg-gray-200 text-gray-600'
              }`}
              aria-label={`Select ${month}`}
              title={month}
            >
              {currentMonth === month ? (
                <CalendarDays className="w-4 h-4" />
              ) : (
                <Circle className="w-2 h-2" fill="currentColor" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex flex-col w-[180px] bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 transition-all duration-300 ease-in-out">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-gray-700">Cycle Months</span>
        </div>
        <button
          onClick={toggleCollapse}
          className="p-1.5 hover:bg-gray-200 rounded-md transition-colors"
          aria-label="Collapse cycle panel"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-3 space-y-1">
        {MONTHS.map((month, index) => (
          <button
            key={month}
            onClick={() => selectMonth(month)}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center justify-between ${
              currentMonth === month
                ? 'bg-blue-500 text-white shadow-md font-medium'
                : 'hover:bg-gray-200 text-gray-700 font-normal'
            }`}
            aria-label={`Select ${month}`}
          >
            <span>{month}</span>
            {currentMonth === month && (
              <Circle className="w-2 h-2" fill="currentColor" />
            )}
          </button>
        ))}
      </div>

      <div className="p-3 border-t border-gray-200 text-xs text-gray-500 text-center">
        FY 2024-2025
      </div>
    </div>
  );
}
