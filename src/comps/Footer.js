import React from 'react'
import { projectAuth, googleProvider } from '../firebase/config'
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))

const Footer = ({ setSession, session }) => {
  const classes = useStyles()

  const googleLogin = (e) => {
    e.preventDefault()
    projectAuth
      .signInWithPopup(googleProvider)
      .then((res) => {
        setSession({
          currentUser: res.user,
          isLoggedIn: true,
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
      .catch((error) => {
        console.log(error)
        setSession({ error: error })
      })
  }

  const googleSignOut = (e) => {
    e.preventDefault()
    projectAuth
      .signOut()
      .then(() => {
        setSession({
          currentUser: null,
          isLoggedIn: false,
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
      .catch((err) => {
        setSession({ error: err })
      })
  }
  return (
    <div className='footer'>
      <div>
        by{' '}
        <a href='https://www.instagram.com/captainistz/' target='_blank' rel='noopener noreferrer'>
          Captainistz
        </a>{' '}
        | Since 2018 |{' '}
        {!session.isLoggedIn ? (
          <IconButton
            aria-label='delete'
            className={classes.margin}
            size='small'
            onClick={googleLogin}>
            <SettingsIcon fontSize='inherit' />
          </IconButton>
        ) : (
          <IconButton
            aria-label='delete'
            className={classes.margin}
            size='small'
            onClick={googleSignOut}>
            <ExitToAppIcon fontSize='inherit' />
          </IconButton>
        )}
      </div>
    </div>
  )
}

export default Footer
