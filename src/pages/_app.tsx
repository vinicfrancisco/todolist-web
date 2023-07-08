import { Box, ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import Menu from '~/components/Menu';
import { store } from '~/store';
import { theme } from '~/styles/theme';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <Menu />

          <Box maxWidth={900} m="0 auto">
            <Component {...pageProps} />
          </Box>
        </DndProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
