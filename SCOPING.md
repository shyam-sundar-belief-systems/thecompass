# Belief Systems - KPI Performance Management SaaS
## Project Scoping Document v1.2

---

## Batch 1 Status: CORE SHELL - COMPLETE

Batch 1 establishes the foundational project structure with placeholder implementations only. No business logic or complex features are implemented in this phase.

### Completed in Batch 1:

#### 1. Project Setup
- ✅ Next.js 13 App Router with TypeScript
- ✅ TailwindCSS + DaisyUI integration
- ✅ shadcn/ui component library
- ✅ Prisma ORM setup with full schema
- ✅ NextAuth with Credentials provider (stub)
- ✅ React Hook Form + Zod dependencies
- ✅ Recharts (import-ready)
- ✅ Axios API wrapper
- ✅ Jest + Testing Library configuration
- ✅ Vercel deployment configuration

#### 2. Database Schema
- ✅ All models created: Tenant, User, GapAnalysis, Objective, KPI, KPIEntry, ApprovalWorkflow, PMSReview, PMSRatingScale, AuditLog, ExecutiveRole
- ✅ Enums: Role, Frequency, ApprovalStatus, KPIEntryStatus, AggregationMethod, PMSRating
- ✅ Relations and indexes defined
- ✅ Seed script with sample data (1 tenant, 5 users, 1 objective, 2 KPIs, 3 entries, 1 review)

#### 3. Layout Components (Placeholders)
- ✅ TopBar with navigation badges
- ✅ SidebarCyclePanel (collapsible, Apr-Mar months)
- ✅ SidebarMain with navigation items
- ✅ BottomNav (mobile)
- ✅ FabQuickEntry (mobile)
- ✅ Dashboard layout wrapper

#### 4. Pages (Skeleton Only)
- ✅ Root redirect to /dashboard
- ✅ /dashboard (+ admin, manager, employee, executive variants)
- ✅ /objectives
- ✅ /kpis (+ dynamic [kpiId]/month/[month] route)
- ✅ /approvals
- ✅ /pms
- ✅ /settings (+ tenant, rating-scale subpages)
- ✅ /login

#### 5. Authentication (Minimal)
- ✅ NextAuth API route with Credentials provider
- ✅ Session includes: user.id, tenantId, role
- ✅ Middleware for route protection
- ✅ Login page placeholder

#### 6. Utility Files (Empty Placeholders)
- ✅ lib/rls.ts - RLS and tenant scoping stubs
- ✅ lib/auth.ts - Password hashing stubs
- ✅ lib/api.ts - Axios wrapper
- ✅ lib/kpi-formulas.ts - KPI calculation stubs
- ✅ lib/pms-utils.ts - PMS utility stubs
- ✅ lib/audit.ts - Audit logging stubs
- ✅ lib/excel.ts - Excel import/export stubs
- ✅ lib/cache.ts - Redis caching stubs
- ✅ lib/prisma.ts - Prisma client singleton

#### 7. Configuration Files
- ✅ .env.example with placeholder values
- ✅ vercel.json for deployment
- ✅ jest.config.js and jest.setup.js
- ✅ Updated package.json with scripts

---

## Batch 2: API + MODULES + COMPONENTS + LOGIC

### To Be Implemented in Batch 2:

#### 1. API Routes
- [ ] `/api/objectives` - CRUD operations
- [ ] `/api/kpis` - CRUD operations with formulas
- [ ] `/api/kpis/entries` - Entry submission and approval
- [ ] `/api/approvals` - Workflow management
- [ ] `/api/pms` - Review management
- [ ] `/api/gap-analysis` - CRUD operations
- [ ] `/api/reports` - Data export and aggregation
- [ ] `/api/admin/*` - Tenant and user management

#### 2. Complete Authentication
- [ ] Actual password hashing with bcryptjs
- [ ] Database user verification
- [ ] Session management
- [ ] Role-based access control enforcement
- [ ] Protected API routes with RLS

#### 3. Database Features
- [ ] RLS policies implementation
- [ ] Tenant scoping enforcement in all queries
- [ ] Approval workflow logic
- [ ] Audit logging implementation
- [ ] Data validation and error handling

#### 4. KPI Module
- [ ] Quick Entry UI (mobile FAB)
- [ ] Monthly KPI detail view with heatmap
- [ ] Aggregation formula calculations (SUM, AVERAGE)
- [ ] Traffic light threshold indicators
- [ ] Multi-frequency support (daily, weekly, fortnightly, monthly)
- [ ] Bulk entry and approval features

#### 5. Objectives Module
- [ ] Objective creation and assignment
- [ ] Linked KPIs display
- [ ] Progress tracking
- [ ] Gap analysis integration

#### 6. Approvals Module
- [ ] Quick Approve UI
- [ ] Approval workflow state machine
- [ ] Notification system
- [ ] Bulk approval actions

#### 7. PMS Module
- [ ] Review form with rating scale
- [ ] Period-based reviews
- [ ] Performance reports
- [ ] Rating scale configuration

#### 8. Executive Dashboard
- [ ] Aggregated KPI views
- [ ] Department-level rollups
- [ ] Trend charts (Recharts)
- [ ] Export functionality

#### 9. Admin Module
- [ ] Tenant settings
- [ ] User management
- [ ] Role assignment
- [ ] Rating scale configuration

#### 10. UI Components
- [ ] Interactive heatmaps
- [ ] Traffic light indicators
- [ ] Form validation with React Hook Form + Zod
- [ ] Data tables with sorting/filtering
- [ ] Charts and visualizations (Recharts)
- [ ] Modal dialogs and drawers
- [ ] Toast notifications

#### 11. Utilities Implementation
- [ ] Complete RLS helper functions
- [ ] KPI formula engine
- [ ] Excel import/export (XLSX library)
- [ ] Redis caching layer
- [ ] Audit trail system
- [ ] Email notifications (optional)

#### 12. Testing
- [ ] Unit tests for utility functions
- [ ] Integration tests for API routes
- [ ] Component tests with React Testing Library
- [ ] E2E tests (optional - Playwright)

---

## LocalStorage Keys

Used in Batch 1:
- `belief_current_month` - Selected cycle month
- `belief_cycle_panel_collapsed` - Sidebar collapse state

---

## Installation & Setup

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your DATABASE_URL and secrets

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Start development server
npm run dev
```

---

## Notes

- **Batch 1 is a shell only** - all components render but have no real functionality
- **No API calls work yet** - all data is placeholder or hardcoded
- **No validation or error handling** - to be added in Batch 2
- **No tests written yet** - framework is ready, tests to be written in Batch 2
- **DaisyUI needs configuration** - Tailwind config to be updated

---

## Architecture Decisions

1. **Multi-tenant**: All data scoped by `tenantId`
2. **Role-based**: SUPER_ADMIN, ADMIN, MANAGER, EMPLOYEE, EXECUTIVE
3. **Approval workflows**: Generic entity-based approval system
4. **Apr-Mar financial cycle**: Hardcoded 12-month cycle
5. **Frequency options**: Daily, Weekly, Fortnightly, Monthly KPIs
6. **Responsive design**: Desktop-first with mobile FAB and bottom nav

---

## Tech Stack Summary

| Category | Technology |
|----------|-----------|
| Framework | Next.js 13 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS + DaisyUI |
| UI Components | shadcn/ui |
| Database | PostgreSQL (via Prisma) |
| ORM | Prisma |
| Authentication | NextAuth.js |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| API Client | Axios |
| Caching | Upstash Redis |
| Testing | Jest + React Testing Library |
| Deployment | Vercel |

---

End of Scoping Document - Batch 1 Complete
