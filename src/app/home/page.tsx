'use client';
import Feed from "@/app/feed";
import { useQuerySubscriptions } from "../s/queries";

export default function Page() {
  const { data, isLoading, error } = useQuerySubscriptions()
  const subs = data && data.length > 0? data.map( s => s.sub ) : 'popular'
  return(
    <Feed topic={subs} title='Home' />
  )
}