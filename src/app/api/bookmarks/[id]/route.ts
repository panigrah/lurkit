import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getUser } from '@/lib/user';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUser()
  const id = params.id
  const result = await prisma.posts.delete({ where: { id, ownerId: user?.id }})
  return NextResponse.json({ result })
}