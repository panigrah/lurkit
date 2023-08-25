'use client';
import { useQuerySubscriptions } from "../s/queries";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { activeCommunityAtom } from "../atoms";
import Feed from "../r/[sub]/feed";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Subscriptions from "../r/[sub]/subs";

export default function Page() {
  const { status } = useSession()
  const router = useRouter()
  const { data, isLoading, error } = useQuerySubscriptions(status === 'authenticated')
  const [, setActiveCommunity] = useAtom(activeCommunityAtom)
  const subs = data && data.length > 0 ? data.map(s => s.sub) : ['popular']

  useEffect(() => {
    setActiveCommunity({ path: '/home', sub: 'home', id: 'home' })
  }, [setActiveCommunity])

  if (status === 'unauthenticated') {
    router.replace('/r/popular')
  }

  return (
    <>
      <Helmet>
        <title>
          Home
        </title>
      </Helmet>
      <div className='space-y-5 flex-auto flex'>
        <div className="max-w-[53rem] lg:flex flex-auto flex w-full mx-auto">
          <div className="space-y-3 lg:mx-0  flex-auto flex flex-col">
            <Subscriptions active={'home'} />
            <Feed topic={subs} subreddit={false} title='Home' />
          </div>
        </div>
      </div>
    </>
  )
}