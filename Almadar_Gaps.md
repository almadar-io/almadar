<!-- Gap ledger for this repo: the source of truth for its open gaps. Managed with scripts/gaps-ledger.mjs in the Almadar monorepo. -->
# almadar-project — open gaps

Every open gap this repo owns lives here. This file is the source of truth; the monorepo's `docs/Almadar_Gaps.md` only rolls it up.

- **One entry per gap:** `- **<code>** — <what is wrong and where>. <owning package> [mechanical|architectural] — <evidence, prevention rung>`. `[mechanical]` = small and well-scoped; `[architectural]` = needs design judgment.
- **Codes:** new gaps use this repo's prefix `G-ALMADAR-`. Take the "Next code" below, then bump it in the same edit. Codes are never reused or renamed.
- **Close by deleting.** Remove the entry in the same commit as the fix. There is no "closed" section; git history is the record.
- **Cross-repo gaps don't go here.** If fixing it needs another repo, describe it in your report or PR body; the monorepo coordinator files it.

Next code: `G-ALMADAR-001`

## Open gaps

### Apps tier

- **G-APPS-003** — `almadar/services` (pages brains/index/integrations/metal) and `almadar/studio` (pages index/pricing) pass numeric sizes to `Icon` (`size={20}`); `IconSize` is `'xs'|'sm'|'md'|'lg'|'xl'`, so they fail `tsc` against the workspace `@almadar/ui` (hidden while the sites typechecked against older installs). Map to the named sizes in the site files. Also: `almadar/website` (`@almadar/ui` ^6.3.0, installed 5.104) and `masar/website` (^2.34.2, installed 2.61) import the new `@almadar/ui/ssr` entry and need their `@almadar/ui` pin bumped to the first published version carrying `/ssr` (marketing-domain removal, 2026-09-25). `almadar` / `masar` sites `[mechanical]`
