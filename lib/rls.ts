export function assertTenant(sessionTenantId: string, entityTenantId: string) {
  if (sessionTenantId !== entityTenantId) {
    throw new Error('Tenant mismatch - access denied');
  }
}

export function checkRolePermission(userRole: string, allowedRoles: string[]): boolean {
  return allowedRoles.includes(userRole);
}

export function scopeQueryByTenant<T extends { tenantId: string }>(
  tenantId: string,
  query: any
): any {
  return {
    ...query,
    where: {
      ...query?.where,
      tenantId,
    },
  };
}
