import { SubscriptionType } from '@prisma/client';
import { appConfig } from '@/config/app.config';

/**
 * Subscription Rules
 *
 * These rules are now centralized in app.config.js and can be configured
 * via environment variables. See CONFIGURATION_GUIDE.md for details.
 */

const rules = {
  [SubscriptionType.FREE]: {
    customDomains: appConfig.subscription.FREE.limits.customDomains,
    members: appConfig.subscription.FREE.limits.members,
    workspaces: appConfig.subscription.FREE.limits.workspaces,
    storage: appConfig.subscription.FREE.limits.storage,
    apiCalls: appConfig.subscription.FREE.limits.apiCalls,
  },
  [SubscriptionType.STANDARD]: {
    customDomains: appConfig.subscription.STANDARD.limits.customDomains,
    members: appConfig.subscription.STANDARD.limits.members,
    workspaces: appConfig.subscription.STANDARD.limits.workspaces,
    storage: appConfig.subscription.STANDARD.limits.storage,
    apiCalls: appConfig.subscription.STANDARD.limits.apiCalls,
  },
  [SubscriptionType.PREMIUM]: {
    customDomains: appConfig.subscription.PREMIUM.limits.customDomains,
    members: appConfig.subscription.PREMIUM.limits.members,
    workspaces: appConfig.subscription.PREMIUM.limits.workspaces,
    storage: appConfig.subscription.PREMIUM.limits.storage,
    apiCalls: appConfig.subscription.PREMIUM.limits.apiCalls,
  },
};

export default rules;
