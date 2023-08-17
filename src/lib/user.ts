import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth"
import { authOptions } from '@/lib/auth';

export const getUser = async () => {
  const session: any = await getServerSession(authOptions)
  if( session && session.user && session.user.email ) {
    const u = await prisma.user.findUnique({ where: { email: session.user.email }})
    return u;
  }
  return undefined
}