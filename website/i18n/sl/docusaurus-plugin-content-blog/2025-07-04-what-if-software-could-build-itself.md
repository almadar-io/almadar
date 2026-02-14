---
slug: what-if-software-could-build-itself
title: "Kaj, ce bi se programska oprema lahko zgradila sama?"
authors: [osamah]
tags: [philosophy, business]
---

Predstavljajte si, da bi lahko sedli, natancno opisali, kaj zelite, da aplikacija pocne — v preprostem jeziku — in se preprosto... zgradi sama. Ne grob prototip. Ne demonstracija, ki se sesuje ob prvem dotiku. Prava, za produkcijo pripravljena aplikacija, ki deluje od prvega dne.

To zveni kot znanstvena fantastika. Ampak ni.

<!-- truncate -->

## Analogija z nacrtom

Pomislite, kako nastane stavba.

Arhitekt ne pride na gradbisce s kladivom. Sedi v studiu, risu nacrte in opisuje, kako naj bi stavba izgledala, kako se bodo ljudje gibali po njej, kje bodo nosilne stene. Nato gradbena ekipa vzame te nacrte in jih spremeni v fizicno strukturo.

Arhitekt opisuje. Ekipa gradi. Nihce ne pricakuje, da bo arhitekt sam ulival beton.

Programska oprema nikoli ni delovala na ta nacin. Ze desetletja so morali ljudje, ki razumejo poslovne potrebe, racunati na verigo prevajalcev — produktni vodje, oblikovalci, razvijalci, inzenirji zagotavljanja kakovosti — da so njihovo vizijo spremenili v resnicnost. Vsak clen v tej verigi prinasa zamude, nerazumevanje in stroske.

Kaj, ce bi verigo v celoti odstranili?

## Opisi. Prevedi. Objavi.

Pri Almadarju smo zgradili sistem, ki deluje kot arhitekturni nacrti za programsko opremo.

Opisete, kaj naj vas aplikacija pocne: podatke, ki jih upravlja, delovne tokove, ki jim sledi, zaslone, ki jih vidijo uporabniki, pravila, ki jih uveljavlja. To opisete v strukturirani obliki, ki se bere skoraj kot dokument poslovnih zahtev.

Nato nas prevajalnik — predstavljajte si ga kot gradbeno ekipo — vzame ta opis in generira celotno aplikacijo. Uporabniski vmesnik. Zaledni sistem. Podatkovno plast. API. Avtentikacijo. Vse.

To ni predloga. To ni orodje za gradnjo spletnih strani s tehniko povleci-in-spusti. To je prevajalnik, ki prebere vaso poslovno logiko in proizvede popolno aplikacijo, pripravljeno za objavo.

Opisi. Prevedi. Objavi. Trije koraki. To je celoten postopek.

## Analogija z receptom

Tukaj je se en nacin razmisljanja o tem.

Kuhar ne kuha tako, da nakljucno mece sestavine v lonec. Napise recept. Recept opisuje, kaj gre noter, v kaksnem vrstnem redu, pri kaksni temperaturi, koliko casa. Spreten kuhar v kateri koli kuhinji, kjer koli na svetu, lahko vzame ta recept in pripravi isto jed.

Tradicionalni razvoj programske opreme je kot kuhanje brez recepta. Vsak razvijalec improvizira. Vsaka kuhinja proizvede nekaj malenkost drugacnega. Ko prvotni kuhar odide, nihce ne ve, kako poustvariti jed.

Almadarjev pristop je recept. Natancno zapisete, kaj naj vas aplikacija pocne — njene "sestavine" in "navodila" — in sistem vsakic proizvede enak zanesljiv rezultat. Spremenite recept in jed se spremeni. Recept je vedno vir resnice.

## Analogija z glasbeno partituro

Pomislite, kako deluje orkester.

Skladatelj napise partituro — natancen opis, kaj naj vsak instrument igra, kdaj in kako. Skladatelju nikoli ni treba vzeti violine v roke. Partitura je izdelek. Ko jo orkester izvede, nastane glasba.

Zdaj si predstavljajte svet, v katerem bi skladanje glasbe zahtevalo, da skladatelj osebno igra na vsak instrument, socasno, medtem ko instrumente se gradi iz nic. To je v bistvu to, kar je bil razvoj programske opreme: ljudje z idejami so prisiljeni biti tudi graditelji ali najeti vojske graditeljev in upati, da prevod ostane zvest.

Almadar vam omogoca, da ste skladatelj. Napisite partituro. Orkester — nas prevajalnik in izvajalno okolje — jo zaigra brezhibno.

## Zakaj je to pomembno za vase podjetje

Pogovorimo se o stevilkah.

Tradicionalni razvoj programske opreme po meri za srednje veliko poslovno aplikacijo obicajno stane med 200.000 in 500.000 dolarjev, traja od sest do dvanajst mesecev in zahteva ekipo od pet do deset razvijalcev. Po zagonu porabite se dodatnih 20 do 30 odstotkov prvotnih stroskov letno za vzdrzevanje.

Z Almadarjevim pristopom smo opazili zmanjsanje stroskov do 87 odstotkov. Projekti, ki bi trajali sest mesecev, so dostavljeni v tednih. In ker je opis — "nacrt" — vir resnice, postane vzdrzevanje dramaticno preprostejse. Spremenite opis, znova prevedite, znova objavite. Brez kopanja po tisocih vrsticah programske kode.

Ampak stroski so le del zgodbe. Tukaj je to, kar se resnično spremeni:

**Hitrost do trga.** Ko lahko greste od ideje do delujone aplikacije v tednih namesto mesecih, lahko preizkusite ideje, preden vasi konkurenti sploh koncajo sestanke o nacrtovanju.

**Brez vezanosti na ponudnika.** Aplikacije, ki jih Almadar generira, so standardne aplikacije z odprtimi tehnologijami. Ce se kdaj odlocite zapustiti Almadar, vzamete svojo aplikacijo s seboj. Je vasa. Brez lastnisega izvajalnega okolja. Brez situacije z zajetjem talcev.

**Poslovni ljudje ohranijo nadzor.** Opis vase aplikacije se bere kot poslovni dokument, ne kot programska koda. Ljudje, ki razumejo posel, ga lahko preberejo, preverijo in spremenijo — brez diplome iz racunalnistva.

**Doslednost v merilu.** Ne glede na to, ali gradite eno aplikacijo ali dvajset, enak pristop proizvede enako kakovost. Nic vec razlik, odvisnih od tega, kateri razvijalec je napisal kateri modul.

## Kvaka (je ni)

Na tej tocki morda razmisljate: "To zveni predobro, da bi bilo res. Kje je kompromis?"

Posten odgovor: kompromis je, da je ta pristop nov. Miselni model se razlikuje od nacina, kako je industrija delovala zadnjih petdeset let. Sprejetje zahteva pripravljenost razmisljati o programski opremi drugace — ne kot o necem, kar "programiras", ampak kot o necem, kar "opises".

Za nekatere organizacije je ta sprememba v razmisljanju najtezji del. Tehnologija deluje. Ekonomija je prepricljiva. Rezultati govorijo sami zase. Ampak opustiti stari nacin — tistega, ki pravi, da "prava programska oprema zahteva pravo programiranje" — zahteva pogum.

Ugotovili smo, da se najhitreje prilagodijo ne tehnicni strokovnjaki. To so poslovni vodje, podjetniki, domenski specialisti, ki so vedno vedeli, kaj zelijo zgraditi, ampak jim je bilo receno, da za to potrebujejo ekipo inzenirjev.

Izkazalo se je, da so imeli ves cas prav. Potrebovali so le drugacno vrsto orodja.

## Kaj sledi

Era opisovanja programske opreme namesto programiranja ne prihaja. Ze je tu.

Almadar ze uporabljajo za gradnjo aplikacij v popolnoma razlicnih domenah — od takticnih strateskih iger do vladnih sistemov za skladnost, od sledilnikov fitnesa do platform za ucenje, ki jih poganja umetna inteligenca. Enak pristop. Enako orodje. Razlicni opisi, razlicne aplikacije.

Ce imate idejo za aplikacijo — bodisi orodje za vaso ekipo, izdelek za vase stranke ali platformo za vaso panogo — vam ni vec treba zaceti z najemanjem razvojne ekipe in cakati sest mesecev.

Zacnete lahko z opisom, kaj zelite.

In nato gledate, kako se zgradi sama.

---

*Vas zanima Almadar v akciji? Obiščite [almadar.dev](https://almadar.dev) ali se obrnite na nas neposredno. Z veseljem vam pokazemo, kako izgleda "opisi, prevedi, objavi" za vas konkreten primer uporabe.*
