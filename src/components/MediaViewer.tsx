'use client';
import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { previewAtom } from '../app/atoms';
import { Fragment, useEffect, useRef, useState } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import { GalleryMetaDataType } from '@/types';
import useEmblaCarousel from 'embla-carousel-react'
import { decode } from 'he';
import Dots from './dots';
import { XCircleIcon } from '@heroicons/react/24/solid';
import 'react-photoswipe/lib/photoswipe.css'
import {PhotoSwipe} from 'react-photoswipe';

const fallbackMediaURL = ''

function ImageViewer({ src, title}: { src?: string, title: string}) {
  if( !src ) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return (<img 
    src={src}
    className='w-full h-auto'
    alt={title}
  />)
}

function VideoViewer({ src }: { src: string, title?: string}) {
  const playerRef = useRef<HTMLVideoElement>(null);
  return(
    <ReactHlsPlayer
      src={src}
      autoPlay={false}
      controls={true}
      width="100%"
      height="auto"
      playerRef={playerRef}
    />
  )
}

function GalleryViewer({ src }: { src?: {[index: string]: GalleryMetaDataType}, title?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    function selectHandler() {
      // selectedScrollSnap gives us the current selected index.
      const index = emblaApi?.selectedScrollSnap();
      setSelectedIndex(index || 0);
    }

    emblaApi?.on("select", selectHandler);
    // cleanup
    return () => {
      emblaApi?.off("select", selectHandler);
    };
  }, [emblaApi]);

  if(!src) return null;
  const length = Object.values(src).length

  return (
    <>
    <div className="overflow-hidden flex-auto" ref={emblaRef}>
      <div className="flex">
      {Object.values(src).map((item, i) => {
          return (
            // 👇 style each individual slide.
            // relative - needed since we use the fill prop from next/image component
            // h-64 - arbitrary height
            // flex[0_0_100%]
            //   - shorthand for flex-grow:0; flex-shrink:0; flex-basis:100%
            //   - we want this slide to not be able to grow or shrink and take up 100% width of the viewport.
            <div className="relative h-auto flex-[0_0_100%] flex" key={i}>
              {/* use object-cover + fill since we don't know the height and width of the parent */}
              <div className='bg-slate-100 rounded-md mt-2 dark:bg-slate-900 flex-auto'>
                 <img src={decode(item.s.u)} className='object-contain h-full w-full'/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <Dots itemsLength={length} selectedIndex={selectedIndex} />
    </>
  )
}


export function MediaViewer() {
  const [preview, setPreview] = useAtom(previewAtom);
  const media_url = (preview?.post_hint === 'hosted:video') ? 
        preview?.media?.reddit_video?.hls_url
        : (preview?.post_hint === 'image'? preview.url: undefined)
  
  const type = (preview?.post_hint? preview.post_hint : (preview?.gallery_data? 'gallery' : 'unknown')) as string
  const isOpen = preview !== null && (type === 'hosted:video' || type === 'image' || type === 'gallery')
  
  if((type === 'gallery' && preview) || (type === 'image' && media_url)) {
    let items:any = []
    if( type === 'gallery') {
      const g = preview?.media_metadata || {}
      items = Object.values(g).map( g => ({
        src: decode(g.s.u),
        w: g.s.x,
        h: g.s.y,
        title: g.m
      }))
    } else {
      const src = preview?.preview?.images?.[0].source.url ?? fallbackMediaURL
      items = [{
        src: decode(src),
        w: preview?.preview?.images?.[0].source.width || 400,
        h: preview?.preview?.images?.[0].source.height || 600,
        title: preview?.title || 'no title',
      }]
    }
    return ( <PhotoSwipe isOpen={isOpen} items={items} options={{}} onClose={() => setPreview(null)}/> )
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={() => setPreview(null)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full md:max-w-md md:h-full transform overflow-hidden rounded-md bg-white dark:bg-slate-800 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 truncate flex justify-between p-4 bg-slate-100 dark:bg-slate-900"
                >
                  <div className='truncate'>{preview?.title}</div>
                  <button
                    type="button"
                    className="flex-none"
                    onClick={() => setPreview(null)}
                  >
                    <XCircleIcon className='w-6 h-6' />
                  </button>
                </Dialog.Title>
                <div className='p-4'>
                    { type === 'image' && 
                      <ImageViewer src={media_url} title={preview?.title || 'unknown'} />
                    }
                    { type === 'hosted:video' && 
                      <VideoViewer src={media_url || fallbackMediaURL} title={preview?.title || 'unknown'} />
                    }
                    { type === 'gallery' && 
                      <GalleryViewer src={preview?.media_metadata} title={preview?.title || 'unknown'} />
                    }
                    </div>
                {/*
                <div className="mt-4">

                </div>
                */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
