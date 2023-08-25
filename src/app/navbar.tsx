'use client'
import { Fragment, useState } from 'react'
import { Combobox, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react';
import { useQuerySubscriptions } from './s/queries'
import { BackspaceIcon, BackwardIcon, ChevronDownIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation';
import { SubscriptionType } from '@/types';
import { useAtom } from 'jotai';
import { activeCommunityAtom } from './atoms';
import Link from 'next/link';
import defaultSubreddits from './default-subs';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const defaultCommunities = defaultSubreddits

function SelectAndSearchCommunity() {
  const router = useRouter()
  const { data: session, status } = useSession();
  const { data, isLoading, error } = useQuerySubscriptions(status === 'authenticated')
  const communities = data ? [{ sub: 'home', path: '/home' }, ...defaultCommunities, ...data] : [...defaultCommunities];
  const [activeCommunity, setActiveCommunity] = useAtom(activeCommunityAtom)
  const [query, setQuery] = useState('')

  const setCommunity = (community: SubscriptionType) => {
    setActiveCommunity(community)
    const url = community.path ? community.path : `/r/${community.sub}`
    router.push(url)
  }

  if (activeCommunity && !communities.find(c => c.sub == activeCommunity.sub)) {
    communities.push(activeCommunity)
  }

  const filteredCommunities = 
    query === ''
    ? communities
    : communities.filter(c => {
      return c.sub.toLowerCase().includes(query.toLowerCase())
    })

  return(
    <Combobox value={activeCommunity} onChange={setCommunity}>
      <div className="relative mx-auto flex w-80">
        <div className='fixed top-0'>
        <div className="relative w-full cursor-default overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-100 bg-transparent focus:ring-0"
            displayValue={(c:any) => c.sub}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">            
            {query.length > 0 && (
              <Combobox.Option 
                className={'relative cursor-default select-none py-2 pl-10 pr-4'}
                value={{ id: null, sub: query }}>
                <span className='block font-normal'>go to {query}</span>
              </Combobox.Option>
            )}
            {(filteredCommunities.length === 0 && query !== '')? (
              null
              ) : (
                filteredCommunities.map( c => (
                  <Combobox.Option
                    key={c.sub}
                    className={({ active }) => 
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={c}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {c.sub}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
            )}
          </Combobox.Options>
        </Transition>
        </div>
      </div>
    </Combobox>
  )
}

function SelectCommunity() {
  const router = useRouter()
  const { data: session, status } = useSession();
  const { data, isLoading, error } = useQuerySubscriptions(status === 'authenticated')
  const communities = data ? [{ sub: 'home', path: '/home' }, ...defaultCommunities, ...data] : [...defaultCommunities];
  const [activeCommunity, setActiveCommunity] = useAtom(activeCommunityAtom)

  const setCommunity = (community: SubscriptionType) => {
    setActiveCommunity(community)
    router.push(community.path ? community.path : '/r/' + community.sub)
  }

  if (activeCommunity && !communities.find(c => c.sub == activeCommunity.sub)) {
    communities.push(activeCommunity)
  }

  return(
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
  )
}

export default function Navbar() {
  const router = useRouter()
  const [visible, setVisible] = useState(true)
  const [activeCommunity, setActiveCommunity] = useAtom(activeCommunityAtom)
 
  return (
    <nav className={"bg-gray-800 flex flex-none sticky left-0 w-full z-20 h-9 " + (visible ? 'top-0' : '-top-16')}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex items-center">
        <button onClick={() => router.back()}>
          <ChevronLeftIcon className='w-6 h-6 stroke-slate-400 fill-slate-400' />
        </button>
        <SelectAndSearchCommunity />
        {activeCommunity?.sub && 
          <Link href={`/r/${activeCommunity?.sub}/search`}>
            <MagnifyingGlassIcon className='w-6 h-6 stroke-slate-400' />
          </Link>
        }
      </div>
    </nav>
  )
}
