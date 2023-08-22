'use client'
import { useQuerySubscriptions } from "@/app/s/queries";
import { SubscriptionType } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";

const defaultSubreddits = [
  {id: 'popular', sub: 'popular' },
  {id: 'politics', sub: 'politics' },
  {id: 'funny', sub: 'funny' },
  {id: 'books', sub: 'books' },
  {id: 'movies', sub: 'movies' },
  {id: 'television', sub: 'television' }
]

function Subreddit({item, active=false}: {item: SubscriptionType, active?: boolean}) {
  const image = 'http://avatars.dicebear.com/api/bottts/stefan.svg';

  return(
    <div className="flex flex-col justify-between items-center gap-2 cursor-pointer">
      <div className={"rounded-full w-16 h-16 ring-1 ring-slate-300 dark:ring-slate-700"}>
        <div className={"rounded-full w-16 h-16 text-center p-2" + (active? ' ring-4 ring-indigo-600': '')}>
          <img className="w-15 h-15 m-auto" src={image} alt={image} />
        </div>
      </div>
      <span className="text-xs">
        <Link href={`/r/${item.sub}`}>
          {item.sub}
        </Link>
      </span>
    </div>
  )
}

export default function Subscriptions({active}: {active: string}) {
  const { data, isLoading, error } = useQuerySubscriptions()
  const { status } = useSession()

  const subs = status !== 'authenticated'? defaultSubreddits: (data ?? [])
  return(
    <section className="card flex gap-4 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 w-ful flex-none">
      { subs.map(d => <Subreddit item={d} key={d.id} active={active === d.id} />) }
    </section>
  )
}
