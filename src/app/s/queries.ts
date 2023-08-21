import { SubscriptionType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useQuerySubscriptions = () => useQuery<SubscriptionType[]>({
  queryKey: ['subscriptions'],
  queryFn: () => fetch('/api/subscriptions').then( res => res.json()),
  retry: false
})

export const useMutateSubscriptions = () => { 
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['subscriptions'],
    mutationFn: async (payload: {sub: String, status: boolean}) => {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      if( res.ok ) {
        return await res.json()
      } else {
        throw ({message: 'cannot update subscription' })
      }
    },
    onSettled: async(data, error, variables, context ) => {
      if(!error) {
        if(variables.status) { //added a new one
          queryClient.setQueryData(['subscriptions'], (old) => [...(old as SubscriptionType[]), data])
        } else { //deleted one
          queryClient.setQueryData(['subscriptions'], (old) => ((old as SubscriptionType[]).filter( f => f.id !== variables.sub)))
        }
      }
    }
  })
}