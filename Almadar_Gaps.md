<!-- Gap ledger for this repo: the source of truth for its open gaps. Managed with scripts/gaps-ledger.mjs in the Almadar monorepo. -->
# almadar-project — open gaps

Every open gap this repo owns lives here. This file is the source of truth; the monorepo's `docs/Almadar_Gaps.md` only rolls it up.

- **One entry per gap:** `- **<code>** — <what is wrong and where>. <owning package> [mechanical|architectural] — <evidence, prevention rung>`. `[mechanical]` = small and well-scoped; `[architectural]` = needs design judgment.
- **Codes:** new gaps use this repo's prefix `G-ALMADAR-`. Take the "Next code" below, then bump it in the same edit. Codes are never reused or renamed.
- **Close by deleting.** Remove the entry in the same commit as the fix. There is no "closed" section; git history is the record.
- **Cross-repo gaps don't go here.** If fixing it needs another repo, describe it in your report or PR body; the monorepo coordinator files it.

Next code: `G-ALMADAR-002`

## Open gaps

### Apps tier

- **G-APPS-003** — `almadar/services` (pages brains/index/integrations/metal) and `almadar/studio` (pages index/pricing) pass numeric sizes to `Icon` (`size={20}`); `IconSize` is `'xs'|'sm'|'md'|'lg'|'xl'`, so they fail `tsc` against the workspace `@almadar/ui` (hidden while the sites typechecked against older installs). Map to the named sizes in the site files. `almadar` sites `[mechanical]`
- **G-ALMADAR-001** — `almadar/website` cannot be deployed: `.github/workflows/deploy-website.yml` (tag-gated, last green 2026-06-03) runs `npm ci` + `npm run build` in `website/`, but the site migrated to pnpm (no `package-lock.json`) and `website/package.json` has no `build` script (only `almadar validate/compile/dev/test`); the inert `website/.github/workflows/deploy-websites.yml` calls a missing `build:main`. `pnpm exec docusaurus build` works locally (2026-09-26). Fix: add a `build` script and switch the workflow to pnpm (`pnpm install --ignore-workspace --frozen-lockfile`), delete the inert nested workflow. `almadar` website `[mechanical]` — found during the marketing-domain migration; rung: none of the three (CI config drift, no gate builds the site on push)
- **G-TOOLS-016** — Both orb.almadar.io quickstart programs currently fail `orb validate`. `[good candidate IF the fix is just updating the quickstart .lolo samples, not a compiler drift — check which before assigning]` — orig: `Almadar_Compiler_Gaps.md` → §126
