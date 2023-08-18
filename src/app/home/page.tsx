'use client';
import Feed from "@/app/feed";
import { useQuerySubscriptions } from "../s/queries";
import { Helmet } from "react-helmet";

export default function Page() {
  const { data, isLoading, error } = useQuerySubscriptions()
  const subs = data && data.length > 0? data.map( s => s.sub ) : 'popular'

  return(
    <>
      <Helmet>
        <title>
          {subs === 'popular'? 'Front page' : 'Home'}
        </title>
      </Helmet>
      <Feed topic={subs} subreddit={false} />
    </>
  )
}