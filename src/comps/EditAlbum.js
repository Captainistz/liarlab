import React, { useState } from 'react'
import { projectFirestore } from '../firebase/config'
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'
import { amber } from '@material-ui/core/colors'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: amber,
  },
})

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    fontWeight: 'bold',
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
  title: {
    padding: '16px 24px 0px',
  },
}))

export default function EditAlbum({ setAlbum, album, names, session, mode }) {
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const [nameChange, setNameChange] = useState('')
  const [filmChange, setFilmChange] = useState('')
  const [nameError, setNameError] = useState(false)
  const [filmError, setFilmError] = useState(false)

  const handleOpen = () => {
    setOpen(true)
    setNameChange(names[album - 1].label)
    setFilmChange(names[album - 1].film)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    if (!nameError && !filmError) {
      const ref = projectFirestore.collection(mode).doc('Album').collection('Name').doc(album)
      ref.set({ name: nameChange, film: filmChange }, { merge: true })
      setOpen(false)
    }
  }

  const getName = (e) => {
    if (e.target.value === '') {
      setNameError(true)
    } else {
      setNameError(false)
    }
    setNameChange(e.target.value)
  }

  const getFilm = (e) => {
    if (e.target.value === '') {
      setFilmError(true)
    } else {
      setFilmError(false)
    }
    setFilmChange(e.target.value)
  }

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Button variant='contained' color='primary' size='small' onClick={handleOpen}>
          Edit
        </Button>

        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle className={classes.title}>Edit album</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <TextField
                  id='albumnamechange'
                  label='Album name'
                  size='small'
                  autoComplete='off'
                  color='primary'
                  error={nameError}
                  defaultValue={nameChange}
                  onChange={getName}
                  helperText={nameError ? 'Name cannot be blank' : ''}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  id='filmnamechange'
                  label='Film'
                  size='small'
                  autoComplete='off'
                  color='primary'
                  error={filmError}
                  defaultValue={filmChange}
                  onChange={getFilm}
                  helperText={filmError ? 'Film cannot be blank' : ''}
                />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' onClick={handleSubmit} color='primary' size='small'>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  )
}
