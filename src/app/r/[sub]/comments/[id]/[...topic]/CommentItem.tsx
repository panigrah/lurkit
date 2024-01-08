'use client';
import { CommentItemType } from '@/types';
import { ArrowDownIcon, ArrowUpIcon, ClockIcon, MinusCircleIcon, PlusCircleIcon, StopIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { CommentThread } from './CommentThread';
import { fromUnixTime, formatRelative } from 'date-fns';
import { ExclamationTriangleIcon, StopCircleIcon } from '@heroicons/react/24/solid';
import { count } from '@/lib/format';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/Spinner';
import ReactMarkdown from 'react-markdown'
import remarkGiphy from './remark-giphy';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

const depthColors = [
  'border-l-slate-400 dark:border-l-slate-600',
  'border-l-rose-500',
  'border-l-blue-500',
  'border-l-green-500',
  'border-l-purple-500',
  'border-l-orange-500'
]

function LoadMore({ item, sub, link }: { item: CommentItemType; sub: string, link: string }) {
  const [expand, setExpand] = useState(false)
  const payload = {
    link_id: link,
    id: item.data.name,
    sort: "confidence",
    limit_children: false,
    r: sub,
    children: `c1:${item.data.children?.map(c => `t1_${c}`).join(',')}`
  }
  //console.log(payload)
  const { data, error, isLoading, isInitialLoading } = useQuery({
    queryKey: ['comments', item.data.parent_id],
    enabled: expand,
    queryFn: async () => {
      console.log('loading more', payload)
      const result = await fetch('https://old.reddi.com/api/morechildren',
        {
          method: 'POST',
          body: JSON.stringify(payload)
        })
      if (result.ok) {
        const data = await result.json()
        return data;
      }
      throw ({ message: 'error loading more.' })
    }
  })
  return (
    <div className='text-gray-500 text-sm flex items-center gap-2'>
      <button onClick={() => setExpand(false)} className='flex items-center gap-x-2'>
        {isInitialLoading ? <div className='w-4 h-4'><Spinner /></div> : <ExclamationTriangleIcon className='w-4 h-4 fill-rose-500 stroke-white' />}
        load more ({item.data.count} comments)
      </button>
    </div>
  )
}

export function CommentItem({ item, sub, link, depth }: { item: CommentItemType; sub: string, link: string, depth: number }) {
  const [collapsed, setCollapse] = useState(false);
  const replyCount = item.data.replies?.data?.children.length ?? 0;
  const colorIndex = depth % depthColors.length

  if (item.kind === 'more') {
    return (
      <div className='flex flex-row flex-none border-b dark:border-b-slate-700 py-2'>
        <div
          className={'flex-none w-1 h-auto align-top flex disabled:text-gray-500 py-1 mr-2 border-l-2 ' + depthColors[colorIndex]}
        />
        <LoadMore sub={sub} link={link} item={item} />
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-row flex-none border-b dark:border-b-slate-700 py-2'>
        <button
          onClick={() => setCollapse(!collapsed)}
          className={'flex-none w-1 h-auto align-top flex disabled:text-gray-500 py-1 mr-2 border-l-2 ' + depthColors[colorIndex]}
        >
        </button>
        <div className='flex flex-col flex-auto'>
          <div className='flex flex-row text-sm text-slate-500 justify-between'>
            <div className='flex gap-x-2'>
              <div
                className={'flex-shrink ' + (item.data.is_submitter ? ' text-indigo-500 font-semibold' : '')}
              >
                {item.data.author.startsWith("[") ?
                  item.data.author
                  :
                  <Link href={`/u/${item.data.author}`}>{item.data.author}</Link>
                }
              </div>
              {item.data.author_flair_text &&
                <div className='flex-shrink'>
                  {item.data.author_flair_text}
                </div>
              }
              <div className='flex flex-0 items-center space-x-0.5'>
                <ArrowUpIcon className='w-4 h-4' />
                <span>{count(item.data.ups)}</span>
              </div>
            </div>
            <div className='flex'>
              <button className='' onClick={() => setCollapse(!collapsed)}>
                {formatRelative(fromUnixTime(item.data.created), Date.now())}
              </button>
            </div>
          </div>
          {!collapsed &&
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
              {item.data.body}
            </ReactMarkdown>
          }
        </div>
      </div>
      {(!collapsed && replyCount > 0) &&
        <div className='ml-2'>
          <CommentThread sub={sub} link={link} items={item.data.replies?.data?.children} depth={depth + 1} />
        </div>
      }

    </>
  );
}

