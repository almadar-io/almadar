# Almadar

> **Fizika programske opreme**: Deklarirajte svojo aplikacijo, prevedite v produkcijo

Dobrodošli v dokumentaciji programskega jezika Almadar. Almadar je deklarativni pristop k gradnji celovitih aplikacij prek state machines, entities in traits.

## Hitra navigacija

### Začetek

- [Uvod](getting-started/introduction.md) - Kaj je Almadar in zakaj bi ga uporabili?
- [Namestitev](getting-started/installation.md) - Pridobite Almadar CLI za vaš sistem
- [Vaša prva shema](getting-started/first-schema.md) - Zgradite upravljalnika nalog v 10 minutah
- [Osnovni koncepti](getting-started/core-concepts.md) - Entities, traits in state machines

### Jezikovna referenca

- [Specifikacija](language/specification.md) - Popolna jezikovna specifikacija
- [Entities](language/entities.md) - Podatkovne strukture in persistence
- [Traits](language/traits.md) - Vedenje kot state machines
- [S-Expressions](language/s-expressions.md) - Sintaksa za guards in effects
- [Effects](language/effects.md) - Strežniški in klientski effects
- [Patterns](language/patterns.md) - Knjižnica UI vzorcev

### Vodniki

#### Tehnični

- [Načrtovanje State Machines](guides/technical/state-machines.md)
- [Guards in dovoljenja](guides/technical/guards-and-permissions.md)
- [Cross-Orbital dogodki](guides/technical/cross-orbital-events.md)
- [Testiranje](guides/technical/testing.md)

#### Poslovni

- [Zakaj Almadar?](guides/business/why-orbital.md)
- [Primerjava stroškov](guides/business/cost-comparison.md)
- [Študije primerov](guides/business/case-studies.md)

### Tutoriali

#### Začetniški

- [Upravljalnik nalog](tutorials/beginner/task-manager.md)
- [Todo aplikacija](tutorials/beginner/todo-app.md)

#### Vmesni

- [E-trgovina](tutorials/intermediate/ecommerce.md)
- [SaaS nadzorna plošča](tutorials/intermediate/saas-dashboard.md)

#### Napredni

- [Razvoj iger](tutorials/advanced/game-development.md)
- [IoT in robotika](tutorials/advanced/iot-robotics.md)

### Referenca

- [CLI referenca](reference/cli.md)
- [Standardna knjižnica](reference/std-library.md)
- [Knjižnica Traits](reference/traits-library.md)
- [Knjižnica Patterns](reference/patterns-library.md)
- [Kode napak](reference/error-codes.md)

---

## Filozofija Almadar

### Closed Circuit Pattern

Vsaka uporabniška interakcija v Almadarju sledi garantiranemu toku:

```
Event (Uporabniška akcija)
    ↓
Guard Evaluation (Preverjanje dovoljenj)
    ↓
State Transition (Logika vedenja)
    ↓
Effects Execution
    ↓
Response to UI
```

Ta vzorec zagotavlja:
- **Varnost po zasnovi** - Guards uveljavljajo dovoljenja na nivoju prehoda
- **Predvidljivo vedenje** - State machines lahko obstajajo samo v veljavnih stanjih
- **Testabilnost** - Vsaka pot je naštevna in testabilna

### Trije stebri

1. **Entities** - Kaj vaša aplikacija upravlja (podatki)
2. **Traits** - Kako se vaša aplikacija obnaša (state machines)
3. **Pages** - Kje se vaša aplikacija pojavi (routes)

### Zakaj "Almadar"?

Kot planeti v orbiti okoli zvezde, komponente aplikacije v Almadarju sledijo predvidljivim, zakonitim potem. Zakoni fizike zagotavljajo stabilnost; Almaderjevi state machines zagotavljajo doslednost aplikacije.

---

## Skupnost

- [Discord](https://discord.gg/YtWJCpnk) - Klepet v realnem času in podpora
- [GitHub Discussions](https://github.com/almadar-io/almadar/discussions) - Tehnične razprave
- [LinkedIn](https://www.linkedin.com/company/almadar-io) - Novice in napovedi

---

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
