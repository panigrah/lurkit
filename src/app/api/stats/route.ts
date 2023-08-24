import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth"
import { authOptions } from '@/lib/auth';
import { getUser } from '@/lib/user';


export async function GET(request: NextRequest) {
  const pass = request.nextUrl.searchParams.get('p')
  const op = request.nextUrl.searchParams.get('op')
  if( !process.env.ADMIN_SECRET || pass !== process.env.ADMIN_SECRET ) {
    return new NextResponse("Unauthorized", { status: 403 })
  }

  if(op === 'del') {
    const email = request.nextUrl.searchParams.get('email')
    if(!email) {
      return new NextResponse("invalid", { status: 404 })
    }

    //delete subs, bookmarks and user
    const user = await prisma.user.findFirst({ where: { email }})
    if(user) {
      const subs = await prisma.subscriptions.deleteMany({ where: { ownerId: user.id }})
      const bookmarks = await prisma.posts.deleteMany({ where: { ownerId: user.id }})
      const u = await prisma.user.delete( {where: { id: user.id }} )
      return NextResponse.json({ user, subs, bookmarks })
    } else {
      return NextResponse.json({status: "ok"})
    }
  } else if(op === 'get') {
    const email = request.nextUrl.searchParams.get('email')
    if(!email) {
      const subs = await prisma.user.findMany()
      return NextResponse.json(subs)
    } else {
      const user = await prisma.user.findFirst({ where: { email }})
      return NextResponse.json(user)
    }
  } else {
    return NextResponse.json("noop")
  }
}