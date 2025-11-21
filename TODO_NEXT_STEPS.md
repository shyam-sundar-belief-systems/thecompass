# Next Steps - Post Batch 4

## Priority 1: Authentication Testing

### Test Login Flow
```bash
# Start dev server
npm run dev

# Navigate to http://localhost:3000/login
# Test credentials:
# - superadmin@acme.com / password123
# - admin@acme.com / password123
# - manager@acme.com / password123
# - employee@acme.com / password123
# - executive@acme.com / password123
```

### Verify Session
- Check that session persists across page refreshes
- Verify protected routes redirect to /login
- Test logout functionality
- Verify role-based UI rendering

---

## Priority 2: API Route Testing

### Test with cURL (after login)
```bash
# Get objectives (requires auth)
curl -X GET http://localhost:3000/api/objectives \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN"

# Create KPI entry
curl -X POST http://localhost:3000/api/kpi-entries \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"kpiId":"KPI_ID","month":"2024-06","value":50}'

# Get pending approvals (manager/admin only)
curl -X GET http://localhost:3000/api/approvals \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN"
```

---

## Priority 3: Business Logic Implementation

Replace TODO stubs with real implementations:

### FR-KPI-001: KPI Entry Calculations
**File:** `app/api/kpi-entries/route.ts`
```typescript
// TODO: Calculate aggregations using lib/kpi-formulas.ts
// TODO: Validate against target
// TODO: Update progress tracking
```

### FR-APPR-008: Bulk Approval Logic
**File:** `app/api/approvals/bulk-approve/route.ts`
```typescript
// TODO: Add approval history tracking
// TODO: Send notifications to KPI owners
// TODO: Update aggregate calculations
```

### FR-PMS-003: PMS Calculations
**File:** `lib/pms-utils.ts`
```typescript
// TODO: Implement weighted scoring
// TODO: Add competency matrix
// TODO: Generate comprehensive reports
```

---

## Priority 4: UI Integration

### Connect Dashboards to APIs
1. **Admin Dashboard** (`/dashboard/admin`)
   - Fetch tenant metrics from `/api/tenants`
   - Display user list from `/api/users`
   - Show audit logs from `/api/audit`

2. **Manager Dashboard** (`/dashboard/manager`)
   - Fetch pending approvals from `/api/approvals`
   - Display team KPI summary
   - Show objective progress

3. **Executive Dashboard** (`/dashboard/executive`)
   - Fetch data from `/api/executive`
   - Render heatmap with real data
   - Show cross-functional metrics

### Implement Cycle Panel
**File:** `components/layout/SidebarCyclePanel.tsx`
- Connect to `useCyclePanelStore`
- Implement month click handlers
- Add persistence with localStorage key: `belief_cycle_panel_collapsed`

### Quick Approve Mode
**File:** `components/approvals/QuickApproveMode.tsx`
- Create context provider
- Implement undo toast with token
- Connect to `/api/approvals/quick-approve`
- Store state in localStorage: `belief_quick_approve_mode`

---

## Priority 5: Data Validation

### Strengthen Zod Schemas
**Files to update:**
- `validators/kpiEntries.ts`
- `validators/objectives.ts`
- `validators/approvals.ts`

**Add validations:**
- Date range checks
- Business rule constraints
- Cross-field validations
- Custom error messages

---

## Priority 6: Excel Import/Export

### Implement Excel Functions
**File:** `lib/excel.ts`

```typescript
// TODO FR-KPI-012: Export KPI data to Excel
export async function exportKPIsToExcel(kpiIds: string[], tenantId: string) {
  // Use xlsx library
  // Generate workbook with sheets per KPI
  // Include historical data
  // Return buffer for download
}

// TODO FR-KPI-013: Bulk import KPI entries
export async function importKPIEntriesFromExcel(file: Buffer, tenantId: string) {
  // Parse Excel file
  // Validate each row
  // Bulk insert with transaction
  // Return import summary
}
```

---

## Priority 7: Caching Layer

### Implement Redis Caching
**File:** `lib/cache.ts`

**Install dependencies:**
```bash
npm install @upstash/redis
```

**Implementation:**
```typescript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function getCachedData(key: string) {
  return redis.get(key);
}

export async function setCachedData(key: string, value: any, ttl = 300) {
  return redis.set(key, value, { ex: ttl });
}
```

**Cache keys:**
- `tenant:{tenantId}:dashboard`
- `user:{userId}:kpis`
- `cycle:{month}:aggregates`

---

## Priority 8: Testing

### Unit Tests
**Install dependencies:**
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

**Test files to create:**
- `lib/kpi-formulas.test.ts`
- `lib/pms-utils.test.ts`
- `lib/rls.test.ts`
- `components/dashboard/MetricCard.test.tsx`

### Integration Tests
- API route handlers
- Authentication flows
- Database operations
- Approval workflows

---

## Priority 9: Error Handling

### Standardize Error Responses
**Create:** `lib/errors.ts`

```typescript
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code: string
  ) {
    super(message);
  }
}

export const ErrorCodes = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  TENANT_MISMATCH: 'TENANT_MISMATCH',
};
```

### Add Error Boundaries
- Wrap layouts in error boundaries
- Add fallback UI components
- Log errors to audit system

---

## Priority 10: Production Preparation

### Environment Setup
1. Configure production DATABASE_URL
2. Set up production NextAuth secret
3. Configure CORS for production domain
4. Set up monitoring (Sentry, LogRocket, etc.)

### Deployment Checklist
- [ ] Run production build locally
- [ ] Test all protected routes
- [ ] Verify database migrations
- [ ] Test with production-like data volume
- [ ] Performance testing
- [ ] Security audit
- [ ] Backup strategy in place

---

## PRD/FRD Mapping

### Completed (Stubs)
- ✅ FR-AUTH-001 to FR-AUTH-005
- ✅ FR-TENANT-001 to FR-TENANT-003
- ✅ FR-OBJ-001 to FR-OBJ-010 (scaffolds)
- ✅ FR-KPI-001 to FR-KPI-015 (scaffolds)
- ✅ FR-APPR-001 to FR-APPR-011 (scaffolds)
- ✅ FR-PMS-001 to FR-PMS-008 (scaffolds)

### Pending Implementation
- 🔲 FR-KPI-012: Excel export
- 🔲 FR-KPI-013: Excel import
- 🔲 FR-APPR-008: Notification system
- 🔲 FR-DASHBOARD-001: Real-time updates
- 🔲 FR-GAP-005: Bulk expectations import
- 🔲 FR-PMS-006: Competency matrices

---

## Useful Commands

```bash
# Database operations
npm run prisma:generate   # Regenerate Prisma client
npm run prisma:migrate    # Create new migration
npm run prisma:seed       # Reseed database

# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run typecheck        # TypeScript validation
npm run lint             # ESLint

# Database verification
node scripts/verify-db.js    # Check tables and data
node scripts/reset-db.js     # Reset Dev DB (DESTRUCTIVE)

# Testing (when implemented)
npm test                 # Run all tests
npm test -- --watch      # Watch mode
npm test -- --coverage   # Coverage report
```

---

## Support Resources

- **Prisma Docs:** https://www.prisma.io/docs
- **NextAuth Docs:** https://next-auth.js.org
- **Next.js Docs:** https://nextjs.org/docs
- **Neon Docs:** https://neon.tech/docs

---

**Document Updated:** 2025-11-21
**Status:** Ready for Phase 5 Development
