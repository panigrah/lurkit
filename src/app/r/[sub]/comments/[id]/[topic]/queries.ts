import { BookMarkType, PostCommentsListingType } from "@/types";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useQueryPost = (topic: string, sub: string, id: string) => useInfiniteQuery<PostCommentsListingType>({
  queryKey: [topic, sub, id],
  queryFn: ({pageParam = ''}) => fetch(`https://old.reddit.com/r/${sub}/comments/${id}/${topic}.json?after=${pageParam}`).then(res => res.json()),
  getNextPageParam: (lastPage, pages) => true,
  retry: false
})
