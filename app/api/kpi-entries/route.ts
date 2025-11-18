import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { kpiEntrySchema } from '@/validators/kpiEntries';

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');
    const userId = (session.user as any).id;
    const tenantId = (session.user as any).tenantId;

    const where: any = { tenantId };

    if (month) {
      where.month = month;
    }

    const role = (session.user as any).role;
    if (!['ADMIN', 'MANAGER', 'SUPER_ADMIN'].includes(role)) {
      where.userId = userId;
    }

    const entries = await prisma.kPIEntry.findMany({
      where,
      include: {
        kpi: {
          include: {
            objective: true,
          },
        },
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ entries });
  } catch (error) {
    console.error('Error fetching KPI entries:', error);
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
    const tenantId = (session.user as any).tenantId;

    const body = await request.json();
    const validatedData = kpiEntrySchema.parse(body);

    const kpi = await prisma.kPI.findUnique({
      where: { id: validatedData.kpiId },
    });

    if (!kpi || kpi.tenantId !== tenantId) {
      return NextResponse.json({ error: 'KPI not found' }, { status: 404 });
    }

    const existingEntry = await prisma.kPIEntry.findUnique({
      where: {
        kpiId_userId_month: {
          kpiId: validatedData.kpiId,
          userId,
          month: validatedData.month,
        },
      },
    });

    if (existingEntry) {
      return NextResponse.json({ error: 'Entry already exists for this month' }, { status: 400 });
    }

    const entry = await prisma.kPIEntry.create({
      data: {
        ...validatedData,
        tenantId,
        userId,
      },
      include: {
        kpi: true,
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({ entry }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating KPI entry:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
