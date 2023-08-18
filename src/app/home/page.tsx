'use client';
import Feed from "@/app/feed";
import { useQuerySubscriptions } from "../s/queries";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { activeCommunityAtom } from "../atoms";

export default function Page() {
  const { data, isLoading, error } = useQuerySubscriptions()
  const [, setActiveCommunity] = useAtom(activeCommunityAtom)
  const subs = data && data.length > 0? data.map( s => s.sub ) : ['popular']

  useEffect(() => {
    setActiveCommunity({ path: '/home' , sub: 'home', id: 'home' })
  })

  return(
    <>
      <Helmet>
        <title>
          Home
        </title>
      </Helmet>
      <Feed topic={subs} subreddit={false} title='Home' />
    </>
  )
}