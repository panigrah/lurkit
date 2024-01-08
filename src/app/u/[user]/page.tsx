'use client';

import { Helmet } from "react-helmet";
import { UserFeedListing, useUserFeed } from "./queries";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkGiphy from "@/app/r/[sub]/comments/[id]/[...topic]/remark-giphy";
import Link from "next/link";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { useRef } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { count } from "@/lib/format";
import { formatRelative, fromUnixTime } from "date-fns";



function Post({ item }: { item: UserFeedListing }) {
  const post = item.data
  const author = post.link_author || post.author
  return (
    <>
      <h2 className=" font-semibold">
        <Link href={post.permalink}>{post.link_title || post.title}</Link>
      </h2>
      <div className='flex flex-row text-sm text-slate-500 justify-between'>
        <div className='flex gap-x-2'>
          <div
            className={'flex-shrink ' + (post.author == author ? ' text-indigo-500 font-semibold' : '')}
          >
            {author.startsWith("[") ?
              author
              :
              <Link href={`/u/${author}`}>{author}</Link>
            }
          </div>
          <div className='flex flex-0 items-center space-x-0.5'>
            <ArrowUpIcon className='w-4 h-4' />
            <span>{count(post.ups)}</span>
          </div>
        </div>
        <div className='flex'>
          {formatRelative(fromUnixTime(post.created), Date.now())}
        </div>
      </div>
      <ReactMarkdown
        urlTransform={(url, key, node) => {
          let retURL = url
          if (url.startsWith('https://www.reddit.com/r/')) {
            retURL = url.replace('https://www.reddit.com/r/', 'https://lurkit.vercel.app/r/')
          }
          //replace all the &amp;s with &s
          retURL = retURL.replace(/&amp;/g, '&')
          return (retURL)
        }}
        remarkPlugins={[remarkGiphy, remarkGfm]}
        className='mt-0.5 text-base prose dark:prose-invert max-w-none break-words hyphens-auto word-break-break-word'
      >
        {post.body}
      </ReactMarkdown>
    </>
  )
}

function FeedSkeleton() {
  return (
    <>Loading</>
  )
}


function Footer({ context = {} }: { context?: { hasNextPage?: boolean, isFetching?: boolean } }) {
  const { hasNextPage, isFetching } = context;
  return (
    hasNextPage
      ? <div className='w-full text-center my-4 text-sm text-slate-700 dark:text-slate-300'>
        <div className='ring-indigo-500 ring-1 rounded-full mx-auto px-3 py-2 w-fit'>
          Loading more...
        </div>
      </div>
      : <div className='w-full text-center my-4 text-sm text-slate-700 dark:text-slate-300'>
        <div className='ring-indigo-500 ring-1 rounded-full mx-auto px-3 py-2 w-fit'>
          No more posts
        </div>
      </div>
  )
}

export default function Page({ params }: { params: { user: string } }) {
  const { user } = params;
  const ref = useRef<VirtuosoHandle>(null)
  const parentRef = useRef<HTMLDivElement>(null)

  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useUserFeed(user)

  const items = data?.pages.length ? data.pages.flatMap(page => page.data.children) : []
  const isBusy = isLoading || isFetchingNextPage || isFetching
  const isEmpty = items.length === 0 && !isBusy

  const loadMore = () => {
    if (!isEmpty && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  if (isLoading) {
    return <FeedSkeleton />
  }

  return (
    <>
      <Helmet>
        <title>
          {user}
        </title>
      </Helmet>
      <div className='space-y-5 flex-auto flex'>
        <div className="max-w-[53rem] lg:flex flex-auto flex w-full mx-auto">
          <div className='flex flex-auto flex-col overflow-hidden'>
            <div className="text-lg font-bold px-2 py-2">
              /u/{user}
            </div>
            <section
              ref={parentRef}
              className='h-full w-full overflow-auto flex flex-col scroll-container'
            >
              <Virtuoso
                ref={ref}
                context={{ hasNextPage, isFetching }}
                style={{ height: '100%' }}
                totalCount={items.length}
                components={{ Footer }}
                endReached={loadMore}
                overscan={5}
                itemContent={(index, item) => (
                  <div className='border-b border-slate-100 dark:border-slate-800'>
                    <div className="py-3 px-2">
                      <Post item={items[index]} />
                    </div>
                  </div>
                )}
              />
            </section>
          </div>
        </div>
      </div>

    </>)
}
