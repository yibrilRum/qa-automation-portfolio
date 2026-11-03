# QA Automation Portfolio

![CI](https://github.com/YibrilRum/qa-automation-portfolio/actions/workflows/ci.yml/badge.svg)

The same user flows automated with several tools against [SauceDemo](https://www.saucedemo.com), a public practice e-commerce site. The goal is to compare tools and show how a test suite is built and maintained over time.

## Status

| Tool | Status |
|---|---|
| Playwright | Complete (5 scenarios, Page Object Model) |
| Cypress | Planned |
| Selenium | Planned |
| Jest / API | Planned |

## Run locally

```bash
npm install
npx playwright install chromium
npm run test:pw
npm run report:pw   # open the HTML report
```

## Scenarios covered

1. Login success
2. Login failure (wrong password, locked-out user)
3. Add to cart
4. Checkout
5. Form validation

## Maintenance log

See `docs/MAINTENANCE.md` (added as the suite evolves).
