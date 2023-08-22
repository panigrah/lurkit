import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'

//import { useSession } from 'next-auth/react'

export default async function HomePage() {
  const session = await getServerSession()
  if( session?.user ) {
    redirect('/home')
  } else {
    redirect('/r/popular')
  }
}
