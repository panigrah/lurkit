'use client'
import { activeCommunityAtom, scrollPositionAtom } from "@/app/atoms";
//import Feed from "@/app/feed";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Feed from './feed'
import Subs from './subs'

export default function Page({ params }: { params: { sub: string }}) {
  const [, setActiveCommunity] = useAtom(activeCommunityAtom)
  const [, setScrollPos] = useAtom(scrollPositionAtom)

  const topic = params.sub
  useEffect(() => {
    setActiveCommunity({ sub: topic, id: topic })
  }, [topic, setActiveCommunity, setScrollPos])

  return(
    <>
      <Helmet>
        <title>
          {topic}
        </title>
      </Helmet>
      <div className='space-y-5 flex-auto flex'>
        <div className="max-w-[53rem] lg:flex flex-auto flex w-full mx-auto">
          <div className="space-y-3 lg:mx-0  flex-auto flex flex-col">
            <Subs active={topic} />
            <Feed topic={topic} />
          </div>
        </div>
    </div>
    </>
  )
}