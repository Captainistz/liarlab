import React, { lazy, Suspense } from 'react'


const DeleteAlbum = lazy(() => import('./DeleteAlbum'))
const CreateAlbum = lazy(() => import('./CreateAlbum'))
const EditAlbum = lazy(() => import('./EditAlbum'))


function AdminPanel({ setAlbum, names, session, album, mode }) {
  return (
    <Suspense fallback={<div className='loader' style={{ margin: '20% auto' }} />}>
        <div className='adminPanel'>
          <CreateAlbum setAlbum={setAlbum} names={names} mode={mode} />
          <EditAlbum setAlbum={setAlbum} album={album} names={names} session={session} mode={mode} />
          <DeleteAlbum setAlbum={setAlbum} album={album} names={names} session={session} mode={mode} />
        </div>
    </Suspense>
  )
}

export default AdminPanel
