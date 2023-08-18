'use client'
import Feed from './feed'
import { Helmet } from 'react-helmet'

export default function Home() {
  
  return (
    <>
      <Helmet>
        <title>
          Front page
        </title>
      </Helmet>
      <Feed topic='popular' subreddit={false} />
    </>
  )
}
