# Nextacular - Claude Development Guide

## Project Overview

**Nextacular** is an open-source multi-tenant SaaS starter kit built with Next.js 13, designed to help developers quickly launch full-stack SaaS platforms with pre-built essential features.

**Repository:** nextacular
**Primary Tech Stack:** Next.js 13.5.1, React 18.2.0, Tailwind CSS, Prisma, PostgreSQL, NextAuth.js

---

## Quick Reference

### Key Directories

```
nextacular/
├── prisma/                      # Database schema, migrations, services
│   ├── schema.prisma           # Main database schema
│   └── services/               # Data access layer (workspace, domain, user, etc.)
├── src/
│   ├── components/             # Reusable UI components
│   ├── pages/                  # Next.js pages & API routes
│   │   ├── api/                # RESTful API endpoints
│   │   ├── account/            # Dashboard pages
│   │   ├── auth/               # Authentication pages
│   │   └── _sites/[site]/      # Multi-tenant subdomain pages
│   ├── lib/                    # Utilities (client & server)
│   ├── hooks/                  # Custom React hooks
│   ├── layouts/                # Page layouts
│   ├── config/                 # Configuration files
│   ├── sections/               # Landing page sections
│   └── middleware.js           # Multi-tenancy routing
└── public/                     # Static assets
```

### Path Aliases (jsconfig.json)

Use these shortcuts throughout the codebase:
```javascript
@/prisma/*       → prisma/*
@/components/*   → src/components/*
@/config/*       → src/config/*
@/hooks/*        → src/hooks/*
@/layouts/*      → src/layouts/*
@/lib/*          → src/lib/*
@/providers/*    → src/providers/*
@/sections/*     → src/sections/*
@/styles/*       → src/styles/*
```

---

## Core Features

### 1. Multi-Tenancy Architecture

**File:** `src/middleware.js:1`

The platform supports three types of multi-tenancy:
- **Subdomains**: `workspace.yourdomain.com`
- **Custom Domains**: `workspace.com` (mapped to specific workspace)
- **Slug-based**: `/account/[workspaceSlug]`

**How it works:**
- Middleware intercepts requests and checks the hostname
- Rewrites URLs to `_sites/[site]` pattern for subdomain/custom domain access
- Workspace lookup via domain or subdomain
- Pages in `src/pages/_sites/[site]/` render workspace-specific content

**Key files:**
- `src/middleware.js:1` - Routing logic
- `src/pages/_sites/[site]/index.js:1` - Site page template
- `prisma/services/workspace.js:125` - `getSiteWorkspace()`

### 2. Authentication System

**Provider:** NextAuth.js with Prisma adapter
**Strategy:** Passwordless (magic links via email)

**Key files:**
- `src/pages/api/auth/[...nextauth].js:1` - NextAuth configuration
- `src/lib/server/auth.js:1` - Auth utilities
- `src/lib/server/session-check.js:1` - Session validation middleware

**Flow:**
1. User enters email → `POST /api/auth/signin/email`
2. Magic link sent via Nodemailer
3. User clicks link → `GET /api/auth/callback/email`
4. Session created with JWT

**Protection patterns:**
```javascript
// API routes
const session = await validateSession(req, res);

// Pages
const { status } = useSession({ required: true });
```

### 3. Workspace Management

**Service:** `prisma/services/workspace.js:1`

**Key functions:**
- `createWorkspace(userId, name, slug)` - Auto-generates slug if conflict
- `deleteWorkspace(workspaceId)` - Cascade deletes members & domains
- `updateName(workspaceId, name)`
- `updateSlug(workspaceId, slug)`
- `getWorkspace(workspaceId)`
- `isWorkspaceOwner(userId, workspaceId)` - Check ownership
- `isWorkspaceCreator(userId, workspaceId)` - Check creator

**API endpoints:**
- `GET /api/workspaces` - List user's workspaces
- `POST /api/workspace` - Create workspace
- `GET /api/workspace/[workspaceSlug]` - Get workspace details
- `PUT /api/workspace/[workspaceSlug]/name` - Update name
- `PUT /api/workspace/[workspaceSlug]/slug` - Update slug
- `DELETE /api/workspace/[workspaceSlug]` - Delete workspace

### 4. Team Collaboration

**Service:** `prisma/services/membership.js:1`

**Roles:** OWNER, MEMBER
**Invitation Status:** PENDING, ACCEPTED, DECLINED

**Workflow:**
1. Owner invites via email → `POST /api/workspace/[workspaceSlug]/invite`
2. Email sent to invitee with link
3. Invitee clicks link → sees invitation page
4. Accept → `POST /api/workspace/team/accept` or Decline → `POST /api/workspace/team/decline`
5. Alternative: Join via invite code → `POST /api/workspace/team/join`

**API endpoints:**
- `GET /api/workspace/[workspaceSlug]/members` - List members
- `POST /api/workspace/[workspaceSlug]/invite` - Send invitations
- `DELETE /api/workspace/team/member` - Remove member
- `PUT /api/workspace/team/role` - Toggle role
- `GET /api/workspaces/invitations` - Pending invitations

### 5. Custom Domains

**Service:** `prisma/services/domain.js:1`

**Features:**
- Add custom domains per workspace
- DNS verification system
- Subdomain generation
- Domain limits based on subscription tier

**Verification:**
- Uses A/CNAME record checks
- Points to Vercel IP address (`NEXT_PUBLIC_VERCEL_IP_ADDRESS`)
- Integrates with Vercel API for domain management

**API endpoints:**
- `GET /api/workspace/[workspaceSlug]/domains` - List domains
- `POST /api/workspace/[workspaceSlug]/domain` - Add domain
- `DELETE /api/workspace/[workspaceSlug]/domain` - Remove domain
- `POST /api/workspace/domain/check` - Verify DNS configuration

### 6. Billing & Subscriptions

**Provider:** Stripe
**File:** `src/lib/server/stripe.js:1`

**Tiers:** FREE, STANDARD, PREMIUM

**Subscription limits:** (`src/config/subscription-rules/index.js:1`)
```javascript
FREE: {
  workspaces: 1,
  members: 1,
  customDomains: 1
}
STANDARD: {
  workspaces: 5,
  members: 5,
  customDomains: 3
}
PREMIUM: {
  workspaces: 10,
  members: 10,
  customDomains: 5
}
```

**Stripe Integration:**
- Checkout session creation → `POST /api/payments/subscription/[priceId]`
- Webhook handling → `POST /api/payments/hooks`
- Customer management via `prisma/services/customer.js:1`

**Payment events handled:**
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

---

## Database Schema

**ORM:** Prisma
**Database:** PostgreSQL
**Schema:** `prisma/schema.prisma:1`

### Core Models

```prisma
User {
  id: String (cuid)
  userCode: String (unique)
  name: String
  email: String (unique)
  workspaces: Workspace[]
  memberships: Member[]
  payment: CustomerPayment?
}

Workspace {
  id: String (cuid)
  workspaceCode: String (unique)
  inviteCode: String (unique, 6 chars)
  name: String
  slug: String (unique)
  creator: User
  members: Member[]
  domains: Domain[]
}

Member {
  id: String (cuid)
  workspace: Workspace
  email: String
  inviter: String
  status: InvitationStatus (PENDING, ACCEPTED, DECLINED)
  teamRole: TeamRole (OWNER, MEMBER)
  // Unique: workspaceId + email
}

Domain {
  id: String (cuid)
  workspace: Workspace
  addedBy: User
  name: String (unique)
  subdomain: String
  verified: Boolean
  value: Json (DNS records)
}

CustomerPayment {
  id: String (cuid)
  user: User (one-to-one)
  paymentId: String (Stripe customer ID)
  email: String
  subscriptionType: SubscriptionType (FREE, STANDARD, PREMIUM)
}
```

### Database Commands

```bash
# Development
npx prisma migrate dev              # Create & apply migration
npx prisma studio                   # GUI database browser
npx prisma generate                 # Generate Prisma Client

# Production
npx prisma migrate deploy           # Apply migrations
npx prisma db seed                  # Seed admin user
```

---

## API Architecture

**Pattern:** RESTful API using Next.js API Routes
**Base Path:** `/api/`
**Validation:** express-validator
**Error Format:** `{ errors: { field: { msg: "error message" } } }`

### API Route Template

```javascript
import { validateSession } from '@/lib/server/session-check';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    const session = await validateSession(req, res);
    // ... logic
    res.status(200).json({ data: result });
  } else {
    res.status(405).json({
      errors: { error: { msg: `${method} method unsupported` } }
    });
  }
}
```

### Validation

**Location:** `src/config/api-validation/`

**Example:**
```javascript
// src/config/api-validation/workspace-name.js
export const validateWorkspaceName = [
  check('name')
    .isLength({ min: 1, max: 32 })
    .withMessage('Name must be between 1 and 32 characters'),
];
```

---

## UI Components

### Layout System

**Files:** `src/layouts/`

1. **AccountLayout** - Authenticated pages
   - Includes: Sidebar, Header, Auth check
   - Used by: Dashboard, Settings pages

2. **LandingLayout** - Marketing pages
   - Minimal layout for homepage

3. **AuthLayout** - Login/Signup
   - Centered content, no navigation

### Component Library

**Files:** `src/components/`

**Core Components:**

```javascript
// Button
<Button>Click me</Button>

// Card
<Card>
  <Card.Body title="Title" subtitle="Description" />
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>

// Modal
<Modal show={isOpen} toggle={setOpen} title="Modal Title">
  {/* content */}
</Modal>

// Content
<Content>
  <Content.Title title="Page Title" subtitle="Description" />
  <Content.Divider />
  <Content.Container>
    {/* content */}
  </Content.Container>
</Content>
```

### Styling Patterns

**Framework:** Tailwind CSS
**Dark Mode:** Class-based (`dark:` prefix)

**Common patterns:**
```javascript
// Card
className="px-10 py-5 space-y-3 border rounded-lg"

// Button primary
className="px-5 py-2 text-white bg-blue-600 rounded hover:bg-blue-500"

// Input
className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600"
```

---

## Data Fetching

**Library:** SWR (React Hooks for data fetching)
**Configuration:** `src/config/swr/index.js:1`

### Custom Hooks

**Location:** `src/hooks/data/`

**Examples:**

```javascript
// src/hooks/data/useWorkspaces.js
export const useWorkspaces = () => {
  const { data, error } = useSWR('/api/workspaces', fetcher);
  return {
    workspaces: data?.workspaces,
    isLoading: !error && !data,
    isError: error,
  };
};

// src/hooks/data/useMembers.js
export const useMembers = (workspaceSlug) => {
  const { data, error } = useSWR(
    `/api/workspace/${workspaceSlug}/members`,
    fetcher
  );
  return { members: data?.members, isLoading: !error && !data, isError: error };
};
```

**Fetcher:** `src/lib/client/fetcher.js:1`
```javascript
export const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Request failed');
  return res.json();
};
```

---

## Email System

**Provider:** Nodemailer
**Configuration:** `src/lib/server/mail.js:1`

### Email Templates

**Location:** `src/config/email-templates/`

**Available templates:**
1. `signin.js` - Magic link email
2. `workspace-create.js` - Workspace creation notification
3. `invitation.js` - Team invitation
4. `email-update.js` - Email change confirmation

**Template structure:**
```javascript
export const emailTemplate = ({ name, url }) => {
  const text = `Hi ${name}...`;
  const html = `<html>...</html>`;
  return { text, html };
};
```

### Sending emails

```javascript
import { sendMail } from '@/lib/server/mail';

await sendMail({
  from: process.env.EMAIL_FROM,
  to: user.email,
  subject: 'Welcome to Nextacular',
  ...emailTemplate({ name: user.name, url: magicLink }),
});
```

---

## Environment Variables

**Template:** `.env.sample`

### Required

```bash
APP_URL=http://localhost:3000
NEXTAUTH_SECRET=generated_secret
DATABASE_URL=postgresql://user:password@localhost:5432/nextacular
```

### Optional Features

```bash
# Email (required for auth)
EMAIL_FROM=noreply@yourdomain.com
EMAIL_SERVER_USER=your_smtp_username
EMAIL_SERVER_PASSWORD=your_smtp_password
EMAIL_SERVICE=Gmail

# Stripe payments
NEXT_PUBLIC_PUBLISHABLE_KEY=pk_test_...
PAYMENTS_SECRET_KEY=sk_test_...
PAYMENTS_SIGNING_SECRET=whsec_...

# Google Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-...

# Vercel (for custom domains)
NEXT_PUBLIC_VERCEL_IP_ADDRESS=76.76.21.21
VERCEL_PROJECT_ID=prj_...
VERCEL_TEAM_ID=team_...
VERCEL_AUTH_BEARER_TOKEN=...

# Database (cloud providers)
SHADOW_DATABASE_URL=postgresql://...

# Seed
ADMIN_EMAIL=admin@yourdomain.com
```

---

## Development Workflow

### Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.sample .env
# Edit .env with your values

# Set up database
npx prisma migrate dev
npx prisma db seed

# Start development server
npm run dev
```

### Common Tasks

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Reset database (caution!)
npx prisma migrate reset

# View database
npx prisma studio

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Adding New Features

1. **Database changes:**
   - Update `prisma/schema.prisma`
   - Run `npx prisma migrate dev --name feature_name`
   - Create/update service in `prisma/services/`

2. **API endpoint:**
   - Create route in `src/pages/api/`
   - Add validation in `src/config/api-validation/`
   - Use `validateSession()` for protected routes

3. **UI Component:**
   - Create in `src/components/`
   - Use Tailwind for styling
   - Follow existing component patterns

4. **Page:**
   - Create in `src/pages/`
   - Choose appropriate layout
   - Add to menu if needed (`src/config/menu/`)

5. **Data fetching:**
   - Create custom hook in `src/hooks/data/`
   - Use SWR for caching
   - Follow naming convention: `use<Resource>`

---

## Testing & Debugging

### Development Mode

```bash
npm run dev
```
- Hot reload enabled
- NextAuth debug mode on
- Email logs to console (no actual sending)
- Detailed error pages

### Common Issues

**1. Authentication not working**
- Check `NEXTAUTH_SECRET` is set
- Verify `APP_URL` matches current URL
- Check email configuration
- View NextAuth debug logs

**2. Database connection errors**
- Verify `DATABASE_URL` format
- Ensure PostgreSQL is running
- Check credentials
- Run `npx prisma studio` to test connection

**3. Stripe webhooks not working**
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/payments/hooks`
- Verify `PAYMENTS_SIGNING_SECRET` matches webhook
- Check webhook endpoint is accessible

**4. Multi-tenancy routing issues**
- Clear `.next` cache: `rm -rf .next`
- Rebuild: `npm run build`
- Check middleware logic in `src/middleware.js`

---

## Deployment

### Vercel (Recommended)

1. **One-click deploy:**
   - Use "Deploy to Vercel" button from README
   - Set environment variables in Vercel dashboard

2. **Git integration:**
   - Connect GitHub repository
   - Auto-deploy on push to main
   - Preview deployments for PRs

3. **Custom domains:**
   - Add domain in Vercel dashboard
   - Configure DNS records
   - Set `NEXT_PUBLIC_VERCEL_IP_ADDRESS`

### Database Setup (Production)

1. **PostgreSQL hosting options:**
   - Vercel Postgres
   - Railway
   - Supabase
   - AWS RDS
   - Digital Ocean

2. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

3. **Seed admin user:**
   ```bash
   npx prisma db seed
   ```

### Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Admin user seeded
- [ ] Email service configured & tested
- [ ] Stripe webhooks configured
- [ ] Custom domain DNS configured (if applicable)
- [ ] Google Analytics ID set (if applicable)
- [ ] SSL certificate active
- [ ] Test authentication flow
- [ ] Test workspace creation
- [ ] Test payment flow

---

## Architecture Decisions

### Why Prisma?
- Type-safe database access
- Automatic migrations
- Excellent developer experience
- Easy to extend schema

### Why NextAuth.js?
- Built for Next.js
- Flexible providers
- Session management included
- Database adapter for Prisma

### Why SWR?
- Automatic caching
- Revalidation strategies
- Optimistic UI updates
- Built by Vercel (Next.js team)

### Why Passwordless Auth?
- Better UX (no password to remember)
- More secure (no password to leak)
- Simpler implementation
- Can add other providers later

### Multi-Tenancy Approach
- **Workspace-based:** Each workspace is a tenant
- **Shared database:** All tenants in one DB (simpler, cost-effective)
- **Data isolation:** Workspace-scoped queries throughout
- **Domain mapping:** Flexible branding options

---

## Extending Nextacular

### Adding OAuth Providers

1. Update NextAuth config in `src/pages/api/auth/[...nextauth].js`:
```javascript
import GoogleProvider from "next-auth/providers/google";

providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  EmailProvider({ /* ... */ }),
]
```

2. Add environment variables
3. Update UI to show OAuth buttons

### Adding New Subscription Tiers

1. Update `SubscriptionType` enum in `prisma/schema.prisma`
2. Add tier rules in `src/config/subscription-rules/index.js`
3. Create Stripe products/prices
4. Update pricing page in `src/sections/Pricing.js`

### Adding File Uploads

1. Choose storage provider (AWS S3, Vercel Blob, Uploadthing)
2. Add model to schema for file metadata
3. Create API route for upload handling
4. Create upload component with progress
5. Implement subscription limits for storage

### Adding Real-time Features

Options:
1. **Pusher** - Managed service
2. **Ably** - Managed service
3. **Socket.io** - Self-hosted
4. **Supabase Realtime** - If using Supabase

Implementation:
- Add event emitters in API routes
- Subscribe to channels in React components
- Update UI optimistically with SWR mutate

### Internationalization

Already set up! To add languages:

1. Create message file: `src/messages/es.json` (Spanish)
2. Import in `src/pages/_app.js`:
```javascript
import es from '@/messages/es.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  // ...
});
```

3. Use in components:
```javascript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<h1>{t('welcome')}</h1>
```

---

## Code Conventions

### Naming Conventions

- **Components:** PascalCase (e.g., `Button.js`, `WorkspaceCard.js`)
- **Utilities:** camelCase (e.g., `validateSession.js`, `sendMail.js`)
- **API routes:** kebab-case (e.g., `[workspace-slug].js`)
- **Database services:** camelCase functions (e.g., `createWorkspace()`)

### File Organization

```
Feature-based grouping:
- Components: Generic, reusable UI
- Sections: Page-specific components
- Hooks: Data fetching logic
- Services: Database operations
- API routes: Endpoints
```

### Import Order

1. External libraries
2. Internal modules (using aliases)
3. Relative imports
4. Styles

```javascript
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import Button from '@/components/Button';
import { validateSession } from '@/lib/server/session-check';

import styles from './Component.module.css';
```

---

## Security Considerations

### Current Protections

✅ **Authentication:** Session-based with NextAuth.js
✅ **CSRF Protection:** Built into NextAuth
✅ **SQL Injection:** Prevented by Prisma ORM
✅ **XSS:** React auto-escapes by default
✅ **Input Validation:** express-validator on API routes
✅ **Rate Limiting:** Not implemented (recommended to add)

### Recommendations

1. **Add rate limiting:**
   - Use `express-rate-limit` or similar
   - Apply to API routes, especially auth endpoints

2. **Add CAPTCHA:**
   - Protect signup/signin forms
   - Prevent automated abuse

3. **Implement CSP headers:**
   - Configure in `next.config.js`
   - Restrict resource loading

4. **Add audit logging:**
   - Log sensitive operations (member removal, workspace deletion)
   - Track who did what when

5. **Environment variable validation:**
   - Validate required vars on startup
   - Fail fast if missing

---

## Performance Optimization

### Current Optimizations

✅ **SWR caching:** Reduces API calls
✅ **Image optimization:** Next.js Image component ready
✅ **Static generation:** Where applicable
✅ **Code splitting:** Automatic with Next.js
✅ **ISR on site pages:** 10-second revalidation

### Recommendations

1. **Add caching headers:**
   - Cache static assets aggressively
   - Set appropriate cache times for API responses

2. **Implement database indexes:**
   - Add indexes to frequently queried fields
   - Already have: unique constraints (auto-indexed)

3. **Use React.memo:**
   - Memoize expensive components
   - Prevent unnecessary re-renders

4. **Optimize images:**
   - Use Next.js Image component
   - Set proper sizes and formats

5. **Monitor performance:**
   - Use Vercel Analytics
   - Track Core Web Vitals
   - Monitor API response times

---

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [SWR Docs](https://swr.vercel.app)
- [Stripe Docs](https://stripe.com/docs)

### Tools
- [Prisma Studio](https://www.prisma.io/studio) - Database GUI
- [Stripe Dashboard](https://dashboard.stripe.com) - Payment management
- [Vercel Dashboard](https://vercel.com/dashboard) - Deployment
- [Mailtrap](https://mailtrap.io) - Email testing

### Community
- [GitHub Discussions](https://github.com/nextacular/nextacular/discussions)
- [Discord](https://discord.gg/nextacular) (if available)

---

## Frequently Asked Questions

### How do I change the authentication method?

Update `src/pages/api/auth/[...nextauth].js` to add/replace providers. NextAuth supports OAuth (Google, GitHub, etc.), credentials, and more.

### Can I use a different database?

Yes! Prisma supports PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and CockroachDB. Update `datasource db` in `prisma/schema.prisma`.

### How do I customize the landing page?

Edit components in `src/sections/` and compose them in `src/pages/index.js`. All sections are modular and can be rearranged, removed, or customized.

### How do billing limits get enforced?

Limits are defined in `src/config/subscription-rules/index.js` and checked in API routes before operations (e.g., before creating a workspace, check if user has reached their limit).

### Can I remove features I don't need?

Yes! The codebase is modular. To remove billing, for example:
1. Remove Stripe-related API routes
2. Remove `CustomerPayment` model from schema
3. Remove billing pages
4. Set all users to FREE tier or remove tier system

### How do I add a new database model?

1. Add model to `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name add_model_name`
3. Create service file in `prisma/services/model-name.js`
4. Create API routes in `src/pages/api/model-name/`
5. Create React hook in `src/hooks/data/useModelName.js`
6. Build UI components and pages

---

## Changelog & Version History

This guide is current as of the repository state on 2025-11-16.

**Recent Notable Commits:**
- `c0e7822` - Update CONTRIBUTING.md
- `f7a643c` - Bump next from 13.3.0 to 13.5.1
- `020b888` - Bump next-auth to 4.24.5

**Next.js Version:** 13.5.1 (could upgrade to 14.x or 15.x)
**React Version:** 18.2.0

---

## Getting Help

1. **Check the docs** in this file first
2. **Search existing issues** on GitHub
3. **Ask in discussions** for general questions
4. **Create an issue** for bugs or feature requests
5. **Read the code** - it's well-structured and commented

---

## Contributing

See `CONTRIBUTING.md` for contribution guidelines.

**Quick tips:**
- Follow existing code patterns
- Write clear commit messages
- Test thoroughly before submitting PRs
- Update documentation when adding features

---

**This guide is maintained for Claude AI development sessions. It provides comprehensive context for understanding and extending the Nextacular codebase.**

Last updated: 2025-11-16
