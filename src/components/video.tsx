//import { useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
//import { Dictionary } from "@reduxjs/toolkit";
import { scrollPositionAtom } from "@/app/atoms";
import { FeedDataType } from "@/types";
import { decode } from "he";
import { useAtomValue } from "jotai";
import { useRef } from "react";
import ReactHlsPlayer from "react-hls-player";
import ReactPlayer from "react-player";
import HlsJs from 'hls.js';

/*
const VideoEl = styled.video<{ blur?: boolean }>`
  width: 100%;

  ${({ blur }) =>
    blur &&
    css`
      filter: blur(40px);

      // https://graffino.com/til/CjT2jrcLHP-how-to-fix-filter-blur-performance-issue-in-safari
      transform: translate3d(0, 0, 0);
    `}
`;


interface VideoProps {
  src: string;
  controls?: boolean;

  blur?: boolean;

  className?: string;
}

//  media_metadata?: {[index: string]: GalleryMetaDataType};

const videoPlaybackPlace: {[index: string]: number} = {};

export default function Video({ src, controls, blur, className }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  useIonViewWillLeave(() => {
    savePlace();
  });

  useIonViewWillEnter(() => {
    resume();
  });

  useEffect(() => {
    resume();

    return () => {
      savePlace();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function savePlace() {
    if (!videoRef.current) return;
    if (blur) return;

    videoPlaybackPlace[src] = videoRef.current.currentTime;
    videoRef.current.pause();
  }

  function resume() {
    if (!videoRef.current) return;
    if (blur) return;

    videoRef.current.currentTime = videoPlaybackPlace[src] ?? 0;
    videoRef.current.play();
  }

  return (
    <video
      className={className}
      ref={videoRef}
      src={src}
      style={blur? {filter: 'blur(40px)', transform: 'translate3d(0, 0, 0)'}: {}}
      loop
      muted
      playsInline
      autoPlay={!blur}
      controls={controls}
    />
  );
}
*/

function HLSVideo({ src, poster, index }: { src: string, poster?: string, title?: string, index?: number}) {
  const playerRef = useRef<HTMLVideoElement>(null);
  //const scrollPos = useAtomValue(scrollPositionAtom) + 1
  //const nativeHLS = (document.createElement('video').canPlayType('application/vnd.apple.mpegurl')) && HlsJs.isSupported()
    
  return(
    <>
      {HlsJs.isSupported() ?
        <ReactHlsPlayer src={src} controls playerRef={playerRef} width='100%' height='auto' autoPlay={false} />
        :
        <video poster={poster} src={src} controls width='100%' height={'auto'} autoPlay={false} />
      }
    </>
  )
}

export function Video({item}: {item: FeedDataType}) {
  const ref = useRef<ReactPlayer>(null)
  const posterImage = item.preview?.images?.[0]?.source.url

  if(item.media?.reddit_video?.hls_url) {
    const posterUrl = posterImage? decode(posterImage): ''
    const hls_url = decode(item.media.reddit_video.hls_url)
    return(<HLSVideo src={hls_url} poster={posterUrl} />)
  } else if( item.post_hint === 'rich:video' && item.url) {
    const config = posterImage ?  { file: { attributes: { poster: decode(posterImage) }}} : {} 
    return <ReactPlayer 
      ref={ref} 
      url={decode(item.url)} 
      config={config}
      />
  } else {
    return <div className="p-4 text-center flex-auto items-center flex flex-col justify-center">
            <div className="text-rose-500">unknown media type {item.media?.type}</div>
            <a href={decode(item.url)}>Click to open</a>
        </div>
  }
}