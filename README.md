# Paseo Testnet Website

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

---

![paseo_light](public/img/logos/full/light/paseo.svg#gh-light-mode-only)
![paseo_dark](public/img/logos/full/dark/paseo.svg#gh-dark-mode-only)

---

The official website for Paseo, the community-driven testnet for the Polkadot ecosystem. Built to provide developers, validators, and innovators with a reliable and decentralized testing environment for building parachains and dApps.

---

### Built by

![zondax_light](public/img/logos/full/light/zondax.svg#gh-light-mode-only)
![zondax_dark](public/img/logos/full/dark/zondax.svg#gh-dark-mode-only)

_Visit us at [zondax.ch](https://zondax.ch)_

---

## About Paseo

Paseo is the testnet for the Polkadot ecosystem, designed as a decentralized, community-run, stable testnet for Parachain teams and dApp developers. It offers:

- Coretime supply/demand management
- Faster chain synchronization
- Community-managed infrastructure
- Zero financial risk for testing

## Technology Stack

- **Next.js 15** with App Router and Turbopack
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Shadcn UI Components** (Radix UI)
- **Biome** for linting and formatting
- **Playwright** for E2E testing

## Prerequisites

- Node.js (LTS version)
- pnpm package manager

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/Zondax/paseo-website
cd paseo-website
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

```bash
pnpm env:init
```

This will create a `.env.local` file from `.env.example`.

4. **Start the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Available Scripts

### Development
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server

### Code Quality
- `pnpm lint` - Run Biome linter
- `pnpm lint:fix` - Fix linting issues automatically
- `pnpm format` - Format code with Biome and sort package.json
- `pnpm format:check` - Check code formatting without changes
- `pnpm check` - Run linting and formatting checks with fixes

### Testing
- `pnpm test:e2e` - Run E2E tests with Playwright
- `pnpm test:e2e:ui` - Run E2E tests with Playwright UI
- `pnpm test:e2e:debug` - Run E2E tests in debug mode
- `pnpm test:e2e:install` - Install Playwright browsers
- `pnpm test:e2e:report` - Show Playwright test report
- `pnpm test:e2e:sharding` - Run E2E tests with sharding configuration
- `pnpm test:console` - Test for console errors
- `pnpm test:links` - Test for broken links (requires server running)

### Utilities
- `pnpm deps:update` - Update dependencies to latest versions

## Project Structure

```
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   │   ├── layouts/      # Layout components (Header, Footer, etc.)
│   │   ├── sections/     # Page sections
│   │   └── ui/           # Shadcn UI components
│   └── constants/        # Content and configuration constants
├── public/
│   └── img/              # Static assets and logos
├── e2e/                  # End-to-end tests
└── playwright.config.ts  # Playwright configuration
```

## Contributing

We welcome contributions to improve the Paseo website.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards by running `pnpm check` before submitting.

## License

This project is licensed under the Apache 2.0 License - see the LICENSE file for details.
