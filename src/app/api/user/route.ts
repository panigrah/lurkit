import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs'

export async function POST(request: Request) {
  const { username, password } = await request.json();
  //does user exist?
  const user = await prisma.user.findFirst({ where: { email: username }})
  if(!user) {
    const result = await prisma.user.create({
      data: {
        email: username,
        password: await hash(password, 12)
      }
    })
    if( result ) {
      return ({ email: username, id: result.id })
    } else {
      return NextResponse.json({ error: 'unknown error'}, { status: 300 })
    }
  } else {
    return NextResponse.json({ error: 'username exists'}, { status: 300 })
  }
}