import { useState, useEffect } from 'react'
import { projectFirestore } from './config'

const useFirestore = (collection, mode) => {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    const unsub = projectFirestore
      .collection(mode)
      .doc('Image')
      .collection(collection)
      .orderBy('name', 'asc')
      .onSnapshot((snap) => {
        let documents = []
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id })
        })
        setDocs(documents)
      })
    return () => unsub()
  }, [collection, mode])

  return { docs }
}

export default useFirestore
