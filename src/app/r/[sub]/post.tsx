'use client'
import { FeedDataType, FeedItemType } from "@/types";
import { ArrowUpIcon, ArrowsRightLeftIcon, BookmarkIcon, ChatBubbleLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon, EnvelopeIcon, HeartIcon, LinkIcon, ShareIcon } from "@heroicons/react/24/outline";
import { formatRelative, fromUnixTime } from "date-fns";
import { count } from '@/lib/format';
import { BookMarkControl } from "@/app/bookmarks/BookMarkControl";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import Link from "next/link";
import { decode } from "he";
import { getFeedType } from "@/app/FeedItem";
import { FolderIcon, MagnifyingGlassCircleIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import { previewAtom } from "@/app/atoms";
import { Video } from "@/components/video";


export function PostSkeleton() {
  return (
    <div className="relative card space-y-4 flex-auto w-full">
      {/* Heading */}
      <div className="flex flex-col -m-2">
        <div className='bg-zinc-500 h-6 w-48 flex-none rounded-md' />
        <div className='bg-zinc-500 h-4 w-16 flex-none rounded-md mt-4' />
      </div>
      {/* Posted Image */}
      <div className="flex relative -mx-5 aspect-square overflow-hidden">
        <div className="bg-zinc-200 dark:bg-zinc-700 w-full h-full rounded-md" />
        {/** show video, gallery or image or nothing... depending on whats posted ***/}
      </div>
      {/* Actions */}
      <div className="space-y-2">
        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
        <div className="flex gap-x-4">
          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-4" />
          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-4" />
          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-4" />
        </div>
      </div>
    </div>
  )
}

function PreviewControl({ type, item }: { type: string, item: FeedItemType }) {
  const [, setPreview] = useAtom(previewAtom)
  const onClick = () => {
    if (type !== 'link') {
      setPreview(item.data)
    } else {
      window.open(decode(item.data.url_overridden_by_dest!), "_blank")
    }
  }

  return (
    <div className="absolute h-full w-full z-10 flex items-center bg-white/20 hover:bg-transparent cursor-pointer" onClick={onClick}>
      {type === 'video' ?
        <PlayCircleIcon className="w-8 h-8 rounded-full m-auto" />
        :
        type === 'image' ?
          <MagnifyingGlassCircleIcon className="w-8 h-8 rounded-full m-auto" />
          :
          type === 'link' ?
            <div className="bg-black/30 rounded-full w-8 h-8 m-auto p-1.5">
              <LinkIcon className="rounded-full m-auto" />
            </div>
            :
            type === 'gallery' ?
              <div className="bg-black/30 rounded-full w-8 h-8 m-auto p-1.5">
                <FolderIcon className="rounded-full m-auto" />
              </div>
              : null
      }
    </div>
  )
}

export default function Post({ item, expand = false, index }: { item: FeedItemType, expand?: boolean, index?: number }) {
  let src = item.data.preview?.images?.[0]?.source.url
  const media = item.data?.media

  const type = getFeedType(item)
  //for gallery the preview is in the gallery metadata
  if(type === 'gallery' && !src && item.data.media_metadata) {
    const firstItem = Object.values(item.data.media_metadata)[0]
    src = firstItem.s.u
  }
  return (
    <div className="relative card space-y-4">
      {/* Heading */}
      <div className="flex flex-col -m-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <h2 className=" font-semibold">
              <Link href={`${item.data.permalink}`} scroll={false}>
                {decode(item.data.title)}
              </Link>
            </h2>
          </div>
          { /*<EllipsisHorizontalIcon className="w-5 h-5 cursor-pointer" /> */}
        </div>
        <Link
          href={`/r/${item.data.subreddit}`}
          className="text-zinc-600 dark:text-zinc-400 text-sm"
        >
          /r/{item.data.subreddit}
        </Link>
      </div>
      {/* Posted Image */}
      {src &&
        <div className="flex relative -mx-5 aspect-square overflow-hidden">
          { ((type === 'video' || type === 'rich:video') && media) ?
            <Video item={item.data} />
            :
            <>
              {/** show video, gallery or image or nothing... depending on whats posted ***/}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full bg-cover object-cover aspect-square" src={decode(src)} alt={item.data.title} />
              <PreviewControl item={item} type={type} />
            </>
          }
        </div>
      }
      {(item.data.url_overridden_by_dest && type === 'link') &&
        <div className="flex divide-x border-b -mx-6 pb-2 px-2 dark:border-b-slate-700 dark:divide-slate-700">
          <LinkIcon className="w-4 h-4 flex-none mr-2" />
          <a
            className="flex-auto flex pl-2 min-w-0"
            href={decode(item.data.url_overridden_by_dest)}
            target="_blank"
          >
            <div className="text-sm truncate">{decode(item.data.url_overridden_by_dest)}</div>
            <ChevronRightIcon className="w-5 h-5 flex-none" />
          </a>
        </div>
      }
      {/* Actions */}
      <div className="space-y-2 -mx-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-sm truncate">@{item.data.author}</span>
          <h3 className="text-xs text-gray-500 flex-none truncate">
            {formatRelative(fromUnixTime(item.data.created_utc), Date.now())}
          </h3>
        </div>
        {item.data.selftext && (
          expand ?
            <ReactMarkdown rehypePlugins={[rehypeRaw]} className={'text-zinc-600 dark:text-zinc-400 prose dark:prose-invert max-w-none'}>
              {item.data.selftext}
            </ReactMarkdown>
            :
            <div className=' text-zinc-600 dark:text-zinc-400 line-clamp-4 text-ellipsis'>
              {item.data.selftext}
            </div>
        )}
        <div className="flex gap-x-4">
          <div className="flex flex-row items-center gap-0.5">
            <ArrowUpIcon className='w-4 h-4' />
            {`${count(item.data.ups)}`}
          </div>
          <div className="flex flex-row items-center gap-0.5">
            <ChatBubbleLeftIcon className='w-4 h-4' />
            {`${count(item.data.num_comments)}`}
          </div>
          <div className="flex flex-row items-center gap-0.5">
            <ArrowsRightLeftIcon className='w-4 h-4' />
            {`${count(item.data.num_crossposts)}`}
          </div>
          <BookMarkControl item={item} />
        </div>
      </div>
    </div>
  );
}
