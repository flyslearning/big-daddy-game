# Big Daddy Game — Premium Next.js v2

Responsive premium gaming site built using Next.js 15, React 19, Supabase and configurable third-party sports/game integrations. Includes cinematic full-width video hero, premium photo-based game catalog, cricket and football scores, auth, account and wallet placeholder.

## Installation

```bash
npm install
cp .env.example .env.local
```

Fill `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your Supabase project. Run `supabase/schema.sql` using Supabase SQL editor.

## Create your initial account securely

In `.env.local`, configure `SUPABASE_SERVICE_ROLE_KEY`, `BOOTSTRAP_EMAIL` (preconfigured email address), and set `BOOTSTRAP_PASSWORD` locally to the password you wish to use. DO NOT put the password into source files, public environment variables, chat screenshots, or a repository. Then:

```bash
npm run bootstrap:account
```

The script uses Supabase Auth admin APIs server-side, creates the initial email-confirmed account and exits. It does **not** silently overwrite existing accounts. Remove bootstrap variables from deployment environments after provisioning. Never expose service role key to the browser.

## Run

```bash
npm run dev
```

## Video

Use a licensed H.264 MP4 at `public/videos/casino-hero.mp4`. The hero attempts to use it first, and includes a remote secondary source with a still-image fallback; for reliable hosting provide a video asset and verify the license.

## Live scores

Add CRICKETDATA_API_KEY and APIFOOTBALL_API_KEY to server-side environment variables. Score display intentionally shows an unavailable state rather than fabricated live scores when providers are not configured. API quotas/rate limits apply.

## Game launches

The frontend showcases game names and illustrative photographs. Real playable games require licensed provider-specific integration via `GAME_AGGREGATOR_API_BASE` and `GAME_AGGREGATOR_API_KEY`. The example `/launch` route is a generic adapter contract; your real provider's API mapping and signed sessions must be implemented. No pretend game sessions.

## Payments

Wallet deliberately does not falsely report balances, deposits or withdrawals. Before real funds, build a separate compliant wallet/ledger system with webhook verification, idempotency, transactional accounting, KYC/AML, age & location controls, limits, and the certified payment integrations. No real-money payments are wired in this starter.

## Production security

Do not ship with service-role credentials, secrets, or passwords inside frontend code. Configure rate limiting, safe redirects, jurisdiction rules, session protections, CSP, logging, monitoring and provider contracts prior to production.
