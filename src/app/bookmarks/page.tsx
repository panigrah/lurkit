'use client'

import { FormEvent, useState } from "react"
import { useDeleteBookmarks, useMutateBookmarks, useQueryBookmarks } from "./queries"
import { TrashIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { Spinner } from "@/components/Spinner"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

export default function Page({ params }: { params: { sub: string }}) {
  const [permalink, setPermalink] = useState('')
  const [sub, setSub] = useState('')
  const removeBookmarkMutation = useDeleteBookmarks()
  const { data, isLoading, error } = useQueryBookmarks()

  const removeBookmark = (id: string) => {
    removeBookmarkMutation.mutate({id}, { 
      onSuccess(data) {
        console.log(data)
      }
    })
  }

  return(
    <div className="w-full flex flex-col flex-auto overflow-hidden">
      <div className="p-8">
      <div className="text-xl font-semibold">
        My Bookmarks
      </div>
      <p className="text-sm font-light mt-2">
        These are your bookmarks stored in this app - not the ones you may have saved on reddit.
      </p>
        {(isLoading) && 
          <div className="w-8 h-8 m-8 mx-auto"><Spinner /></div>
        }
      </div>
      <div className="overflow-auto flex-auto flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800 px-8">
      {data?.map( b => (
        <div className="flex flex-col w-full py-2" key={b.id}>
          <div className="flex flex-row justify-between w-full" key={b.id}>
            <Link className="font-semibold" href={`${b.permalink}`}>{b.title}</Link>
            <button 
              onClick={() => removeBookmark(b.id)}
            >
              <TrashIcon className="w-5 h-5" />
            </button>          
          </div>
          { b.selftext &&
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