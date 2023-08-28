'use client';
import {
  useInfiniteQuery
} from '@tanstack/react-query'
import Post from './post';
import { FeedItemListingType } from '@/types';
import { useMutateSubscriptions, useQuerySubscriptions } from "@/app/s/queries";
import { MediaViewer } from '@/components/MediaViewer';
import { useSession } from 'next-auth/react';
import { ExclamationTriangleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';
import { observeElementOffset, useVirtualizer } from '@tanstack/react-virtual'
import { useAtom } from 'jotai';
import { activeCommunityAtom, scrollPositionAtom } from '@/app/atoms';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Spinner } from '@/components/Spinner';
import { FeedSkeleton } from './feed-skeleton';
import { useQueryFeed } from './queries';

function SubscriptionControl({ item, enabled }: { item?: string | string[], enabled: boolean }) {
  const subscriptions = useQuerySubscriptions()
  const mutation = useMutateSubscriptions()

  const toggleSubcription = (sub: string, status: boolean) => {
    mutation.mutate({ sub, status })
  }

  if( enabled && typeof item === 'string' ) {
    const subIndex = (subscriptions.data ?? []).findIndex(s => s.sub === item)
    const subscribed = subIndex >= 0
    return (<button
              disabled={mutation.isLoading}
              className='rounded-md px-2 py-1 disabled:text-gray-300 dark:disabled:text-gray-700 ring-1 ring-gray-300 dark:ring-gray-700 flex gap-1 items-center'
              onClick={() => toggleSubcription(item, !subscribed)}
            >
              {mutation.isLoading && <div className='w-5 h-5'><Spinner /></div>}
              {subscribed ? 'Leave' : 'Join'}
          </button>
        )
  } else {
    return null
  }
}

export default function Feed({ topic = 'popular', title, subreddit = true }: { topic?: string | string[], title?: string, subreddit?: boolean }) {
  const url = typeof topic === 'string' ? topic : topic.join('+')
  const [scrollPos, setScrollPos] = useAtom(scrollPositionAtom)
  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useQueryFeed(topic)
  
  const parentRef = useRef<HTMLDivElement>(null)
  const items = data?.pages.length ? data.pages.flatMap(page => page.data.children) : []
  const isBusy = isLoading || isFetchingNextPage || isFetching
  const isEmpty = items.length === 0 && !isBusy
  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? items.length + 1 : items.length,
    getScrollElement: () => parentRef.current ?? null,
    estimateSize: (index: number) => 700, //200 for simple view
    overscan: 5,
    initialOffset: scrollPos,
    /*
    observeElementOffset: (instance, cb) => {
      return observeElementOffset(instance, (offset) => {
        console.log('scrolled to:', offset)
        cb(offset)
    })}, */
    onChange: (instance) => {
      setScrollPos(instance.scrollOffset)
    }
  })
  const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

  useEffect(() => {
    if (!lastItem) {
      return
    }

    if (
      lastItem.index >= items.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [
    hasNextPage,
    fetchNextPage,
    items.length,
    isFetchingNextPage,
    rowVirtualizer,
    lastItem,
  ])


  if (error) {
    return <div className='flex flex-auto items-center'>
      <div className='m-auto text-center'>
        <ExclamationTriangleIcon className='w-8 h-8 stroke-rose-500 mx-auto' />
        <div>Unable to fetch posts ({(error as any).message})</div>
        <div className='text-sm font-light'>you may be trying to access a private subreddit</div>
      </div>
    </div>
  }

  if (isLoading) {
    return <FeedSkeleton />
  }
  return (
    <>
      <button 
        onClick={() => {
          setScrollPos(0)
          rowVirtualizer.scrollToOffset(0)
        }}
        className='fixed z-[90] bottom-16 right-8 bg-indigo-600 text-white flex drop-shadow-lg rounded-full w-10 h-10 justify-center items-center'>
        <ChevronUpIcon className='w-5 h-5' />
      </button>
      <div className='flex flex-auto overflow-hidden'>
        <section
          ref={parentRef}
          className='h-full w-full overflow-auto flex flex-col scroll-container'
        >
          <div
            style={{
              height: rowVirtualizer.getTotalSize(),
              width: '100%',
              position: 'relative',
            }}
          >
            <div
              className='space-y-3'
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${rowVirtualizer.getVirtualItems()[0].start - rowVirtualizer.options.scrollMargin
                  }px)`,
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const isLoaderRow = virtualRow.index > items.length - 1
                const post = items[virtualRow.index]
                return (
                  <div
                    key={virtualRow.index}
                    data-index={virtualRow.index}
                    className=""
                    ref={rowVirtualizer.measureElement}
                    style={{

                    }}
                  >
                    {isLoaderRow
                      ? hasNextPage
                        ?  <div className='w-full text-center my-4 text-sm text-slate-700 dark:text-slate-300'>
                            <div className='ring-indigo-500 ring-1 rounded-full mx-auto px-3 py-2 w-fit'>
                              Loading more...
                            </div>
                          </div>
                        : <div className='w-full text-center my-4 text-sm text-slate-700 dark:text-slate-300'>
                            <div className='ring-indigo-500 ring-1 rounded-full mx-auto px-3 py-2 w-fit'>
                              No more posts
                            </div>
                          </div>
                      : <Post item={post} />
                    }
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}