# Nextacular 🌙 v2.0

![Open Collective backers and sponsors](https://img.shields.io/opencollective/all/nextacular) ![GitHub package.json version](https://img.shields.io/github/package-json/v/nextacular/nextacular) ![GitHub issues](https://img.shields.io/github/issues/nextacular/nextacular) ![GitHub](https://img.shields.io/github/license/nextacular/nextacular) ![GitHub Repo stars](https://img.shields.io/github/stars/nextacular/nextacular?style=social)

## 🚀 Quickly launch multi-tenant SaaS applications

![Nextacular - Quickly launch multi-tenant SaaS applications](./public/images/seo-cover.png)

An open-source starter kit that will help you build full-stack multi-tenant SaaS platforms efficiently and help you focus on developing your core SaaS features. Built on top of popular and modern technologies such as **Next.js 15**, **React 19**, **Tailwind CSS**, and **Prisma 6**.

**Features** packaged out-of-the-box: **Authentication**, **Billing & Payment**, **Database**, **Email**, **Custom Domains**, **Multi-tenancy**, **Workspaces**, and **Teams**

### ✨ What's New in v2.0

- 🎯 **Centralized Configuration** - 100+ environment variables for complete customization
- ⚡ **Latest Technologies** - Next.js 15.5, React 19, Prisma 6, Tailwind CSS 3.4
- 🎨 **Fully Configurable** - No hardcoded values, customize everything via `.env`
- 📘 **TypeScript Ready** - Full TypeScript support included
- 🎪 **15+ Use Cases** - Comprehensive guide for different business applications
- 🚦 **Feature Flags** - Enable/disable features without code changes
- 📚 **Enhanced Documentation** - Complete guides for configuration and deployment

**[📖 View Full Changelog](./UPGRADE_V2.md)** | **[🔧 Configuration Guide](./CONFIGURATION_GUIDE.md)** | **[💡 Use Cases](./USE_CASES.md)**

## Live Demo

Nextacular Demo: [https://demo.nextacular.co](https://demo.nextacular.co)

## Documentation

Nextacular Documentation: [https://docs.nextacular.co](https://docs.nextacular.co)

## 🚀 Quick Start (v2.0)

### 1. Clone the Repository

```bash
git clone https://github.com/nextacular/nextacular.git
cd nextacular
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Required
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
DATABASE_URL=postgresql://user:password@localhost:5432/database

# Customize Your App
NEXT_PUBLIC_APP_NAME=YourApp
NEXT_PUBLIC_APP_TAGLINE=Your amazing tagline

# Configure Plans
NEXT_PUBLIC_PLAN_STANDARD_PRICE=19
NEXT_PUBLIC_PLAN_PREMIUM_PRICE=49

# Feature Flags
NEXT_PUBLIC_ENABLE_BILLING=true
NEXT_PUBLIC_ENABLE_CUSTOM_DOMAINS=true
```

### 4. Set Up Database

```bash
npx prisma migrate dev
npx prisma db seed
```

### 5. Start Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

### 📚 Detailed Documentation

- **[Configuration Guide](./CONFIGURATION_GUIDE.md)** - Complete customization reference
- **[Use Cases](./USE_CASES.md)** - 15+ real-world applications
- **[Upgrade Guide](./UPGRADE_V2.md)** - Migrating from v1.x
- **[Official Docs](https://docs.nextacular.co)** - Full documentation

## One-Click Deploy to Vercel 🚀

Deploy to Vercel for free!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnextacular%2Fnextacular&env=APP_URL,NEXTAUTH_SECRET,DATABASE_URL,SHADOW_DATABASE_URL,EMAIL_FROM,EMAIL_SERVER_USER,EMAIL_SERVER_PASSWORD,EMAIL_SERVICE,NEXT_PUBLIC_VERCEL_IP_ADDRESS&project-name=nextacular&repo-name=nextacular&demo-title=Nextacular%20-%20Your%20Next%20SaaS%20Project&demo-description=Nextacular%20is%20an%20open-source%20starter%20kit%20that%20will%20help%20you%20build%20SaaS%20platforms%20efficiently%20and%20focus%20on%20developing%20your%20core%20SaaS%20features.&demo-url=https%3A%2F%2Fdemo.nextacular.co&demo-image=https%3A%2F%2Fnextacular.co%2Fimages%2Fseo-cover.png)

You might encounter errors after deployment, so make sure you add the necessary [Environment Variables](https://docs.nextacular.co/customization/environment-variables)

Read the [docs](https://docs.nextacular.co) for more details

## Outstanding Features

- 🔐 Authentication
- 💿 Database Integration + Prisma (SQL/PostgreSQL)
- 🤝 Teams & Workspaces
- ☁ Multi-tenancy Approach
- 📜 Landing Page
- 💸 Billing & Subscription
- 📱 Simple Design Components & Mobile-ready
- 🔍 SEO Support
- 👾 Developer Experience
- 💌 Email Handling

## 🛠 Tech Stack

### Primary

- [Next.js](https://nextjs.org) - **15.5.1** (React **19.0.0**)
- [Tailwind CSS](https://tailwindcss.com) - **3.4.17**
- [Prisma](https://prisma.io) - **6.19.0** (Rust-free, 90% smaller)
- [NextAuth.js (Auth.js)](https://authjs.dev) - **5.0.0** (beta)
- [Stripe](https://stripe.com) - **17.6.0**
- [TypeScript](https://www.typescriptlang.org) - **5.7.2**
- [Vercel](https://vercel.com)

### Key Dependencies

- **UI Components**
  - Headless UI - 2.2.0
  - Hero Icons - 2.2.0
  - React Hot Toast - 2.4.1
  - Next Themes - 0.4.4

- **Data & API**
  - SWR - 2.2.5
  - Date FNS - 4.1.0
  - Express Validator - 7.2.0

- **Payments & Analytics**
  - Stripe JS - 5.2.0
  - React GA4 - 2.1.0

- **Utilities**
  - Nodemailer - 6.9.16
  - Slugify - 1.6.6
  - Validator - 13.12.0
  - i18next - 24.2.0

## Built With Nextacular

Check out these amazing projects built with Nextacular:

1. [Nextacular Demo](https://demo.nextacular.co) by Nextacular
2. [Livebic](https://livebic.com/) by Shadrach
3. [Vixion Pro Blogging](https://vixion.pro) by Mina
4. [Living Pupil Homeschool Solutions](https://livingpupilhomeschool.com) by Living Pupil
5. [MyWS](https://myws.dev) by Ruyi (@monoxruyi/@ruyi12)
6. [Trippr AI](https://ai.trippr.travel) by Trippr Tech Inc.
7. [BuzzBonus](https://buzzbonus.tech) by Ram (@rapturt9)
8. [MediumFox](https://mediumfox.com) by CSK (@medfox_73823)

> If you have a project built with Nextacular and want to be listed, feel free to reach out to us through our Discord server.

## Reviews

> Steven Tey - Developer, Vercel
> It's going to be super helpful for folks to bootstrap their MVPs and get to market faster!
>
> **Positive company mission**, **Easy to use**, **Cost-effective**, **Strong feature set**

## Company Sponsors

## Vercel

[![Powered by Vercel](./public/images/powered-by-vercel.svg)](https://vercel.com/?utm_source=nextacular&utm_campaign=oss)

### GitBook - Documentation Sponsor

[![GitBook](https://www.vectorlogo.zone/logos/gitbook/gitbook-ar21.svg)](https://gitbook.com)

Your company name could be here. If you wish to be listed as a sponsor, reach out to [teamnextacular@gmail.com](mailto:teamnextacular.com)

## Contributing

Want to support this project?

1. Consider purchasing from our marketplace (soon)
2. Subscribe to our newsletter. We send out tips and tools for you to try out while building your SaaS
3. If you represent company, consider becoming a recurring sponsor for this repository
4. Submit issues and features. Fork the project. Give it some stars. Join the discussion
5. Share Nextacular with your network

> Read the [guidelines](CONTRIBUTING.md) for contributing

## License

All code in this repository is provided under the [MIT License](LICENSE)

## Supporters – Special Mention 🎉 Thank you!

Show some love and support, and be a backer of our project

[![Open Collective](https://www.vectorlogo.zone/logos/opencollective/opencollective-ar21.svg)](https://opencollective.com/nextacular)

Kaur Kirikall ([@KaurKirikall](https://twitter.com/KaurKirikall)), Brian Roach, Cien Lim, Chris Moutsos, Fred Guth ([@fredguth](https://twitter.com/fredguth)), Maxence Rose ([@pirmax](https://twitter.com/pirmax)) Sandeep Kumar ([@deepsand](https://twitter.com/deepsand)), Justin Harr ([@DasBeasto](https://twitter.com/dasbeasto)), Saket Tawde ([@SaketCodes](https://twitter.com/SaketCodes)), Corey Kellgren, Adarsh Tadimari, Altamir Meister, Abhi Ksinha

## Acknowledgement

🙏 Happy to have the support of early adopters and supporters over at [Product Hunt](https://www.producthunt.com/posts/nextacular), [Gumroad](https://arjayosma.gumroad.com/l/nextacular), [Github](https://github.com/nextacular/nextacular), [Twitter](https://twitter.com/nextacular), and through personal email. Lots of plans moving forward. Thanks to you guys!
