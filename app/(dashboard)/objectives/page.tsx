'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronRight, Target, TrendingUp } from 'lucide-react';
import { OBJECTIVES_FIXTURE } from '@/fixtures/objectives';
import { ProgressBarGradient } from '@/components/dashboard/ProgressBarGradient';
import { CyclePanelController } from '@/components/layout/CyclePanelController';

export default function ObjectivesPage() {
  const [expandedObjectives, setExpandedObjectives] = useState<Set<string>>(new Set());

  const toggleObjective = (id: string) => {
    const newSet = new Set(expandedObjectives);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedObjectives(newSet);
  };

  return (
    <>
      <CyclePanelController show={true} />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Objectives & KPIs</h1>
          <p className="text-gray-600 mt-1">{OBJECTIVES_FIXTURE.length} active objectives</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          + New Objective
        </button>
      </div>

      <div className="space-y-4">
        {OBJECTIVES_FIXTURE.map((objective) => {
          const isExpanded = expandedObjectives.has(objective.id);
          return (
            <Card key={objective.id} className="overflow-hidden">
              <button
                onClick={() => toggleObjective(objective.id)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-500 mt-1" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500 mt-1" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-900">{objective.title}</h2>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{objective.description}</p>
                      <div className="max-w-md">
                        <ProgressBarGradient
                          value={objective.overallProgress}
                          target={100}
                          showLabel={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{objective.kpis.length} KPIs</p>
                    <p className="text-xs text-gray-500 mt-1">{objective.assignedTo}</p>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-200 bg-gray-50 p-6">
                  <div className="space-y-3">
                    {objective.kpis.map((kpi) => (
                      <div
                        key={kpi.id}
                        className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-2 flex-1">
                            <TrendingUp className="w-4 h-4 text-gray-500 mt-1" />
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{kpi.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{kpi.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold text-gray-600">Weight: {kpi.weightage}%</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                          <div>
                            <p className="text-gray-500">Current</p>
                            <p className="font-semibold">{kpi.currentValue.toLocaleString()} {kpi.unit}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Target</p>
                            <p className="font-semibold">{kpi.target.toLocaleString()} {kpi.unit}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Frequency</p>
                            <p className="font-semibold">{kpi.frequency}</p>
                          </div>
                        </div>
                        <ProgressBarGradient
                          value={kpi.currentValue}
                          target={kpi.target}
                          height="sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      </div>
    </>
  );
}
