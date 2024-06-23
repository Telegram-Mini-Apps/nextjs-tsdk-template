import { type FC, useEffect, useMemo } from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useRouter } from 'next/router';
import { useRouter as useNavigationRouter } from 'next/navigation';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useDidMount } from '@/hooks/useDidMount';
import { useWebApp } from '@/hooks/useWebApp';

import './global.css';

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

const BackButtonManipulator: FC = () => {
  const router = useRouter();
  const { back } = useNavigationRouter()
  const webApp = useWebApp();

  useEffect(() => {
    if (!webApp) {
      return;
    }
    if (router.pathname === '/') {
      webApp.BackButton.isVisible && webApp.BackButton.hide();
    } else {
      !webApp.BackButton.isVisible && webApp.BackButton.show();
    }
  }, [webApp, router.pathname]);

  useEffect(() => {
    if (!webApp) {
      return;
    }
    webApp.BackButton.onClick(back);

    return () => webApp.BackButton.offClick(back);
  }, [webApp, back]);

  return null;
};

function App({ pageProps, Component }: AppProps) {
  const didMount = useDidMount();
  const webApp = useWebApp();
  const debug = webApp
    ? webApp.initDataUnsafe.start_param === 'debug'
    : false;
  const manifestUrl = useMemo(() => didMount
    ? new URL('tonconnect-manifest.json', window.location.href).toString()
    : 'tonconnect-manifest.json', [didMount]);

  useEffect(() => {
    if (debug) {
      import('eruda').then(lib => lib.default.init());
    }
  }, [debug]);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <BackButtonManipulator/>
      <Component {...pageProps}/>
    </TonConnectUIProvider>
  );
}

export default function CustomApp(props: AppProps) {
  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://telegram.org/js/telegram-web-app.js"/>
      </Head>
      <ErrorBoundary fallback={ErrorBoundaryError}>
        <App {...props}/>
      </ErrorBoundary>
    </>
  );
};
