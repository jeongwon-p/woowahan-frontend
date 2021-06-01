import React from 'react';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const MOBEIUS_THEME = createMuiTheme({
  palette: {
    background: {
      paper: '#101037',
      default: '#ffffff'
    },
    text: {
      primary: '#000000',
      secondary: '#657486'
    },
    primary: {
      main: '#1A1C4B',
      light: '#2A84C6',
      dark: '#0D0D2B'
    },
    secondary: {
      main: '#FF3A7D',
      dark: '#B11C3B'
    }
  },
  typography: {
    caption: {
      fontSize: '0.825em'
    },
    fontFamily: [
      'Malgun Gothic',
      '맑은 고딕',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  }
});

const ThemeProvider: React.FC = ({ children }) => {
  return (
    <MuiThemeProvider theme={MOBEIUS_THEME}>
      <CssBaseline>
        {children}
      </CssBaseline>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
