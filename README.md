# Squad Page
Ontwerp en maak samen met je team een website met NodeJS, Express, JSON en Liquid

De instructie vind je in: [INSTRUCTIONS](https://github.com/fdnd-task/connect-your-tribe-squad-page/blob/main/docs/INSTRUCTIONS.md)

## Afspraken 

### Workflow
* Regelmatig committen (kijk wat past bij je issue)
* Als je klaar bent, vraag en feedback, daarna pushen
* Gebruik zoveel mogelijk custom properties
* Pull voordat je gaat werken
* Bij commits het issue nummer erbij zetten 

### Conventies
* Camelcasing voor JS
* Kebab casing voor class namen
* Gebruikt witruimte
* Correcte naamgeving
* Alles in het Engels

# **SquadPage Team Flex**

**Beschrijving**
Op onze squadpage kun je ervoor kiezen om ‘alle teams’ of  ‘alle studenten’ bekijken. Je kan de squadpages van alle teams eenvoudig bekijken en raten. En krijgt per team de gemiddelde beoordeling te zien. Je kunt ook alle studenten bekijken en sorteren op naam of leeftijd. Ook krijg je bij een klik op een student, meer informatie te zien. 

## **Luc**
Op de student page / detailpagina zie je een klein overzicht van een gekozen student. Hier is informatie te zien als: naam, profielfoto, leeftijd, github handle en meer. 
In het geval dat de student geen profielfoto heeft op github, wordt er een placeholder ingeladen om deze te vervangen.
Ook is op deze pagina een link te vinden naar het github profiel van deze student zodat je zijn/haar werk makkelijk kan bekijken. **

[screenshot]

## **Matthijs**

Bij de studenten page krijg je een overzicht van alle studenten. Je kan er voor kiezen om te sorteren op naam (a-z), op naam (z-a) of op leeftijd. Je krijgt de {{person.avatar}} te zien, die zij zelf in de database hebben ingevuld, de naam en daaronder wat extra informatie over die student. 


### **Styling**

Voor de styling heb ik gebruik gemaakt van de FDND styling. De kleuren, shadow op de cards en de borders komen allemaal uit de FDND huisstijl.

De students cards zijn allemaal lists die in een grid getoond worden. Deze grid is vanuit een mobile first principe gebouwd. Op de mobile versie zie je de 1-column-layout die ervoor zorgt dat iedereen onder elkaar staat. Hoe breder het scherm hoe meer rijen er komen. Op desktop zijn dat er uiteindelijk 3.

### **Functionaliteit**

Als iemand geen foto heeft ingevuld bij de {{person.avatar}} uit de database, dan word deze opgevuld met een zwart poppetje, dat zorgt ervoor dat de pagina er mooi blijft uitzien en iedereen toch juist word getoond.

Als je wat meer informatie wilt over een student, kan je op de "refresh knop" klikken en krijg je weer een ander stukje informatie over hem/haar. Deze knop staat duidelijk naast de al voorgeplaatste geboortedatum van alle leerlingen. Als je er overheen hovert wordt die ook iets groter en word je muis een pointer. Dit om te laten zien dat de knop gebruikt mag worden. 

Als je echt wat meer informatie wilt, klik dan op zijn/haar naam en dan kom je uit bij een detailpagina die precies die student die jij aanklikt toont. Ook bij de naam als je er over heen hovert wordt die weer iets groter en krijgt je muis een pointer.
Als je wilt kun je ook weer via de button terug naar de teampagina en andersom!


## **Julia**
Op de home pagina staat een overzicht van teamcards met alle teams van FDND 2024/2025. Op deze cards staat de links naar de live squadpages en een link naar de repo’s. Ook is er een overzicht van alle teamleden. Tot slot kun je met een slider jouw rating doorsturen en wordt rechts bovenin de hoek het gemiddelde getoond van alle ingestuurde ratings (per team).

[video]
### **Ontwerpkeuzes**

**Huisstijl** 
Voor de styling van de cards, heb ik mij zoveel mogelijk aan de huisstijl van FDND gehouden. Ik maakt gebruikt van dezelfde kleuren en heb een ‘schaduw’ meegegeven aan de cards. De ronde borders vanuit de huisstijl komen ook weer terug in bijvoorbeeld de border rond de afbeeldingen van de leden en de knop. 

**Verschillende lay-outs**
De teamcards zijn gebouwd vanuit het mobile first principe en op het kleinste scherm formaat wordt alle content onder elkaar geplaatst (one-column-layout). Bij een groter formaat, worden de teamleden naast elkaar geplaatst, en bij de maximale breedte, schuift de rating functionaliteit naar rechts. 

[afbeelding scherm breedtes teamcards]

**Interacties**
Op de team cards is de mogelijkheid om een rating te sturen. Dit heb ik duidelijk gemaakt met feedforward, namelijk tekst bij de knop waarin de gebruiker uitgenodigd wordt om een beoordelen te geven. De slider wordt lichter van kleur bij het hover en de muis verandert in een pointer (feedforward). Daarnaast verandert het cijfer naast de cijfer, hiermee wordt feedback gegeven aan de gebruiker, dat bij het bewegen van de slider het cijfer een andere waarde krijgt. 
De knop heeft een duidelijk label, namelijk ‘Verstuur’, waarmee wordt aangegeven dat er geklikt moet worden om de beoordeling door te sturen. Op de knop zit ook een hover effect, om nog meer feedforward te geven. Wanneer de rating verstuurd is, krijgt de gebruiker feedback door het gemiddelde dat verandert én het cijfer naast de slider dat verandert. 


