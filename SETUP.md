# Setup Instructions

## Critical Fixes Completed

All critical issues have been resolved:

1. **Prisma Client Build Configuration** - Fixed
2. **NextAuth Configuration** - Fixed
3. **Environment Setup** - Completed
4. **Month Cycle Display Logic** - Implemented (shows only on Objectives and KPIs pages)
5. **Build Process** - Verified and working

## Environment Variables Setup

### Required Variables

Copy `.env.example` to `.env` and configure the following variables:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Supabase (if using Supabase features)
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-key"
```

### How to Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

### Database Setup

Your database is already configured with the PostgreSQL URL in `.env`. The connection is working.

## Installation & Running

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Prisma Client

```bash
npm run prisma:generate
```

### 3. Run Database Migrations (if needed)

```bash
npm run prisma:migrate
```

### 4. Seed Database (optional)

```bash
npm run prisma:seed
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
npm start
```

## Key Features Implemented

### Authentication Flow
- NextAuth with credentials provider
- JWT session strategy
- Protected routes with middleware
- Role-based access control (SUPER_ADMIN, ADMIN, MANAGER, EMPLOYEE, EXECUTIVE)

### Month Cycle Panel
- **Shows on**: Objectives page, KPIs page
- **Hidden on**: Dashboard, PMS, Approvals, Settings
- Managed via Zustand store for state consistency
- Persists selected month in localStorage

### Database
- PostgreSQL with Prisma ORM
- Multi-tenant architecture
- Comprehensive data models for objectives, KPIs, approvals, PMS reviews
- Row-level security ready

## Testing

### User Registration & Login
1. Navigate to `/login`
2. Use credentials from seeded data or create new user
3. Verify session persistence
4. Test role-based dashboard access

### CEO Dashboard vs Regular User
- CEO/SUPER_ADMIN: Access to all features
- ADMIN: Tenant-wide management
- MANAGER: Team management and approvals
- EMPLOYEE: Personal KPIs and objectives
- EXECUTIVE: Strategic dashboards

### Month Selection
1. Navigate to Objectives page - month panel should be visible
2. Navigate to KPIs page - month panel should be visible
3. Navigate to Dashboard - month panel should be hidden
4. Navigate to PMS - month panel should be hidden

## Troubleshooting

### Prisma Client Not Found
Run: `npm run prisma:generate`

### Authentication Not Working
1. Verify `NEXTAUTH_SECRET` is set in `.env`
2. Verify `NEXTAUTH_URL` matches your application URL
3. Clear browser cookies and try again

### Build Errors
1. Delete `.next` folder: `rm -rf .next`
2. Regenerate Prisma: `npm run prisma:generate`
3. Rebuild: `npm run build`

### Database Connection Issues
1. Verify `DATABASE_URL` is correct in `.env`
2. Check database is accessible
3. Run migrations: `npm run prisma:migrate`

## Production Deployment

### Environment Variables for Production

Set these in your hosting platform:

```bash
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
```

### Deployment Checklist

- [ ] Set all environment variables
- [ ] Run database migrations
- [ ] Build application: `npm run build`
- [ ] Test authentication flow
- [ ] Verify all routes are accessible
- [ ] Test role-based access
- [ ] Verify month cycle panel behavior

## Architecture Notes

### Tech Stack
- **Framework**: Next.js 13 (App Router)
- **Database**: PostgreSQL with Prisma
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **UI Components**: Radix UI + Tailwind CSS
- **Forms**: React Hook Form + Zod validation

### Key Design Patterns
- Server Components for data fetching
- Client Components for interactivity
- API routes for backend logic
- Middleware for route protection
- Store-based UI state management

## Support

For issues or questions, refer to:
- Next.js Documentation: https://nextjs.org/docs
- Prisma Documentation: https://www.prisma.io/docs
- NextAuth Documentation: https://next-auth.js.org
