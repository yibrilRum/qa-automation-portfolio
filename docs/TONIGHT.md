# Tonight's Checklist (target: 3 hours max)

## Before you start (10 min)
- [ ] Node 20+ and git installed (`node -v`, `git --version`)
- [ ] GitHub account; optional: install GitHub CLI and run `gh auth login`

## Setup (30 min)
- [ ] Unzip, open a terminal in the folder
- [ ] `bash scripts/bootstrap.sh YOUR-GITHUB-USERNAME "Your Name"`
- [ ] If no gh CLI: create empty repo on github.com and run the two commands the script prints

## Verify (45 min)
- [ ] All 3 tests pass locally (`npm run test:pw`); fix selectors if needed
- [ ] Commit any fix separately, e.g. "test: fix selector for error banner"
- [ ] Push; open the Actions tab; confirm green
- [ ] Badge in README shows passing

## Stretch (60 min, optional)
- [ ] Add scenario 3 (add to cart) using docs/scenarios.md
- [ ] Put it on a branch and open a PR so CI runs on the PR
- [ ] Add a short note to README status table

## If something breaks
- Browser not found: `npx playwright install chromium`
- CI fails but local passes: download the report artifact from the run
- Test fails on a selector: inspect the element in DevTools and update the locator
