# U02 – Dynamisk Portfolio

## Publicerad webbplats

[Länk till min publicerade portfolio – GitHub Pages](https://nathalie-bjorkman.github.io/nathalie-bjorkman-u02/)

## Beskrivning

Detta projekt är en vidareutveckling av min portfolio från U01. Syftet med uppgiften har varit att göra webbplatsen mer dynamisk genom att hämta information från olika datakällor med JavaScript.

Mitt CV hämtas från en egen JSON-fil och mina GitHub-projekt hämtas via GitHubs API. Webbplatsen innehåller även en hamburgermeny, möjlighet att växla mellan ljust och mörkt läge samt responsiv design för olika skärmstorlekar.

---

## Reflektion

### Datans väg

På projektsidan använder jag GitHubs API för att hämta mina publika repositories. I `projects.js` börjar jag med att skicka ett GET-anrop till:

`https://api.github.com/users/nathalie-bjorkman/repos?per_page=100`

Jag använder `fetch()` för att göra anropet och `await` för att vänta på svaret. När svaret kommer kontrollerar jag med `response.ok` att anropet lyckades. Därefter omvandlar jag svaret till JSON med `response.json()`.

Innan projekten visas på sidan filtrerar jag bort repositories som är forks, arkiverade eller som jag själv har valt att exkludera. Jag sorterar sedan projekten efter när de senast uppdaterades, så att de senaste visas först.

Jag hämtar även programmeringsspråken för varje repository via GitHubs `languages_url`. Med hjälp av `Object.keys()` får jag fram språknamnen som sedan visas under rubriken Tech Stack i respektive projektkort.

På så sätt behöver jag inte skriva in mina projekt manuellt varje gång jag uppdaterar min portfolio.

### Två datakällor

Jag använder två olika datakällor i projektet. Mitt CV ligger i `data/cv.json`, som jag själv har skapat och fyllt med information om mina tidigare arbeten och utbildningar.

I `about.js` hämtar jag informationen med `fetch()` och bygger sedan upp innehållet på About-sidan.

Skillnaden är att JSON-filen är en lokal datakälla som jag själv kontrollerar och uppdaterar, medan GitHub API är en extern datakälla där informationen kan förändras när jag uppdaterar mina repositories.

Det innebär också att jag behöver tänka på att externa anrop kan misslyckas, exempelvis om GitHub inte är tillgängligt.

### DOM och händelser

När datan har hämtats använder jag JavaScript för att skapa HTML-element med `document.createElement()`. Jag fyller elementen med information från datan och använder `appendChild()` för att lägga in dem i DOM:en.

På projektsidan skapar jag bland annat `article`, rubriker, stycken och länkar för varje projekt. På About-sidan bygger jag upp arbetslivserfarenhet och utbildning med motsvarande HTML-element.

Jag använder också händelselyssnare med `addEventListener()` i `script.js`. Där lyssnar jag på klick på hamburgermenyn och knappen för att växla mellan ljust och mörkt läge.

Jag har valt klickhändelser eftersom det är användaren som ska kunna öppna och stänga menyn samt själv välja vilket tema som ska visas.

### Semantik och tillgänglighet

Jag har försökt behålla samma semantiska struktur även för den HTML som skapas med JavaScript. Exempelvis använder jag `article` för projektkorten, rubrikelement för rubrikerna och `p` för beskrivningarna. På så sätt blir innehållet tydligare både för webbläsaren och hjälpmedel.

Jag har även använt attribut som `aria-label`, `aria-expanded` och `aria-controls` för att göra hamburgermenyn tydligare för användare som använder hjälpmedel.

Jag har testat webbplatsen med WAVE för att kontrollera tillgängligheten och fick inga fel i testet. Jag har även testat att navigera genom webbplatsen med endast tangentbordet, vilket fungerade.

### Temaväxlingen

För att skapa ljust och mörkt läge använder jag CSS-variabler i `base.css`. Där har jag definierat olika färger under `:root` för ljust läge och under `:root.dark-mode` för mörkt läge.

I `script.js` växlar jag mellan temana genom att lägga till eller ta bort klassen `dark-mode` på HTML-elementet. Jag använder även `localStorage` för att spara användarens val, så att temat finns kvar när sidan laddas om.

Jag tycker att detta är en bra lösning eftersom jag kan ändra färgerna centralt i CSS utan att behöva ändra JavaScript-koden. Om jag i stället hade satt färgerna direkt i JavaScript hade det blivit mer omständligt att hålla samma färgschema på flera olika delar av webbplatsen.

### När det inte går som tänkt

Jag har försökt ta hänsyn till att API-anrop inte alltid fungerar som de ska. I `projects.js` använder jag `try/catch` för att fånga upp fel och kontrollerar även att svaret från GitHub är lyckat.

Jag använder dessutom `AbortSignal.timeout(10000)` för att avbryta ett anrop om det tar längre än tio sekunder.

Medan projekten hämtas visas ett laddningsmeddelande. Om GitHub-anropet misslyckas visas i stället ett felmeddelande på sidan. Om API:et inte returnerar några projekt visas ett meddelande om att det inte finns några projekt tillgängliga.

Om hämtningen av språk för ett enskilt repository misslyckas visas i stället "Not available" för just det projektets Tech Stack.

### Styrkor och brister

Jag tycker att en av de största styrkorna med projektet är att informationen nu hämtas dynamiskt i stället för att vara hårdkodad direkt i HTML. Det gör portfolion enklare att underhålla och vidareutveckla.

Jag tycker också att det har varit lärorikt att arbeta med asynkron JavaScript, API-anrop, JSON och DOM-manipulation. Jag har fått en bättre förståelse för hur olika delar av en webbapplikation samverkar.

Med mer tid hade jag velat förbättra felhanteringen ytterligare, framför allt för CV-hämtningen, så att även besökaren får ett tydligt meddelande om JSON-filen inte kan hämtas. Jag hade också velat utveckla Tech Stack ytterligare så att den visar fler tekniker och verktyg än enbart de programmeringsspråk som GitHub identifierar.

### AI-verktyg

Under arbetet har jag använt ChatGPT som stöd vid felsökning, förklaringar av JavaScript och hjälp med att förstå exempelvis `async/await`, `Promise.all()` och API-anrop.

Jag har även använt AI som bollplank kring CSS, responsiv design och strukturering av koden.

Jag har inte bara velat kopiera färdiga lösningar, utan försökt förstå vad koden gör och hur de olika delarna fungerar tillsammans. Jag har därför anpassat förslag efter min befintliga kod och testat ändringarna i mitt projekt.

Jag ser AI som ett hjälpmedel i utvecklingsprocessen, men det är fortfarande viktigt att själv förstå och kunna förklara den kod man använder.