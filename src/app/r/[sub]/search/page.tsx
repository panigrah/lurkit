'use client';
import {
  useInfiniteQuery
} from '@tanstack/react-query'
import { FeedItemListingType } from '@/types';
import { Helmet } from "react-helmet";
import { Spinner } from '@/components/Spinner';
import { MediaViewer } from '@/components/MediaViewer';
import { ExclamationTriangleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual'
import { usePathname } from "next/navigation";
import { useAtom } from 'jotai';
import { ChevronUpDownIcon, ChevronUpIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid';
import { FeedItem } from '@/app/FeedItem';
import { Listbox, Transition } from '@headlessui/react'

type OptionType = {
  name: string;
  key: string;
}

const sortOptions = [
  { name: 'relevance', key: 'relevance' },
  { name: 'top', key: 'top' },
  { name: 'new', key: 'new' },
  { name: 'comments', key: 'comments' },
]

const durationOptions = [
  { name: 'all time', key: 'all' },
  { name: 'past hour', key: 'hour' },
  { name: '24 hours', key: 'day' },
  { name: 'past week', key: 'week' },
  { name: 'past year', key: 'year' },
]

function DropDown<T extends OptionType>({ value, onChange, options }: { value: T, onChange: (value: T) => void, options: T[] }) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative z-10">
        <Listbox.Button className="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{value.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="bg-slate-50 dark:bg-slate-700 absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Listbox.Option
                key={option.key}
                value={option}
                className='relative cursor-default select-none px-2 py-1 text-sm'
              >
                <span
                  className={`block truncate`}>
                  {option.name}
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default function Search({ params }: { params: { sub: string } }) {
  const sub = params.sub
  const [searchText, setSearchText] = useState('')
  const [keywords, setKeyword] = useState('')
  const [selectedSort, setSelectedSort] = useState(sortOptions[0])
  const [selectedDuration, setSelectedDuration] = useState(durationOptions[0])
  const sort = selectedSort.key
  const time = selectedDuration.key

  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<FeedItemListingType>({
    queryKey: [sub, 'search', keywords, sort, time],
    staleTime: 100000,
    queryFn: async ({ pageParam = '' }) => {
      const result = await fetch(`https://old.reddit.com/r/${sub}/search.json?q=${keywords}&sort=${sort}&t=${time}&after=${pageParam}&restrict_sr=on`)
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
    initialOffset: 0,
    onChange: (instance) => {
      //setScrollPos(instance.scrollOffset)
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
        <div>Unable to search posts ({(error as any).message})</div>
        <div className='text-sm font-light'>Search error</div>
      </div>
    </div>
  }

  return (
    <>
      <Helmet>
        <title>
          {sub} search results - {keywords}
        </title>
      </Helmet>
      <button
        onClick={() => {
          //setScrollPos(0)
          rowVirtualizer.scrollToOffset(0)
        }}
        className='fixed z-[90] bottom-10 right-8 bg-indigo-600 text-white flex drop-shadow-lg rounded-full w-10 h-10 justify-center items-center'>
        <ChevronUpIcon className='w-5 h-5' />
      </button>
      <div className='flex flex-col divide-y divide-slate-200 dark:divide-slate-800 flex-auto overflow-hidden'>
        <div
          ref={parentRef}
          className='h-full w-full overflow-auto flex flex-col p-1 sm:p-4 scroll-container'
        >
          <form onSubmit={(e) => { e.preventDefault(); setKeyword(searchText) }}>
            <div className='flex ring-1 dark:ring-slate-700 rounded-md overflow-hidden ring-slate-300'>
              <input className='w-full border-none outline-none px-4 py-2' onChange={e => setSearchText(e.target.value)} />
              <button className='px-2'>
                <MagnifyingGlassCircleIcon className='w-5 h-5' />
              </button>
            </div>
          </form>
          <div className='flex-none flex justify-between w-full border-b dark:border-slate-700 py-2'>
            <div className='text-xl font-semibold'>{sub} search results - {keywords}</div>
            <div className='text-sm flex items-center'>
              <div className='flex items-center'>
                <span className='text-slate-500'>sorted by:</span>
                <DropDown value={selectedSort} onChange={setSelectedSort} options={sortOptions} />
              </div>
              <div className='flex items-center'>
              <span className='text-slate-500'>links from:</span>
              <DropDown value={selectedDuration} onChange={setSelectedDuration} options={durationOptions} /></div>
            </div>
          </div>
          { !keywords?
            <div className='flex flex-auto items-center justify-center'>
              <div className='text-center'>
                <MagnifyingGlassIcon className='w-12 h-12 mx-auto text-slate-500' />
                <h3 className='font-semibold text-sm mt-2'>Nothing Found</h3>
                <p className='text-slate-500 text-sm mt-1'>Enter keywords to search for</p>
             </div>
            </div>
          :
          isLoading? 
          <div className='flex flex-auto items-center justify-center'>
          <div className='text-center'>
            <div className='w-12 h-12 mx-auto text-slate-500'>
              <Spinner />
            </div>
            <h3 className='font-semibold text-sm mt-2'>Searching..</h3>
            <p className='text-slate-500 text-sm mt-1'>Please wait</p>
         </div>
        </div>
          :
           (isEmpty) ? 
           <div className='flex flex-auto items-center justify-center'>
           <div className='text-center'>
             <ExclamationTriangleIcon className='w-12 h-12 mx-auto text-slate-500' />
             <h3 className='font-semibold text-sm mt-2'>Nothing Found</h3>
             <p className='text-slate-500 text-sm mt-1'>Change search terms and retry</p>
          </div>
         </div>
          : 
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
        }
        </div>
      </div>
      <MediaViewer />
    </>
  )
}