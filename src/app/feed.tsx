'use client';
import {
  useInfiniteQuery
} from '@tanstack/react-query'
import { FeedItem, FeedItemSkeleton } from './FeedItem';
import { FeedItemListingType } from '@/types';
import { useMutateSubscriptions, useQuerySubscriptions } from './s/queries';
import { MediaViewer } from '@/components/MediaViewer';
import { useSession } from 'next-auth/react';
import { ExclamationTriangleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual'
import { useAtom } from 'jotai';
import { activeCommunityAtom, scrollPositionAtom } from './atoms';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Spinner } from '@/components/Spinner';

export function FeedSkeleton() {
  return (
    <div className='w-full flex-auto p-1 sm:p-4 animate-pulse'>
      <div className='flex flex-row justify-between flex-auto w-full border-b py-2 items-center'>
        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
        <div className='flex items-center'>
          <div className="h-6 bg-gray-200 rounded-md dark:bg-gray-700 w-10"></div>
          <div className="h-5 w-5 bg-gray-200 rounded-full dark:bg-gray-700 ml-2"></div>
        </div>
      </div>
      <FeedItemSkeleton />
      <FeedItemSkeleton />
      <FeedItemSkeleton />
      <FeedItemSkeleton />
      <FeedItemSkeleton />
      <FeedItemSkeleton />
      <FeedItemSkeleton />
      <FeedItemSkeleton />
      <FeedItemSkeleton />
    </div>
  )
}

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
  const { status } = useSession()
  const [, setActiveCommunity] = useAtom(activeCommunityAtom)
  const [scrollPos, setScrollPos] = useAtom(scrollPositionAtom)
  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<FeedItemListingType>({
    queryKey: [topic],
    staleTime: 100000,
    queryFn: async ({ pageParam = '' }) => {
      const result = await fetch(`https://old.reddit.com/r/${url}.json?after=${pageParam}`)
        .then((res) => res.json())
      if (result && 'error' in result) {
        throw result
      }
      return result
    },
    getNextPageParam: (lastPage, pages) => lastPage.data.after,
  })
  const parentRef = useRef<HTMLDivElement>(null)
  const items = data?.pages.length ? data.pages.flatMap(page => page.data.children) : []
  const isBusy = isLoading || isFetchingNextPage || isFetching
  const isEmpty = items.length === 0 && !isBusy
  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? items.length + 1 : items.length,
    getScrollElement: () => parentRef.current ?? null,
    estimateSize: (index: number) => 200,
    overscan: 5,
    initialOffset: scrollPos,
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
      <div className='flex flex-col divide-y divide-slate-200 dark:divide-slate-800 flex-auto overflow-hidden'>
        <div
          ref={parentRef}
          className='h-full w-full overflow-auto flex flex-col p-1 sm:p-4 scroll-container'
        >
          <div className='flex-none flex justify-between w-full border-b dark:border-slate-700 py-2'>
            <div className='text-xl font-semibold'>{title || `/r/${url}`}</div>
            <div className='flex items-center gap-2'>
              <SubscriptionControl item={topic} enabled={status === 'authenticated' && subreddit } />
              <Link href={`/r/${topic}/search`}>
                <MagnifyingGlassIcon className='w-5 h-5' />
              </Link>
            </div>
          </div>
          <div
            style={{
              height: rowVirtualizer.getTotalSize(),
              width: '100%',
              position: 'relative',
            }}
          >
            <div
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
                    className={
                      virtualRow.index % 2 ? 'bg-slate-50 dark:bg-slate-950' : 'bg-slate-100 dark:bg-slate-900'
                    }
                    ref={rowVirtualizer.measureElement}
                    style={{

                    }}
                  >
                    {isLoaderRow
                      ? hasNextPage
                        ? <div className='w-full text-center my-4 text-sm font-bold text-slate-700 dark:text-slate-300'>Loading more...</div>
                        : <div className='w-full text-center my-4 text-sm font-bold text-slate-700 dark:text-slate-300'>Nothing more to load</div>
                      : <FeedItem item={post} />
                    }
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <MediaViewer />
    </>
  )
}