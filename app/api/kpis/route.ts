import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth';
import { getTenantIdFromSession } from '@/lib/tenant';
import { prisma } from '@/lib/prisma';
import { kpiSchema } from '@/validators/kpis';

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tenantId = await getTenantIdFromSession();
    const { searchParams } = new URL(request.url);
    const objectiveId = searchParams.get('objectiveId');

    const where: any = { tenantId };
    if (objectiveId) {
      where.objectiveId = objectiveId;
    }

    const kpis = await prisma.kPI.findMany({
      where,
      include: {
        objective: {
          select: { id: true, title: true },
        },
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
        createdBy: {
          select: { id: true, name: true, email: true },
        },
        entries: {
          orderBy: { createdAt: 'desc' },
          take: 12,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ kpis });
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const tenantId = await getTenantIdFromSession();
    const role = (session.user as any).role;

    if (!['ADMIN', 'MANAGER', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = kpiSchema.parse(body);

    const objective = await prisma.objective.findUnique({
      where: { id: validatedData.objectiveId },
    });

    if (!objective || objective.tenantId !== tenantId) {
      return NextResponse.json({ error: 'Objective not found' }, { status: 404 });
    }

    const kpi = await prisma.kPI.create({
      data: {
        ...validatedData,
        tenantId,
        createdById: userId,
      },
      include: {
        objective: true,
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({ kpi }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating KPI:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
