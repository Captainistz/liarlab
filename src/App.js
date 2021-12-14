import React, { lazy, Suspense, useState, useEffect } from 'react'
import { projectFirestore } from './firebase/config'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import Modal from './comps/Modal'
import Pagecontrol from './comps/Pagecontrol'
import Waiter from './comps/Waiter'

const Title = lazy(() => import('./comps/Title'))
const AdminPanel = lazy(() => import('./comps/AdminPanel'))
const Album = lazy(() => import('./comps/Album'))
const ImageGrid = lazy(() => import('./comps/ImageGrid'))
const Footer = lazy(() => import('./comps/Footer'))
const SwitchMode = lazy(() => import('./comps/SwitchMode'))

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#33A8FF',
      contrastText: '#fff',
    },
    success: {
      main: '#ffb74d',
      contrastText: '#fff',
    },
  },
})

function App() {
  const [selectedImg, setSelectedImg] = useState(null)
  const [mode, setMode] = useState('Film')
  const [album, setAlbum] = useState('1')
  const [names, setNames] = useState([])
  const [session, setSession] = useState({
    currentUser: null,
    isLoggedIn: false,
    error: null,
  })

  useEffect(() => {
    const uns = projectFirestore
      .collection(mode)
      .doc('Album')
      .collection('Name')
      .orderBy('index', 'asc')
      .onSnapshot((snap) => {
        let Names = []
        snap.forEach((doc) => {
          Names.push({
            label: doc.data().name,
            value: doc.id,
            film: doc.data().film,
          })
        })
        setNames(Names)
      })
    return () => uns()
  }, [setNames, mode])

  return (
    <Suspense fallback={<Waiter />}>
      <div className='App'>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<Waiter />}>
            <Title />
            <SwitchMode mode={mode} setMode={setMode} setAlbum={setAlbum} />
          </Suspense>
          {session.isLoggedIn &&
            session.currentUser.uid === process.env.REACT_APP_FIREBASE_ADMIN_UID && (
              <Suspense fallback={<p>1</p>}>
                <AdminPanel
                  setAlbum={setAlbum}
                  album={album}
                  names={names}
                  session={session}
                  mode={mode}
                />
              </Suspense>
            )}
          <Suspense fallback={<Waiter />}>
            {names.length !== 0 && <Album setAlbum={setAlbum} album={album} names={names} />}
            {names.length !== 0 && (
              <ImageGrid
                setSelectedImg={setSelectedImg}
                album={album}
                names={names}
                mode={mode}
                session={session}
              />
            )}
          </Suspense>
          {names && <Pagecontrol album={album} setAlbum={setAlbum} names={names} />}
          {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
          <Footer session={session} setSession={setSession} />
        </ThemeProvider>
      </div>
    </Suspense>
  )
}

export default App
