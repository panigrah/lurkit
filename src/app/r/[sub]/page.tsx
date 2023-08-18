'use client'
import { activeCommunityAtom, scrollPositionAtom } from "@/app/atoms";
import Feed from "@/app/feed";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

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
      <Feed topic={topic} />
    </>
  )
}