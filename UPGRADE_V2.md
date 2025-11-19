# Upgrade Guide: Nextacular v1.x to v2.0

## 🎉 What's New in v2.0

Nextacular v2.0 is a **major upgrade** that brings the codebase to modern standards with the latest versions of all dependencies and introduces a powerful centralized configuration system.

---

## 📦 Package Upgrades

### Core Framework Updates

| Package | v1.x | v2.0 | Change |
|---------|------|------|--------|
| **Next.js** | 13.5.1 | **15.5.1** | Major upgrade with new features |
| **React** | 18.2.0 | **19.0.0** | Latest stable with new React features |
| **React DOM** | 18.2.0 | **19.0.0** | Matching React version |

### Styling & UI

| Package | v1.x | v2.0 | Change |
|---------|------|------|--------|
| **Tailwind CSS** | 3.0.11 | **3.4.17** | Latest v3 (v4 ready) |
| **@headlessui/react** | 1.7.7 | **2.2.0** | Major upgrade |
| **@heroicons/react** | 2.0.12 | **2.2.0** | Minor update |
| **next-themes** | 0.2.1 | **0.4.4** | Improved theme switching |

### Database & ORM

| Package | v1.x | v2.0 | Change |
|---------|------|------|--------|
| **Prisma** | 4.8.0 | **6.19.0** | Rust-free architecture, 90% smaller |
| **@prisma/client** | 4.8.0 | **6.19.0** | Matching Prisma version |

### Authentication

| Package | v1.x | v2.0 | Change |
|---------|------|------|--------|
| **next-auth** | 4.24.5 | **5.0.0-beta.25** | Now Auth.js v5 with new API |

### Payments

| Package | v1.x | v2.0 | Change |
|---------|------|------|--------|
| **stripe** | 10.13.0 | **17.6.0** | Latest Stripe API |
| **@stripe/stripe-js** | 1.38.1 | **5.2.0** | Matching Stripe version |

### Utilities & Libraries

| Package | v1.x | v2.0 | Change |
|---------|------|------|--------|
| **SWR** | 1.3.0 | **2.2.5** | Improved caching & revalidation |
| **date-fns** | 2.29.3 | **4.1.0** | Better date handling |
| **i18next** | 23.5.1 | **24.2.0** | Latest i18n features |
| **react-i18next** | 13.3.0 | **15.2.0** | Matching i18next |
| **react-ga** | 3.3.1 | **react-ga4 2.1.0** | GA4 support (UA deprecated) |
| **express-validator** | 6.14.2 | **7.2.0** | Better validation |

### Developer Experience

| Package | v1.x | v2.0 | Change |
|---------|------|------|--------|
| **TypeScript** | Not included | **5.7.2** | Full TypeScript support |
| **@types/node** | Not included | **22.10.2** | Node types |
| **@types/react** | Not included | **19.0.6** | React types |
| **ESLint** | 8.14.0 | **9.17.0** | Latest linting |

---

## 🎨 New Features

### 1. Centralized Configuration System

All hardcoded values are now configurable via environment variables!

**Before (v1.x):**
```javascript
// Hardcoded everywhere
const appName = 'Nextacular';
const maxMembers = 5;
```

**After (v2.0):**
```javascript
import { appConfig } from '@/config/app.config';
const appName = appConfig.app.name;
const maxMembers = appConfig.subscription.STANDARD.limits.members;
```

**Configure via `.env`:**
```env
NEXT_PUBLIC_APP_NAME=YourApp
NEXT_PUBLIC_PLAN_STANDARD_MEMBERS=5
```

### 2. Comprehensive Environment Variables

Over **100+ configurable environment variables** including:

- App branding (name, tagline, description)
- SEO metadata (title, description, og:image)
- Subscription plans (pricing, limits, names)
- Theme colors and styling
- Feature flags (enable/disable features)
- Landing page content
- Validation rules
- UI behavior (toast duration, date format)
- Email templates
- And much more!

### 3. TypeScript Support

Full TypeScript support with:
- `tsconfig.json` configured
- Type definitions for all dependencies
- Type-safe configuration (optional)
- Better IDE autocomplete

### 4. Improved Next.js Configuration

- Modern `next.config.js` with Next.js 15 features
- Security headers configured
- Image optimization with `remotePatterns`
- Server actions enabled
- Better webpack configuration

### 5. Feature Flags

Toggle features on/off without code changes:

```env
NEXT_PUBLIC_ENABLE_BILLING=true
NEXT_PUBLIC_ENABLE_CUSTOM_DOMAINS=true
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_ENABLE_INVITATIONS=true
NEXT_PUBLIC_ENABLE_WORKSPACES=true
```

### 6. Enhanced Documentation

- **USE_CASES.md** - 15+ real-world use cases
- **CONFIGURATION_GUIDE.md** - Complete configuration docs
- **UPGRADE_V2.md** - This upgrade guide
- **Updated claude.md** - Comprehensive developer guide

---

## 🔄 Migration Steps

### Step 1: Backup Your Project

```bash
# Create a backup branch
git checkout -b backup-v1
git push origin backup-v1

# Return to main branch
git checkout main
```

### Step 2: Update Package.json

Replace your `package.json` with the new version or manually update all dependencies to match v2.0 versions.

### Step 3: Install Dependencies

```bash
# Remove old dependencies
rm -rf node_modules package-lock.json

# Install new dependencies
npm install
```

### Step 4: Update Environment Variables

```bash
# Copy new environment template
cp .env.example .env.new

# Migrate your existing values
# Compare .env with .env.new and add new variables
```

**Key new variables to add:**
```env
# App Identity
NEXT_PUBLIC_APP_NAME=YourAppName
NEXT_PUBLIC_APP_URL=https://yourapp.com

# Plans Configuration
NEXT_PUBLIC_PLAN_FREE_WORKSPACES=1
NEXT_PUBLIC_PLAN_STANDARD_PRICE=9
NEXT_PUBLIC_PLAN_PREMIUM_PRICE=29

# Feature Flags
NEXT_PUBLIC_ENABLE_BILLING=true
NEXT_PUBLIC_ENABLE_CUSTOM_DOMAINS=true
```

### Step 5: Update Database

```bash
# Generate new Prisma client
npx prisma generate

# Run migrations (if any schema changes)
npx prisma migrate deploy
```

### Step 6: Update Configuration Files

#### Update `next.config.js`

The old config format is deprecated. Use the new format provided in v2.0.

**Old:**
```javascript
module.exports = {
  images: {
    domains: [''],
  },
  reactStrictMode: true,
};
```

**New:**
```javascript
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  reactStrictMode: true,
  // ... more config
};
```

### Step 7: Update Custom Code

#### If you customized subscription limits:

**Before:**
```javascript
// src/config/subscription-rules/index.js
const rules = {
  [SubscriptionType.FREE]: {
    customDomains: 2, // Your custom value
    members: 3,
    workspaces: 1,
  },
};
```

**After:**
```env
# .env
NEXT_PUBLIC_PLAN_FREE_DOMAINS=2
NEXT_PUBLIC_PLAN_FREE_MEMBERS=3
NEXT_PUBLIC_PLAN_FREE_WORKSPACES=1
```

The `subscription-rules/index.js` now reads from `app.config.js` automatically.

#### If you customized branding:

**Before:** Search and replace throughout codebase

**After:** Just update `.env`
```env
NEXT_PUBLIC_APP_NAME=YourBrand
NEXT_PUBLIC_HERO_TITLE_1=Your Tagline
```

### Step 8: Test Everything

```bash
# Start development server
npm run dev

# Test all features:
# - Authentication (login/logout)
# - Workspace creation
# - Team invitations
# - Domain management
# - Billing (if enabled)
# - All custom features

# Run build to check for errors
npm run build
```

### Step 9: Update CI/CD (if applicable)

Update your deployment configuration to include new environment variables.

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add all new `NEXT_PUBLIC_*` variables
3. Redeploy

**Other platforms:**
Update your deployment config files with new environment variables.

---

## ⚠️ Breaking Changes

### 1. Next.js 15 Changes

- **App Router is now stable** (but Pages Router still supported)
- Image `domains` config deprecated → use `remotePatterns`
- Some middleware changes (check `src/middleware.js`)

**Action:** Review Next.js 15 migration guide if you have custom middleware or API routes.

### 2. React 19 Changes

- Ref as a prop (no more `forwardRef` needed)
- React Server Components stable
- New hooks (`use`, `useOptimistic`, etc.)

**Action:** Most changes are backwards compatible. Update custom components if needed.

### 3. NextAuth.js v5 (Auth.js)

- New `auth()` method replaces multiple methods
- Configuration structure changed
- Minimum Next.js version now 14

**Action:** Current v4 config is mostly compatible. Full migration to v5 API optional.

### 4. Prisma 6

- Rust-free architecture (90% smaller bundles)
- New adapter for serverless (Neon, PlanetScale)
- Better edge runtime support

**Action:** Run `npx prisma generate` and test database operations.

### 5. Google Analytics

- Switched from `react-ga` (UA) to `react-ga4` (GA4)
- Universal Analytics (UA) deprecated by Google

**Action:** Update `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` to GA4 format (`G-XXXXXXXXXX`)

### 6. Headless UI v2

- Some component API changes
- Better TypeScript support
- New components available

**Action:** Test all custom Headless UI components (modals, dropdowns, etc.)

---

## 🐛 Troubleshooting

### Build Errors

**Error:** `Cannot find module '@/config/app.config'`

**Solution:**
```bash
# Ensure jsconfig.json or tsconfig.json is configured
# Restart your IDE
# Clear Next.js cache
rm -rf .next && npm run dev
```

---

**Error:** `Environment variable NEXT_PUBLIC_APP_NAME is undefined`

**Solution:**
```bash
# Add to .env
NEXT_PUBLIC_APP_NAME=YourApp

# Restart dev server
npm run dev
```

---

**Error:** Type errors with Prisma

**Solution:**
```bash
npx prisma generate
npm run dev
```

---

### Runtime Errors

**Error:** Subscription limits not working

**Solution:**
Check that your environment variables are set correctly:
```env
NEXT_PUBLIC_PLAN_FREE_WORKSPACES=1
NEXT_PUBLIC_PLAN_STANDARD_WORKSPACES=5
NEXT_PUBLIC_PLAN_PREMIUM_WORKSPACES=10
```

---

**Error:** Theme colors not changing

**Solution:**
```env
# Make sure you're using hex colors
NEXT_PUBLIC_THEME_PRIMARY=#2563eb

# Restart dev server
npm run dev
```

---

### Database Issues

**Error:** Prisma schema errors

**Solution:**
```bash
# Reset database (CAUTION: Deletes all data)
npx prisma migrate reset

# Or just regenerate client
npx prisma generate
```

---

## 📚 New Documentation

Make sure to review these new guides:

1. **[USE_CASES.md](./USE_CASES.md)** - 15+ real-world applications you can build
2. **[CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md)** - Complete configuration reference
3. **[claude.md](./claude.md)** - Updated development guide

---

## ✅ Post-Upgrade Checklist

- [ ] All dependencies installed successfully
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Prisma client generated
- [ ] Dev server starts without errors
- [ ] Authentication works (login/logout)
- [ ] Workspace creation works
- [ ] Team invitations work
- [ ] Subscription limits enforced correctly
- [ ] Custom domains work (if enabled)
- [ ] Billing works (if enabled)
- [ ] All custom features work
- [ ] Production build succeeds
- [ ] Deployment configuration updated
- [ ] Tests pass (if you have tests)

---

## 🚀 Next Steps

After upgrading:

1. **Review new features** in USE_CASES.md
2. **Customize your app** using CONFIGURATION_GUIDE.md
3. **Update branding** via environment variables
4. **Add new features** you need
5. **Deploy** to production

---

## 🆘 Getting Help

If you encounter issues:

1. Check [CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md)
2. Review [Next.js 15 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-15)
3. Check [Prisma 6 migration guide](https://www.prisma.io/docs/guides/upgrade-guides/upgrading-versions)
4. Open an issue on GitHub
5. Join our Discord community

---

## 🎯 Summary

Nextacular v2.0 is a **massive upgrade** that brings:

✅ **Latest technologies** (Next.js 15, React 19, Prisma 6)
✅ **Centralized configuration** (100+ environment variables)
✅ **TypeScript support** (full type safety)
✅ **Better performance** (90% smaller Prisma bundles)
✅ **More flexibility** (feature flags, customization)
✅ **Better docs** (use cases, configuration guide)

**Upgrade time:** 30-60 minutes for most projects

**Worth it?** Absolutely! 🚀

---

**Welcome to Nextacular v2.0!** 🎉
