#!/usr/bin/env bash
# One-command Day 1 setup: preflight checks, install, git init, staged commits, GitHub repo.
# Usage: bash scripts/bootstrap.sh            (auto-detects name/username, prompts if needed)
#    or: bash scripts/bootstrap.sh GITHUB-USERNAME "Your Name"
set -euo pipefail

GH_USER="${1:-YibrilRum}"
FULL_NAME="${2:-}"

echo "== Preflight =="
command -v git  >/dev/null || { echo "Install git first"; exit 1; }
command -v node >/dev/null || { echo "Install Node 20+ first"; exit 1; }
NODE_MAJOR=$(node -p "process.versions.node.split('.')[0]")
[ "$NODE_MAJOR" -ge 18 ] || { echo "Node 18+ required (found $(node -v))"; exit 1; }
HAS_GH=0; command -v gh >/dev/null && gh auth status >/dev/null 2>&1 && HAS_GH=1
echo "git OK, node $(node -v), gh logged in: $HAS_GH"

echo "== Your details =="
# Name: argument -> git config -> prompt
[ -n "$FULL_NAME" ] || FULL_NAME="$(git config --global user.name || true)"
if [ -z "$FULL_NAME" ]; then read -r -p "Your full name (for the LICENSE): " FULL_NAME; fi
# GitHub username: argument -> gh login -> prompt
if [ -z "$GH_USER" ] && [ "$HAS_GH" -eq 1 ]; then GH_USER="$(gh api user --jq .login 2>/dev/null || true)"; fi
if [ -z "$GH_USER" ]; then read -r -p "Your GitHub username: " GH_USER; fi
[ -n "$FULL_NAME" ] && [ -n "$GH_USER" ] || { echo "Name and username are required"; exit 1; }
echo "Using name: $FULL_NAME | GitHub user: $GH_USER"

# Make sure git can commit
[ -n "$(git config --global user.name || true)" ]  || git config --global user.name "$FULL_NAME"
[ -n "$(git config --global user.email || true)" ] || { read -r -p "Your email for git commits: " GIT_EMAIL; git config --global user.email "$GIT_EMAIL"; }

echo "== Personalize =="
sed -i.bak "s/YOUR NAME/$FULL_NAME/" LICENSE
sed -i.bak "s/YOUR-USERNAME/$GH_USER/" README.md
rm -f LICENSE.bak README.md.bak

echo "== Install =="
npm install
npx playwright install chromium

echo "== Run tests locally (failures here do not stop setup) =="
npm run test:pw || echo ">> Some tests failed. Fix them, then commit the fix separately."

echo "== Git: staged commits =="
[ -d .git ] || git init -b main
git add README.md LICENSE .gitignore
git commit -m "chore: initial repo with README, license, gitignore"
git add package.json package-lock.json tsconfig.json
git commit -m "chore: add Node project, TypeScript and Playwright dependencies"
git add playwright.config.ts
git commit -m "test: add Playwright config targeting SauceDemo"
git add playwright/
git commit -m "test: add login scenarios (success, wrong password, locked out)"
git add .github/workflows/ci.yml
git commit -m "ci: run Playwright on push and PR, upload HTML report"
git add -A
git commit -m "docs: add maintenance log, bug report template, issue/PR templates, dependabot"

echo "== GitHub =="
if [ "$HAS_GH" -eq 1 ]; then
  gh repo create "$GH_USER/qa-automation-portfolio" --public --source=. --remote=origin --push
  echo "Repo: https://github.com/$GH_USER/qa-automation-portfolio"
else
  echo "gh CLI not logged in. Create an empty repo named qa-automation-portfolio on github.com, then run:"
  echo "  git remote add origin https://github.com/$GH_USER/qa-automation-portfolio.git"
  echo "  git push -u origin main"
fi
echo "Done. Watch the Actions tab for the first CI run."
