# Security — no build-time secrets in the dashboard

Written 2026-08-31, after finding a real API key inside a local build.

## The rule

**The dashboard is a public static site. Any `VITE_*` variable is inlined into
the bundle it ships.** Setting one is not configuration — it is publication.

There is no such thing as a private `VITE_` variable. Vite substitutes the
literal value at build time; minification does not hide it, and the file is
served to every visitor.

## What happened

`dashboard/src/GemRunner.jsx` read `import.meta.env.VITE_OPENROUTER_API_KEY` as
a fallback for the visitor's own key:

```js
useState(() => localStorage.getItem(STORAGE_KEY) || import.meta.env.VITE_OPENROUTER_API_KEY || "")
```

**Nothing was ever published.** The deployed bundle inlined `void 0`, because
the variable was not set in Vercel — confirmed by searching the live file for
key-shaped strings and finding none.

But a local build from 2026-03-26 *did* bake a real OpenRouter key into
`dashboard/dist/`, because `dashboard/.env.local` sets it. That directory is
untracked and ignored, and the key does not appear anywhere in git history.
The exposure was one `vercel --prebuilt` or one dashboard setting away.

The fallback is removed. The visitor's key comes from the password field and
their own `localStorage`, and nowhere else.

## The rule, split

| Where a secret is read | Verdict |
|---|---|
| `dashboard/` via `import.meta.env.VITE_*` | **never** — it ships to the browser |
| `api/` via `process.env.*` | correct — serverless, never sent to the client |

`api/feedback.js` reading `process.env.GITHUB_TOKEN` is the right pattern and
is not affected.

## Enforcement

`tests/test-no-build-time-secrets.sh` fails if any file under `dashboard/src`
reads `import.meta.env`, and if a key-shaped string appears in `dashboard/dist`.
It was verified to fail against the code as it stood before this change.

It cannot check the Vercel dashboard. If `VITE_OPENROUTER_API_KEY` is ever set
there, the guard is the absent code path, not the test.
