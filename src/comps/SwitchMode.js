import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core'
import CameraIcon from '@material-ui/icons/Camera'
import CameraRollIcon from '@material-ui/icons/CameraRoll'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#33A8FF',
      contrastText: '#fff',
    },
  },
})

function SwitchMode({ mode, setMode, setAlbum }) {
  const handleChange = (e) => {
    e.preventDefault()
    setAlbum('1')
    if (mode === 'Film') {
      setMode('Digital')
    } else {
      setMode('Film')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <ThemeProvider theme={theme}>
      <div className='FabSwitch'>
        <Fab color='primary' aria-label='switch-mode' size='medium' onClick={handleChange}>
          {mode === 'Film' ? <CameraIcon /> : <CameraRollIcon />}
        </Fab>
      </div>
    </ThemeProvider>
  )
}

export default SwitchMode
