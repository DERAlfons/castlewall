# Castlewall

This is a web app for the popular puzzle game 'Castle Wall'. As of now, it is functional, but there is still some work in progress.

This app was written using the javascript angular framework. See README_ANGULAR.md for details.

## Preview

The app can be tested [here](https://deralfons.github.io/castlewall/).

## Local build

To build the app locally:

* Install `nodejs`, `npm` and `angular`
* Get the source code, e. g. using `git clone https://github.com/DERAlfons/castlewall.git`
* In the top level directory, run `npm install`.
* Run `ng serve` to build the app and serve it on `http://localhost:4200/`

## Build for GitHub Pages

To build the app for deploying it to GitHub Pages:

* `ng build --prod --output-path docs --base-href /castlewall/`
* `cp docs/index.html docs/404.html`
