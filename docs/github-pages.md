# GitHub Pages for this fork

The core app runs entirely in the visitor's browser and connects to public exchange feeds. Hosting it needs no backend, exchange API key, custom domain, or Cloudflare account.

## One-time setup

1. In this repository's **Actions** tab, enable workflows if GitHub has disabled them for the fork.
2. Open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. Merge the Pages workflow PR into `master`. If it was merged before enabling Actions or Pages, run **Actions → Pages → Run workflow** on `master`.
4. Wait for the `build` and `deploy` jobs to succeed.

The site for `hgosansn/liquiditymapperfast` is served at:

**https://hgosansn.github.io/liquiditymapperfast/**

No repository secrets are required. GitHub provides the short-lived deployment credentials. The workflow grants Pages write permissions only to the deployment job; pull requests build the app without deploying it.

## What gets published

`npm ci` installs the lockfile's dependencies using Node 22. `npm run build:site` checks TypeScript and builds `dist/`, with public source maps disabled. The workflow uploads `dist/` as the Pages artifact. Vite's existing relative base (`./`) supports the repository subdirectory, workers, and WebAssembly.

This replaces the inherited workflow that sent the full app to Cloudflare and published `moved-site/` only for the upstream owner. The fork publishes the actual app and has no Cloudflare job or secrets requirement. It uses the coin list committed in the repository; it does not schedule daily rebuilds or scrape exchanges from GitHub runners.

Exchange availability still depends on the visitor's network and location. Public liquidation data and recorded-history services remain external dependencies. Removing Plus from the UI does not unlock paid data on those services.

See [GitHub's custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
