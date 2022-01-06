# WoW Dices



--------------------------

# git segítség

## Git Dash

- CMD-hez hasonló, mappán jobb klikk, majd Git Dash here
- branch-ben külön lehet fájlokat módosítani, majd mainba adni

## Parancsok

```shell
# felhasználó név megadása (emailnél user.email kell)
git config --global user.name '...'

# local git repo létrehozása
git init
# hozzáadja a megadott fájl(okat) a staging area-ba, ami commit előtt van
# <file> = *.html -> összes html fájl
# <file> = .      -> összes fájl
git add <file>
# leveszi a megadott fájl(okat) a staging area-ból
git rm --cached <file>
# staging area-ban lévő fájlokat visszaadja
git status
# staging area fájljait elmenti a local repoba
git commit -m 'kommit komment...'

# kiválassza, hogy melyik remote repo-ba töltse majd fel a fájlokat; bejelentkezés szükséges majd az első push-nál
git remote add origin <repo elérési útja pl. https://github.com/...>
# local repo -> remote repo
git push
# remote repo -> local repo
git pull
# klónolja a repo-t, létrehoz egy mappát hozzá
git clone <repo elérési útja>

# létrehozza a 'login' branch-et
git branch <branch>
# kiválassza a megadott branch-et
git checkout <branch>
# összeolvassza az aktuális branch-et a megadottal
git merge <branch> -m 'merge komment...'

# képernyő törlése
clear
# létrehozza a fájlt
touch <file>
```





# ReactJS segítség

## Kódolás

### Projekt előkészítése

```shell
# új projekt
npx create-react-app <projekt neve>
 
# kód build, serve, stb. package.json-ben

# package.json alapján töltse le a szükséges package-eket
npm install

# telepítések
npm i react-router-dom@5          # react router
npm i react-icons                 # ikonok használatához kell (pl. FontsAwesome)
npm i moment, react-moment                # dátumkezeléshez
npm i json-server                 # backend teszteléshez
npm i node-sass                   # SASS használat - ezután lehet importálni .scss fájlokat
npm i sass                        # SASS használat - ezután lehet importálni .scss fájlokat ÉS a legújabb sass-t lehet vele használni
```

#### teszteléshez

Ezt a package.json-ba kell írni, hogy lefusson az API hívás mock:

```json
{
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}"
    ],
    "resetMocks": false
  }
}
```

### JSON server

1. json-server telepítése
2. package.json-ba új scriptet kell felvinni 
```json
"scripts": {
  ...
  "server": "json-server --watch data/db.json --port 5000"
},
```
3. npm run serve paranncsal tudjuk futtatni az API mock-ot
4. db.json-ban tárolja a backendet



## Dokumentáció

## Tesztelés

### Teszt típusok

- unit teszt - egy komponents tesztelése
- integration teszt - komponensek közti kapcsolat tesztelése

### React teszt fájl felépítése

Fájl neve - KomponensNeve.test.js

```js
import { render, screen } from '@testing-library/react';
import App from './App';

test('teszt neve', async () => {                            // test() helyett it() is lehet
  render(<App />);                                    // renderelni kell, mit tesztelünk
  const linkElement = screen.getByText('/valami/i')   // elemet le kell kérnünk, amit tesztel
                                                      // elemen végrehajtuk a tesztelni kívánt funkciót

  expect(linkElement).toBeInTheDocument();            // tesztelés végeredményének ellenőrzése
});
```

#### React elem lekérés

- mi a különbség köztük?
  - *By -> *All = hibát dob több elemnél -> array ad vissza mindig
  - get -> find = nem aszinkron -> aszinkron
  - get -> query = hibát dob, ha nincs elem -> nem dob hibát, ha nincs elem
- metódusok sorrendje
  - mindenki eléri (pl. user)
    - getByRole
    - getByLabelText
    - getByPlaceholder
    - getByText
  - szemantikus lekérések (pl. screen reader)
    - getByAltText
    - getByTitle
  - teszt id
    - getByTestId

|           | getBy   | findBy  | queryBy | getAllBy  | findAllBy | queryAllBy  |
| --------- | ------- | ------- | ------- | --------- | --------- | ----------- |
| no match  | error   | error   | null    | error     | error     | array       |
| 1 match   | return  | return  | return  | array     | array     | array       |
| 1+ match  | error   | error   | error   | array     | array     | array       |
| await     | no      | yes     | no      | no        | yes       | no          |
