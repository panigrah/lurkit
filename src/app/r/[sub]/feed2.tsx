'use client';
import { scrollPositionAtom } from '@/app/atoms';
import { useMutateSubscriptions, useQuerySubscriptions } from "@/app/s/queries";
import { Spinner } from '@/components/Spinner';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { FeedSkeleton } from './feed-skeleton';
import Post from './post';
import { useQueryFeed } from './queries';

function Footer({ context = {} }: { context?: { hasNextPage?: boolean, isFetching?: boolean }}) {
  const {hasNextPage, isFetching} = context;
  return (
    hasNextPage
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
  
  const loadMore = () => {
    if(!isEmpty && hasNextPage && !isFetchingNextPage ) {
      fetchNextPage()
    }
  }

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
          //rowVirtualizer.scrollToOffset(0)
        }}
        className='fixed z-[90] bottom-16 right-8 bg-indigo-600 text-white flex drop-shadow-lg rounded-full w-10 h-10 justify-center items-center'>
        <ChevronUpIcon className='w-5 h-5' />
      </button>
      <div className='flex flex-auto overflow-hidden'>
        <section
          ref={parentRef}
          className='h-full w-full overflow-auto flex flex-col scroll-container'
        >
          <Virtuoso 
            initialTopMostItemIndex={scrollPos}
            context={{ hasNextPage, isFetching }}
            style={{ height: '100%' }}
            totalCount={items.length}
            components={{ Footer }}
            endReached={loadMore}
            overscan={5}
            rangeChanged={(range) => setScrollPos(range.startIndex)}
            itemContent={ (index, item) => (
              <div className='pb-3'>
                <Post item={items[index]} index={index} />
              </div>
            )}
          />
          
        </section>
      </div>
    </>
  )
}