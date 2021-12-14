import React, { useState } from 'react'
import { projectFirestore, projectStorage, timestamp } from '../firebase/config'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    fontWeight: 'bold',
  },
  title: {
    padding: '16px 24px 0px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    maxWidth: 180,
    height: 50,
  },
  paper: {
    minWidth: '17%',
  },
  input: {
    display: 'none',
  },
}))

const CreateAlbum = ({ names, setAlbum, mode }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [uploadInfo, setUploadInfo] = useState({
    name: '',
    film: '',
  })
  const handleClickOpen = () => {
    setError('')
    setOpen(true)
  }

  const handleClose = () => {
    setError('')
    setOpen(false)
  }

  const getAlbumName = (e) => {
    setUploadInfo({
      name: e.target.value,
      film: uploadInfo.film,
    })
  }

  const getFilm = (e) => {
    setUploadInfo({
      name: uploadInfo.name,
      film: e.target.value,
    })
  }

  const handleChangeCreate = async (e) => {
    e.preventDefault()
    if (uploadInfo.film !== '' && uploadInfo.name !== '') {
      const cur = names.length + 1
      console.log(cur);
      const files = e.target.files
      await projectFirestore.collection(mode).doc('Album').collection('Name').doc(String(cur)).set({
        name: uploadInfo.name,
        film: uploadInfo.film,
        index: cur,
      })
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const storageRef = projectStorage.ref().child(`${mode}/${String(cur)}/${file.name}`)
        const collectionRef = projectFirestore.collection(mode).doc('Image').collection(String(cur))
        storageRef.put(file).on(
          'state_changed',
          (snap) => {
            
          },
          (error) => {
            setError(error)
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
      setOpen(false)
      setAlbum(String(cur))
    } else {
      setError('Enter Film and Album name')
    }
    setUploadInfo({
      name: '',
      film: '',
    })
  }

  return (
    <div className={classes.root}>
      <Button variant='contained' onClick={handleClickOpen} color='primary' size='small'>
        Create
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle className={classes.title}>Create album</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <TextField id='albumname' label='Album name' size='small' autoComplete='off' color='primary' onChange={getAlbumName} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id='filmname' label='Film' size='small' autoComplete='off' color='primary' onChange={getFilm} />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose} color='secondary' size='small'>
            Cancel
          </Button>
          <div>
            <input accept='image/*' className={classes.input} id='create-album' multiple type='file' onChange={handleChangeCreate} />
            <label htmlFor='create-album'>
              <Button variant='contained' color='primary' size='small' component='span' id='create'>
                Create
              </Button>
            </label>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateAlbum
