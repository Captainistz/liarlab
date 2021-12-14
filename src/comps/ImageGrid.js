import React, { lazy, Suspense } from 'react'
import useFirestore from '../firebase/useFirestore'
import { motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const AlbumPanel = lazy(() => import('./AlbumPanel'))

const ImageGrid = ({ setSelectedImg, album, names, mode, session }) => {
  const { docs } = useFirestore(album, mode)
  return (
    <div>
      <Suspense fallback={(<p>Loading..</p>)}>
        {session.isLoggedIn && session.currentUser.uid === process.env.REACT_APP_FIREBASE_ADMIN_UID && docs && (
          <AlbumPanel docs={docs} album={album} mode={mode} />
        )}
      </Suspense>
      <p style={{ margin: '6% auto 0', textAlign: 'center' }}>{`${mode === 'Film' ? mode : 'Camera'}:  ${names[album - 1].film}`}</p>
      <div className='img-grid'>
        {docs &&
          docs.map((doc) => (
            <motion.div
              className={`${mode} img-wrap `}
              key={doc.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              onClick={() =>
                setSelectedImg({
                  url: doc.url,
                  name: doc.name,
                })
              }>
              <LazyLoadImage effect='blur' src={doc.url} alt={doc.name} threshold={500} />
            </motion.div>
          ))}
      </div>
    </div>
  )
}

export default ImageGrid
