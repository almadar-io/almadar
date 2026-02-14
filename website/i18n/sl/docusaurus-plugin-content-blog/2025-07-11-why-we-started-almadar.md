---
slug: why-we-started-almadar
title: "Zakaj smo ustanovili Almadar"
authors: [osamah]
tags: [philosophy, story]
---

Isto aplikacijo sem zgradil vsaj dvanajstkrat. Razlicna podjetja, razlicne panoge, razlicni logotipi na prijavnem zaslonu,pod povrsjem pa isti vzorci, znova in znova. Upravljanje uporabnikov. CRUD obrazci. Podatkovne tabele. Nadzorne plosce. Upravljanje stanj. Iste arhitekturne odlocitve, ista sablonska koda, iste napake na istih mestih.

Na neki tocki sem se ustavil in se vprasal: zakaj to se vedno pocnemo?

<!-- truncate -->

## Past sablonske kode

Na zacetku kariere sem mislil, da je ponavljanje preprosto del sluzbe. Nauces se ogrodja, zgradiS aplikacijo, se preseli na naslednji projekt in zgradiS v bistvu isto aplikacijo z drugacnimi imeni polj. Vsak nov projekt se je zacel s tedni priprav: avtentikacija, usmerjanje, modeli podatkovne baze, API koncne tocke, validacija obrazcev, obravnava napak. Zanimivo delo,dejanska poslovna logika, ki je vsak projekt naredila edinstven,je bilo morda 20 % celotnega truda. Preostalih 80 % je bilo vodovodno delo.

Leta sem se prepriceval, da je to normalno. Vsi tako delajo. Ogrodja pomagajo. Knjiznice pomagajo. Ampak pomagajo le na robovih. Jedro problema je ostalo: vsaka aplikacija, ki sem jo zgradil, je bila priblizno 80 % enaka prejsnji, in tistih 80 % sem vsakic znova pisal od zacetka.

Potrata je bila osupljiva, ko sem si vzel cas za izracun. Ne samo moj cas, temvec cas celotnih ekip. Oblikovalci, ki so znova oblikovali iste vzorce. Testerji, ki so znova testirali iste tokove. Vodje projektov, ki so znova ocenjevali iste naloge. Razvoj programske opreme smo spremenili v drago rocno tekoco proizvodnjo, kjer so izkuseni inzenirji vecino casa porabili za delo, ki bi ga stroj lahko opravil,ce bi mu le nekdo dal prava navodila.

## Problem obsega

Pravi prebliski so prisli, ko sem delal na velikih podjetniskih sistemih v Savdski Arabiji, vkljucno s platformo za nacionalno e-fakturiranje. To niso bili stranski projekti ali zagonski prototipi. To so bili sistemi, na katere bi se zanasalo na stotisice podjetij, sistemi, kjer bi napaka na napacnem mestu lahko motila celotno gospodarstvo.

Pri takem obsegu postane krhkost tradicionalnega razvoja nemogoca za spregledanje. Ko desetine razvijalcev dela prek sto datotek, vsaka sprememba postane tveganje. Nekdo preimenuje polje v zaledju, a pozabi na uporabniski vmesnik. Nekdo doda novo stanje v delovni tok, a ne posodobi logike preverjanja. Nekdo popravi napako na enem mestu in povzroci dve novi napaki drugje. Kodna baza raste, ekipa raste, koordinacijski stroski rastejo in celotna zadeva postaja pocasnejsa in drazja z vsakim mesecem.

Opazoval sem organizacije, ki so te probleme poskusale resiti s kadrovanjem. Vec razvijalcev, vec testerjev, vec vodij. In pomagalo je zacasno,tako kot dodajanje pasov na avtocesto zacasno zmanjsa prometne zamaske. Toda temeljna arhitektura je bila problem, ne stevilo glav.

Kar me je najbolj presenetilo, je bil kontrast med pomembnostjo teh sistemov in primitivnim nacinom, kako smo jih gradili. Gradili smo kriticno nacionalno infrastrukturo z istimi metodami kot aplikacijo za seznam opravil, le z vec ljudmi in vec sestanki. Moral je obstajati boljsi nacin.

## Spoznanje

Ideja ni prisla v enem bliku. Bolj je bila pocasno kopicenje opazanj, ki so koncno dosegle prelomno tocko.

Sledil sem vzponu velikih jezikovnih modelov in razmiSljal, kaj bi umetna inteligenca dejansko lahko naredila za razvoj programske opreme. Ne samodejno dokoncevanje kode,to se je zdelo, kot da dajeS hitrejsi motor na konsjki voz. Prava priloznost je bila globlija: kaj ce bi umetna inteligenca lahko generirala celotne aplikacije, ne vrstico za vrstico, temvec naenkrat, iz visokonivojskega opisa?

Problem te ideje je, da je naravni jezik dvoumen. Povej umetni inteligenci "zgradi mi upravljalnik nalog" in dobis nekaj, a ne bo tisto, kar si zelis. Vrzel med tistim, kar povemo, in tistim, kar mislimo, je ogromna. Potrebujes nekaj vmes,strukturiran jezik, ki je dovolj natancen, da ga stroj izvede, a dovolj izrazit, da ga clovek razume.

Takrat so koScki zlezli skupaj. Kaj ce bi ustvarili jezik shem,nacin za opis celotnega obnasanja aplikacije v enem samem deklarativnem dokumentu? Ne samo podatkovni model, temvec stanja, prehode, vzorce uporabniskega vmesnika, poslovna pravila. Vse, kar aplikacija pocne, zajeto na enem mestu.

Ce imas tak jezik, potem lahko prevajalnik to spremeni v delujoco aplikacijo. In ce imas tak prevajalnik, potem lahko umetna inteligenca generira shemo iz pogovora s clovekom. Clovek opise, kaj zeli, umetna inteligenca ustvari shemo, prevajalnik ustvari aplikacijo. Brez sablonske kode. Brez ponavljanja. Brez 80 % potrate.

## Orbita

Ime je prislo naravno. "Almadar" je arabsko za "orbita." V fiziki orbitala ni fiksna pot, temvec polje verjetnosti,obmocje, kjer se bo elektron verjetno nahajal, obvladovano s kvantnimi pravili. Elektron ne potrebuje navodil za vsak premik. Pravila sistema dolocajo njegovo obnasanje.

Natancno tako razmiSljamo o komponentah programske opreme. Vsak kos aplikacije,uporabnik, racun, naloga,je orbitalna enota. Ima obliko podatkov (entiteta), nabor vedenj (lastnosti) in mesto v vmesniku (strani). Te enote ne potrebujejo poznavanja notranjih podrobnosti druga druge. Komunicirajo prek dogodkov, kot delci, ki si izmenjujejo energijo. Pravila se dolocijo enkrat in sistem tece.

To ni bila le lepa metafora. Bilo je arhitekturno nacelo. Programska oprema ne bi smela biti monolit, ki ga gradiS od spodaj navzgor in povezujeS vsak kos z vsakim drugim kosom. Morala bi biti sistem samostojnih komponent, ki krozijo okrog skupnih podatkov in medsebojno delujejo prek jasno dolocenih vmesnikov. Spremeni eno komponento in preostali sistem se prilagodi,ker so pravila eksplicitna, ne zakopana v tisocih vrsticah imperativne kode.

## Dva cloveka, ne dvajset

Almadar sem soustanovil z Majo v Ljubljani, v Sloveniji. Dva cloveka, ne dvajset. To je bilo namerno.

Oba sva videla, kaj se zgodi, ko podjetja poskusajo resiti kompleksnost z vec zaposlenimi. Konca se z vec kompleksnosti, ne manj. Vec komunikacijskih stroskov, vec koordinacije, vec sestankov o sestankih. Najboljsa programska oprema, ki sem jo kdaj videl, je bila zgrajena s strani majhnih ekip z mocnimi prepricanji in jasnimi omejitvami.

Nasa omejitev je bila preprosta: zgraditi moramo nekaj, kar lahko vzdrzujeta dva cloveka. To je pomenilo, da mora orodje samo odpraviti delo, ki bi sicer zahtevalo veliko ekipo. Ce Almadar ne more zmanjsati projekta za deset ljudi na projekt za dva cloveka, potem ga nimamo pravice graditi.

Ljubljana se je izkazala za popolno mesto za tovrstno delo. Majhno, mirno mesto s hitrim internetom in brez motenj. Brez cirkusa tveganega kapitala, brez cikla navduSenja, brez pritiska, da zaposlis petdeset inzenirjev in ugotovis produkt pozneje. Le dva cloveka v sobi, ki resuejta tezak problem, ker verjameta, da je pomemben.

## Stevilke

Postavili smo si konkreten cilj: 87-odstotno zmanjsanje stroskov. Ne nejasna obljuba "povecane produktivnosti",dejansko, merljivo zmanjsanje casa in denarja, potrebnega za gradnjo poslovne aplikacije.

Od kod ta stevilka? Ce je 80 % tipicne aplikacije sablonska koda, ki jo generira prevajalnik, in preostalih 20 % je poslovna logika po meri, ki zahteva polovico casa, ker delamo s cisto shemo namesto zapletene kodne baze, dobimo priblizno 87 % prihrankov. Tedni namesto mesecev. Tisoci namesto deset tisocov.

Toda zmanjsanje stroskov je le polovica zgodbe. Druga polovica je lastnistvo. Z Almadarjem ste lastnik vsega. Shema je vasa. Generirana koda je vasa. Ni zaklepanja pri dobavitelju, ni mesecne narocnine za dostop do lastne aplikacije, ni platforme, ki lahko spremeni ceno ali se zapre in odnese vaso programsko opremo. Opisete, kaj zelite, mi to generiramo, in v celoti je vase.

To je pomembnejse, kot se vecina ljudi zaveda. Videl sem podjetja, ki so bila talci platform, od katerih so bila odvisna. Cene rastejo, funkcije se odstranijo, API-ji se spremenijo brez opozorila. Ko imate v lasti izvorno kodo in shemo, ki jo generira, ste svobodni. Gostite jo lahko kjerkoli, kadarkoli jo spremenite in nikoli vam ni treba skrbeti, da bodo poslovne odlocitve dobavitelja vplivale na vase.

## Kaj gradimo

Almadar se ni koncan. Se vedno smo na zacetku, se vedno izpopolnjujemo jezik shem, se vedno sirsimo knjiznico vzorcev, se vedno izboljsujemo prevajalnik. Toda jedro ideje deluje. Zgradili smo prave aplikacije za prave stranke,sisteme, ki bi zahtevali mesece in velike ekipe, dostavljene v tednih s strani dveh ljudi z datoteko sheme in prevajalnikom.

Vizija je jasna: vsaka poslovna aplikacija, ki sledi pogostim vzorcem, bi morala zahtevati dneve za gradnjo, ne mesecev. Ljudje, ki razumejo poslovanje, bi morali biti sposobni opisati, kaj potrebujejo, in sistem bi to moral proizvesti. Razvijalci bi morali porabiti cas za resnično tezke probleme,tistih 20 %, ki so edinstveni in zanimivi,ne za 80 %, ki so bili reseni ze tisockrat.

Almadar sem zacel, ker sem bil naveliCan graditi isto stvar znova in znova. Nadaljeval sem, ker sem spoznal, da nisem edini.

Ce se vam karkoli od tega zdi znano, bi vas radi slisali. Oglejte si naso [dokumentacijo](/docs), preizkusite [CLI](/docs/downloads/cli) ali nas preprosto kontaktirajte in nam povejte, kaj gradite. Orbita se sele zacenja.
