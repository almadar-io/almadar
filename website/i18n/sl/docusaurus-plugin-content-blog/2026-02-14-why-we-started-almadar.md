---
slug: why-we-started-almadar
title: "Zakaj smo ustanovili Almadar"
authors: [osamah]
tags: [philosophy, story]
---

Isto aplikacijo sem zgradil vsaj dvanajstkrat. Razlicna podjetja, razlicne panoge, razlicni logotipi na prijavnem zaslonu, pod povrsjem pa isti vzorci, znova in znova. Upravljanje uporabnikov. CRUD obrazci. Podatkovne tabele. Dashboards. State management. Iste arhitekturne odlocitve, isti boilerplate, iste napake na istih mestih.

Na neki tocki sem se ustavil in se vprasal: zakaj to se vedno pocnemo?

<!-- truncate -->

## Past boilerplate kode

Na zacetku kariere sem mislil, da je ponavljanje preprosto del sluzbe. Nauces se frameworka, zgradiS aplikacijo, se preseli na naslednji projekt in zgradiS v bistvu isto aplikacijo z drugacnimi imeni polj. Vsak nov projekt se je zacel s tedni priprav: authentication, routing, database models, API endpoints, form validation, error handling. Zanimivo delo, dejanski business logic, ki je vsak projekt naredil edinstven, je bilo morda 20 % celotnega truda. Preostalih 80 % je bilo plumbing.

Leta sem se prepriceval, da je to normalno. Vsi tako delajo. Frameworki pomagajo. Libraries pomagajo. Ampak pomagajo le na robovih. Jedro problema je ostalo: vsaka aplikacija, ki sem jo zgradil, je bila priblizno 80 % enaka prejsnji, in tistih 80 % sem vsakic znova pisal od zacetka.

Potrata je bila osupljiva, ko sem si vzel cas za izracun. Ne samo moj cas, temvec cas celotnih ekip. Oblikovalci, ki so znova oblikovali iste vzorce. Testerji, ki so znova testirali iste tokove. Vodje projektov, ki so znova ocenjevali iste naloge. Razvoj programske opreme smo spremenili v drago rocno tekoco proizvodnjo, kjer so izkuseni inzenirji vecino casa porabili za delo, ki bi ga stroj lahko opravil, ce bi mu le nekdo dal prava navodila.

## Problem obsega

Pravi prebliski so prisli, ko sem delal na velikih podjetniskih sistemih v Savdski Arabiji, vkljucno s platformo za nacionalno e-fakturiranje. To niso bili stranski projekti ali zagonski prototipi. To so bili sistemi, na katere bi se zanasalo na stotisice podjetij, sistemi, kjer bi napaka na napacnem mestu lahko motila celotno gospodarstvo.

Pri takem obsegu postane krhkost tradicionalnega razvoja nemogoca za spregledanje. Ko desetine razvijalcev dela prek sto datotek, vsaka sprememba postane tveganje. Nekdo preimenuje polje v backendu, a pozabi na frontend. Nekdo doda novo stanje v delovni tok, a ne posodobi logike preverjanja. Nekdo popravi napako na enem mestu in povzroci dve novi napaki drugje. Kodna baza raste, ekipa raste, koordinacijski stroski rastejo in celotna zadeva postaja pocasnejsa in drazja z vsakim mesecem.

Opazoval sem organizacije, ki so te probleme poskusale resiti s kadrovanjem. Vec razvijalcev, vec testerjev, vec vodij. In pomagalo je zacasno, tako kot dodajanje pasov na avtocesto zacasno zmanjsa prometne zamaske. Toda temeljna arhitektura je bila problem, ne stevilo glav.

Kar me je najbolj presenetilo, je bil kontrast med pomembnostjo teh sistemov in primitivnim nacinom, kako smo jih gradili. Gradili smo kriticno nacionalno infrastrukturo z istimi metodami kot aplikacijo za seznam opravil, le z vec ljudmi in vec sestanki. Moral je obstajati boljsi nacin.

## Spoznanje

Ideja ni prisla v enem bliku. Bolj je bila pocasno kopicenje opazanj, ki so koncno dosegle prelomno tocko.

Sledil sem vzponu Large Language Models in razmiSljal, kaj bi umetna inteligenca dejansko lahko naredila za razvoj programske opreme. Ne autocomplete za kodo, to se je zdelo, kot da dajeS hitrejsi motor na konsjki voz. Prava priloznost je bila globlija: kaj ce bi umetna inteligenca lahko generirala celotne aplikacije, ne vrstico za vrstico, temvec naenkrat, iz visokonivojskega opisa?

Problem te ideje je, da je naravni jezik dvoumen. Povej umetni inteligenci "zgradi mi upravljalnik nalog" in dobis nekaj, a ne bo tisto, kar si zelis. Vrzel med tistim, kar povemo, in tistim, kar mislimo, je ogromna. Potrebujes nekaj vmes, strukturiran jezik, ki je dovolj natancen, da ga stroj izvede, a dovolj izrazit, da ga clovek razume.

Takrat so koScki zlezli skupaj. Kaj ce bi ustvarili schema language, nacin za opis celotnega obnasanja aplikacije v enem samem declarative dokumentu? Ne samo data model, temvec states, transitions, UI vzorce, business rules. Vse, kar aplikacija pocne, zajeto na enem mestu.

Ce imas tak jezik, potem lahko compiler to spremeni v delujoco aplikacijo. In ce imas tak compiler, potem lahko umetna inteligenca generira schema iz pogovora s clovekom. Clovek opise, kaj zeli, umetna inteligenca ustvari schema, compiler ustvari aplikacijo. Brez boilerplate. Brez ponavljanja. Brez 80 % potrate.

## Orbita

Ime je prislo naravno. "Almadar" je arabsko za "orbita." V fiziki orbitala ni fiksna pot, temvec polje verjetnosti, obmocje, kjer se bo elektron verjetno nahajal, obvladovano s kvantnimi pravili. Elektron ne potrebuje navodil za vsak premik. Pravila sistema dolocajo njegovo obnasanje.

Natancno tako razmiSljamo o komponentah programske opreme. Vsak kos aplikacije, uporabnik, racun, naloga, je orbitalna enota. Ima obliko podatkov (entity), nabor vedenj (traits) in mesto v vmesniku (pages). Te enote ne potrebujejo poznavanja notranjih podrobnosti druga druge. Komunicirajo prek dogodkov, kot delci, ki si izmenjujejo energijo. Pravila se dolocijo enkrat in sistem tece.

To ni bila le lepa metafora. Bilo je arhitekturno nacelo. Programska oprema ne bi smela biti monolith, ki ga gradiS od spodaj navzgor in povezujeS vsak kos z vsakim drugim kosom. Morala bi biti sistem samostojnih komponent, ki krozijo okrog skupnih podatkov in medsebojno delujejo prek jasno dolocenih vmesnikov. Spremeni eno komponento in preostali sistem se prilagodi, ker so pravila eksplicitna, ne zakopana v tisocih vrsticah imperative kode.

## Dva cloveka, ne dvajset

Almadar smo ustanovili v Ljubljani, v Sloveniji. Dva cloveka, ne dvajset. To je bilo namerno.

Videli smo, kaj se zgodi, ko podjetja poskusajo resiti kompleksnost z vec zaposlenimi. Konca se z vec kompleksnosti, ne manj. Vec komunikacijskih stroskov, vec koordinacije, vec sestankov o sestankih. Najboljsa programska oprema, ki sem jo kdaj videl, je bila zgrajena s strani majhnih ekip z mocnimi prepricanji in jasnimi omejitvami.

Nasa omejitev je bila preprosta: zgraditi moramo nekaj, kar lahko vzdrzujeta dva cloveka. To je pomenilo, da mora orodje samo odpraviti delo, ki bi sicer zahtevalo veliko ekipo. Ce Almadar ne more zmanjsati projekta za deset ljudi na projekt za dva cloveka, potem ga nimamo pravice graditi.

Ljubljana se je izkazala za popolno mesto za tovrstno delo. Majhno, mirno mesto s hitrim internetom in brez motenj. Brez cirkusa venture capitala, brez hype cycle, brez pritiska, da zaposlis petdeset inzenirjev in ugotovis produkt pozneje. Le dva cloveka v sobi, ki resuejta tezak problem, ker verjameta, da je pomemben.

## Stevilke

Postavili smo si konkreten cilj: 87-odstotno zmanjsanje stroskov. Ne nejasna obljuba "povecane produktivnosti", dejansko, merljivo zmanjsanje casa in denarja, potrebnega za gradnjo poslovne aplikacije.

Od kod ta stevilka? Zbrali smo dejanske projektne zahteve in vse razdelili na najmanjse mozne feature. Nato smo primerjali trud za gradnjo vsakega featura z Almadarjem v primerjavi s tradicionalnim razvojem ob pomoci LLMs. Ko smo vse sesteli prek celotnega obsega, je razlika znasal priblizno 87 %. Tedni namesto mesecev. Tisoci namesto deset tisocov.

Toda zmanjsanje stroskov je le polovica zgodbe. Druga polovica je lastnistvo. Z Almadarjem ste lastnik vsega. Shema je vasa. Generirana koda je vasa. Ni vendor lock-in, ni mesecne narocnine za dostop do lastne aplikacije, ni platforme, ki lahko spremeni ceno ali se zapre in odnese vaso programsko opremo. Opisete, kaj zelite, mi to generiramo, in v celoti je vase.

To je pomembnejse, kot se vecina ljudi zaveda. Videl sem podjetja, ki so bila talci platform, od katerih so bila odvisna. Cene rastejo, funkcije se odstranijo, API-ji se spremenijo brez opozorila. Ko imate v lasti source code in shemo, ki jo generira, ste svobodni. Gostite jo lahko kjerkoli, kadarkoli jo spremenite in nikoli vam ni treba skrbeti, da bodo poslovne odlocitve dobavitelja vplivale na vase.

## Kaj gradimo

Almadar se ni koncan. Se vedno smo na zacetku, se vedno izpopolnjujemo schema language, se vedno sirsimo pattern library, se vedno izboljsujemo compiler. Toda jedro ideje deluje. Zgradili smo prave aplikacije za prave stranke, sisteme, ki bi zahtevali mesece in velike ekipe, dostavljene v tednih s strani dveh ljudi z schema datoteko in compilerjem.

Vizija je jasna: vsaka poslovna aplikacija, ki sledi pogostim vzorcem, bi morala zahtevati dneve za gradnjo, ne mesecev. Ljudje, ki razumejo poslovanje, bi morali biti sposobni opisati, kaj potrebujejo, in sistem bi to moral proizvesti. Razvijalci bi morali porabiti cas za resnično tezke probleme, tistih 20 %, ki so edinstveni in zanimivi, ne za 80 %, ki so bili reseni ze tisockrat.

Almadar smo zaceli, ker smo bili naveliCani graditi isto stvar znova in znova. Nadaljevali smo, ker smo spoznali, da nismo edini.

Ce se vam karkoli od tega zdi znano, bi vas radi slisali. Oglejte si naso [dokumentacijo](https://orb.almadar.io/docs), preizkusite [CLI](https://orb.almadar.io/docs/downloads/cli) ali nas preprosto kontaktirajte in nam povejte, kaj gradite. Orbita se sele zacenja.
