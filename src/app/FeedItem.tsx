'use client';
import { ArrowDownIcon, ArrowUpIcon, ChatBubbleLeftIcon, ClockIcon, TagIcon } from '@heroicons/react/24/solid';
import { fromUnixTime, formatRelative } from 'date-fns';
import { Preview } from './Preview';
import { FeedItemType } from '@/types';
import Link from 'next/link';
import { previewAtom } from './atoms';
import { useAtom } from 'jotai';
import { count } from '@/lib/format';
import ReactMarkdown from 'react-markdown';
import { BookMarkControl } from './bookmarks/BookMarkControl';
import rehypeRaw from 'rehype-raw'

export function FeedItemSkeleton() {
  return (
    <div className='flex gap-4 py-4 w-full animate-pulse'>
      <div className='bg-zinc-500 h-36 w-36 flex-none rounded-md'>
      </div>
      <div className='flex flex-col gap-2 flex-auto'>
        <div className='text-base text-slate-800 dark:text-slate-200 w-full'>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
        </div>
        <div className='flex gap-2 text-sm text-slate-400 dark:text-slate-600'>
          <div className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        </div>
        <div className='flex gap-2 text-sm text-slate-400 dark:text-slate-600'>
          <div className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        </div>
      </div>
    </div>
  );
}

const feedItemTypes = ['link', 'image', 'video', 'gallery']
export const getFeedType = (item: FeedItemType) => {
  //url_overridden_by_dest
  const category = (!!item.data.media?.reddit_video?.hls_url) ?
    'video'
    : item.data.post_hint || (
      item.data.gallery_data ?
        'gallery'
        : item.data.url_overridden_by_dest ?
          'link'
          : '')
  return category;
}

export function FeedItem({ item, expand = false }: { item: FeedItemType; expand?: boolean }) {
  const [preview, setPreview] = useAtom(previewAtom)
  //is playable media
  const feedType = getFeedType(item)
  const hasPreview = feedItemTypes.includes(feedType)
  return (
    <div className='flex py-4 w-full overflow-hidden'>
      {hasPreview &&
        <Preview
          item={item.data.preview}
          thumb={item.data.thumbnail}
          onClick={() => { setPreview(item.data) }}
          type={feedType}
          url={item.data.url}
        />
      }
      <div className={'flex flex-col flex-auto overflow-hidden gap-y-1 ml-4'}>
        <div className='text-base text-slate-800 dark:text-slate-200 w-full'>
          <Link href={`${item.data.permalink}`} scroll={false}>
            {item.data.title}
          </Link>
        </div>
        <div className='text-sm text-slate-400 dark:text-slate-600 overflow-hidden w-full'>
          <div className='flex gap-2 text-sm text-slate-400 dark:text-slate-600 overflow-hidden w-full'>
            <div className='flex-none'>
              <Link href={`/r/${item.data.subreddit}`} className='font-semibold text-slate-500 dark:text-slate-500'>
                {item.data.subreddit}
              </Link>
            </div>
            <div className='truncate flex-auto text-ellipsis'>/u/{item.data.author}</div>
          </div>
          <div className='flex gap-2 text-sm text-slate-400 dark:text-slate-600 overflow-hidden truncate w-full'>
            <div className='items-center flex gap-0.5'>
              <ArrowUpIcon className='w-4 h-4' />
              <span>
                {count(item.data.ups)}
              </span>
            </div>
            {/*
          <div className='items-center flex gap-0.5'>
            <ArrowDownIcon className='w-4 h-4' />
            <span>
              {count(item.data.downs)}
            </span>
          </div>
          */}
            <div className='items-center flex gap-0.5'>
              <ChatBubbleLeftIcon className='w-4 h-4' />
              <span>
                {count(item.data.num_comments)}
              </span>
            </div>
            <div className='items-center flex gap-0.5 text-sm text-slate-400 dark:text-slate-600'>
              <ClockIcon className='w-4 h-4' />
              <div className='truncate'>
                {formatRelative(fromUnixTime(item.data.created_utc), Date.now())}
              </div>
            </div>
            <div className=''>
              <BookMarkControl item={item} />
            </div>
          </div>
        </div>
        {item.data.selftext && (
          expand ?
            <ReactMarkdown rehypePlugins={[rehypeRaw]} className={'text-sm text-zinc-600 dark:text-zinc-400 prose dark:prose-invert max-w-none'}>
              {item.data.selftext}
            </ReactMarkdown>
            :
            <div className='text-sm text-zinc-600 dark:text-zinc-400 line-clamp-4 text-ellipsis'>
              {item.data.selftext}
            </div>
        )}
      </div>
    </div>
  );
}
