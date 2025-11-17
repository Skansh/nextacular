/**
 * Centralized Application Configuration
 *
 * This file contains all configurable values for the application.
 * Override values using environment variables where applicable.
 *
 * Usage: import { appConfig } from '@/config/app.config';
 */

const appConfig = {
  // ============================================================================
  // BRANDING & APP IDENTITY
  // ============================================================================
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Nextacular',
    tagline: process.env.NEXT_PUBLIC_APP_TAGLINE || 'Build SaaS platforms like never before',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A boilerplate for your NextJS SaaS projects.',
    url: process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'http://localhost:3000',
    locale: process.env.NEXT_PUBLIC_APP_LOCALE || 'en',
    currency: process.env.NEXT_PUBLIC_APP_CURRENCY || 'USD',
    currencySymbol: process.env.NEXT_PUBLIC_APP_CURRENCY_SYMBOL || '$',
  },

  // ============================================================================
  // SEO & METADATA
  // ============================================================================
  seo: {
    title: process.env.NEXT_PUBLIC_SEO_TITLE || 'NextJS SaaS Boilerplate',
    description: process.env.NEXT_PUBLIC_SEO_DESCRIPTION || 'A boilerplate for your NextJS SaaS projects.',
    keywords: process.env.NEXT_PUBLIC_SEO_KEYWORDS || 'nextjs, saas, boilerplate, multi-tenant, stripe',
    loginTitle: process.env.NEXT_PUBLIC_SEO_LOGIN_TITLE || 'NextJS SaaS Boilerplate | Login',
    ogImage: process.env.NEXT_PUBLIC_SEO_OG_IMAGE || '/images/seo-cover.png',
    twitterCardType: process.env.NEXT_PUBLIC_SEO_TWITTER_CARD || 'summary_large_image',
    twitterHandle: process.env.NEXT_PUBLIC_SEO_TWITTER_HANDLE || '',
    favicon: process.env.NEXT_PUBLIC_SEO_FAVICON || '/favicon.ico',
  },

  // ============================================================================
  // ASSETS & IMAGES
  // ============================================================================
  assets: {
    logo: process.env.NEXT_PUBLIC_LOGO_PATH || '/logo.png',
    logoDark: process.env.NEXT_PUBLIC_LOGO_DARK_PATH || '/logo-dark.png',
    logoAlt: process.env.NEXT_PUBLIC_LOGO_ALT || 'Logo',
    seoImage: process.env.NEXT_PUBLIC_SEO_IMAGE_PATH || '/images/seo-cover.png',
    defaultAvatar: process.env.NEXT_PUBLIC_DEFAULT_AVATAR || '/images/default-avatar.png',
  },

  // ============================================================================
  // THEME & STYLING
  // ============================================================================
  theme: {
    colors: {
      primary: process.env.NEXT_PUBLIC_THEME_PRIMARY || '#2563eb',      // blue-600
      primaryHover: process.env.NEXT_PUBLIC_THEME_PRIMARY_HOVER || '#1d4ed8', // blue-700
      danger: process.env.NEXT_PUBLIC_THEME_DANGER || '#dc2626',        // red-600
      dangerHover: process.env.NEXT_PUBLIC_THEME_DANGER_HOVER || '#b91c1c', // red-700
      success: process.env.NEXT_PUBLIC_THEME_SUCCESS || '#16a34a',      // green-600
      warning: process.env.NEXT_PUBLIC_THEME_WARNING || '#ea580c',      // orange-600
      info: process.env.NEXT_PUBLIC_THEME_INFO || '#0284c7',            // sky-600
      sidebarBg: process.env.NEXT_PUBLIC_THEME_SIDEBAR_BG || '#1f2937', // gray-800
      sidebarText: process.env.NEXT_PUBLIC_THEME_SIDEBAR_TEXT || '#f9fafb', // gray-50
    },
    defaultMode: process.env.NEXT_PUBLIC_THEME_DEFAULT || 'light', // 'light' | 'dark' | 'system'
    progressBarColor: process.env.NEXT_PUBLIC_THEME_PROGRESS_COLOR || '#2563eb',
  },

  // ============================================================================
  // SUBSCRIPTION PLANS & LIMITS
  // ============================================================================
  subscription: {
    FREE: {
      name: process.env.NEXT_PUBLIC_PLAN_FREE_NAME || 'Hobby',
      displayName: process.env.NEXT_PUBLIC_PLAN_FREE_DISPLAY || 'Free Plan',
      price: 0,
      interval: process.env.NEXT_PUBLIC_PLAN_FREE_INTERVAL || 'forever',
      limits: {
        workspaces: parseInt(process.env.NEXT_PUBLIC_PLAN_FREE_WORKSPACES || '1', 10),
        members: parseInt(process.env.NEXT_PUBLIC_PLAN_FREE_MEMBERS || '1', 10),
        customDomains: parseInt(process.env.NEXT_PUBLIC_PLAN_FREE_DOMAINS || '1', 10),
        storage: parseInt(process.env.NEXT_PUBLIC_PLAN_FREE_STORAGE || '100', 10), // MB
        apiCalls: parseInt(process.env.NEXT_PUBLIC_PLAN_FREE_API_CALLS || '1000', 10), // per month
      },
      features: [
        '1 Workspace',
        '1 Team Member',
        '1 Custom Domain',
        '100 MB Storage',
        '1,000 API calls/month',
        'Community Support',
      ],
    },
    STANDARD: {
      name: process.env.NEXT_PUBLIC_PLAN_STANDARD_NAME || 'Standard',
      displayName: process.env.NEXT_PUBLIC_PLAN_STANDARD_DISPLAY || 'Standard Plan',
      price: parseFloat(process.env.NEXT_PUBLIC_PLAN_STANDARD_PRICE || '9'),
      interval: process.env.NEXT_PUBLIC_PLAN_STANDARD_INTERVAL || 'per month',
      limits: {
        workspaces: parseInt(process.env.NEXT_PUBLIC_PLAN_STANDARD_WORKSPACES || '5', 10),
        members: parseInt(process.env.NEXT_PUBLIC_PLAN_STANDARD_MEMBERS || '5', 10),
        customDomains: parseInt(process.env.NEXT_PUBLIC_PLAN_STANDARD_DOMAINS || '3', 10),
        storage: parseInt(process.env.NEXT_PUBLIC_PLAN_STANDARD_STORAGE || '1000', 10), // MB
        apiCalls: parseInt(process.env.NEXT_PUBLIC_PLAN_STANDARD_API_CALLS || '10000', 10), // per month
      },
      features: [
        '5 Workspaces',
        '5 Team Members per workspace',
        '3 Custom Domains',
        '1 GB Storage',
        '10,000 API calls/month',
        'Priority Email Support',
        'Advanced Analytics',
      ],
    },
    PREMIUM: {
      name: process.env.NEXT_PUBLIC_PLAN_PREMIUM_NAME || 'Premium',
      displayName: process.env.NEXT_PUBLIC_PLAN_PREMIUM_DISPLAY || 'Premium Plan',
      price: parseFloat(process.env.NEXT_PUBLIC_PLAN_PREMIUM_PRICE || '29'),
      interval: process.env.NEXT_PUBLIC_PLAN_PREMIUM_INTERVAL || 'per month',
      limits: {
        workspaces: parseInt(process.env.NEXT_PUBLIC_PLAN_PREMIUM_WORKSPACES || '10', 10),
        members: parseInt(process.env.NEXT_PUBLIC_PLAN_PREMIUM_MEMBERS || '10', 10),
        customDomains: parseInt(process.env.NEXT_PUBLIC_PLAN_PREMIUM_DOMAINS || '5', 10),
        storage: parseInt(process.env.NEXT_PUBLIC_PLAN_PREMIUM_STORAGE || '10000', 10), // MB
        apiCalls: parseInt(process.env.NEXT_PUBLIC_PLAN_PREMIUM_API_CALLS || '100000', 10), // per month
      },
      features: [
        '10 Workspaces',
        '10 Team Members per workspace',
        '5 Custom Domains',
        '10 GB Storage',
        '100,000 API calls/month',
        '24/7 Priority Support',
        'Advanced Analytics',
        'Custom Integrations',
        'API Access',
      ],
    },
  },

  // ============================================================================
  // VALIDATION RULES
  // ============================================================================
  validation: {
    user: {
      name: {
        minLength: parseInt(process.env.VALIDATION_USER_NAME_MIN || '1', 10),
        maxLength: parseInt(process.env.VALIDATION_USER_NAME_MAX || '32', 10),
      },
      email: {
        // Email validation regex
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
    },
    workspace: {
      name: {
        minLength: parseInt(process.env.VALIDATION_WORKSPACE_NAME_MIN || '1', 10),
        maxLength: parseInt(process.env.VALIDATION_WORKSPACE_NAME_MAX || '16', 10),
      },
      slug: {
        minLength: parseInt(process.env.VALIDATION_WORKSPACE_SLUG_MIN || '1', 10),
        maxLength: parseInt(process.env.VALIDATION_WORKSPACE_SLUG_MAX || '16', 10),
        // Slug validation regex (lowercase, numbers, hyphens only)
        regex: /^[a-z0-9-]+$/,
      },
      inviteCode: {
        length: parseInt(process.env.VALIDATION_INVITE_CODE_LENGTH || '6', 10),
      },
    },
    domain: {
      // Domain validation regex
      regex: /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/,
    },
  },

  // ============================================================================
  // UI CONFIGURATION
  // ============================================================================
  ui: {
    toast: {
      duration: parseInt(process.env.NEXT_PUBLIC_TOAST_DURATION || '10000', 10), // 10 seconds
      loginDuration: parseInt(process.env.NEXT_PUBLIC_TOAST_LOGIN_DURATION || '5000', 10), // 5 seconds
      position: process.env.NEXT_PUBLIC_TOAST_POSITION || 'bottom-left',
    },
    signoutDelay: parseInt(process.env.SIGNOUT_DELAY || '2000', 10), // 2 seconds
    itemsPerPage: parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE || '10', 10),
    dateFormat: process.env.NEXT_PUBLIC_DATE_FORMAT || 'MMM dd, yyyy',
    dateTimeFormat: process.env.NEXT_PUBLIC_DATETIME_FORMAT || 'MMM dd, yyyy HH:mm',
  },

  // ============================================================================
  // API CONFIGURATION
  // ============================================================================
  api: {
    swr: {
      refreshInterval: parseInt(process.env.NEXT_PUBLIC_SWR_REFRESH_INTERVAL || '1000', 10), // 1 second
      dedupingInterval: parseInt(process.env.NEXT_PUBLIC_SWR_DEDUPING_INTERVAL || '2000', 10),
      revalidateOnFocus: process.env.NEXT_PUBLIC_SWR_REVALIDATE_FOCUS !== 'false',
      revalidateOnReconnect: process.env.NEXT_PUBLIC_SWR_REVALIDATE_RECONNECT !== 'false',
    },
    timeout: parseInt(process.env.API_TIMEOUT || '30000', 10), // 30 seconds
    retryAttempts: parseInt(process.env.API_RETRY_ATTEMPTS || '3', 10),
    retryDelay: parseInt(process.env.API_RETRY_DELAY || '1000', 10), // 1 second
  },

  // ============================================================================
  // EMAIL CONFIGURATION
  // ============================================================================
  email: {
    from: process.env.EMAIL_FROM || 'noreply@example.com',
    fromName: process.env.EMAIL_FROM_NAME || process.env.NEXT_PUBLIC_APP_NAME || 'Nextacular',
    subjectPrefix: process.env.EMAIL_SUBJECT_PREFIX || `[${process.env.NEXT_PUBLIC_APP_NAME || 'Nextacular'}]`,
    // Email templates configuration
    templates: {
      signin: {
        subject: process.env.EMAIL_SIGNIN_SUBJECT || 'Sign in to {appName}',
        greeting: process.env.EMAIL_SIGNIN_GREETING || 'Hi there!',
      },
      invitation: {
        subject: process.env.EMAIL_INVITATION_SUBJECT || 'You have been invited to {workspaceName}',
        greeting: process.env.EMAIL_INVITATION_GREETING || 'Hello!',
      },
      workspaceCreate: {
        subject: process.env.EMAIL_WORKSPACE_SUBJECT || 'Welcome to {workspaceName}',
        greeting: process.env.EMAIL_WORKSPACE_GREETING || 'Congratulations!',
      },
      emailUpdate: {
        subject: process.env.EMAIL_UPDATE_SUBJECT || 'Your email has been updated',
        greeting: process.env.EMAIL_UPDATE_GREETING || 'Hello!',
      },
    },
  },

  // ============================================================================
  // SITEMAP CONFIGURATION
  // ============================================================================
  sitemap: {
    staticPages: ['index', 'auth/login'],
    changeFrequency: process.env.SITEMAP_CHANGE_FREQUENCY || 'monthly',
    priority: parseFloat(process.env.SITEMAP_PRIORITY || '1.0'),
    schemaUrl: 'http://www.sitemaps.org/schemas/sitemap/0.9',
  },

  // ============================================================================
  // PLACEHOLDERS
  // ============================================================================
  placeholders: {
    email: process.env.NEXT_PUBLIC_PLACEHOLDER_EMAIL || 'user@email.com',
    name: process.env.NEXT_PUBLIC_PLACEHOLDER_NAME || 'John Doe',
    workspaceName: process.env.NEXT_PUBLIC_PLACEHOLDER_WORKSPACE || 'My Workspace',
    domain: process.env.NEXT_PUBLIC_PLACEHOLDER_DOMAIN || 'mydomain.com',
  },

  // ============================================================================
  // LANDING PAGE CONTENT
  // ============================================================================
  landing: {
    hero: {
      title: {
        line1: process.env.NEXT_PUBLIC_HERO_TITLE_1 || 'Build SaaS platforms',
        line2: process.env.NEXT_PUBLIC_HERO_TITLE_2 || 'like never before',
      },
      subtitle: process.env.NEXT_PUBLIC_HERO_SUBTITLE || 'Quickly build landing pages that will help you get results fast',
      ctaPrimary: process.env.NEXT_PUBLIC_HERO_CTA_PRIMARY || 'Get Started',
      ctaSecondary: process.env.NEXT_PUBLIC_HERO_CTA_SECONDARY || 'Live Demo',
      authenticatedCta: process.env.NEXT_PUBLIC_HERO_AUTH_CTA || 'Go to Dashboard',
      unauthenticatedCta: process.env.NEXT_PUBLIC_HERO_UNAUTH_CTA || 'Login',
    },
    features: {
      title: process.env.NEXT_PUBLIC_FEATURES_TITLE || 'A better way to build your SaaS',
      subtitle: process.env.NEXT_PUBLIC_FEATURES_SUBTITLE || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      items: [
        {
          title: process.env.NEXT_PUBLIC_FEATURE_1_TITLE || 'Excellent Services',
          description: process.env.NEXT_PUBLIC_FEATURE_1_DESC || 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        },
        {
          title: process.env.NEXT_PUBLIC_FEATURE_2_TITLE || 'Grow Your Market',
          description: process.env.NEXT_PUBLIC_FEATURE_2_DESC || 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        },
        {
          title: process.env.NEXT_PUBLIC_FEATURE_3_TITLE || 'Launch Time',
          description: process.env.NEXT_PUBLIC_FEATURE_3_DESC || 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        },
      ],
    },
    pricing: {
      title: process.env.NEXT_PUBLIC_PRICING_TITLE || 'The right pricing for you, whoever you are',
      subtitle: process.env.NEXT_PUBLIC_PRICING_SUBTITLE || 'It features multiple CSS components based on the Tailwind CSS design system',
      freeCta: process.env.NEXT_PUBLIC_PRICING_FREE_CTA || 'Get Started with Hobby',
      premiumCta: process.env.NEXT_PUBLIC_PRICING_PREMIUM_CTA || 'Get Started with Premium',
    },
    guides: {
      title: process.env.NEXT_PUBLIC_GUIDES_TITLE || 'Supercharge your website',
      subtitle: process.env.NEXT_PUBLIC_GUIDES_SUBTITLE || 'Lorem ipsum dolor sit amet',
    },
    testimonial: {
      quote: process.env.NEXT_PUBLIC_TESTIMONIAL_QUOTE || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      author: process.env.NEXT_PUBLIC_TESTIMONIAL_AUTHOR || 'Adam Warlock',
      position: process.env.NEXT_PUBLIC_TESTIMONIAL_POSITION || 'CEO at ABC Inc.',
      avatar: process.env.NEXT_PUBLIC_TESTIMONIAL_AVATAR || '/images/avatar.png',
    },
    cta: {
      title: process.env.NEXT_PUBLIC_CTA_TITLE || 'Build SaaS platforms like a PRO',
      subtitle: process.env.NEXT_PUBLIC_CTA_SUBTITLE || 'Start your free trial today',
      button: process.env.NEXT_PUBLIC_CTA_BUTTON || 'Subscribe Now',
    },
    footer: {
      links: [
        { label: 'About', href: '/about' },
        { label: 'Showcase', href: '/showcase' },
        { label: 'Community', href: '/community' },
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
      socialLinks: {
        twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || '',
        github: process.env.NEXT_PUBLIC_SOCIAL_GITHUB || '',
        linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || '',
        discord: process.env.NEXT_PUBLIC_SOCIAL_DISCORD || '',
      },
      copyright: process.env.NEXT_PUBLIC_COPYRIGHT || `© ${new Date().getFullYear()} {appName}. All rights reserved.`,
    },
  },

  // ============================================================================
  // SUCCESS/ERROR MESSAGES
  // ============================================================================
  messages: {
    login: {
      checkEmail: 'Please check your email ({email}) for the login link.',
      error: 'An error occurred during sign in. Please try again.',
    },
    workspace: {
      created: 'Workspace successfully created!',
      nameUpdated: 'Workspace name successfully updated!',
      slugUpdated: 'Workspace slug successfully updated!',
      deleted: 'Workspace successfully deleted!',
    },
    invitation: {
      sent: 'Invitations sent successfully!',
      accepted: 'Accepted invitation!',
      declined: 'Declined invitation!',
    },
    user: {
      nameUpdated: 'Name successfully updated!',
      emailUpdated: 'Email successfully updated and signing you out!',
      accountDeactivated: 'Account has been deactivated!',
    },
    domain: {
      added: 'Domain successfully added to workspace!',
      verified: 'Domain successfully verified!',
      deleted: 'Domain successfully deleted from workspace!',
    },
    clipboard: {
      copied: 'Copied to clipboard!',
    },
    billing: {
      upgrading: 'Redirecting to checkout...',
      upgraded: 'Subscription upgraded successfully!',
    },
    errors: {
      generic: 'An error occurred. Please try again.',
      unauthorized: 'You are not authorized to perform this action.',
      notFound: 'Resource not found.',
      validation: 'Please check your input and try again.',
    },
  },

  // ============================================================================
  // FEATURE FLAGS
  // ============================================================================
  features: {
    enableBilling: process.env.NEXT_PUBLIC_ENABLE_BILLING !== 'false',
    enableCustomDomains: process.env.NEXT_PUBLIC_ENABLE_CUSTOM_DOMAINS !== 'false',
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'false',
    enableInvitations: process.env.NEXT_PUBLIC_ENABLE_INVITATIONS !== 'false',
    enableWorkspaces: process.env.NEXT_PUBLIC_ENABLE_WORKSPACES !== 'false',
    enableDarkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE !== 'false',
    enableI18n: process.env.NEXT_PUBLIC_ENABLE_I18N !== 'false',
    enableSignup: process.env.NEXT_PUBLIC_ENABLE_SIGNUP !== 'false',
  },

  // ============================================================================
  // INTEGRATIONS
  // ============================================================================
  integrations: {
    googleAnalytics: {
      enabled: !!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
      trackingId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
    },
    stripe: {
      enabled: !!process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
      publishableKey: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY || '',
    },
    vercel: {
      ipAddress: process.env.NEXT_PUBLIC_VERCEL_IP_ADDRESS || '76.76.21.21',
      apiUrl: process.env.VERCEL_API_URL || 'https://api.vercel.com',
    },
  },
};

// Helper function to get nested config values
export const getConfig = (path) => {
  const keys = path.split('.');
  let value = appConfig;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }

  return value;
};

// Helper function to replace placeholders in strings
export const replacePlaceholders = (str, data = {}) => {
  if (!str) return str;

  let result = str;

  // Replace {appName}
  result = result.replace(/{appName}/g, data.appName || appConfig.app.name);

  // Replace {email}
  result = result.replace(/{email}/g, data.email || '');

  // Replace {workspaceName}
  result = result.replace(/{workspaceName}/g, data.workspaceName || '');

  // Replace any other custom placeholders
  Object.keys(data).forEach(key => {
    const regex = new RegExp(`{${key}}`, 'g');
    result = result.replace(regex, data[key]);
  });

  return result;
};

export { appConfig };
export default appConfig;
