# Star-wars-planet

***

## Purpose
Star-wars-planet let's you browse through categories and bookmark your favourite items.
The bookmarked items will be saved in the browser storage for future visits.

## Dependencies
* The app requires [node.js](http://nodejs.org/download/) and npm (already bundled in node)

## Install
* Clone or download the repo:

```
git clone https://github.com/shayaShav/star-wars-planet.git
cd star-wars-planet
```

* Install local dependencies from the project root folder:

```
npm install
```

## Build

* To build, simply run the `gulp build` command from the project root folder:

```
gulp build
```

## Run

* start the node server:

```
node index
```

* Browse to the application at `http://localhost:3000`

## Develop

* Open `app-config.js` and change `environment` to `development`.
* Run the gulp `develop` task to watch SCSS and HTML files, and auto compile them:

```
gulp develop
```
