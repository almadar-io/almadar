# Almadar

> **Fizika programske opreme**: Deklarirajte svojo aplikacijo, prevedite v produkcijo

Dobrodošli v dokumentaciji programskega jezika Almadar. Almadar je deklarativni pristop k gradnji celovitih aplikacij prek state machines, entities in traits.

## Hitra navigacija

### Začetek

- [Uvod](getting-started/introduction) - Kaj je Almadar in zakaj bi ga uporabili?

### Prenosi

- [CLI](downloads/cli) - Pridobite Almadar CLI za vaš sistem
- [Veščine](downloads/skills) - AI veščine za generiranje kode

### Podjetniške storitve

- [Almadar Enterprise](enterprise/) — Razvoj po meri, usposabljanje, svetovanje

### Skupnost

- [Prispevanje](community/contributing) - Kako prispevati k projektu

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

*Zgrajeno s strastjo od [Almadar](https://almadar.io)*
