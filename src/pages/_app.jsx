// 1. import `NextUIProvider` component
import { defaultTheme } from '@/infrastructure/next-ui';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import globalStyles from "@/shared/styles/global-style";
import FontLoader from "@/infrastructure/font-loader";
import '@/shared/styles/global.css';
import { backendServices } from '@/backend/services/services';

backendServices.init();

function MyApp({ Component, pageProps }) {
    globalStyles();
  return (
      <>
      <FontLoader />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <NextUIProvider theme={defaultTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </>
  );
}

export default MyApp;