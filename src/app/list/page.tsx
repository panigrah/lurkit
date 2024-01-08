'use client'

import { useAtom } from "jotai"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import { communitySettingsAtom, scrollPositionAtom } from "../atoms"
import ReactMarkdown from "react-markdown"
import remarkGiphy from "../r/[sub]/comments/[id]/[...topic]/remark-giphy"
import { decode } from "he"

function Component({ id }: { id: string }) {
  const [settings, setSettings] = useAtom(communitySettingsAtom)
  const scrollPos = settings?.[id]?.pos ?? 0
  console.log('rendering', id)
  return (
    <div className="flex flex-col gap-3 w-64">
      <div>Component [{id}] position at {scrollPos}</div>
      <input className="ring-1" onChange={e => setSettings(prev => ({ ...prev, [id]: { pos: parseInt(e.target.value) } }))} />
    </div>
  )
}

function F() {
  console.log('rendering F')
  return (
    <div>component F</div>
  )
}

function D() {
  const [settings, setSettings] = useAtom(communitySettingsAtom)

  return (
    <div>
      {
        Object.keys(settings).map(k =>
          <div key={k}>[{k}]: {settings[k].pos}</div>
        )
      }
    </div>
  )
}
export default function Page() {
  const id = 'abc'
  const items = new Array(1).fill(0).map((v, i) => i)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-col divide0y divide-rose-400 overflow-auto flex-auto gap-y-4">
      <Component id="a" />
      <Component id="b" />
      <Component id="c" />
      <Component id="d" />
      <F />
      <hr />
      <D />
      <ReactMarkdown className={'text-zinc-600 dark:text-zinc-400 prose dark:prose-invert max-w-none'}>
        {`&gt;this is working or&amp; or not?`}
      </ReactMarkdown>
      <div>
        <div>title</div>
        {`&gt;this is working or&amp; or not?`}
      </div>
    </div>
  )
  /*
  return(
    <div 
      ref={ref}
      className="flex flex-col divide-y divide-rose-400 flex-auto overflow-auto">
        <ReactMarkdown  remarkPlugins={[remarkGiphy]}>
              {`asdasdasdasd asdasdasdasd <b>ok</b> ![gif](giphy|V2AkNZZi9ygbm)`}
        </ReactMarkdown>
      {items.map( i => {
        return(
        <Link 
          scroll={false}
          onClick={() => saveScroll()}
          href={'/list/' + i} key={i} className="p-8 h-10">Row {i}
        </Link>)
      })}
    </div>
  )    */

}