import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth"
import { authOptions } from '@/lib/auth';
import { getUser } from '@/lib/user';

export async function GET(request: Request) {
  const user = await getUser()
  if (!user) {
    return new NextResponse("Unauthorized", { status: 403 })
  }

  const subs = await prisma.subscriptions.findMany({ 
    where: {
      ownerId: user.id
    }
  })
  return NextResponse.json(subs)
}

export async function POST(request: Request) {
  const { sub, status } = await request.json();
  const user = await getUser()
  if (!user) {
    return new NextResponse("Unauthorized", { status: 403 })
  }

  if(!status) { //request to remove sub and subdoc exists. sub here will be the id of the sub
    const res = await prisma.subscriptions.deleteMany({ where: { ownerId: user.id, OR: [{ id: sub }, { sub: sub }]}})
    return NextResponse.json(res)
  }

  const subDoc = await prisma.subscriptions.findFirst( { where: { ownerId: user.id, sub }})
  if(status && !subDoc) { //request to add sub and there is no sub..
    const result = await prisma.subscriptions.create({
      data: {
        sub,
        ownerId: user.id,
      }
    })
    return NextResponse.json(result)
  }
  
  //nothing to do.
  return NextResponse.json({sub, status})
}