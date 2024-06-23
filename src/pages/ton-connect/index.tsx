import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import type { ReactNode } from 'react';

import { DisplayData } from '@/components/DisplayData/DisplayData';
import { Link } from '@/components/Link/Link';
import { Page } from '@/components/Page/Page';
import { useDidMount } from '@/hooks/useDidMount';
import { useWebApp } from '@/hooks/useWebApp';

import styles from './styles.module.css';

function Inner() {
  const wallet = useTonWallet();
  const webApp = useWebApp();
  let content: ReactNode;

  if (wallet) {
    const {
      chain,
      publicKey,
      address,
    } = wallet.account;
    content = (
      <>
        {'imageUrl' in wallet && (
          <div className={styles.provider}>
            <img
              className={styles.providerImage}
              alt="Provider logo"
              src={wallet.imageUrl}
              width={60}
              height={60}
            />
            <div className={styles.providerMeta}>
              <p className={styles.providerWalletName}>
                {wallet.name}
                &nbsp;
                <span className={styles.providerAppName}>
                  (
                  {wallet.appName}
                  )
                </span>
              </p>
              <Link
                href={wallet.aboutUrl}
                onClick={(e) => {
                  e.preventDefault();
                  webApp && webApp.openLink(wallet.aboutUrl);
                }}
              >
                About connected wallet
              </Link>
            </div>
          </div>
        )}
        <DisplayData
          rows={[
            { title: 'Address', value: address },
            { title: 'Chain', value: chain },
            { title: 'Public Key', value: publicKey },
          ]}
        />
      </>
    );
  } else {
    content = (
      <p>
        To display the data related to the TON Connect, it is required to connect your wallet.
      </p>
    );
  }

  return (
    <>
      {content}
      <div className={styles.buttonContainer}>
        <TonConnectButton/>
      </div>
    </>
  );
}

export default function TONConnectPage() {
  const didMount = useDidMount();

  return (
    <Page title="TON Connect">
      {didMount ? <Inner/> : 'Loading'}
    </Page>
  );
};
