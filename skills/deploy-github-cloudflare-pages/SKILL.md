---
name: deploy-github-cloudflare-pages
description: Build, publish, and verify static websites on GitHub and Cloudflare Pages. Use when Codex needs to deploy a frontend project, preserve an existing GitHub repository while adding a site, configure or run Cloudflare Pages deployments, troubleshoot broken assets or caches, or turn a tested local build into a stable public URL without exchanging passwords, PATs, or API tokens in chat.
---

# Deploy GitHub + Cloudflare Pages

Publish the smallest verified release: protect existing repository content, build locally, push an intentional branch, deploy the exact output directory to Cloudflare Pages, and test the public files rather than trusting a success badge.

## 1. Discover the project

- Read repository instructions and hosting configuration first.
- Run `scripts/preflight.py <project-dir>` to inventory the Git root, package scripts, Cloudflare configuration, and likely build output.
- Inspect `git status`, current branch, remotes, and the target repository before writing.
- If the target is a GitHub profile repository, preserve the root `README.md`. Put a standalone site in a documented subdirectory such as `portfolio/` unless the user explicitly wants the profile page replaced.
- Never reuse credentials pasted in chat. Prefer GitHub device login and Cloudflare browser authorization; ask the user to complete the provider page without sharing passwords, codes, PATs, or API tokens.

## 2. Build and verify locally

- Use the package manager selected by the lockfile. Do not regenerate a working lockfile without cause.
- Run the production build and repository tests. Confirm the output directory contains `index.html` plus referenced JS, CSS, fonts, images, and downloads.
- Preview the production output when browser tooling is available. Check language states, responsive widths, console errors, navigation, and downloads.
- Stop if the build or required tests fail. Do not deploy a knowingly broken build.

## 3. Publish to GitHub

- Review the exact diff and exclude generated output, dependency folders, secrets, temporary ZIP files, and unrelated user changes.
- Commit only the requested scope with a descriptive message.
- Push the current feature branch. Create or update a pull request when the repository workflow calls for review; do not merge unless the user asks.
- Record the repository URL, branch, commit, and pull request URL for handoff.

## 4. Deploy to Cloudflare Pages

- Prefer direct directory deployment: `wrangler pages deploy <output-dir> --project-name <name>`.
- Use the configured project name and output directory when present; otherwise derive them from the build and ask only if multiple valid targets remain.
- Upload the directory directly. If a dashboard ZIP is unavoidable, create a standards-compliant ZIP with forward-slash entry names. Never upload a Windows archive whose entries contain backslashes.
- Confirm which deployment is Production. A successful Preview deployment does not update the stable project alias.
- Treat a project rename, custom domain, DNS change, or production promotion as a separate external-state change and confirm scope before acting when it was not already requested.

## 5. Verify the public release

Verify the stable public URL, not only the unique deployment URL:

- `/` returns the intended HTML and title.
- Every JS and CSS URL referenced by that HTML returns `200`, the correct MIME type, and actual asset content rather than an HTML fallback.
- Important downloads such as a CV return the expected file type.
- Language switching, primary navigation, and the smallest supported mobile width work.
- Browser console has no release-blocking errors when browser tools are available.
- Re-fetch with a cache-busting query when investigating stale assets. If an old immutable asset is cached, rebuild with new hashed filenames and redeploy instead of repeatedly overwriting the same URL.

Read `references/troubleshooting.md` when assets, authentication, production aliases, or caches behave unexpectedly.

## Handoff

Report the stable Cloudflare URL, GitHub branch/commit/PR, build and test results, and any remaining provider-side limitation. Never claim completion from a CLI success message alone.
