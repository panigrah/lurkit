'use client'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react';
import { useQuerySubscriptions } from './s/queries'
import { BackspaceIcon, BackwardIcon, ChevronDownIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation';
import { SubscriptionType } from '@/types';
import { useAtom } from 'jotai';
import { activeCommunityAtom } from './atoms';
import Link from 'next/link';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const defaultCommunities = [
  { sub: 'popular', id: 'popular' },
]

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter()
  const [visible, setVisible] = useState(true)
  const { data, isLoading, error } = useQuerySubscriptions(status === 'authenticated')
  const [activeCommunity, setActiveCommunity] = useAtom(activeCommunityAtom)
  const communities = data ? [{ sub: 'home', path: '/home' }, ...defaultCommunities, ...data] : [...defaultCommunities];

  if (activeCommunity && !communities.find(c => c.sub == activeCommunity.sub)) {
    communities.push(activeCommunity)
  }

  const setCommunity = (community: SubscriptionType) => {
    setActiveCommunity(community)
    router.push(community.path ? community.path : '/r/' + community.sub)
  }

  return (
    <nav className={"bg-gray-800 flex-none sticky left-0 w-full z-20 " + (visible ? 'top-0' : '-top-16')}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex items-center">
        <button onClick={() => router.back()}>
          <ChevronLeftIcon className='w-8 h-8 stroke-slate-400 fill-slate-400' />
        </button>

        <Listbox value={activeCommunity} onChange={setCommunity}>
          <div className="relative mt-1 mx-auto flex w-80">
            <Listbox.Button className="relative mx-auto flex cursor-default rounded-lg py-2 pl-3 text-center text-slate-400 shadow-md focus:outline-none font-bold gap-x-2">
              <span className="block truncate">{activeCommunity?.sub}</span>
              <span className="pointer-events-none inset-y-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {communities.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {person.sub}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        {activeCommunity?.sub && 
          <Link href={`/r/${activeCommunity?.sub}/search`}>
            <MagnifyingGlassIcon className='w-8 h-8 stroke-slate-400' />
          </Link>
        }
      </div>
    </nav>
  )
}
