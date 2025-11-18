import { prisma } from './prisma';

export async function logAuditAction(
  tenantId: string,
  userId: string,
  action: string,
  entityType: string,
  entityId: string,
  metadata?: Record<string, any>
): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action,
        entityType,
        entityId,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    });
  } catch (error) {
    console.error('Error logging audit action:', error);
  }
}

export async function getAuditTrail(
  tenantId: string,
  filters?: {
    userId?: string;
    entityType?: string;
    entityId?: string;
    limit?: number;
  }
) {
  const where: any = { tenantId };

  if (filters?.userId) where.userId = filters.userId;
  if (filters?.entityType) where.entityType = filters.entityType;
  if (filters?.entityId) where.entityId = filters.entityId;

  return prisma.auditLog.findMany({
    where,
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: filters?.limit || 50,
  });
}
