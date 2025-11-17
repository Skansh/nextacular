import fetcher from '@/lib/client/fetcher';
import { appConfig } from '@/config/app.config';

/**
 * SWR Configuration
 *
 * Now uses centralized config. Customize via environment variables:
 * - NEXT_PUBLIC_SWR_REFRESH_INTERVAL
 * - NEXT_PUBLIC_SWR_DEDUPING_INTERVAL
 * - NEXT_PUBLIC_SWR_REVALIDATE_FOCUS
 * - NEXT_PUBLIC_SWR_REVALIDATE_RECONNECT
 *
 * See CONFIGURATION_GUIDE.md for details.
 */

const handleOnError = (error) => {
  throw new Error(`Error: ${error}`);
};

const swrConfig = () => ({
  fetcher,
  onError: handleOnError,
  refreshInterval: appConfig.api.swr.refreshInterval,
  dedupingInterval: appConfig.api.swr.dedupingInterval,
  revalidateOnFocus: appConfig.api.swr.revalidateOnFocus,
  revalidateOnReconnect: appConfig.api.swr.revalidateOnReconnect,
});

export default swrConfig;
