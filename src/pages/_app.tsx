import type { AppProps } from 'next/app';
import GlobalStyle from '@/styles/GlobalStyle';
import { GlobalStyles as BaseStyles } from 'twin.macro';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <BaseStyles />
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
