'use client';
import { FeedItemType } from '@/types';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { sub } from 'date-fns';
import { FormEvent, useState } from 'react';
import { useMutateBookmarks, useDeleteBookmarks, useQueryBookmarks } from './queries';
import { useSession } from 'next-auth/react';
import { Spinner } from '@/components/Spinner';
import { useQueryClient } from '@tanstack/react-query';

export function BookMarkControl({ item }: { item: FeedItemType; }) {
  const queryClient = useQueryClient()
  const { data: session, status } = useSession();
  const mutation = useMutateBookmarks()
  const removeBookmarkMutation = useDeleteBookmarks()
  const bookmarks = useQueryBookmarks(status === 'authenticated')
  
  const addBookmark = () => {
    mutation.mutate({sub: item.data.subreddit, permalink: item.data.permalink, selftext: item.data.selftext, title: item.data.title}, { 
      onSuccess(data) {
      }
    })
  }

  const removeBookmark = (id: string) => {
    removeBookmarkMutation.mutate({id}, { 
      onSuccess(data) {
      }
    })
  }
  
  const isBusy = removeBookmarkMutation.isLoading || mutation.isLoading
  if(status === 'authenticated') {
    const bookmark = bookmarks.data? bookmarks.data.find(b => b.permalink === item.data.permalink) : undefined;
    if (bookmark) {
      return (
        <button onClick={() => removeBookmark(bookmark.id)}>
          {isBusy?
            <div className='w-5 h-5'><Spinner /></div>
          :
            <BookmarkIcon className='w-5 h-5 stroke-indigo-500 fill-indigo-300' />
          }
        </button>
      );
    } else {
      return(
        <button onClick={() => addBookmark()}>
           {isBusy?
              <div className='w-5 h-5'><Spinner /></div>
            :
              <BookmarkIcon className='w-5 h-5' />
          }
        </button>
      )
    }
  } else {
    return null;
  }
}
