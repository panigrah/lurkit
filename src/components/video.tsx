//import { useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
//import { Dictionary } from "@reduxjs/toolkit";
import { scrollPositionAtom } from "@/app/atoms";
import { FeedDataType } from "@/types";
import { decode } from "he";
import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import ReactHlsPlayer from "react-hls-player";
import ReactPlayer from "react-player/lazy";

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

export function HLSVideo({ src, index }: { src: string, title?: string, index?: number}) {
  const playerRef = useRef<HTMLVideoElement>(null);
  const scrollPos = useAtomValue(scrollPositionAtom) + 1
/*
  useEffect(() => {
    if(scrollPos === index && playerRef.current?.paused) {
      playerRef.current?.play()
    } else {
      playerRef.current?.pause()
    }
  }, [scrollPos, index])
*/

  return(
    <ReactHlsPlayer
      src={src}
      autoPlay={false} //scrollPos === index}
      controls={true}
      width="100%"
      height="auto"
      playerRef={playerRef}
    />
  )
}

export function Video({item}: {item: FeedDataType}) {
  if(item.media?.reddit_video?.hls_url) {
    const hls_url = item.media.reddit_video.hls_url
    return(<HLSVideo src={decode(hls_url)} />)
  } else if( item.post_hint === 'rich:video' && item.url) {
    return <ReactPlayer url={item.url} />
  } else {
    return <div className="p-4 text-center flex-auto items-center flex flex-col justify-center">
            <div className="text-rose-500">unknown media type {item.media?.type}</div>
            <a href={item.url}>Click to open</a>
        </div>
  }
}