import PostPage from './post';

export default function Page({ params }: { params: { sub: string, id: string, topic: string[] } }) {
  return (<PostPage params={params} />)
}
