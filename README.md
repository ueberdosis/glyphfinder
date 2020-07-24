# Glyphfinder

[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub)](https://github.com/sponsors/ueberdosis)

Unicode character search for macOS & Windows.

<img width="452" alt="VMhqvQhFOy" src="https://user-images.githubusercontent.com/2500670/87650646-40679f80-c752-11ea-9c21-e65f1b0097a9.png">

## Features

* 34,306 characters & emojis tagged with words, categories, look-alikes and colors
* Keyboard shortcuts for your keyboard layout
* HTML entity (if available)
* Most frequently used glyphs pinned to the top
* Works offline
* Dark mode & Light mode
* macOS & Windows

## Using Glyphfinder

Though the code is open source, we ask you to buy a license to actually use Glyphfinder. Your money will help us to put more time into our open source work. ✌️

* 🤑 Buy a license here: https://www.glyphfinder.com ($6.99)
* 💝 Sponsor our work: https://github.com/sponsors/ueberdosis
* 📚️ Or [subscribe to SetApp](https://go.setapp.com/stp268?refAppID=388&utm_medium=available_on_setapp_button&utm_source=388&utm_campaign=https://github.com/ueberdosis/glyphfinder) (referral link) and get a ton of apps, including Glyphfinder

## Contribution

Contribution is very welcome! Feel free to open an issue for bug reports, add new tags to the spreadsheet or even open a PR.

### Suggest new tags

Glyphfinder searches through 34.306 characters, the file containing the full list of characters including all tags is too big for GitHub (more than 200 MB). Google Spreadsheet can handle this huge data set very well. If you want to suggest new tags, feel free to add them here: https://docs.google.com/spreadsheets/d/1Xdlg_pR3jSlTunmcmgZI70ZAQu7N4yoJFcL4Ssn6uJI/edit#gid=1187968163

#### Project setup

Feel free to clone the project and fiddle around with our code. You need Node and Yarn, and — that’s special for this project – need to generate the list of characters from a Google Spreadsheet.

```
yarn install
yarn generate
```

#### Run the development build

To start the development version of the app run the start script. The app will open and you’ll be able to use it right-away. Changes to the code will be hot loaded.

```
yarn start
```

#### Lint and fix files

If you plan to send a PR with changes, run the lint process to fix code style issues:

```
yarn lint
```

## Builds

Don’t try to build the app, you won’t be able to code sign and/or notarize the app without a developer certificate. We’re running the build process manually and publish new versions on the website: https://www.glyphfinder.com

## Related projects

* [ueberdosis/glyphfinder-landingpage](https://github.com/ueberdosis/glyphfinder-landingpage)
* [ueberdosis/mouseless](https://github.com/ueberdosis/mouseless)
* [ueberdosis/mouseless-landingpage](https://github.com/ueberdosis/mouseless-landingpage)
* [ueberdosis/matter](https://github.com/ueberdosis/matter)
* [ueberdosis/matter-landingpage](https://github.com/ueberdosis/matter-landingpage)
