import { FeedDataType, SubscriptionType } from '@/types'
import { atom, useAtom } from 'jotai'
export const previewAtom = atom<FeedDataType | null>(null)
export const scrollPositionAtom = atom(0)
export const activeCommunityAtom = atom<SubscriptionType | undefined>(undefined)