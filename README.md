# NOTES

---

_You are allowed to use scaffolding technology like “Create React App” or similar._

CRA has been deprecated in favor or either nextjs or vite
[Vite starter templates](https://github.com/vitejs/awesome-vite)

**I gave myself a time limit of 4 hours to write the code not including this.**

This was the first time for me to use RTK and RTK-Query, most of the time I use my own boilerplate setups I have started using react-query a bit. RTK-Query is very similar in concept, it took longer than I would have liked to complete and I ran out of time.

`It should also address what additional changes you might need to make
if the application were intended to run in a concurrent environment.` => so I would solve this using websockets, before today I would setup a node server that would just be listening for the different browsers to connect, and then add the code to the FE to interact with the WS. Today I found out that RTK-Query actually makes this a bit easier by using [`onCacheEntryAdded`](https://redux-toolkit.js.org/rtk-query/usage/streaming-updates)

I did not get to writing any valuable tests, I updated the app one, this template has 2 test as examples out of the box, I cant take credit for those.

## Overview

---

Redux setup and thought process:

- `API` => deals with fetching data from the pokemon api, as well as transforming data (adding the evolution names to the returned data from the endpoint). At the moment it seems that the evolutions aren't all lined up correctly, bulbasaur works as intended but other pokemon their evolutions are incorrect. My assumption is the id is incorrect, but I have run out of time
- `Search` => this is mainly to trigger UI changes and updates, give the user some more information
- `History` => this actually holds the "history" results from what you searched for, I extended the reducers and listened for the fullfilled on the `getPokemonCustom` endpoint, and then added the result to the array. I think future I would actually dedupe or add timestamps to show when you actually searched. For example if you searched for pikachu twice then instead of showing him twice in the history I would show it once and X2 with time stamps. Something like that

Component setup and thoughts:

- `Search` => just holds the search bar nothing too complicated
- `History` => I was going to split out the app history view here but didnt get around to it before I ran out of time
- `Pokemon` => this one actually has 3 separate components and should actually be split up into their separate files. I believe in solving the problem first and then iterate on splitting things apart to be more maintainable.

  - `PokemonWrapper` => this one looks at the store to check the search value, then it will call the api endpoint, with the name and a skip parameter that checks for if the search value exist. this will make more since when I explain the app
  - `Pokemon` => (this should probably change to pokemon preview) this is uses [shadcn ui](https://ui.shadcn.com/docs/components/card) card component, showing the name, the types, the default sprite and a button that you can click that will render the next component
  - `PokemonDetail` => this shows some of the rest of the details if they're available; species, evolutions, abilities, and a subset of moves (I am only showing the first 10). The evolutions were intended to be buttons so that when you clicked them they would set the search value to the name of the evolution. Which would intern kick off the PokemonWrapper

App file setup and thought process:

- `App.tsx` => this one is a bit dirty and would actually be split out into different views/components if given the time. I would also actually setup react router, I added it but didnt get to setting it up. Breakdown of this file, there are 2 parts of the store we are looking at, search and history. Search is for the visual aspects of things and history is just keeping track of what you searched for
  History is the list of past pokemon objects including the evolutions (the names)
  I am doing a few things, showing the result of what you searched for, and after you search for another pokemon the user will see two new actions `show/hide history list`, and `clear history list`

---

This was scaffolded using the following

# vite-rtk-query [![Typecheck](https://github.com/laststance/vite-rtk-query/actions/workflows/typecheck.yml/badge.svg)](https://github.com/laststance/vite-rtk-query/actions/workflows/typecheck.yml) [![Test](https://github.com/laststance/vite-rtk-query/actions/workflows/test.yml/badge.svg)](https://github.com/laststance/vite-rtk-query/actions/workflows/test.yml) [![Build](https://github.com/laststance/vite-rtk-query/actions/workflows/build.yml/badge.svg)](https://github.com/laststance/vite-rtk-query/actions/workflows/build.yml) [![Lint](https://github.com/laststance/vite-rtk-query/actions/workflows/lint.yml/badge.svg)](https://github.com/laststance/vite-rtk-query/actions/workflows/lint.yml) [![Depfu](https://badges.depfu.com/badges/789201466fbf907f7780e2d8634ed1fb/overview.svg)](https://depfu.com/github/laststance/vite-rtk-query?project_id=38280)

>
