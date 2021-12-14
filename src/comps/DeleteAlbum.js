import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, InputLabel, FormControl } from '@material-ui/core'

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

const DeleteAlbum = ({ setAlbum, album, names, session, mode }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [select, setSelect] = useState('1')
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
    if (verify === names[String(select - 1)].label) {
      let tmpSelect = select
      if (select === album) {
        setAlbum(String(select - 1))
        setSelect(String(select - 1))
      }
      setError('')
      await fetch(`https://liarlab-api.herokuapp.com/delete?uid=${session.currentUser.uid}&id=${tmpSelect}&mode=${mode}`, { method: 'DELETE' }).then(
        () => {
          setOpen(false)
        }
      )
    } else {
      setError('Name not match.')
    }
  }

  const getDelete = (e) => {
    setSelect(e.target.value)
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
        <DialogTitle>Delete album</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formSelect}>
            <InputLabel id='demo-simple-select-label'>Album</InputLabel>
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
              {names &&
                names.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {`#${option.value} ${option.label}`}
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

export default DeleteAlbum
