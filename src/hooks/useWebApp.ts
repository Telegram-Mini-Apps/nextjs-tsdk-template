import { useDidMount } from '@/hooks/useDidMount';
import { WebApp } from '@twa-dev/types';

export function useWebApp(): WebApp | undefined {
  return useDidMount() ? window.Telegram.WebApp : undefined;
}