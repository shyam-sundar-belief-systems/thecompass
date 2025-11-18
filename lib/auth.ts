import bcrypt from 'bcryptjs';
import { getServerSession as nextAuthGetServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function getServerSession() {
  return nextAuthGetServerSession(authOptions);
}

export async function requireRole(allowedRoles: string[]) {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect('/login');
  }

  const userRole = (session.user as any).role;
  if (!allowedRoles.includes(userRole)) {
    redirect('/unauthorized');
  }

  return session;
}

export async function requireAuth() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect('/login');
  }

  return session;
}
