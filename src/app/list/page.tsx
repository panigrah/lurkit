'use client'

import { useAtom } from "jotai"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import { scrollPositionAtom } from "../atoms"

export default function Page() {
  const items = new Array(200).fill(0).map( (v, i) => i)
  const ref = useRef<HTMLDivElement>(null)
  const [scrollPos, setScrollPos] = useAtom(scrollPositionAtom)

  useEffect(() => {
    console.log('restoring scroll to ', scrollPos)
    ref.current?.scroll(0, scrollPos)
  })

  const saveScroll = () => {
    if(ref.current) {
      const scrollPosition = ref.current.scrollTop;
      console.log(scrollPosition)
      setScrollPos(scrollPosition)
    }
  };

  return(
    <div 
      ref={ref}
      className="flex flex-col divide-y divide-rose-400 flex-auto overflow-auto">
      {items.map( i => {
        return(
        <Link 
          scroll={false}
          onClick={() => saveScroll()}
          href={'/list/' + i} key={i} className="p-8 h-10">Row {i}
        </Link>)
      })}
    </div>
  )
}