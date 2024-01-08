import { SortOptions } from "@/app/atoms";
import {
  BookMarkType,
  FeedItemListingType,
  PostCommentsListingType,
} from "@/types";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export type UserFeedListing = {
  kind: string;
  data: {
    subreddit: string;
    title: string;
    body_html: string;
    body: string;
    link_title: string;
    ups: number;
    author: string;
    permalink: string;
    id: string;
    created: number;
    link_author: string;
    created_utc: number;
  };
};

export type UserFeedListingType = {
  kind: string;
  data: {
    after: string;
    dist: number;
    children: UserFeedListing[];
  };
};

export const useUserFeed = (user: string, sortBy = "hot" as SortOptions) =>
  useInfiniteQuery<UserFeedListingType>({
    queryKey: [user, sortBy],
    queryFn: async ({ pageParam = "" }) => {
      const url = user;
      //const sorted_url = sortBy !== "hot" ? `${url}/${sortBy}` : url;
      const result = await fetch(
        `https://old.reddit.com/u/${url}.json?&after=${pageParam}`
        //`/api/u/${url}?after=${pageParam}&count=25`
      ).then((res) => res.json());
      if (result && "error" in result) {
        throw result;
      }
      return result;
    },
    getNextPageParam: (lastPage, pages) => lastPage.data.after,
    staleTime: 100000,
    retry: false,
  });
