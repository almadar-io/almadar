---
slug: ikea-effect-software
title: "IKEA učinek za programsko opremo: Zakaj gradimo aplikacije iz flat-packov"
authors: [osamah]
tags: [architecture, philosophy]
---

IKEA je revolucionizirala pohištvo tako, da je postala sestavljiva, flat-pack in prijazna za montažo. Kaj če bi programska oprema delovala enako?

<!-- truncate -->

![IKEA učinek v programski opremi: Zakaj imamo radi to, kar gradimo (in zakaj je to nevarno)](/img/blog/ikea-effect-software.png)

Precenjujemo kodo, ki jo napišemo sami. Almadarjeva arhitektura komponent nas sili, da sestavljamo, ne izumljamo.

## Problem pohištva

Pred IKEA je bilo pohištvo bodisi:
- **Po meri**: Drago, počasno, popolnoma prilagojeno
- **Vnaprej sestavljeno**: Veliko, drago za dostavo, omejeni stili

IKEA je našla tretjo pot: **flat-pack modularne komponente**, ki jih stranke sestavijo same. Ta pristop:
- Zmanjša stroške dostave za 80%
- Omogoča masovno raznolikost iz standardnih delov
- Strankam omogoča prilagajanje konfiguracij
- Dostopno visokokakovostno oblikovanje

## Vzporednica s programsko opremo

Tradicionalni razvoj programske opreme se sooča z isto dilemo:
- **Po meri**: Popolna prilagoditev, drago, počasno
- **SaaS platforme**: Omejena prilagoditev, zaklepanje pri dobavitelju
- **Low-code orodja**: Hiter začetek, omejitve pri skaliranju

Almadar uvaja tretjo pot: **Orbitalne enote** — sestavljivi, deklarativni, samostojni moduli funkcij.

## Kaj je Orbital?

Orbital je flat-pack modul programske opreme, ki vsebuje:

```json
{
  "name": "TaskManagement",
  "entity": {
    "name": "Task",
    "fields": [
      { "name": "title", "type": "string" },
      { "name": "status", "type": "enum", "values": ["todo", "done"] }
    ]
  },
  "traits": [
    {
      "name": "TaskBrowser",
      "stateMachine": {
        "states": [{ "name": "Browsing", "isInitial": true }],
        "transitions": [
          {
            "from": "Browsing",
            "to": "Browsing",
            "event": "INIT",
            "effects": [
              ["render-ui", "main", { "type": "entity-table", "entity": "Task" }]
            ]
          }
        ]
      }
    }
  ],
  "pages": [
    { "name": "TaskListPage", "path": "/tasks", "traits": [{ "ref": "TaskBrowser" }] }
  ]
}
```

Tako kot IKEA polica vsebuje panele, vijake in navodila, Orbital vsebuje:
- **Entity** (struktura/paneli)
- **Traits** (konektorji/navodila)
- **Pages** (vodnik za postavitev)

## Sistem Uses: Standardizirani konektorji

IKEA-jina genialnost je bil cam lock — konektor, ki deluje pri vsem njihovem pohištvu. Almadar ima `uses`:

```json
{
  "uses": [
    { "from": "std/behaviors/crud", "as": "CRUD" }
  ],
  "traits": [
    { "ref": "CRUD.traits.CRUDManagement", "linkedEntity": "Task" }
  ]
}
```

To uvozi vnaprej zgrajeno CRUD vedênje, podobno kot nakup vnaprej izdelanega predala namesto rezanja lesa.

## Zakaj kompozicija zmaguje

| Koda po meri | Tradicionalni framework | Almadar Orbitali |
|-------------|----------------------|------------------|
| Popolna prilagoditev | Konvencija nad konfiguracijo | Najboljše iz obeh |
| Počasna gradnja | Hiter začetek, kasnejše omejitve | Hito + skalabilno |
| Težko spremeniti | Omejena prilagoditev | Rekompozabilno |
| Odvisnost od ekipe | Odvisnost od frameworka | Standardni deli |

## Primer iz resničnega sveta: E-trgovinska platforma

Gradnja e-trgovinske platforme tradicionalno pomeni:
1. Oblikuj shemo podatkovne baze (2 tedna)
2. Zgradi auth sistem (2 tedna)
3. Zgradi katalog izdelkov (3 tedni)
4. Zgradi košarico/blagajno (4 tedni)
5. Zgradi admin panel (3 tedni)

**Skupaj: 14 tednov**

Z Almadar Orbitali:
```json
{
  "orbitals": [
    { "uses": [{ "from": "std/behaviors/auth", "as": "Auth" }] },
    { "uses": [{ "from": "std/behaviors/crud", "as": "Products" }] },
    { "uses": [{ "from": "std/behaviors/cart", "as": "Cart" }] },
    { "uses": [{ "from": "std/behaviors/checkout", "as": "Checkout" }] }
  ]
}
```

**Konfiguracija + prilagoditev: 2 tedna**

80%, kar je enako vseh e-trgovinskih spletnih mest, prihaja iz standardnih vedênj. 20%, kar je edinstveno za vaše podjetje, dobi custom traits.

## Ekosistemski učinek

IKEA-jina prava moč ni posamezni kosi — je ekosistem. Lahko:
- Kombinirate BILLY z OXBERG za različne videze
- Dodate razsvetljavo iz iste kolekcije
- Vse se ujema

Almadarjeva standardna knjižnica (`std/behaviors/`) ustvarja isti ekosistem:
- `std/behaviors/crud` — Create, read, update, delete
- `std/behaviors/list` — List brskanje s filtriranjem
- `std/behaviors/detail` — Entity detail views
- `std/behaviors/wizard` — Večkoraki poteki

Vsako vedênje deluje s katerim koli entity, podobno kot IKEA-jini predali ustrezajo kateri koli mizi.

## Poskusite sami

Ustvarite datoteko `task-app.orb`:

```json
{
  "name": "TaskApp",
  "version": "1.0.0",
  "orbitals": [
    {
      "name": "TaskManagement",
      "uses": [{ "from": "std/behaviors/crud", "as": "CRUD" }],
      "entity": {
        "name": "Task",
        "fields": [
          { "name": "title", "type": "string", "required": true },
          { "name": "status", "type": "enum", "values": ["todo", "in-progress", "done"] }
        ]
      },
      "traits": [{ "ref": "CRUD.traits.CRUDManagement" }],
      "pages": [{ "name": "TasksPage", "path": "/tasks" }]
    }
  ]
}
```

Nato prevedite:
```bash
orbital compile task-app.orb --shell typescript
```

Zdaj imate polno CRUD aplikacijo — flat-pack, sestavljivo, pripravljeno za prilagoditev.

## Spoznanje

IKEA ni samo poceni pohištvo. Spremenili so način razmišljanja o opremljanju domov — od "najmi mizarja" do "sestavi sam."

Almadar želi storiti isto za programsko opremo. Ne z razvijalcem, ki so odveč, ampak z njihovo opremo s sestavljivimi, flat-pack moduli, ki se zaskočijo v aplikacije.

Prihodnost ni mizarstvo za vsako polico. Je vedeti, katere standardne dele kombinirati in kje dodati prilagoditve, ki štejejo.

Pripravljeni sestaviti svojo prvo aplikacijo? [Začnite z CLI](https://orb.almadar.io/docs/downloads/cli).
