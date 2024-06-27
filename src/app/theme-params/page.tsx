'use client';

import { List } from '@telegram-apps/telegram-ui';

import { getWebApp } from '@/utils/getWebApp';
import { DisplayData } from '@/components/DisplayData/DisplayData';

export default function ThemeParamsPage() {
  const webApp = getWebApp();

  return (
    <List>
      <DisplayData
        rows={
          Object
            .entries(webApp.themeParams)
            .map(([title, value]) => ({ title, value }))
        }
      />
    </List>
  );
};
