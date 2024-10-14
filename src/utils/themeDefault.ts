import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#dddddd',
      dark: '#053e85', // use 'dark' instead of 'darker'
    },
    secondary: {
      main: '#000',
      contrastText: '#000',
    },
    text: {
      primary: '#000',
      secondary: '#dddddd',
    },
  },
  typography: {
    fontFamily: [
      'JetBrains Mono',
      'sans-serif',
      'Roboto',
      '"Helvetica Neue"',
      'Bungee Color',
    ].join(','),
    fontSize: 14,
  },
})
