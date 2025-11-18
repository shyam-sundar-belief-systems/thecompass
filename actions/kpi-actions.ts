'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from '@/lib/auth';
import { getTenantIdFromSession } from '@/lib/tenant';
import { prisma } from '@/lib/prisma';
import { logAuditAction } from '@/lib/audit';

export async function createKPIEntry(kpiId: string, month: string, value: number) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return { error: 'Unauthorized' };
    }

    const userId = (session.user as any).id;
    const tenantId = await getTenantIdFromSession();

    const kpi = await prisma.kPI.findUnique({
      where: { id: kpiId },
    });

    if (!kpi || kpi.tenantId !== tenantId) {
      return { error: 'KPI not found' };
    }

    const existingEntry = await prisma.kPIEntry.findUnique({
      where: {
        kpiId_userId_month: {
          kpiId,
          userId,
          month,
        },
      },
    });

    if (existingEntry) {
      return { error: 'Entry already exists for this month' };
    }

    const entry = await prisma.kPIEntry.create({
      data: {
        kpiId,
        userId,
        tenantId,
        month,
        value,
        status: 'DRAFT',
      },
    });

    await logAuditAction(tenantId, userId, 'CREATE', 'KPIEntry', entry.id, {
      kpiId,
      month,
      value,
    });

    revalidatePath('/kpis');
    revalidatePath('/dashboard');

    return { success: true, entry };
  } catch (error) {
    console.error('Error creating KPI entry:', error);
    return { error: 'Failed to create KPI entry' };
  }
}

export async function submitKPIEntry(entryId: string) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return { error: 'Unauthorized' };
    }

    const userId = (session.user as any).id;
    const tenantId = await getTenantIdFromSession();

    const entry = await prisma.kPIEntry.findUnique({
      where: { id: entryId },
    });

    if (!entry || entry.tenantId !== tenantId || entry.userId !== userId) {
      return { error: 'Entry not found' };
    }

    const updatedEntry = await prisma.kPIEntry.update({
      where: { id: entryId },
      data: { status: 'PENDING' },
    });

    await logAuditAction(tenantId, userId, 'SUBMIT', 'KPIEntry', entryId);

    revalidatePath('/kpis');
    revalidatePath('/approvals');

    return { success: true, entry: updatedEntry };
  } catch (error) {
    console.error('Error submitting KPI entry:', error);
    return { error: 'Failed to submit KPI entry' };
  }
}

export async function approveKPIEntry(entryId: string) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return { error: 'Unauthorized' };
    }

    const userId = (session.user as any).id;
    const role = (session.user as any).role;
    const tenantId = await getTenantIdFromSession();

    if (!['ADMIN', 'MANAGER', 'SUPER_ADMIN'].includes(role)) {
      return { error: 'Forbidden' };
    }

    const entry = await prisma.kPIEntry.findUnique({
      where: { id: entryId },
    });

    if (!entry || entry.tenantId !== tenantId) {
      return { error: 'Entry not found' };
    }

    const updatedEntry = await prisma.kPIEntry.update({
      where: { id: entryId },
      data: { status: 'APPROVED' },
    });

    await logAuditAction(tenantId, userId, 'APPROVE', 'KPIEntry', entryId);

    revalidatePath('/approvals');
    revalidatePath('/kpis');

    return { success: true, entry: updatedEntry };
  } catch (error) {
    console.error('Error approving KPI entry:', error);
    return { error: 'Failed to approve KPI entry' };
  }
}

export async function rejectKPIEntry(entryId: string, reason?: string) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return { error: 'Unauthorized' };
    }

    const userId = (session.user as any).id;
    const role = (session.user as any).role;
    const tenantId = await getTenantIdFromSession();

    if (!['ADMIN', 'MANAGER', 'SUPER_ADMIN'].includes(role)) {
      return { error: 'Forbidden' };
    }

    const entry = await prisma.kPIEntry.findUnique({
      where: { id: entryId },
    });

    if (!entry || entry.tenantId !== tenantId) {
      return { error: 'Entry not found' };
    }

    const updatedEntry = await prisma.kPIEntry.update({
      where: { id: entryId },
      data: { status: 'REJECTED' },
    });

    await logAuditAction(tenantId, userId, 'REJECT', 'KPIEntry', entryId, { reason });

    revalidatePath('/approvals');
    revalidatePath('/kpis');

    return { success: true, entry: updatedEntry };
  } catch (error) {
    console.error('Error rejecting KPI entry:', error);
    return { error: 'Failed to reject KPI entry' };
  }
}
