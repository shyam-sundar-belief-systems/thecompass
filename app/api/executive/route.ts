import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth';
import { getTenantIdFromSession } from '@/lib/tenant';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const role = (session.user as any).role;
    if (!['EXECUTIVE', 'ADMIN', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const tenantId = await getTenantIdFromSession();

    const [objectives, kpis, kpiEntries, users] = await Promise.all([
      prisma.objective.findMany({
        where: { tenantId },
        include: {
          kpis: {
            include: {
              entries: {
                where: {
                  status: 'APPROVED',
                },
                orderBy: { createdAt: 'desc' },
                take: 6,
              },
            },
          },
        },
      }),
      prisma.kPI.findMany({
        where: { tenantId },
        include: {
          entries: {
            where: {
              status: 'APPROVED',
            },
            orderBy: { createdAt: 'desc' },
            take: 6,
          },
        },
      }),
      prisma.kPIEntry.findMany({
        where: {
          tenantId,
          status: 'APPROVED',
        },
        orderBy: { createdAt: 'desc' },
        take: 100,
      }),
      prisma.user.findMany({
        where: { tenantId },
        select: { id: true, name: true, role: true },
      }),
    ]);

    const heatmapData = generateHeatmapData(kpiEntries);
    const trendData = generateTrendData(kpiEntries);
    const atRiskKPIs = identifyAtRiskKPIs(kpis);
    const performanceSummary = generatePerformanceSummary(kpis);

    return NextResponse.json({
      heatmapData,
      trendData,
      atRiskKPIs,
      performanceSummary,
      totalObjectives: objectives.length,
      totalKPIs: kpis.length,
      totalUsers: users.length,
    });
  } catch (error) {
    console.error('Error fetching executive data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function generateHeatmapData(entries: any[]) {
  const monthlyData: Record<string, Record<string, number>> = {};

  entries.forEach((entry) => {
    if (!monthlyData[entry.month]) {
      monthlyData[entry.month] = {};
    }

    const progress = (entry.value / entry.kpi?.target || 1) * 100;
    monthlyData[entry.month][entry.kpi?.title || 'Unknown'] = Math.min(progress, 100);
  });

  return Object.entries(monthlyData).map(([month, data]) => ({
    month,
    ...data,
  }));
}

function generateTrendData(entries: any[]) {
  return entries.slice(0, 12).map((entry) => ({
    month: entry.month,
    value: entry.value,
    target: entry.kpi?.target || 0,
  }));
}

function identifyAtRiskKPIs(kpis: any[]) {
  return kpis
    .filter((kpi) => {
      if (!kpi.entries || kpi.entries.length === 0) return false;
      const latestEntry = kpi.entries[0];
      const progress = (latestEntry.value / kpi.target) * 100;
      return progress < 80;
    })
    .slice(0, 5)
    .map((kpi) => ({
      id: kpi.id,
      title: kpi.title,
      progress: kpi.entries[0]
        ? ((kpi.entries[0].value / kpi.target) * 100).toFixed(1)
        : '0',
    }));
}

function generatePerformanceSummary(kpis: any[]) {
  let onTrack = 0;
  let atRisk = 0;
  let behind = 0;

  kpis.forEach((kpi) => {
    if (!kpi.entries || kpi.entries.length === 0) {
      behind++;
      return;
    }

    const latestEntry = kpi.entries[0];
    const progress = (latestEntry.value / kpi.target) * 100;

    if (progress >= 90) onTrack++;
    else if (progress >= 70) atRisk++;
    else behind++;
  });

  return { onTrack, atRisk, behind, total: kpis.length };
}
