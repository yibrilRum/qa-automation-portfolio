# QA Automation Portfolio

![CI](https://github.com/yibrilRum/qa-automation-portfolio/actions/workflows/ci.yml/badge.svg)

End-to-end tests for [SauceDemo](https://www.saucedemo.com), a public practice store, built with Playwright and TypeScript. It uses a Page Object Model and runs in GitHub Actions on every push and pull request.

## What it covers (11 tests)

| Flow | Tests |
|---|---|
| Login | Success, wrong password, locked-out user |
| Cart | Add one item, add two items, remove an item |
| Checkout | Full order, two-item subtotal |
| Form validation | Missing first name, last name, postal code |

## Run locally

```bash
npm install
npx playwright install chromium
npm run test:pw
npm run report:pw   # open the HTML report
```

## Project structure

```
playwright/pages/       Page Objects: Login, Inventory, Cart, Checkout
playwright/tests/       Specs for login, cart, checkout and validation
playwright/test-data/   Shared users and products
.github/workflows/      CI: runs tests, uploads the HTML report
docs/                   Maintenance log, scenario definitions, bug report template
```

## Design decisions

- **Page Objects** keep selectors in one place, so a UI change means editing one file instead of many tests.
- **Shared test data** keeps credentials and product details out of the specs.
- **Table-driven validation tests** make adding a new case a one-line change.
- **CI uploads the HTML report** even on failure, so a red run can be debugged without rerunning locally.

## Maintenance log

See [`docs/MAINTENANCE.md`](docs/MAINTENANCE.md) for fixes, refactors and dependency updates.

## License

MIT
