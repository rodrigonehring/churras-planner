import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: '#9b59b6',
      contrastText: '#fff'
    },
    secondary: {
      main: '#3d273c'
    }
  },
  shape: {
    borderRadius: 4
  }
})

export default function Theme({ children }) {
  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </>
  )
}
