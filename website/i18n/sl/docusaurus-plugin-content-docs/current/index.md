# Almadar

> **Fizika programske opreme**: Deklarirajte svojo aplikacijo, prevedite v produkcijo

Dobrodošli v programskem jeziku Almadar - deklarativni metodi za gradnjo celovitih aplikacij prek state machines, entities in traits.

## Kaj je Almadar?

Almadar je **deklarativni jezik**, ki spreminja način gradnje programske opreme. Namesto da pišete imperativno kodo, razpršeno med klientom in strežnikom, deklarirate aplikacije kot kompozicije:

- **Entities** - Vaše podatkovne strukture
- **Traits** - Vedênje kot state machines
- **Pages** - UI bindings

Compiler ustvari popolno, produkcijsko pripravljeno aplikacijo.

```
Vaša vizija → OrbitalSchema (.orb) → Celovita aplikacija
```

## Zakaj Almadar?

| Tradicionalni razvoj | Almadar pristop |
|---------------------|-----------------|
| Mesece razvoja | Tedni do produkcije |
| Razpršena poslovna logika | Centralizirane state machines |
| Ročno povezovanje API/UI | Poenotena shema |
| Dokumentacija kot naknadna misel | Shema JE dokumentacija |
| Testiranje je kompleksno | State machines so po naravi testabilne |

## Hiter primer

```json
{
  "name": "TaskManager",
  "orbitals": [{
    "name": "Tasks",
    "entity": {
      "name": "Task",
      "fields": [
        { "name": "title", "type": "string" },
        { "name": "status", "type": "enum", "values": ["pending", "done"] }
      ]
    },
    "traits": [{
      "name": "TaskLifecycle",
      "stateMachine": {
        "states": [
          { "name": "Pending", "isInitial": true },
          { "name": "Done" }
        ],
        "events": [{ "key": "COMPLETE", "name": "Complete Task" }],
        "transitions": [{
          "from": "Pending",
          "to": "Done",
          "event": "COMPLETE",
          "effects": [
            ["persist", "update", "Task", "@entity"],
            ["notify", "success", "Task completed!"]
          ]
        }]
      }
    }]
  }]
}
```

## Začnite

- **[Hiter začetek](getting-started/introduction)** — Zgradite svojo prvo Almadar aplikacijo v 10 minutah
- **[Prenos CLI](downloads/cli)** — Pridobite Almadar compiler za vašo platformo
- **[Pridružite se skupnosti](community/contributing)** — Povežite se z drugimi Almadar razvijalci

## Izbor jezika

- [English Documentation](en/index.md)
- [التوثيق بالعربية](ar/index.md)
- [Dokumentacija v slovenščini](index.md)

---

## Podjetniške storitve

Iščete razvojnega partnerja? **Almadar** je tako ustvarjalec jezika Almadar kot tudi polnopravna programska agencija.

- [Almadar Enterprise](enterprise/index.md) — Razvoj po meri, usposabljanje, svetovanje

---

*Zgrajeno s strastjo od [Almadar](https://almadar.io)*
