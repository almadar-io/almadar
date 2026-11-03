<div align="center">

# Almadar

**The almadar.io website and the repo that also hosts the orb.almadar.io site, tests, templates and skills.**

[![CI](https://github.com/almadar-io/almadar/actions/workflows/ci.yml/badge.svg)](https://github.com/almadar-io/almadar/actions/workflows/ci.yml)
[![License: BSL 1.1](https://img.shields.io/badge/license-BSL%201.1-blue)](LICENSE)

</div>

Almadar builds tools for software whose behavior is a verified, first-class artifact: natural language becomes a `.lolo` program, which lowers to `.orb` IR and runs as a full-stack app. This repo is the public home of that work: the almadar.io site (`website/`, built from the `std-almadar-website` organism), the orb.almadar.io site (the `orb/` submodule), and the black-box language tests, shell templates and agent skills.

## Where this fits

```mermaid
flowchart TB
  subgraph kernel["Kernel and substrate"]
    core["orbital-core<br/>IR · evaluator · kernel"]
    canvas["orbital-canvas<br/>2D/3D render primitives"]
  end
  subgraph lang["Language"]
    lolo["orbital-lolo<br/>.lolo → .orb"]
    compiler["orbital-compiler<br/>validate · codegen"]
  end
  subgraph hosts["Shells and hosts"]
    ts["orbital-shell-typescript<br/>web · node · @almadar/core"]
    rs["orbital-shell-rust<br/>desktop · tui"]
    py["orbital-shell-python"]
    ios["orbital-shell-ios"]
    android["orbital-shell-android"]
    os["orbital-shell-os"]
    wasm["orbital-wasm<br/>browser kernel"]
    ffi["orbital-ffi<br/>C ABI for mobile"]
    router["orbital-router"]
  end
  cli["orbital-cli<br/>the orb binary"]
  ws["orbital-rust<br/>workspace · cross-crate tests"]
  dist["orb<br/>npm · releases"]
  subgraph pkgs["Language packages"]
    std["almadar-std<br/>@almadar/std substrate"]
    beh["behaviors<br/>themed organisms"]
    langs["lolo-ar · lolo-sl<br/>language packs"]
  end
  subgraph apps["Apps and sites"]
    builder["builder (studio)"]
    kflow["kflow-academy"]
    nata["nata"]
    rawi["rawi"]
    site["almadar (websites)"]
  end
  core --> lolo & compiler & ts & rs & py & ios & android & os & wasm & ffi & router
  canvas --> ts & rs & ffi
  lolo --> compiler
  compiler --> cli
  ts & rs & py & ios & android & os --> cli
  cli --> dist
  ws -.pins.-> core & lolo & compiler & cli
  dist --> std
  std --> beh
  std --> langs
  beh --> builder & kflow & nata & rawi & site
  click core "https://github.com/almadar-io/orbital-core"
  click canvas "https://github.com/almadar-io/orbital-canvas"
  click lolo "https://github.com/almadar-io/orbital-lolo"
  click compiler "https://github.com/almadar-io/orbital-compiler"
  click ts "https://github.com/almadar-io/orbital-shell-typescript"
  click rs "https://github.com/almadar-io/orbital-shell-rust"
  click py "https://github.com/almadar-io/orbital-shell-python"
  click ios "https://github.com/almadar-io/orbital-shell-ios"
  click android "https://github.com/almadar-io/orbital-shell-android"
  click os "https://github.com/almadar-io/orbital-shell-os"
  click wasm "https://github.com/almadar-io/orbital-wasm"
  click ffi "https://github.com/almadar-io/orbital-ffi"
  click router "https://github.com/almadar-io/orbital-router"
  click cli "https://github.com/almadar-io/orbital-cli"
  click ws "https://github.com/almadar-io/orbital-rust"
  click dist "https://github.com/almadar-io/orb"
  click std "https://github.com/almadar-io/almadar-std"
  click beh "https://github.com/almadar-io/behaviors"
  click langs "https://github.com/almadar-io/lolo-ar"
  click builder "https://github.com/itechdom/almadar-studio"
  click kflow "https://github.com/almadar-io/almadar-kflow-academy"
  click nata "https://github.com/almadar-io/almadar-nata"
  click rawi "https://github.com/almadar-io/almadar-rawi"
  click site "https://github.com/almadar-io/almadar"
  classDef here fill:#2563eb,color:#fff,stroke:#1e40af,stroke-width:3px
  
  class site here
```

| Upstream (this repo depends on) | Downstream (depends on this repo) |
|---|---|
| [behaviors](https://github.com/almadar-io/behaviors): the `std-almadar-website` organism the site is built from | none inside the monorepo |
| [almadar-std](https://github.com/almadar-io/almadar-std): `@almadar/std`, the substrate | |
| [orb](https://github.com/almadar-io/orb): the `orb/` submodule (the orb site, `@almadar/orb`) and its shared `build-site.mjs` | |

## Quick start

```bash
cd website
pnpm install --ignore-workspace
pnpm build          # orb compile --mode client, then prerender every route into website/build/
```

There is no site source in `website/`: `pnpm build` compiles the installed `std-almadar-website` organism with `orb`, prerenders every route and copies `static/` beside the result, using the script shared with orb.almadar.io (`orb/scripts/build-site.mjs`). Deploy with `pnpm deploy` (Firebase Hosting target `main`, project `kflow-b3a39`); CI deploys on a `v*` tag.

## What's inside

| Path | What |
|---|---|
| `website/` | almadar.io: `package.json`, `static/`, `firebase.json`; the page content is the organism |
| `orb/` | submodule [almadar-io/orb](https://github.com/almadar-io/orb): orb.almadar.io and the `orb` npm/releases distribution |
| `tests/` | black-box `.orb` schemas for language features (`tests/schemas/`) and `tests/run-tests.sh` |
| `examples/` | example programs |
| `templates/` | shell templates (`python-shell/`) |
| `skills/` | agent skills (`almadar-orb-universal`, `almadar-orbitals`) |

Community: [Discord](https://discord.gg/q83VjPJx) and [GitHub Discussions](https://github.com/almadar-io/almadar/discussions). Contribution guidance is in [CONTRIBUTING.md](CONTRIBUTING.md). Built by [Almadar](https://almadar.io) in Ljubljana, Slovenia.

## Development

The `ci.yml` workflow runs on push to `main` and checks that every `.orb` file in `tests/schemas/` and `examples/` is valid JSON. The package scripts are `validate`, `compile`, `dev` and `test`, each a call to the `almadar` CLI from `@almadar/cli`.

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm exec eslint --no-warn-ignored --max-warnings 0 <files you touched>
```

Open gaps are in `Almadar_Gaps.md`. Work on `main` only; never publish from here (releases go through the monorepo cascade and CI).

## Docs
- [Orb language docs](https://orb.almadar.io/docs/getting-started/introduction)

## License
Business Source License 1.1, Licensor Almadar FZE; production use for non-commercial purposes and internal evaluation is granted, and the license converts to Apache 2.0 on 2030-02-01. See [LICENSE](LICENSE).
