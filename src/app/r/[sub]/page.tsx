import { activeCommunityAtom } from "@/app/atoms";
import Feed from "@/app/feed";

export default function Page({ params }: { params: { sub: string }}) {
  return(
    <Feed topic={params.sub} />
  )
}