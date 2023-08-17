'use client';
import { FeedItem, FeedItemSkeleton } from '@/app/FeedItem';
import { PostCommentsListingType } from '@/types';
import {
  useInfiniteQuery
} from '@tanstack/react-query'
import { CommentThread } from './CommentThread';
import { Helmet } from 'react-helmet';
import { MediaViewer } from '@/components/MediaViewer';

function CommentSkeleton() {
  return(
    <div className='w-full animate-pulse flex-auto p-1 sm:p-8'>
      <FeedItemSkeleton />
    </div>
  )
}
//https://old.reddit.com/r/${permalink}.json?after=${page}`)
export default function CommentsPage({ params: { sub, id, topic } }: { params: { sub: string, id: string, topic: string }}) {
  const { isLoading, error, data, fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
   } = useInfiniteQuery<PostCommentsListingType>({
    queryKey: [topic],
    queryFn: ({pageParam = ''}) => {
      return fetch(`https://old.reddit.com/r/${sub}/comments/${id}/${topic}.json?after=${pageParam}`).then(
        (res) => res.json(),
      )
    },
    getNextPageParam: (lastPage, pages) => true,
  })

  const post = data?.pages?.[0]?.[0].data.children[0]
  const items = data?.pages.length ? data.pages.map( page => page[1].data.children ).flat() : []
  const isBusy = isLoading || isFetchingNextPage || isFetching
  const isEmpty = items.length === 0 && !isBusy

  if (error) return 'An error has occurred: ' + (error as any).message
  if(isLoading) {
    return(<CommentSkeleton />)
  }
  if(!post) {
    return(
      'Unable to load post'
    )
  }
  return(
    <>
    <Helmet>
      <title>
        {post?.data.title ?? topic }
      </title>
    </Helmet>
    <div className="divide-y divide-zinc-200 dark:divide-zinc-800 flex flex-auto flex-col overflow-scroll sm:p-8 p-1">
      <div className='flex-none'>
        {post?.data && <FeedItem item={post} expand={true} /> }
      </div>
      <div className='flex flex-col gap-4 flex-auto'>
        <CommentThread sub={post.data.subreddit} link={post.data.name} items={items} depth={0} />
      </div>
    </div>
    <MediaViewer />
    </>
  )
}


