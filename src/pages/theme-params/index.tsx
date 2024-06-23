import { DisplayData } from '@/components/DisplayData/DisplayData';
import { Link } from '@/components/Link/Link';
import { Page } from '@/components/Page/Page';
import { useWebApp } from '@/hooks/useWebApp';

export default function ThemeParamsPage() {
  const webApp = useWebApp();

  return (
    <Page
      title="Theme Params"
      disclaimer={(
        <>
          This page displays current
          {' '}
          <Link href="https://docs.telegram-mini-apps.com/platform/theming">
            theme parameters
          </Link>
          . It is reactive, so, changing theme externally will lead to this page updates.
        </>
      )}
    >
      <DisplayData
        rows={
          webApp
            ? Object
              .entries(webApp.themeParams)
              .map(([title, value]) => ({ title, value }))
            : []
        }
      />
    </Page>
  );
};
