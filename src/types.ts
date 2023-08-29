
export type ImageType = {
  url: string;
  width: number;
  height: number;
}

export type PreviewType = {
  images: {
    source: ImageType;
    resolutions: ImageType[]
  }[]
  enabled: boolean;
}

type GalleryImageType = {
    x: number; //width
    y: number; //height
    u: string; //url
}

export type GalleryMetaDataType = {
  status: string; // valid
  e: string; //type eg. image
  m: string; //image type eg image/jpg
  id: string;
  p: GalleryImageType[]
  s: GalleryImageType;
}

export type MediaType = {
  type?: string;
  oembed?: {
    provider_url: string;
    title: string;
    html: string;
    thumbnail_width: number;
    height: number;
    width: number;
    version: string;
    provider_name: string;
    thumbnail_url: string;
    type: string;
    thumbnail_height: number;
  };
  reddit_video?: {
    fallback_url: string;
    hls_url: string;
    is_gif: boolean;
    height: number;
    width: number;
    duration: number;
  }
}

export type FeedDataType = {
  post_hint: "hosted:video" | "link" | "text" | "image" | "gallery" | "rich:video";
  subreddit: string;
  author_fullname: string;
  selftext?: string;
  title: string;
  subreddit_name_prefixed: string;
  thumbnail_height: number | null;
  thumbnail_width: number | null;
  thumbnail?: string;
  pwls: number;
  downs: number;
  name: string;
  upvote_ratio: string;
  subreddit_type: string;
  ups: number;
  is_original_content: boolean;
  score: number;
  created: number;
  domain: string;
  subreddit_id: string;
  id: string;
  author: string;
  num_comments: number;
  permalink: string;
  url: string;
  subreddit_subscribers: number;
  created_utc: number;
  num_crossposts: number;
  is_video: boolean;
  media?: MediaType;
  preview?: PreviewType;
  media_metadata?: {[index: string]: GalleryMetaDataType};
  gallery_data?: any;
  url_overridden_by_dest?: string;
}

export type FeedItemType = {
  kind: string;
  data: FeedDataType
}

export type FeedItemListingType = {
  kind: string;
  data: {
    after: string;
    dist: number;
    children: FeedItemType[]
  }
}



export type CommentItemType = {
  kind: string;
  data: {
    link_id: string;
    subreddit_id: string;
    subreddit: string;
    likes: number | null;
    author: string;
    parent_id: string;
    author_fullname: string;
    body: string;
    body_html: string;
    name: string;
    is_submitter: boolean;
    edited: number | null;
    created: number;
    ups: number;
    downs: number;
    stickied: boolean;
    permalink: string;
    author_flair_text: string;
    replies?: CommentItemListType;
    count: number;
    children?: string[]
  }
}

export type CommentItemListType = {
  kind: string;
  data: {
    after: string;
    children: CommentItemType[]
  }
}
export type PostCommentsListingType = [
  FeedItemListingType,
  CommentItemListType,
]

export type SubscriptionType = {
  id: string;
  sub: string;
  path?: string;
}

export type BookMarkType = {
  id: string;
  sub: string;
  permalink: string;
  title: string;
  selftext?: string;
}

export type CommunitySettingsType = {
  [index: string]: {
    pos: number; //scroll position
    refreshTime?: number; //when last viewed
  }};
