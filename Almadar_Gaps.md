<!-- Gap ledger for this repo: the source of truth for its open gaps. Managed with scripts/gaps-ledger.mjs in the Almadar monorepo. -->
# almadar-project — open gaps

Every open gap this repo owns lives here. This file is the source of truth; the monorepo's `docs/Almadar_Gaps.md` only rolls it up.

- **One entry per gap:** `- **<code>** — <what is wrong and where>. <owning package> [mechanical|architectural] — <evidence, prevention rung>`. `[mechanical]` = small and well-scoped; `[architectural]` = needs design judgment.
- **Codes:** new gaps use this repo's prefix `G-ALMADAR-`. Take the "Next code" below, then bump it in the same edit. Codes are never reused or renamed.
- **Close by deleting.** Remove the entry in the same commit as the fix. There is no "closed" section; git history is the record.
- **Cross-repo gaps don't go here.** If fixing it needs another repo, describe it in your report or PR body; the monorepo coordinator files it.

Next code: `G-ALMADAR-003`

## Open gaps

### Apps tier

- **G-ALMADAR-002** — `almadar/studio` and `almadar/services` fail `tsc` on `shared/config/base-config.ts(5,21)`: `import webpack from "webpack"` resolves at build time (Docusaurus brings webpack) but `webpack` is only a `pnpm.overrides` pin, never a declared dependency, so its types aren't reachable. Fix: declare `webpack` (5.97.1, the pinned version) as a devDependency of each site that uses the shared config, then refresh the lockfiles. `almadar` sites [mechanical] — found 2026-09-27 after the `Icon` size fix cleared the other errors
- **G-TOOLS-016** — Both orb.almadar.io quickstart programs currently fail `orb validate`. `[good candidate IF the fix is just updating the quickstart .lolo samples, not a compiler drift — check which before assigning]` — orig: `Almadar_Compiler_Gaps.md` → §126
