'use client'
import { useSession } from 'next-auth/react'
import { Helmet } from 'react-helmet'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { status } = useSession()
  const router = useRouter()
  if( status === 'authenticated' ) {
    router.replace('/home')
  } else {
    router.replace('/r/popular')
  }
  return (
    <>
    </>
  )
}
