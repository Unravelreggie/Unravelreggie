# Troubleshooting

## Authentication

- GitHub CLI still reports an old credential after device authorization: remove only the invalid GitHub CLI credential, then start a new device flow and verify `gh auth status` before pushing.
- Cloudflare CLI is unavailable or slow to install: keep the verified build intact. Use an official binary or dashboard directory upload; do not change site code to solve a CLI installation problem.
- Never request passwords, one-time codes, PATs, or API tokens in chat.

## HTML loads but JS or CSS does not

1. Fetch the stable URL HTML and list its asset URLs.
2. Fetch each asset and inspect status, `Content-Type`, and the first bytes.
3. If an asset returns HTML, check upload paths and SPA fallback rules.
4. For dashboard ZIP uploads, inspect archive entry names. Recreate any archive that uses `assets\\...`; ZIP entries must use `assets/...`.
5. Redeploy and verify the stable production alias, not just a preview URL.

## Stale production content

- Compare the deployment ID behind the stable alias with the newest successful deployment.
- Add a query string only to diagnose caching; do not use it as the permanent fix.
- Prefer content-hashed JS and CSS filenames. If a bad immutable asset URL has been cached, rebuild so the filename changes, then promote the correct deployment to Production.

## Repository layout

- GitHub profile repository: preserve the root profile `README.md`; place the website in a subdirectory unless replacement was explicitly requested.
- Monorepo: configure Cloudflare root directory and build command to the site package.
- Static SPA: ensure route fallback behavior does not turn missing assets into `index.html` with a `200` response.
