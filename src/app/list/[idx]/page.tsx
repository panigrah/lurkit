'use client';

export default function Page({ params }: { params: { idx: number }}) {
  return(
    <div className="flex-auto p-8">
      Page for {params.idx} detail
    </div>
  )
}