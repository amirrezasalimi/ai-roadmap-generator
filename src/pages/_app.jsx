// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from './../shared/components/toast/index';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <SnackbarUtilsConfigurator />
      </SnackbarProvider>
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
    </>
  );
}

export default MyApp;