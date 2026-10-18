# almadar.io

The site is built from the `std-almadar-website` organism in `@almadar-io/behaviors`
(`behaviors/lolo/websites`). There is no site source here: `pnpm build` compiles the
installed organism with `orb compile --mode client`, builds the client, prerenders every
route into `build/`, and copies `static/` beside it. The build script is shared with
orb.almadar.io (`../orb/scripts/build-site.mjs`).

- Build: `pnpm install --ignore-workspace && pnpm build`
- Deploy: `pnpm deploy` (Firebase Hosting target `main`)
