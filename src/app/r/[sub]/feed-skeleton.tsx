'use client';
import { PostSkeleton } from './post';

export function FeedSkeleton() {
  return (
    <div className='w-full flex-auto p-1 sm:p-4 animate-pulse gap-y-4 flex flex-col'>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  );
}
