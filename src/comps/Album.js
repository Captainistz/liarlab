import React from 'react'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { MenuItem, FormControl, Select, InputLabel } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  menuPaper: {
    maxHeight: '35ch',
    maxWidth: '220px',
  },
}))

const Album = ({ setAlbum, album, names }) => {
  const classes = useStyles()

  const handleChange = (e) => {
    setAlbum(String(e.target.value))
  }

  const theme = createMuiTheme({
    typography: {
      fontFamily: `"Open Sans",sans-serif;`
    },
    palette: {
      primary: {
        main: '#6ecce6',
      },
    },
    overrides: {
      MuiInput: {
        underline: {
          '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottomColor: '#6ecce6',
          },
        },
      },
    },
  })

  return (
    <div className='Album'>
      <ThemeProvider theme={theme}>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-label'>Album</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={album}
            onChange={handleChange}
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
      </ThemeProvider>
    </div>
  )
}

export default Album

/*
  <TextField
    label='Select'
    id='standard-album-name'
    select
    value={album}
    onChange={handleChange}
    helperText='Choose albums'
    color='primary'>
    {names &&
      names.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {`#${option.value} ${option.label}`}
        </MenuItem>
      ))}
  </TextField>
*/
