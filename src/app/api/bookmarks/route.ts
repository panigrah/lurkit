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

  const subs = await prisma.posts.findMany({ 
    where: {
      ownerId: user.id
    }
  })
  return NextResponse.json(subs)
}

export async function POST(request: Request) {
  const { sub, status, permalink, title, selftext } = await request.json();
  const user = await getUser()
  if (!user) {
    return new NextResponse("Unauthorized", { status: 403 })
  }

  const subDoc = await prisma.posts.upsert( { 
    where: { user_permalink_tag: {ownerId: user.id, permalink }}, 
    create: {
      sub,
      ownerId: user.id,
      permalink,
      title,
      selftext
    },
    update: {}
  })
  
  //nothing to do.
  return NextResponse.json(subDoc)
}
