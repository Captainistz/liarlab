import React, { lazy, Suspense } from 'react'

const AddPhoto = lazy(() => import('./AddPhoto'))
const DeletePhoto = lazy(() => import('./DeletePhoto'))

const AlbumPanel = ({ docs, album, mode }) => {
  return (
    <Suspense fallback={<div className='loader' style={{ margin: '20% auto' }} />}>
      <div className='adminPanel'>
        <AddPhoto album={album} mode={mode} />
        <DeletePhoto docs={docs} album={album} mode={mode} />
      </div>
    </Suspense>
  )
}

export default AlbumPanel
