import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { projectStorage, projectFirestore, timestamp } from '../firebase/config'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    fontWeight: 'bold',
  },
  input: {
    display: 'none',
  },
}))

const AddPhoto = ({ album, mode }) => {
  const classes = useStyles()
  const handleChange = (e) => {
    const cur = album
    const files = e.target.files
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const storageRef = projectStorage.ref().child(`${mode}/${String(cur)}/${file.name}`)
      const collectionRef = projectFirestore.collection(mode).doc('Image').collection(String(cur))
      storageRef.put(file).on(
        'state_changed',
        (snap) => {
          
        },
        (err) => {
          console.log(err)
        },
        async () => {
          const url = await storageRef.getDownloadURL()
          const createdAt = timestamp()
          await collectionRef.add({
            name: file.name.split('.')[0],
            url,
            createdAt,
          })
        }
      )
    }
  }

  return (
    <div className={classes.root}>
      <input
        accept='image/*'
        className={classes.input}
        id='add-photo'
        multiple
        type='file'
        onChange={handleChange}
      />
      <label htmlFor='add-photo'>
        <Button variant='contained' color='primary' component='span' size='small' id='create'>
          Add
        </Button>
      </label>
    </div>
  )
}

export default AddPhoto
