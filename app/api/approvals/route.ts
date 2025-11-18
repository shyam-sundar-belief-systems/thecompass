import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const tenantId = (session.user as any).tenantId;
    const role = (session.user as any).role;

    if (!['ADMIN', 'MANAGER', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const pendingEntries = await prisma.kPIEntry.findMany({
      where: {
        tenantId,
        status: 'PENDING',
      },
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

    return NextResponse.json({ entries: pendingEntries });
  } catch (error) {
    console.error('Error fetching approvals:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tenantId = (session.user as any).tenantId;
    const role = (session.user as any).role;

    if (!['ADMIN', 'MANAGER', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { entryId, status, comments } = body;

    if (!entryId || !status || !['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const entry = await prisma.kPIEntry.findUnique({
      where: { id: entryId },
    });

    if (!entry || entry.tenantId !== tenantId) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    const updatedEntry = await prisma.kPIEntry.update({
      where: { id: entryId },
      data: { status },
      include: {
        kpi: true,
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({ entry: updatedEntry });
  } catch (error) {
    console.error('Error updating approval:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
