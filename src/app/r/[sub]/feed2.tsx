'use client';
import { SortOptions, communitySettingsAtom, scrollPositionAtom, sortByAtom } from '@/app/atoms';
import { useMutateSubscriptions, useQuerySubscriptions } from "@/app/s/queries";
import { Spinner } from '@/components/Spinner';
import { ArrowsUpDownIcon, CheckIcon, ClockIcon, ExclamationTriangleIcon, FireIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { useAtom } from 'jotai';
import { Fragment, useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { FeedSkeleton } from './feed-skeleton';
import Post from './post';
import { useQueryFeed } from './queries';
import { Menu, Transition } from '@headlessui/react';

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

function SubscriptionControl({ item, enabled }: { item?: string | string[], enabled: boolean }) {
  const subscriptions = useQuerySubscriptions()
  const mutation = useMutateSubscriptions()

  const toggleSubcription = (sub: string, status: boolean) => {
    mutation.mutate({ sub, status })
  }

  if (enabled && typeof item === 'string') {
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

const sortByOptions: { label: string, icon: JSX.Element, value: SortOptions }[] = [{
  label: 'Hot', icon: <FireIcon className='w-5 h-5 mr-2' />, value: 'hot'
}, {
  label: 'Popular', icon: <StarIcon className='w-5 h-5 mr-2' />, value: 'top'
}, {
  label: 'New', icon: <ClockIcon className='w-5 h-5 mr-2' />, value: 'new'
}]

export default function Feed({ topic = 'popular', title, subreddit = true }: { topic?: string | string[], title?: string, subreddit?: boolean }) {
  const url = typeof topic === 'string' ? topic : topic.join('+')
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [settings, setSettings] = useAtom(communitySettingsAtom)
  const scrollPos = settings[url]?.pos ?? 0
  const ref = useRef<VirtuosoHandle>(null)
  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useQueryFeed(topic, sortBy)

  const parentRef = useRef<HTMLDivElement>(null)
  const items = data?.pages.length ? data.pages.flatMap(page => page.data.children) : []
  const isBusy = isLoading || isFetchingNextPage || isFetching
  const isEmpty = items.length === 0 && !isBusy

  const loadMore = () => {
    if (!isEmpty && hasNextPage && !isFetchingNextPage) {
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
      <div className='fixed z-[90] bottom-16 right-8'>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="bg-indigo-400 text-white flex drop-shadow-lg rounded-full w-10 h-10 justify-center items-center mb-2">
              <ArrowsUpDownIcon
                className='w-5 h-5'
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="-top-2 transform -translate-y-full absolute right-0 w-56 origin-top-right divide-y divide-gray-400 text-slate-50 bg-indigo-400 rounded-md shadow-lg  focus:outline-none">
              {sortByOptions.map(o =>
                <Menu.Item as='div' className={'flex items-center flex-auto px-1 py-1'} key={o.value}>
                  <button
                    onClick={() => setSortBy(o.value)}
                    disabled={o.value === sortBy}
                    className='group flex w-full items-center rounded-md px-2 py-2 text-sm'
                  >
                    {o.icon}
                    {o.label}
                  </button>
                  {o.value === sortBy && <CheckIcon className='w-5 h-5 mr-2' />}
                </Menu.Item>
              )
              }
            </Menu.Items>
          </Transition>
        </Menu>

        <button
          onClick={() => {
            setSettings(prev => ({ ...prev, [url]: { pos: 0 } }))
            ref.current?.scrollToIndex(0)
          }}
          className='bg-indigo-400 text-white flex drop-shadow-lg rounded-full w-10 h-10 justify-center items-center'>
          <ChevronUpIcon className='w-5 h-5' />
        </button>
      </div>
      <div className='flex flex-auto overflow-hidden'>
        <section
          ref={parentRef}
          className='h-full w-full overflow-auto flex flex-col scroll-container'
        >
          <Virtuoso
            ref={ref}
            initialTopMostItemIndex={scrollPos > items.length ? 0 : scrollPos}
            context={{ hasNextPage, isFetching }}
            style={{ height: '100%' }}
            totalCount={items.length}
            components={{ Footer }}
            endReached={loadMore}
            overscan={5}
            rangeChanged={(range) => {
              setSettings(prev => ({ ...prev, [url]: { pos: range.startIndex } }))
            }}
            itemContent={(index, item) => (
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