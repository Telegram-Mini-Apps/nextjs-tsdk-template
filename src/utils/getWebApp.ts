import type { WebApp } from '@twa-dev/types';

declare global {
  interface Window {
    Telegram: {
      WebApp: WebApp;
    };
  }
}

export function getWebApp(): WebApp {
  return window.Telegram.WebApp;
}