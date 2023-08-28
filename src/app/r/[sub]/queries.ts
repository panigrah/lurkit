import { BookMarkType, FeedItemListingType, PostCommentsListingType } from "@/types";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useQueryFeed = (topic: string | string[]) => useInfiniteQuery<FeedItemListingType>({
  queryKey: [topic],
  queryFn: async ({pageParam = ''}) => {
    const url = typeof topic === 'string' ? topic : topic.join('+')
    const result = await fetch(`https://old.reddit.com/r/${url}.json?after=${pageParam}`)
//    const result = await fetch(`/api/feed/${url}?after=${pageParam}`)
      .then((res) => res.json())
    if (result && 'error' in result) {
      throw result
    }
    return result
  },
  getNextPageParam: (lastPage, pages) => lastPage.data.after,
  staleTime: 100000,
  retry: false
})
