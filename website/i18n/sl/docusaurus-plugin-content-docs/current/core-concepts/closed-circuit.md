# Zaprti Krog (Closed Circuit)

Ta dokument definira **Vzorec Zaprtega Kroga** - temeljno arhitekturo, ki zagotavlja, da uporabniki nikoli ne ostanejo v neveljavnem stanju uporabniškega vmesnika.

---

## Problem

Ko uporabnik klikne "Odpri modalno okno", končni avtomat preide v stanje `modalOpen` in upodobi Modal v režo `modal`. Če pa gumb za zaprtje (X) modalnega okna pravilno ne odda dogodka nazaj v končni avtomat, je uporabnik ** obtičal** - vidi modalno okno, vendar ga ne more zapreti.

To je **prekinjen krog**.

---

## Načelo Zaprtega Kroga

**Vsaka interakcija z uporabniškim vmesnikom mora dokončati poln krog nazaj v končni avtomat.**

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│   ┌─────────┐    ┌──────────┐    ┌─────────────┐    ┌──────────────────┐  │
│   │  Dogodek│───►│ Varovalka│───►│   Prehod    │───►│  Učinki          │  │
│   │         │    │ Ovrednoti │    │   Izvedi    │    │  (render_ui)     │  │
│   └─────────┘    └──────────┘    └─────────────┘    └──────────────────┘  │
│        ▲                                                      │           │
│        │                                                      ▼           │
│   ┌─────────┐                                          ┌──────────────┐   │
│   │ Dogodek │◄─────────────────────────────────────────│   Reža UI    │   │
│   │  Vodilo │         UI:CLOSE, UI:SAVE, itd.          │   Upodobljena│   │
│   └─────────┘                                          └──────────────┘   │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

**Pravila:**

1. **Vse interakcije z uporabniškim vmesnikom oddajajo dogodke preko Dogodkovnega Vodila** - Nikoli ne uporabljajte notranjih povratnih klicev kot `onClick={() => setOpen(false)}`
2. **Vsi dogodki morajo imeti ustrezne prehode** - Če komponenta odda `UI:CLOSE`, mora obstajati prehod, ki obravnava `CLOSE`
3. **Nekatere reže se morajo vrniti na main** - Če upodabljate v režo `modal`, `drawer` ali druga prekrivalna reža, MORA obstajati prehod, ki upodablja nazaj v režo `main`

---

## Hierarhija rež in zahteve za vrnitev

| Reža | Vrsta | Zahteva za vrnitev |
|------|-------|-------------------|
| `main` | Primarna | Nobena - to je domača baza |
| `sidebar` | Sekundarna | Opcijska - lahko sobiva z main |
| `center` | Sekundarna | Opcijska - lahko sobiva z main |
| `modal` | Prekrivanje | **OBVEZNO** - Mora imeti prehod CLOSE/CANCEL nazaj na main |
| `drawer` | Prekrivanje | **OBVEZNO** - Mora imeti prehod CLOSE/CANCEL nazaj na main |
| `toast` | Obvestilo | Samodejno se zapre, prehod ni potreben |

**Prekrivalne reže (`modal`, `drawer`) so blokirajoče** - preprečujejo interakcijo z glavno vsebino. Uporabniki MORAJO imeti možnost izhoda iz njih.

---

## Pogodbe dogodkov komponent

Komponente, ki lahko sprožijo prehode stanj, MORAJO oddati dogodke preko Dogodkovnega Vodila:

### Komponente z lastnostjo `actions` (na ravni strani)

| Komponenta | Lastnost | Oddaja |
|-----------|----------|--------|
| `page-header` | `actions` | `UI:{dogodek}` za vsako dejanje |
| `form` | `actions` | `UI:SAVE`, `UI:CANCEL` |
| `toolbar` | `actions` | `UI:{dogodek}` za vsako dejanje |

### Komponente z lastnostjo `itemActions` (na ravni vrstice)

| Komponenta | Lastnost | Oddaja |
|-----------|----------|--------|
| `entity-table` | `itemActions` | `UI:{dogodek}` s tovorom `{ row }` |
| `entity-list` | `itemActions` | `UI:{dogodek}` s tovorom `{ row }` |
| `entity-cards` | `itemActions` | `UI:{dogodek}` s tovorom `{ row }` |

### Prekrivalne komponente (MORAJO oddati dogodke zaprtja)

| Komponenta | Sprožilec zaprtja | Mora oddati |
|-----------|-------------------|-------------|
| `modal` | Gumb X, Escape, klik na prekrivanje | `UI:CLOSE` |
| `drawer` | Gumb X, Escape, klik na prekrivanje | `UI:CLOSE` |
| `confirm-dialog` | Gumb Prekliči | `UI:CANCEL` |
| `game-pause-overlay` | Gumb Nadaljuj | `UI:RESUME` |
| `game-over-screen` | Gumb Ponovno zaženi | `UI:RESTART` |

---

## Zahteve za preverjanje

Validator uveljavlja naslednje:

### 1. Odkrivanje osirotanih dogodkov

Če definicija `actions` ali `itemActions` komponente določi dogodek, MORA obstajati prehod, ki ga obravnava.

```json
// SLABO - OPEN_MODAL nima obdelovalca
{
  "type": "page-header",
  "actions": [{ "label": "Odpri", "event": "OPEN_MODAL" }]
}
// Toda ni prehoda: { "event": "OPEN_MODAL", ... }
```

**Napaka**: `CIRCUIT_ORPHAN_EVENT: Dejanje 'Odpri' oddaja dogodek 'OPEN_MODAL', ki nima prehodnega obdelovalca`

### 2. Prehod za izhod iz Modal/Drawer

Če prehod upodablja v režo `modal` ali `drawer`, MORA obstajati prehod IZ ciljnega stanja, ki:
- Obravnava `CLOSE`, `CANCEL`, ali dogodek, ki ga zahteva vzorec (kot `SAVE`)
- Upodablja nazaj v režo `main` (ali prehodi v stanje, ki to počne)

```json
// SLABO - stanje modalOpen nima izhoda
{
  "from": "viewing",
  "event": "OPEN_MODAL",
  "to": "modalOpen",
  "effects": [["render-ui", "modal", { "type": "modal", ... }]]
}
// Toda ni prehoda: { "from": "modalOpen", "event": "CLOSE", ... }
```

**Napaka**: `CIRCUIT_NO_EXIT: Stanje 'modalOpen' upodablja v režo 'modal', vendar nima prehoda CLOSE/CANCEL. Uporabniki bodo obtičali.`

### 3. Zahteva za vrnitev na Main

Stanja, ki upodabljajo SAMO v nekatere reže, se morajo na koncu vrniti v stanje, ki upodablja v režo `main`.

```json
// SLABO - modalOpen upodablja samo v modal, nikoli se ne vrne na main
{
  "from": "modalOpen",
  "event": "CLOSE",
  "to": "modalOpen",  // Gre nazaj v sebe!
  "effects": []       // In ne upodablja ničesar
}
```

**Napaka**: `CIRCUIT_NO_MAIN_RETURN: Stanje 'modalOpen' nima poti nazaj v stanje, ki upodablja v režo 'main'`

---

## Zahteve za prevajalnik

Prevajalnik zagotavlja zaprte kroge preko:

### 1. Ovojnikov rež za prekrivanja

Prekrivalne reže so ovite v komponente ovojnikov rež, ki obravnavajo komunikacijo z dogodkovnim vodilom:

| Reža | Ovojnik | Oddani dogodki |
|------|---------|----------------|
| `modal` | `ModalSlot` | `UI:CLOSE`, `UI:CANCEL` |
| `drawer` | `DrawerSlot` | `UI:CLOSE`, `UI:CANCEL` |
| `toast` | `ToastSlot` | `UI:DISMISS`, `UI:CLOSE` |

Komponente ovojnikov:
- Samodejno prikažejo, ko so otroci prisotni
- Obravnavajo sprožilce zaprtja/odpustitve (gumb X, Escape, klik na prekrivanje)
- Oddajajo dogodke preko dogodkovnega vodila, da lahko končni avtomat preide

**Primer**: `ModalSlot` ovije kakršno koli vsebino, upodobljeno v modalni reži, in odda `UI:CLOSE`, ko se zapre:

```typescript
// ModalSlot.tsx
const handleClose = () => {
  eventBus.emit('UI:CLOSE');
  eventBus.emit('UI:CANCEL');
};

return (
  <Modal isOpen={Boolean(children)} onClose={handleClose}>
    {children}
  </Modal>
);
```

### 2. Generiranje lastnosti `event`, ne `onClick`

Za dejanja v `page-header`, `form`, itd., prevajalnik generira lastnost `event`, tako da komponenta oddaja preko dogodkovnega vodila:

```typescript
// Generirana koda:
<PageHeader actions={[{ label: "Odpri", event: "OPEN_MODAL" }]} />

// NE:
<PageHeader actions={[{ label: "Odpri", onClick: () => dispatch('OPEN_MODAL') }]} />
```

Komponenta obravnava oddajanje `UI:OPEN_MODAL` preko dogodkovnega vodila, kar `useUIEvents` ujame in razpošlje.

### 3. Stran mora upodobiti vse reže z ovojniki

Generirane strani upodabljajo VSE reže, pri čemer so prekrivalne reže ovite v svoje ovojnike rež:

```typescript
// Generirana stran:
return (
  <>
    <VStack>
      {/* Reže vsebine - upodobljene v vrsti */}
      {ui?.main}
      {ui?.sidebar}
      {ui?.center}
    </VStack>
    {/* Prekrivalne reže - ovite za zaprti krog */}
    <ModalSlot>{ui?.modal}</ModalSlot>
    <DrawerSlot>{ui?.drawer}</DrawerSlot>
    <ToastSlot>{ui?.toast}</ToastSlot>
  </>
);
```

**Ključno**: Ovojniki rež oddajajo dogodke preko dogodkovnega vodila, ko se prekrivanje zapre/odpusti. To zaključi krog nazaj v končni avtomat.

---

## Vzorec sheme za Modal

Pravilen vzorec sheme za modalno okno:

```json
{
  "states": [
    { "name": "viewing", "isInitial": true },
    { "name": "modalOpen" }
  ],
  "events": [
    { "key": "OPEN_MODAL", "name": "Odpri modalno okno" },
    { "key": "CLOSE", "name": "Zapri" }
  ],
  "transitions": [
    {
      "from": "viewing",
      "event": "INIT",
      "to": "viewing",
      "effects": [
        ["render-ui", "main", {
          "type": "page-header",
          "title": "Primer",
          "actions": [{ "label": "Odpri modalno okno", "event": "OPEN_MODAL" }]
        }]
      ]
    },
    {
      "from": "viewing",
      "event": "OPEN_MODAL",
      "to": "modalOpen",
      "effects": [
        ["render-ui", "modal", { "type": "modal", "title": "Modalno okno" }]
      ]
    },
    {
      "from": "modalOpen",
      "event": "CLOSE",
      "to": "viewing",
      "effects": [
        ["render-ui", "main", {
          "type": "page-header",
          "title": "Primer",
          "actions": [{ "label": "Odpri modalno okno", "event": "OPEN_MODAL" }]
        }]
      ]
    }
  ]
}
```

**Ključne točke:**
1. Prehod `OPEN_MODAL` upodablja v režo `modal`
2. Prehod `CLOSE` IZ `modalOpen` upodablja nazaj v režo `main`
3. Oba dogodka imata ustrezne prehode

---

## Povzetek

Vzorec Zaprtega Kroga zagotavlja:

1. **Uporabniki nikoli ne ostanejo obtičali** - Vsako stanje uporabniškega vmesnika ima izhodno pot
2. **Dogodki tečejo skozi končni avtomat** - Ni notranjega upravljanja stanja, ki bi zaobšlo krog
3. **Prekrivalne reže se vrnejo na main** - Modalna okna in predali vedno imajo prehode za zaprtje
4. **Preverjanje ulovi prekinitve** - Prevajalnik preveri celovitost kroga pred generiranjem kode

Ko je krog prekinjen, uporabniki doživljajo "mrtve" gumbe, obtičala modalna okna in neodziven uporabniški vmesnik. Validator in prevajalnik skupaj delujeta, da to preprečita.
