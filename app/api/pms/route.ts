import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth';
import { getTenantIdFromSession } from '@/lib/tenant';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const pmsReviewSchema = z.object({
  revieweeId: z.string(),
  period: z.string(),
  rating: z.enum(['EXCEEDS', 'MEETS', 'BELOW', 'DISAPPOINTING']),
  comments: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tenantId = await getTenantIdFromSession();
    const userId = (session.user as any).id;
    const role = (session.user as any).role;

    const where: any = { tenantId };

    if (role === 'EMPLOYEE') {
      where.OR = [
        { revieweeId: userId },
        { reviewerId: userId },
      ];
    }

    const reviews = await prisma.pMSReview.findMany({
      where,
      include: {
        reviewee: {
          select: { id: true, name: true, email: true, role: true },
        },
        reviewer: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error fetching PMS reviews:', error);
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
    const tenantId = await getTenantIdFromSession();
    const role = (session.user as any).role;

    if (!['ADMIN', 'MANAGER', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = pmsReviewSchema.parse(body);

    const reviewee = await prisma.user.findUnique({
      where: { id: validatedData.revieweeId },
    });

    if (!reviewee || reviewee.tenantId !== tenantId) {
      return NextResponse.json({ error: 'Reviewee not found' }, { status: 404 });
    }

    const review = await prisma.pMSReview.create({
      data: {
        ...validatedData,
        tenantId,
        reviewerId: userId,
      },
      include: {
        reviewee: {
          select: { id: true, name: true, email: true },
        },
        reviewer: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating PMS review:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
