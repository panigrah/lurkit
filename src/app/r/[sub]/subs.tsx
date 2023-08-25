'use client'
import { useQuerySubscriptions } from "@/app/s/queries";
import { SubscriptionType } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import defaultSubreddits from "@/app/default-subs";

function Subreddit({item, active=false}: {item: SubscriptionType, active?: boolean}) {

  return(
    <div className="flex flex-col justify-between items-center gap-2 cursor-pointer">
      {/*
      <div className={"rounded-full w-16 h-16 ring-1 ring-slate-300 dark:ring-slate-700"}>
        <div className={"rounded-full w-16 h-16 text-center p-2" + (active? ' ring-4 ring-indigo-600': '')}>
          {// eslint-disable-next-line @next/next/no-img-element 
          }
          <img className="w-15 h-15 m-auto" src={image} alt={image} />
        </div>
      </div>
     */}
      <span className={"text-xs " + (active? ' border-b-2 border-indigo-600': '')}>
        <Link href={item.path || `/r/${item.sub}`}>
          {item.sub}
        </Link>
      </span>
    </div>
  )
}

export default function Subscriptions({active}: {active: string}) {
  const { status } = useSession()
  const { data, isLoading, error } = useQuerySubscriptions(status === 'authenticated')
  let subs = defaultSubreddits
  if(status === 'authenticated') {
    subs = [{ id: 'home', path: '/home', sub: 'home' }, ...(data ?? [])]
  } 

  return(
    <section className="card w-full flex gap-4 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 w-ful flex-none">
      { subs.map(d => <Subreddit item={d} key={d.id} active={active === d.id} />) }
    </section>
  )
}
