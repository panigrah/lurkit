import { FeedDataType, CommunitySettingsType, SubscriptionType } from '@/types'
import { atom, useAtom } from 'jotai'
import type { PrimitiveAtom } from 'jotai'

export type SortOptions = "new" | "top"

export const previewAtom = atom<FeedDataType | null>(null)
export const scrollPositionAtom = atom(0)
export const activeCommunityAtom = atom<SubscriptionType | undefined>(undefined)
export const communitySettingsAtom = atom<CommunitySettingsType>({})
export const sortByAtom = atom<SortOptions>("top")