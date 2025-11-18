import { PrismaClient, Role, Frequency, KPIEntryStatus, PMSRating, ApprovalStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function main() {
  console.log('Starting seed...');

  const hashedPassword = await hashPassword('password123');

  const tenant = await prisma.tenant.create({
    data: {
      name: 'Acme Corporation',
    },
  });

  console.log('Created tenant:', tenant.name);

  const superAdmin = await prisma.user.create({
    data: {
      email: 'superadmin@acme.com',
      password: hashedPassword,
      name: 'Super Admin User',
      role: Role.SUPER_ADMIN,
      tenantId: tenant.id,
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@acme.com',
      password: hashedPassword,
      name: 'Admin User',
      role: Role.ADMIN,
      tenantId: tenant.id,
    },
  });

  const manager = await prisma.user.create({
    data: {
      email: 'manager@acme.com',
      password: hashedPassword,
      name: 'Manager User',
      role: Role.MANAGER,
      tenantId: tenant.id,
    },
  });

  const employee = await prisma.user.create({
    data: {
      email: 'employee@acme.com',
      password: hashedPassword,
      name: 'Employee User',
      role: Role.EMPLOYEE,
      tenantId: tenant.id,
    },
  });

  const executive = await prisma.user.create({
    data: {
      email: 'executive@acme.com',
      password: hashedPassword,
      name: 'Executive User',
      role: Role.EXECUTIVE,
      tenantId: tenant.id,
    },
  });

  console.log('Created 5 users');

  await prisma.executiveRole.create({
    data: {
      tenantId: tenant.id,
      userId: executive.id,
      title: 'Chief Executive Officer',
    },
  });

  const objective = await prisma.objective.create({
    data: {
      tenantId: tenant.id,
      title: 'Increase Revenue Growth',
      description: 'Achieve 20% YoY revenue growth through strategic initiatives',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2025-03-31'),
      createdById: admin.id,
      assignedToId: manager.id,
    },
  });

  console.log('Created objective:', objective.title);

  const kpi1 = await prisma.kPI.create({
    data: {
      tenantId: tenant.id,
      objectiveId: objective.id,
      title: 'Monthly Sales Revenue',
      description: 'Track monthly sales revenue in USD',
      unit: 'USD',
      target: 100000,
      frequency: Frequency.MONTHLY,
      createdById: admin.id,
      assignedToId: employee.id,
    },
  });

  const kpi2 = await prisma.kPI.create({
    data: {
      tenantId: tenant.id,
      objectiveId: objective.id,
      title: 'Customer Acquisition',
      description: 'Number of new customers acquired each month',
      unit: 'customers',
      target: 50,
      frequency: Frequency.MONTHLY,
      createdById: admin.id,
      assignedToId: employee.id,
    },
  });

  console.log('Created 2 KPIs');

  await prisma.kPIEntry.create({
    data: {
      tenantId: tenant.id,
      kpiId: kpi1.id,
      userId: employee.id,
      month: '2024-04',
      value: 95000,
      status: KPIEntryStatus.APPROVED,
    },
  });

  await prisma.kPIEntry.create({
    data: {
      tenantId: tenant.id,
      kpiId: kpi1.id,
      userId: employee.id,
      month: '2024-05',
      value: 102000,
      status: KPIEntryStatus.APPROVED,
    },
  });

  await prisma.kPIEntry.create({
    data: {
      tenantId: tenant.id,
      kpiId: kpi2.id,
      userId: employee.id,
      month: '2024-04',
      value: 48,
      status: KPIEntryStatus.PENDING,
    },
  });

  console.log('Created 3 KPI entries');

  await prisma.pMSReview.create({
    data: {
      tenantId: tenant.id,
      revieweeId: employee.id,
      reviewerId: manager.id,
      period: '2024-Q1',
      rating: PMSRating.MEETS,
      comments: 'Good performance, meeting expectations',
    },
  });

  console.log('Created PMS review');

  await prisma.pMSRatingScale.createMany({
    data: [
      {
        tenantId: tenant.id,
        rating: PMSRating.EXCEEDS,
        label: 'Exceeds Expectations',
        description: 'Performance significantly exceeds job requirements',
        minScore: 4.0,
        maxScore: 5.0,
      },
      {
        tenantId: tenant.id,
        rating: PMSRating.MEETS,
        label: 'Meets Expectations',
        description: 'Performance meets all job requirements',
        minScore: 3.0,
        maxScore: 3.99,
      },
      {
        tenantId: tenant.id,
        rating: PMSRating.BELOW,
        label: 'Below Expectations',
        description: 'Performance is below job requirements',
        minScore: 2.0,
        maxScore: 2.99,
      },
      {
        tenantId: tenant.id,
        rating: PMSRating.DISAPPOINTING,
        label: 'Disappointing',
        description: 'Performance is significantly below expectations',
        minScore: 1.0,
        maxScore: 1.99,
      },
    ],
  });

  console.log('Created rating scale');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
