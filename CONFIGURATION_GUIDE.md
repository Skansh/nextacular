# Nextacular Configuration Guide

> ⚠️ **v2.0 Status:** Currently in **alpha** - Configuration system is complete but integration into components/pages is in progress (15%). See [STATUS.md](./STATUS.md) for details.

## Overview

Nextacular v2.0 introduces a **centralized configuration system** that makes it easy to customize every aspect of your SaaS application. All configuration is done through environment variables and the `src/config/app.config.js` file.

### Implementation Status

**✅ Ready to Use:**
- Configuration file (`src/config/app.config.js`)
- Environment variables template (`.env.example`)
- Helper functions (`getConfig`, `replacePlaceholders`)
- Subscription rules integration
- SWR configuration integration
- Progress bar configuration integration

**🚧 In Progress:**
- Component integration (most components still use hardcoded values)
- Page integration (landing page, dashboard, etc.)
- Email template integration
- Validation rules integration

Check [STATUS.md](./STATUS.md) for detailed integration progress.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Environment Variables](#environment-variables)
3. [Configuration Structure](#configuration-structure)
4. [Common Customizations](#common-customizations)
5. [Advanced Configuration](#advanced-configuration)
6. [Migration Guide](#migration-guide)

---

## Quick Start

### 1. Copy the environment file

```bash
cp .env.example .env
```

### 2. Update basic branding

```env
NEXT_PUBLIC_APP_NAME=YourAppName
NEXT_PUBLIC_APP_TAGLINE=Your app tagline
NEXT_PUBLIC_APP_URL=https://yourapp.com
```

### 3. Configure database

```env
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
```

### 4. Set up authentication

```env
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://yourapp.com
```

### 5. Start developing!

```bash
npm install
npm run dev
```

---

## Environment Variables

### Required Variables

These **must** be configured for the app to work:

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/database
```

### Branding Variables

Customize your app's identity:

```env
# Basic Branding
NEXT_PUBLIC_APP_NAME=Nextacular
NEXT_PUBLIC_APP_TAGLINE=Build SaaS platforms like never before
NEXT_PUBLIC_APP_DESCRIPTION=A boilerplate for your NextJS SaaS projects

# Localization
NEXT_PUBLIC_APP_LOCALE=en
NEXT_PUBLIC_APP_CURRENCY=USD
NEXT_PUBLIC_APP_CURRENCY_SYMBOL=$
```

### SEO Variables

Optimize for search engines:

```env
NEXT_PUBLIC_SEO_TITLE=Your SEO Title
NEXT_PUBLIC_SEO_DESCRIPTION=Your meta description
NEXT_PUBLIC_SEO_KEYWORDS=keyword1, keyword2, keyword3
NEXT_PUBLIC_SEO_OG_IMAGE=/images/og-image.png
NEXT_PUBLIC_SEO_TWITTER_HANDLE=@yourhandle
```

### Subscription Plans

Configure pricing and limits:

```env
# Free Plan
NEXT_PUBLIC_PLAN_FREE_NAME=Hobby
NEXT_PUBLIC_PLAN_FREE_WORKSPACES=1
NEXT_PUBLIC_PLAN_FREE_MEMBERS=1
NEXT_PUBLIC_PLAN_FREE_DOMAINS=1
NEXT_PUBLIC_PLAN_FREE_STORAGE=100
NEXT_PUBLIC_PLAN_FREE_API_CALLS=1000

# Standard Plan
NEXT_PUBLIC_PLAN_STANDARD_NAME=Standard
NEXT_PUBLIC_PLAN_STANDARD_PRICE=9
NEXT_PUBLIC_PLAN_STANDARD_WORKSPACES=5
NEXT_PUBLIC_PLAN_STANDARD_MEMBERS=5
NEXT_PUBLIC_PLAN_STANDARD_DOMAINS=3

# Premium Plan
NEXT_PUBLIC_PLAN_PREMIUM_NAME=Premium
NEXT_PUBLIC_PLAN_PREMIUM_PRICE=29
NEXT_PUBLIC_PLAN_PREMIUM_WORKSPACES=10
NEXT_PUBLIC_PLAN_PREMIUM_MEMBERS=10
NEXT_PUBLIC_PLAN_PREMIUM_DOMAINS=5
```

### Theme & Styling

Customize colors and appearance:

```env
NEXT_PUBLIC_THEME_DEFAULT=light
NEXT_PUBLIC_THEME_PRIMARY=#2563eb
NEXT_PUBLIC_THEME_DANGER=#dc2626
NEXT_PUBLIC_THEME_SUCCESS=#16a34a
NEXT_PUBLIC_ENABLE_DARK_MODE=true
```

### Feature Flags

Enable or disable features:

```env
NEXT_PUBLIC_ENABLE_BILLING=true
NEXT_PUBLIC_ENABLE_CUSTOM_DOMAINS=true
NEXT_PUBLIC_ENABLE_INVITATIONS=true
NEXT_PUBLIC_ENABLE_WORKSPACES=true
NEXT_PUBLIC_ENABLE_I18N=true
NEXT_PUBLIC_ENABLE_SIGNUP=true
```

### Landing Page Content

Customize your homepage:

```env
NEXT_PUBLIC_HERO_TITLE_1=Build SaaS platforms
NEXT_PUBLIC_HERO_TITLE_2=like never before
NEXT_PUBLIC_HERO_SUBTITLE=Quickly build landing pages
NEXT_PUBLIC_HERO_CTA_PRIMARY=Get Started
NEXT_PUBLIC_HERO_CTA_SECONDARY=Live Demo
```

---

## Configuration Structure

### Using `app.config.js`

All configuration is centralized in `src/config/app.config.js`. This file:
- Reads from environment variables
- Provides sensible defaults
- Exports a typed configuration object
- Includes helper functions

#### Basic Usage

```javascript
import { appConfig } from '@/config/app.config';

// Access configuration
const appName = appConfig.app.name;
const primaryColor = appConfig.theme.colors.primary;
const freeLimit = appConfig.subscription.FREE.limits.workspaces;
```

#### Using Helper Functions

```javascript
import { getConfig, replacePlaceholders } from '@/config/app.config';

// Get nested config value
const maxLength = getConfig('validation.user.name.maxLength'); // 32

// Replace placeholders in strings
const subject = replacePlaceholders(
  'Welcome to {appName}!',
  { appName: 'MyApp' }
); // "Welcome to MyApp!"
```

### Configuration Categories

The config is organized into logical sections:

| Category | Description | Example Keys |
|----------|-------------|--------------|
| `app` | App identity & basic info | `name`, `tagline`, `url` |
| `seo` | SEO & meta tags | `title`, `description`, `ogImage` |
| `assets` | Image & asset paths | `logo`, `favicon`, `seoImage` |
| `theme` | Colors & styling | `colors.primary`, `defaultMode` |
| `subscription` | Plan limits & pricing | `FREE`, `STANDARD`, `PREMIUM` |
| `validation` | Input validation rules | `user.name.maxLength` |
| `ui` | UI behavior | `toast.duration`, `dateFormat` |
| `api` | API configuration | `swr.refreshInterval`, `timeout` |
| `email` | Email settings | `from`, `templates` |
| `sitemap` | Sitemap generation | `staticPages`, `changeFrequency` |
| `placeholders` | Default placeholder text | `email`, `domain` |
| `landing` | Landing page content | `hero`, `features`, `pricing` |
| `messages` | Success/error messages | `login.checkEmail` |
| `features` | Feature flags | `enableBilling`, `enableDarkMode` |
| `integrations` | Third-party services | `stripe`, `googleAnalytics` |

---

## Common Customizations

### 1. Change App Name & Branding

**Goal:** Rebrand the entire application

```env
# .env
NEXT_PUBLIC_APP_NAME=ProjectFlow
NEXT_PUBLIC_APP_TAGLINE=Manage projects seamlessly
NEXT_PUBLIC_SEO_TITLE=ProjectFlow - Project Management Made Easy
```

**Result:** App name changes everywhere (navbar, emails, meta tags, etc.)

---

### 2. Modify Subscription Plans

**Goal:** Create custom pricing tiers

```env
# Make Free plan more generous
NEXT_PUBLIC_PLAN_FREE_WORKSPACES=3
NEXT_PUBLIC_PLAN_FREE_MEMBERS=5

# Adjust Standard pricing
NEXT_PUBLIC_PLAN_STANDARD_PRICE=19
NEXT_PUBLIC_PLAN_STANDARD_NAME=Pro

# Rename Premium to Enterprise
NEXT_PUBLIC_PLAN_PREMIUM_NAME=Enterprise
NEXT_PUBLIC_PLAN_PREMIUM_PRICE=99
```

---

### 3. Customize Colors

**Goal:** Match your brand colors

```env
NEXT_PUBLIC_THEME_PRIMARY=#6366f1        # Indigo
NEXT_PUBLIC_THEME_PRIMARY_HOVER=#4f46e5
NEXT_PUBLIC_THEME_DANGER=#ef4444         # Red
NEXT_PUBLIC_THEME_SUCCESS=#10b981        # Emerald
NEXT_PUBLIC_THEME_PROGRESS_COLOR=#6366f1
```

For Tailwind colors, also update `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
        },
      },
    },
  },
};
```

---

### 4. Disable Features

**Goal:** Remove features you don't need

```env
# Disable billing/payments
NEXT_PUBLIC_ENABLE_BILLING=false

# Disable custom domains
NEXT_PUBLIC_ENABLE_CUSTOM_DOMAINS=false

# Disable dark mode
NEXT_PUBLIC_ENABLE_DARK_MODE=false
```

**Note:** You may need to update UI components to respect these flags.

---

### 5. Change Landing Page Content

**Goal:** Customize homepage messaging

```env
NEXT_PUBLIC_HERO_TITLE_1=Streamline your workflow
NEXT_PUBLIC_HERO_TITLE_2=and boost productivity
NEXT_PUBLIC_HERO_SUBTITLE=The all-in-one project management solution
NEXT_PUBLIC_HERO_CTA_PRIMARY=Start Free Trial
NEXT_PUBLIC_HERO_CTA_SECONDARY=Watch Demo

NEXT_PUBLIC_FEATURES_TITLE=Why choose us?
NEXT_PUBLIC_PRICING_TITLE=Simple, transparent pricing
```

---

### 6. Adjust Validation Rules

**Goal:** Change input restrictions

```env
# Allow longer names
VALIDATION_USER_NAME_MAX=64
VALIDATION_WORKSPACE_NAME_MAX=32

# Change invite code length
VALIDATION_INVITE_CODE_LENGTH=8
```

---

### 7. Configure Email Templates

**Goal:** Customize email messaging

```env
EMAIL_FROM=hello@yourcompany.com
EMAIL_FROM_NAME=YourCompany Team
EMAIL_SUBJECT_PREFIX=[YourCompany]

EMAIL_SIGNIN_SUBJECT=Sign in to {appName}
EMAIL_SIGNIN_GREETING=Welcome back!
EMAIL_INVITATION_SUBJECT=You're invited to {workspaceName}
```

---

## Advanced Configuration

### 1. Adding New Configuration Keys

#### Step 1: Add to `app.config.js`

```javascript
// src/config/app.config.js
const appConfig = {
  // ... existing config

  // Add new section
  notifications: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS !== 'false',
    channels: {
      email: process.env.NEXT_PUBLIC_NOTIFY_EMAIL !== 'false',
      sms: process.env.NEXT_PUBLIC_NOTIFY_SMS === 'true',
      push: process.env.NEXT_PUBLIC_NOTIFY_PUSH === 'true',
    },
  },
};
```

#### Step 2: Add to `.env.example`

```env
# Notifications
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_NOTIFY_EMAIL=true
NEXT_PUBLIC_NOTIFY_SMS=false
NEXT_PUBLIC_NOTIFY_PUSH=false
```

#### Step 3: Use in code

```javascript
import { appConfig } from '@/config/app.config';

if (appConfig.notifications.channels.email) {
  await sendEmailNotification();
}
```

---

### 2. Environment-Specific Configuration

Use different configs per environment:

```javascript
// src/config/app.config.js
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const appConfig = {
  api: {
    timeout: isDevelopment ? 60000 : 30000,
    retryAttempts: isDevelopment ? 1 : 3,
  },
  debug: {
    enabled: isDevelopment,
    verboseLogs: isDevelopment,
  },
};
```

---

### 3. Runtime Configuration

For values that change at runtime:

```javascript
// src/lib/runtime-config.js
export const getRuntimeConfig = () => {
  return {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || window.location.origin,
    wsUrl: process.env.NEXT_PUBLIC_WS_URL || `wss://${window.location.host}`,
  };
};
```

---

### 4. Type-Safe Configuration (TypeScript)

Create types for your config:

```typescript
// src/types/config.ts
export interface AppConfig {
  app: {
    name: string;
    tagline: string;
    url: string;
  };
  subscription: {
    FREE: SubscriptionTier;
    STANDARD: SubscriptionTier;
    PREMIUM: SubscriptionTier;
  };
}

export interface SubscriptionTier {
  name: string;
  price: number;
  limits: {
    workspaces: number;
    members: number;
    customDomains: number;
  };
}
```

Then use in your config file:

```typescript
// src/config/app.config.ts
import { AppConfig } from '@/types/config';

export const appConfig: AppConfig = {
  // ... config with full type safety
};
```

---

## Migration Guide

### Migrating from Hardcoded Values

If upgrading from an older version with hardcoded values:

#### 1. Find hardcoded values

```bash
# Search for hardcoded app name
grep -r "Nextacular" src/

# Search for hardcoded prices
grep -r "\$9" src/
```

#### 2. Replace with config

**Before:**
```javascript
const appName = 'Nextacular';
```

**After:**
```javascript
import { appConfig } from '@/config/app.config';
const appName = appConfig.app.name;
```

#### 3. Update environment

Add corresponding env vars to `.env`:

```env
NEXT_PUBLIC_APP_NAME=Nextacular
```

#### 4. Test thoroughly

```bash
# Run in development
npm run dev

# Build for production
npm run build

# Test all features work correctly
```

---

## Best Practices

### ✅ Do's

- **Use environment variables** for all configurable values
- **Keep secrets secure** (never commit `.env` to git)
- **Document custom configs** in your project's README
- **Use `NEXT_PUBLIC_` prefix** for client-side accessible vars
- **Provide defaults** in `app.config.js` for all values
- **Group related configs** together logically

### ❌ Don'ts

- **Don't hardcode** values in components or pages
- **Don't mix config locations** (keep it centralized)
- **Don't skip validation** on config values
- **Don't expose secrets** to the client (no `NEXT_PUBLIC_` prefix)
- **Don't forget** to update `.env.example` when adding new vars

---

## Troubleshooting

### Config Value Not Updating

**Problem:** Changed `.env` but value isn't updating

**Solutions:**
1. Restart the dev server: `Ctrl+C` and `npm run dev`
2. Clear `.next` cache: `rm -rf .next && npm run dev`
3. Check you're using `NEXT_PUBLIC_` prefix for client-side vars
4. Verify the environment variable name matches exactly

---

### Environment Variables Not Loading

**Problem:** `process.env.VARIABLE` is undefined

**Solutions:**
1. Ensure variable is in `.env` file (not `.env.example`)
2. Check file is at project root (not in subdirectory)
3. Use `NEXT_PUBLIC_` prefix for client components
4. Restart your development server

---

### Type Errors in TypeScript

**Problem:** TypeScript complains about config types

**Solution:**
```typescript
// Create type definitions
declare module '@/config/app.config' {
  export const appConfig: AppConfig;
  export function getConfig(path: string): any;
}
```

---

## Examples

### Example 1: Building a CRM

```env
# .env for CRM application
NEXT_PUBLIC_APP_NAME=SalesPro
NEXT_PUBLIC_APP_TAGLINE=Close more deals
NEXT_PUBLIC_SEO_TITLE=SalesPro - CRM for Sales Teams

# Adjust limits for CRM needs
NEXT_PUBLIC_PLAN_FREE_WORKSPACES=1
NEXT_PUBLIC_PLAN_FREE_MEMBERS=3
NEXT_PUBLIC_PLAN_FREE_API_CALLS=500

NEXT_PUBLIC_PLAN_STANDARD_NAME=Team
NEXT_PUBLIC_PLAN_STANDARD_PRICE=49
NEXT_PUBLIC_PLAN_STANDARD_MEMBERS=10
NEXT_PUBLIC_PLAN_STANDARD_API_CALLS=5000

# Disable custom domains (not needed for CRM)
NEXT_PUBLIC_ENABLE_CUSTOM_DOMAINS=false
```

### Example 2: Building an Educational Platform

```env
# .env for LMS
NEXT_PUBLIC_APP_NAME=LearnHub
NEXT_PUBLIC_APP_TAGLINE=Education without limits
NEXT_PUBLIC_SEO_TITLE=LearnHub - Online Learning Platform

# Students don't need workspaces
NEXT_PUBLIC_PLAN_FREE_WORKSPACES=0
NEXT_PUBLIC_PLAN_FREE_MEMBERS=1

# Instructors can create courses
NEXT_PUBLIC_PLAN_STANDARD_NAME=Instructor
NEXT_PUBLIC_PLAN_STANDARD_WORKSPACES=5
NEXT_PUBLIC_PLAN_STANDARD_MEMBERS=50

# Institutions need more
NEXT_PUBLIC_PLAN_PREMIUM_NAME=Institution
NEXT_PUBLIC_PLAN_PREMIUM_WORKSPACES=50
NEXT_PUBLIC_PLAN_PREMIUM_MEMBERS=500
```

---

## Summary

The centralized configuration system in Nextacular v2.0 makes it incredibly easy to customize every aspect of your SaaS without touching the codebase. Simply:

1. **Copy `.env.example` to `.env`**
2. **Update environment variables** for your needs
3. **Restart the dev server**
4. **Your changes are live!**

For advanced customizations, edit `src/config/app.config.js` directly.

---

**Questions?** Check the [documentation](https://github.com/nextacular/nextacular) or open an issue!
