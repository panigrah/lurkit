'use client';
import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { previewAtom } from '../app/atoms';
import { Fragment, useRef } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import { decode } from 'he';
import { XCircleIcon } from '@heroicons/react/24/solid';
import 'react-photoswipe/lib/photoswipe.css';
import { PhotoSwipe } from 'react-photoswipe';

const fallbackMediaURL = ''

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
      items = Object.values(g).filter(g => g.status === 'valid').map( g => ({
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
                    { type === 'hosted:video' && 
                      <VideoViewer src={media_url || fallbackMediaURL} title={preview?.title || 'unknown'} />
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
