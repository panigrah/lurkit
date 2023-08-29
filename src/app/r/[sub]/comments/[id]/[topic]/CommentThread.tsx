'use client';
import { CommentItemType } from '@/types';
import { CommentItem } from './CommentItem';


export function CommentThread({ sub, link, items, depth = 0 }: { sub: string, link: string, items?: CommentItemType[]; depth: number }) {
  if (!items) return null;
  return (
    <div className='flex flex-col flex-auto'>
      {items.map((item,idx) => <CommentItem sub={sub} link={link} item={item} key={idx} depth={depth} />)}
    </div>
  );
}
