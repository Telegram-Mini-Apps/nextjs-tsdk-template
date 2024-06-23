import { type ReactNode, useMemo } from 'react';
import type { WebAppUser } from '@twa-dev/types';

import { DisplayData, type DisplayDataRow } from '@/components/DisplayData/DisplayData';
import { Link } from '@/components/Link/Link';
import { Page } from '@/components/Page/Page';
import { useWebApp } from '@/hooks/useWebApp';

import styles from './styles.module.css';

// TODO: @twa-dev/sdk is outdated, as well as @twa-dev/types.
interface ExactWebAppUser extends WebAppUser {
  allows_write_to_pm?: boolean;
  added_to_attachment_menu?: boolean;
}

function getUserRows(user: ExactWebAppUser): DisplayDataRow[] {
  return [
    { title: 'id', value: user.id.toString() },
    { title: 'username', value: user.username },
    { title: 'photo_url', value: user.photo_url },
    { title: 'last_name', value: user.last_name },
    { title: 'first_name', value: user.first_name },
    { title: 'is_bot', value: user.is_bot },
    { title: 'is_premium', value: user.is_premium },
    { title: 'language_code', value: user.language_code },
    { title: 'allows_to_write_to_pm', value: user.allows_write_to_pm },
    { title: 'added_to_attachment_menu', value: user.added_to_attachment_menu },
  ];
}

export default function InitDataPage() {
  const webApp = useWebApp();
  const initDataRaw = webApp ? webApp.initData : undefined;
  const initData = webApp ? webApp.initDataUnsafe : undefined;

  const initDataRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initData || !initDataRaw) {
      return;
    }
    const {
      hash,
      start_param,
      chat_instance,
      chat_type,
      auth_date,
      can_send_after,
      query_id,
    } = initData;
    return [
      { title: 'raw', value: initDataRaw },
      { title: 'auth_date', value: new Date(auth_date * 1000).toLocaleString() },
      { title: 'auth_date (raw)', value: auth_date },
      { title: 'hash', value: hash },
      { title: 'can_send_after', value: can_send_after },
      { title: 'query_id', value: query_id },
      { title: 'start_param', value: start_param },
      { title: 'chat_type', value: chat_type },
      { title: 'chat_instance', value: chat_instance },
    ];
  }, [initData, initDataRaw]);

  const userRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initData && initData.user ? getUserRows(initData.user) : undefined;
  }, [initData]);

  const receiverRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initData && initData.receiver ? getUserRows(initData.receiver) : undefined;
  }, [initData]);

  const chatRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initData?.chat) {
      return;
    }
    const { id, title, type, username, photo_url } = initData.chat;

    return [
      { title: 'id', value: id.toString() },
      { title: 'title', value: title },
      { title: 'type', value: type },
      { title: 'username', value: username },
      { title: 'photo_url', value: photo_url },
    ];
  }, [initData]);

  let contentNode: ReactNode;

  if (!initDataRows) {
    contentNode = <i>Application was launched with missing init data</i>;
  } else {
    contentNode = (
      <>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Init data</h2>
          <DisplayData rows={initDataRows}/>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>User</h2>
          {userRows
            ? <DisplayData rows={userRows}/>
            : <i>User information missing</i>}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Receiver</h2>
          {receiverRows
            ? <DisplayData rows={receiverRows}/>
            : <i>Receiver information missing</i>}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Chat</h2>
          {chatRows
            ? <DisplayData rows={chatRows}/>
            : <i>Chat information missing</i>}
        </div>
      </>
    );
  }

  return (
    <Page
      title="Init Data"
      disclaimer={(
        <>
          This page displays application
          {' '}
          <Link href="https://docs.telegram-mini-apps.com/platform/init-data">
            init data
          </Link>
          .
        </>
      )}
    >
      {contentNode}
    </Page>
  );
};
