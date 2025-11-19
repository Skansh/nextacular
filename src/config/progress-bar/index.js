import { appConfig } from '@/config/app.config';

/**
 * Progress Bar Configuration
 *
 * Now uses centralized config. Customize via NEXT_PUBLIC_THEME_PROGRESS_COLOR
 * environment variable. See CONFIGURATION_GUIDE.md for details.
 */

const progressBarConfig = () => ({
  barColors: {
    0: appConfig.theme.progressBarColor,
  },
  shadowBlur: 5,
});

export default progressBarConfig;
