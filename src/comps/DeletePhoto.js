import React, {useState} from 'react'
import { Button, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, InputLabel, FormControl } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { projectStorage, projectFirestore } from '../firebase/config'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    fontWeight: 'bold',
    '& .MuiSlider-root': {
      width: '100px',
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '200px',
      fontFamily: 'sans-serif',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    maxWidth: 180,
    height: 50,
  },
  formSelect: {
    margin: theme.spacing(1),
    minWidth: 200,
    textAlign: 'center',
  },
  menuPaper: {
    maxHeight: '20ch',
    maxWidth: '200px',
  },
}))

const DeletePhoto = ({ docs, album, mode }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [select, setSelect] = useState(0)
  const [verify, setVerify] = useState('')
  const [error, setError] = useState('')
  const handleClickOpen = () => {
    setError('')
    setVerify('')
    setOpen(true)
  }
  const handleClose = () => {
    setError('')
    setVerify('')
    setOpen(false)
  }

  const handleChange = async (e) => {
    e.preventDefault()
    if (verify === docs[select].name){
      setSelect(0)
      const picRef = projectFirestore.collection(mode).doc('Image').collection(album)
      await picRef.where('name', '==', docs[select].name).get().then((snap) => {
        snap.forEach((doc) => {
          doc.ref.delete()
        })
      })
      await projectStorage.ref().child(`${mode}/${album}/${docs[select].name}.JPG`).delete().then(() => {
        handleClose()
      }).catch(e => {
        console.log(String(e));
      })
    }
  }

  const getDelete = (e) => {
    setSelect(parseInt(e.target.value))
  }

  const getVerify = (e) => {
    setVerify(e.target.value)
  }
  return (
    <div className={classes.root}>
      <Button variant='contained' onClick={handleClickOpen} color='secondary' size='small'>
        Delete
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Delete picture</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formSelect}>
            <InputLabel id='demo-simple-select-label'>Picture</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={select}
              onChange={getDelete}
              MenuProps={{
                classes: { paper: classes.menuPaper },
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                getContentAnchorEl: null,
              }}>
              {docs &&
                docs.map((option, index) => (
                  <MenuItem key={option.name} value={index}>
                    {`${option.name}`}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions
          style={{
            justifyContent: 'space-between',
            margin: '0 10px 0 10px',
          }}>
          <TextField
            error={error.length !== 0}
            id='standard-basic'
            label='Confirm'
            size='small'
            autoComplete='off'
            color='primary'
            onChange={getVerify}
            helperText={error}
            style={{ top: '-10px', width: '120px' }}
          />
          <Button variant='contained' onClick={handleChange} color='secondary' size='small'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeletePhoto
