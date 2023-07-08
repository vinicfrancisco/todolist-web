import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    white: '#FFF',

    gray: {
      900: '#121214',
      800: '#202024',
      300: '#c4c4cc',
      100: '#e1e1e6',
    },
    green: {
      500: '#00875f',
      300: '#00b37e',
    },
  },
  styles: {
    global: {
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },

      body: {
        backgroundColor: 'gray.900',
        color: 'gray.100',
        '-webkit-font-smoothing': 'antialiased',
      },

      'body, input, textarea, button': {
        fontFamily: 'Roboto',
        fontWeight: 400,
      },
    },
  },
});
