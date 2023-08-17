'use client';
import { PreviewType } from "@/types";
import { ArrowRightCircleIcon, FolderIcon, MagnifyingGlassCircleIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import he from 'he'
import { PlaceHolderImage } from "@/components/PlaceHolderImage";
import { FolderOpenIcon, LinkIcon } from "@heroicons/react/24/outline";

export function Preview({ item, thumb, type, onClick, url }: { item?: PreviewType; type?: string; thumb?: string; onClick: () => void; url: string }) {
  const thumb_url = thumb || item?.images[0].source.url;
  const has_thumb = !!thumb && thumb.startsWith('http')
  return(
    <div className="relative h-36 w-36 flex-none rounded-md overflow-clip">
      { type === 'video' && 
        <div className="absolute h-full w-full z-10 flex items-center bg-white/20 hover:bg-transparent cursor-pointer" onClick={onClick}>
          <PlayCircleIcon className="w-8 h-8 rounded-full m-auto" />
        </div>
      }
      { type === 'image' && 
        <div className="absolute h-full w-full z-10 flex items-center bg-white/20 hover:bg-transparent cursor-pointer" onClick={onClick}>
          <MagnifyingGlassCircleIcon className="w-8 h-8 rounded-full m-auto" />
        </div>
      }
      {
        type === 'link' && 
        <a href={he.decode(url)} target="_blank">
          <div className="absolute h-full w-full z-10 flex items-center bg-white/20 hover:bg-transparent cursor-pointer">
            <div className="bg-black/30 rounded-full w-8 h-8 m-auto p-1.5">
              <LinkIcon className="rounded-full m-auto" />
            </div>
          </div>
        </a>
      }
      { type === 'gallery' &&
        <div className="absolute h-full w-full z-10 flex items-center bg-white/20 hover:bg-transparent cursor-pointer" onClick={onClick}>
          <div className="bg-black/30 rounded-full w-8 h-8 m-auto p-1.5">
            <FolderIcon className="rounded-full m-auto" />
          </div>
        </div>
      }
      { !has_thumb? 
        <PlaceHolderImage />
        :
        // eslint-disable-next-line @next/next/no-img-element
        <img src={he.decode(thumb_url!)} alt={'thumbnail'} />
      }
    </div>
  )
}
