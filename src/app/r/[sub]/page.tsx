'use client'
import { activeCommunityAtom } from "@/app/atoms";
import Feed from "@/app/feed";
import { Helmet } from "react-helmet";

export default function Page({ params }: { params: { sub: string }}) {
  return(
    <>
      <Helmet>
        <title>
          {params.sub}
        </title>
      </Helmet>
      <Feed topic={params.sub} />
    </>
  )
}