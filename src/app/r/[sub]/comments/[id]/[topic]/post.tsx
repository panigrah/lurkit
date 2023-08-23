'use client'

import { Helmet } from "react-helmet"
import Post, { PostSkeleton } from "../../../post"
import { useQueryPost } from "./queries"
import { ExclamationTriangleIcon, InboxIcon } from "@heroicons/react/24/solid"
import { CommentThread } from "./CommentThread"

export default function PostPage({ params: { sub, id, topic } }: { params: { sub: string, id: string, topic: string } }) {
  const { isLoading, error, data, fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useQueryPost(topic, sub, id)

  const post = data?.pages?.[0]?.[0].data.children[0]
  const items = data?.pages.length ? data.pages.map(page => page[1].data.children).flat() : []
  const isBusy = isLoading || isFetchingNextPage || isFetching
  const isEmpty = items.length === 0 && !isBusy

  if (isLoading) {
    return (<PostSkeleton />)
  }

  if (!post) {
    return (
      <div className="overflow-scroll mx-auto flex">
        <div className="m-auto items-center text-center align-middle">
          <ExclamationTriangleIcon className="w-10 h-10 fill-rose-500 mx-auto" />
          <div className="text-rose-500">Unable to load post.</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>
          {post?.data.title ?? topic}
        </title>
      </Helmet>
      <div className='space-y-5 flex-auto flex overflow-hidden'>
        <div className="max-w-[53rem] lg:flex flex-auto flex w-full mx-auto">
          <div className='h-full w-full overflow-auto flex flex-col scroll-container'>
            <div className="flex-auto">
              <Post item={post} expand={true} />
            </div>
            <div className="flex flex-auto max-w-[30rem] mx-auto">
            {items.length === 0 ?
              <div className='items-center h-full flex-auto flex'>
                <div className='m-auto align-middle text-center'>
                  <InboxIcon className='w-10 h-10 mx-auto stroke-slate-400 dark:stroke-slate-600' />
                  <div className='text-slate-400 dark:text-slate-600 font-semibold'>No comments yet</div>
                </div>
              </div>
              :
              <CommentThread sub={post.data.subreddit} link={post.data.name} items={items} depth={0} />
            }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}