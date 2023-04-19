import { defaultTheme } from '@/infrastructure/next-ui';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import FontLoader from "@/infrastructure/font-loader";
import 'react-toastify/dist/ReactToastify.css';
import globalStyles from "@/shared/styles/global-style";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addLocale(en);
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