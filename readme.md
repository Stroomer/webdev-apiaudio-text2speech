# TEXT-TO-SPEECH API

# Deze applicatie maakt gebruik van:
# - Webpack
# - BabelJS
# - node packages
# - GIT
# - SCSS
# - HTML/CSS/JS
# - Modules/imports/exports
# - API (npm package apiaudio, api_key --> get your own!)
# - Async/Await
# - ES6 functions .map() .filter()
# - Dotenv

# Datum: 10-11-2021
# Vier van de vijf comboboxen werken, de data wordt opgehaald uit de API.
# Toch doe ik momenteel in api.js iets dat niet zo heel handig is, ik haal namelijk bij iedere API-call alle data op (waste of time!).
# Dit kan veel handiger: data van API ophalen en een keer wegschrijven naar JSON-bestand. Vervolgens af en toe checken of het JSON-bestand is verandert (cron job)
# De call naar de API voor het omvormen van de tekst naar .wav-bestand moet natuurlijk wel altijd direct via de API lopen, anders werkt het niet.
# Ik ga hem even naar de GIT pushen. Kan jij hem verder uitbouwen en/of verbeteren? Laat het maar zien!

# ERROR: 
# Onderstaande error krijg ik af en toe, vermoedelijk omdat ik mijn API te vaak aanroep. 

TypeError: Failed to fetch
    at <anonymous>:1:876
    at _callee6$ (api.js:195)
    at tryCatch (runtime.js:63)
    at Generator.invoke [as _invoke] (runtime.js:294)
    at Generator.eval [as next] (runtime.js:119)
    at asyncGeneratorStep (asyncToGenerator.js:7)
    at _next (asyncToGenerator.js:29)
    at eval (asyncToGenerator.js:36)
    at new Promise (<anonymous>)
    at eval (asyncToGenerator.js:25)


