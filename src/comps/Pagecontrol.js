import React from 'react'
import Button from '@material-ui/core/Button'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'
import NavigateNextTwoToneIcon from '@material-ui/icons/NavigateNextTwoTone'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    fontSize: 12,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  icon: {
    transform: 'rotate(180deg)',
  },
}))

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#33A8FF',
      contrastText: '#fff',
    },
  },
})

export default function Pagecontrol({ album, setAlbum, names }) {
  const classes = useStyles()
  const minus = () => {
    if (album === '1') {
      setAlbum(String(names.length))
    } else {
      setAlbum(String(Number(album) - 1))
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const plus = () => {
    if (album === String(names.length)) {
      setAlbum('1')
    } else {
      setAlbum(String(Number(album) + 1))
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <div className={classes.container}>
      <ThemeProvider theme={theme}>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          size='small'
          onClick={minus}
          startIcon={<NavigateNextTwoToneIcon fontSize='large' className={classes.icon} />}>
          Prev
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          size='small'
          onClick={plus}
          endIcon={<NavigateNextTwoToneIcon fontSize='large' />}>
          Next
        </Button>
      </ThemeProvider>
    </div>
  )
}
