import { BookMarkType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useQueryBookmarks = (enabled = true) => useQuery<BookMarkType[]>({
  queryKey: ['bookmarks'],
  queryFn: () => fetch('/api/bookmarks').then( res => res.json()),
  staleTime: Infinity,
  retry: false,
  enabled
})

export const useMutateBookmarks = () => { 
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['bookmarks'],
    mutationFn: async (payload: {sub: String, permalink: string, title: string, selftext?: string}) => {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      if( res.ok ) {
        return await res.json()
      } else {
        throw ({message: 'cannot save bookmark' })
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['bookmarks'], (marks) => [...(marks as BookMarkType[]), data])
    }
  })
}

export const useDeleteBookmarks = () => { 
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['bookmarks'],
    mutationFn: async (payload: {id: String}) => {
      const res = await fetch(`/api/bookmarks/${payload.id}`, {
        method: 'DELETE',
      })
      if( res.ok ) {
        return await res.json()
      } else {
        throw ({message: 'cannot delete bookmark' })
      }
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['bookmarks'], (marks) => (marks as BookMarkType[]).filter( m => m.id !== variables.id))
    }
  })
}