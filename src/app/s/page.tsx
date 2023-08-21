'use client';
import { BookmarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useMutateSubscriptions, useQuerySubscriptions } from "./queries";
import { Spinner } from "@/components/Spinner";
import { useSession } from "next-auth/react";

export default function Page() {
  const [sub, setSub] = useState('')
  const {status} = useSession()
  const mutation = useMutateSubscriptions()
  const { data, isLoading, error } = useQuerySubscriptions()

  const unsubscribe = (id: string) => {
    mutation.mutate({sub: id, status: false})
  }

  const subscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate({sub: sub, status: true}, { 
      onSuccess(data) {
        setSub('')
      }
    })
  }

  return (
    <div className="w-full flex flex-col flex-auto overflow-hidden">
      <div className="p-8">
      <div className="text-xl font-semibold">
        My Communities
      </div>
      <p className="text-sm font-light mt-2">
        These are your communities (subreddits) stored in this app - not the ones you are subscribed to.
      </p>
      <form onSubmit={subscribe} noValidate>
        <div className={"flex flex-row mt-2 ring-1 rounded-md" + (status === 'authenticated'? ' ring-slate-500': ' ring-slate-300 dark:ring-slate-700')}>
            <input 
              value={sub} 
              disabled={mutation.isLoading || isLoading || status !== 'authenticated'}
              onChange={(e) => setSub(e.target.value)} 
              className="w-full p-2 bg-transparent outline-none focus:outline-none placeholder-slate-300 dark:placeholder-slate-700" 
              placeholder="subreddit name"
            />
            <button 
              disabled={mutation.isLoading || isLoading || status !== 'authenticated'}
              type='submit' 
              className="p-2 ring-1 rounded-r-md shadow-md disabled:text-slate-300 disabled:dark:text-slate-700"
            >
              {mutation.isLoading?
                <div className="w-4 h-4 mx-2.5"><Spinner /></div>
                :
                <span>Add</span>
              }
            </button>
        </div>
      </form>
      </div>
      <div className="overflow-auto flex-auto flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800 px-8">
      {(isLoading) && 
        <div className="flex-auto flex h-full">
        <div className="w-8 h-8 m-auto align-middle text-center">
          <Spinner />
        </div>
      </div>
      }
      {(!isLoading && (data?.length || 0) === 0)? 
         <div className='items-center h-full flex-auto flex'>
         <div className='m-auto align-middle text-center'>
           <BookmarkIcon className='w-10 h-10 mx-auto stroke-slate-400 dark:stroke-slate-600' />
           <div className='text-slate-400 dark:text-slate-600 font-semibold'>
              No subreddits yet
           </div>
           {status !== 'authenticated' && <div className="mt-2"><Link href="/api/auth/signin" className="font-semibold text-indigo-500">Login</Link> to view and edit your subreddits</div>}
         </div>
       </div>
       :
        data?.sort((l, r) => l.sub < r.sub? -1: +(l.sub > r.sub)).map( sub => (
        <div className="flex flex-row justify-between w-full py-2" key={sub.id}>
          <Link className="font-semibold" href={`/r/${sub.sub}`}>{sub.sub}</Link>
          <button 
            onClick={() => unsubscribe(sub.id)}
          >
          <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
      </div>
    </div>
  )
}