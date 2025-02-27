# Squad Page - Team Flex

## Opdracht 
Ontwerp en maak samen met je team een website met NodeJS, Express, JSON en Liquid

### Resultaat
[Bezoek hier onze squadpage](https://connect-your-tribe-team-squad-page-flex.onrender.com/)

<img src="https://github.com/user-attachments/assets/dba1fdb9-caeb-490c-838a-72c6945a2b2a" width="400">
<img src="https://github.com/user-attachments/assets/18d39fc7-f8fa-48d9-a1ba-e72a0eee768f" width="400">
<img src="https://github.com/user-attachments/assets/abb982a2-5b6b-44e2-818d-0c8bfc224ec7" width="400">

## Inhoudsopgave 
* [Beschrijving](#beschrijving)
* [Kenmerken](#kenmerken)
* [Installatie](#installatie)
* [Afspraken](#afspraken)

## Beschrijving
Op onze squadpage kun je ervoor kiezen om ‘alle teams’ of  ‘alle studenten’ bekijken. Je kan de squadpages van alle teams eenvoudig bekijken en raten. En krijgt per team de gemiddelde beoordeling te zien. Je kunt ook alle studenten bekijken en sorteren op naam of leeftijd. Ook krijg je bij een klik op een student, meer informatie te zien. 

### **Luc**
Op de student page / detailpagina zie je een klein overzicht van een gekozen student. Hier is informatie te zien als: naam, profielfoto, leeftijd, github handle en meer. 
In het geval dat de student geen profielfoto heeft op github, wordt er een placeholder ingeladen om deze te vervangen.
Ook is op deze pagina een link te vinden naar het github profiel van deze student zodat je zijn/haar werk makkelijk kan bekijken. 

<img src="https://github.com/user-attachments/assets/6d3b5c5d-b0cb-4c52-9179-426296116c0b" width="600">

### **Matthijs**
Bij de studenten page krijg je een overzicht van alle studenten. Je kan er voor kiezen om te sorteren op naam (a-z), op naam (z-a) of op leeftijd. Je krijgt de {{person.avatar}} te zien, die zij zelf in de database hebben ingevuld, de naam en daaronder wat extra informatie over die student. 

<img src="https://github.com/user-attachments/assets/bf3a7748-c196-4ed5-a878-560afb7f0a61" width="350">

#### Styling
Voor de styling heb ik gebruik gemaakt van de FDND styling. De kleuren, shadow op de cards en de borders komen allemaal uit de FDND huisstijl.

De students cards zijn allemaal lists die in een grid getoond worden. Deze grid is vanuit een mobile first principe gebouwd. Op de mobile versie zie je de 1-column-layout die ervoor zorgt dat iedereen onder elkaar staat. Hoe breder het scherm hoe meer rijen er komen. Op desktop zijn dat er uiteindelijk 3.

<img src="https://github.com/user-attachments/assets/38f68ecf-7a39-4016-8020-6681d438113c" width="300">
<img src="https://github.com/user-attachments/assets/81d1f557-5020-4c2f-a9b5-f17ba5d8bbd8" width="700" height="400">


#### Functionaliteit
Als iemand geen foto heeft ingevuld bij de {{person.avatar}} uit de database, dan word deze opgevuld met een zwart poppetje, dat zorgt ervoor dat de pagina er mooi blijft uitzien en iedereen toch juist word getoond.

Als je wat meer informatie wilt over een student, kan je op de "refresh knop" klikken en krijg je weer een ander stukje informatie over hem/haar. Deze knop staat duidelijk naast de al voorgeplaatste geboortedatum van alle leerlingen. Als je er overheen hovert wordt die ook iets groter en word je muis een pointer. Dit om te laten zien dat de knop gebruikt mag worden. 

https://github.com/user-attachments/assets/53be12de-e1d5-497f-bf0a-60f1e15890e0

Als je echt wat meer informatie wilt, klik dan op zijn/haar naam en dan kom je uit bij een detailpagina die precies die student die jij aanklikt toont. Ook bij de naam als je er over heen hovert wordt die weer iets groter en krijgt je muis een pointer.
Als je wilt kun je ook weer via de button terug naar de teampagina en andersom!

### Julia
Op de home pagina staat een overzicht van teamcards met alle teams van FDND 2024/2025. Op deze cards staat de links naar de live squadpages en een link naar de repo’s. Ook is er een overzicht van alle teamleden. Tot slot kun je met een slider jouw rating doorsturen en wordt rechts bovenin de hoek het gemiddelde getoond van alle ingestuurde ratings (per team).

https://github.com/user-attachments/assets/770a033e-e9b6-4c2e-9020-42233adf84c6

#### Ontwerpkeuzes
##### Huisstijl
Voor de styling van de cards, heb ik mij zoveel mogelijk aan de huisstijl van FDND gehouden. Ik maakt gebruikt van dezelfde kleuren en heb een ‘schaduw’ meegegeven aan de cards. De ronde borders vanuit de huisstijl komen ook weer terug in bijvoorbeeld de border rond de afbeeldingen van de leden en de knop. 

##### Responsive
De teamcards zijn gebouwd vanuit het mobile first principe en op het kleinste scherm formaat wordt alle content onder elkaar geplaatst (one-column-layout). Bij een groter formaat, worden de teamleden naast elkaar geplaatst, en bij de maximale breedte, schuift de rating functionaliteit naar rechts. 

<img src="https://github.com/user-attachments/assets/3544c6e1-a768-47ae-bf22-9d0ce46f47ec" width="600">

##### Interacties
Op de team cards is de mogelijkheid om een rating te sturen. Dit heb ik duidelijk gemaakt met feedforward, namelijk tekst bij de knop waarin de gebruiker uitgenodigd wordt om een beoordelen te geven. De slider wordt lichter van kleur bij het hover en de muis verandert in een pointer (feedforward). Daarnaast verandert het cijfer naast de cijfer, hiermee wordt feedback gegeven aan de gebruiker, dat bij het bewegen van de slider het cijfer een andere waarde krijgt. 
De knop heeft een duidelijk label, namelijk ‘Verstuur’, waarmee wordt aangegeven dat er geklikt moet worden om de beoordeling door te sturen. Op de knop zit ook een hover effect, om nog meer feedforward te geven. Wanneer de rating verstuurd is, krijgt de gebruiker feedback door het gemiddelde dat verandert én het cijfer naast de slider dat verandert. 

## Kenmerken
In dit project hebben wij gewerkt met NodeJS en gebruiken we Express om een webserver op te zetten. Liquid is gebruikt als template-engine om HTML met dynamische data te generen. 

### Routes en dataverwerking
* [`app.get('/')`](https://github.com/julia-stevens/connect-your-tribe-team-squad-page-flex/blob/db625d75b15366a2d8743dd58e42badee35a9680/server.js#L57-L116): Haalt team- en persoonsgegevens op uit de Directus API, berekent teamratings en sorteert teams op score. De gegevens worden gerenderd in `index.liquid`.
* [`app.post('/')`](https://github.com/julia-stevens/connect-your-tribe-team-squad-page-flex/blob/db625d75b15366a2d8743dd58e42badee35a9680/server.js#L118-L131): Verstuurt een rating naar de Directus API en vernieuwt de pagina.
* [`app.get('/studenten')`](https://github.com/julia-stevens/connect-your-tribe-team-squad-page-flex/blob/db625d75b15366a2d8743dd58e42badee35a9680/server.js#L133-L150): Haalt studenten op en sorteert ze op naam of geboortedatum, afhankelijk van de querystring.
* [`app.get('/student/:id')`](https://github.com/julia-stevens/connect-your-tribe-team-squad-page-flex/blob/db625d75b15366a2d8743dd58e42badee35a9680/server.js#L160-L167): Toont de details van een specifieke student op basis van het ID.
* [`app.get('/admin')` en `app.post('/admin')`](https://github.com/julia-stevens/connect-your-tribe-team-squad-page-flex/blob/db625d75b15366a2d8743dd58e42badee35a9680/server.js#L169-L185): Beheert en verwijdert teamratings.

### Data ophalen en HTML renderen 
* De data wordt opgehaald via `fetch()`-aanvragen aan de Directus API. [Zie hier bijvoorbeeld het fetchen van alle teams](https://github.com/julia-stevens/connect-your-tribe-team-squad-page-flex/blob/33fec4ad92a4b6b59fa662e17b3d3ae1f166e2b7/server.js#L58)
* Vervolgens wordt deze data verwerkt, [zie bijvoorbeeld teams koppelen aan leden](https://github.com/julia-stevens/connect-your-tribe-team-squad-page-flex/blob/33fec4ad92a4b6b59fa662e17b3d3ae1f166e2b7/server.js#L64-L85). En daarna wordt de data [gerenderd](https://github.com/julia-stevens/connect-your-tribe-team-squad-page-flex/blob/33fec4ad92a4b6b59fa662e17b3d3ae1f166e2b7/server.js#L111-L114)
* De gerenderde HTML wordt gegenereerd via Liquid, waarbij variabelen worden doorgegeven aan de templates, zie bijvoorbeeld de [student detail pagina](https://github.com/julia-stevens/connect-your-tribe-team-squad-page-flex/blob/db625d75b15366a2d8743dd58e42badee35a9680/views/student.liquid#L20-L38).

### Uitleg NodeJS, Express en Liquid
#### NodeJS
Met NodeJS kun je JavaScript op een server draaien. Hiermee kun je `get` en `post` request/responses bouwen om met bv. databases te communiceren. Zoals wij in dit project hebben gedaan.   

#### Express
Express is een hulpmiddel binnen NodeJS, waarmee een webserver gebouwd kan worden. Je kunt bijvoorbeeld instellen welke pagina's en data getoond wordt. 

#### Liquid
Liquid is een template-engine waarmee je dynamische HTML-pagina's kunt genereren.

## Installatie
Zoals beschreven bij [Kenmerken](#kenmerken) is bij dit project gebruik gemaakt van NodeJS. Om aan dit project te werken moet NodeJS geïnstalleerd zijn. Eenmal geïnstalleerd kan het project geopend worden in de code editor. 

Voer in de terminal `npm install` uit om alle afhankelijkheden te installeren. 

Voer vervolgens `npm start` uit om de server te starten.

Ga in je browser naar http://localhost:8000 om het project te bekijken.

## Afspraken 
### Workflow
* Regelmatig committen (kijk wat past bij je issue)
* Als je klaar bent, vraag en feedback, daarna pushen
* Gebruik zoveel mogelijk custom properties
* Pull voordat je gaat werken
* Bij commits het issue nummer erbij zetten 

### Conventies
* camelCasing voor JS
* kebab-casing voor class namen
* Gebruik witruimte
* Correcte, logische naamgeving voor variabelen/functies, etc
* Alles in het Engels
