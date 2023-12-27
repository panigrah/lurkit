'use client'

import { FormEvent, useState } from "react"
import { useDeleteBookmarks, useMutateBookmarks, useQueryBookmarks } from "./queries"
import { InboxIcon, TrashIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { Spinner } from "@/components/Spinner"
import ReactMarkdown from "react-markdown"
import { useSession } from "next-auth/react"

export default function Page({ params }: { params: { sub: string } }) {
  const { status } = useSession()
  const [permalink, setPermalink] = useState('')
  const [sub, setSub] = useState('')
  const removeBookmarkMutation = useDeleteBookmarks()
  const { data, isLoading, error } = useQueryBookmarks()

  const removeBookmark = (id: string) => {
    removeBookmarkMutation.mutate({ id }, {
      onSuccess(data) {
        console.log(data)
      }
    })
  }

  return (
    <div className="w-full flex flex-col flex-auto overflow-hidden">
      <div className="p-8">
        <div className="text-xl font-semibold">
          My Bookmarks
        </div>
        <p className="text-sm font-light mt-2">
          These are your bookmarks stored in this app - not the ones you may have saved on reddit.
        </p>
      </div>
      <div className="overflow-auto flex-auto flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800 px-8">
        {(isLoading) &&
          <div className="flex-auto flex h-full">
            <div className="w-8 h-8 m-auto align-middle text-center">
              <Spinner />
            </div>
          </div>
        }
        {(!isLoading && (data?.length || 0) === 0) ?
          <div className='items-center h-full flex-auto flex'>
            <div className='m-auto align-middle text-center'>
              <InboxIcon className='w-10 h-10 mx-auto stroke-slate-400 dark:stroke-slate-600' />
              <div className='text-slate-400 dark:text-slate-600 font-semibold'>
                No bookmarks yet
              </div>
              {status !== 'authenticated' && <div className="mt-2"><Link href="/api/auth/signin" className="font-semibold text-indigo-500">Login</Link> to save bookmarks</div>}
            </div>
          </div>
          :
          data?.map(b => (
            <div className="flex flex-col w-full py-2" key={b.id}>
              <div className="flex flex-row justify-between w-full" key={b.id}>
                <Link className="font-semibold" href={`${b.permalink}`}>{b.title}</Link>
                <button
                  onClick={() => removeBookmark(b.id)}
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
              {b.selftext &&
                <ReactMarkdown className={'text-sm text-zinc-600 dark:text-zinc-400 prose dark:prose-invert max-w-none'}>
                  {b.selftext}
                </ReactMarkdown>
              }
            </div>
          ))}
      </div>
    </div>
  )
}