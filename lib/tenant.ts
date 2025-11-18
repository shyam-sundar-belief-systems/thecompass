import { getServerSession } from './auth';

export async function getTenantIdFromSession(): Promise<string> {
  const session = await getServerSession();

  if (!session?.user) {
    throw new Error('No active session');
  }

  const tenantId = (session.user as any).tenantId;

  if (!tenantId) {
    throw new Error('No tenant ID in session');
  }

  return tenantId;
}

export function assertTenantScope(sessionTenantId: string, entityTenantId: string) {
  if (sessionTenantId !== entityTenantId) {
    throw new Error('Tenant scope violation - access denied');
  }
}

export function withTenantScope<T extends Record<string, any>>(
  tenantId: string,
  query: T
): T {
  return {
    ...query,
    where: {
      ...query.where,
      tenantId,
    },
  } as T;
}

export function scopePrismaQuery(tenantId: string) {
  return {
    where: { tenantId },
  };
}
