react-redux-scaffold
==============
Quick-start boilerplate for coding __React__ applications on top of __ES6__, __Webpack__, __Material UI__, __Redux__ and __React Router__.

## Tech stack
- [webpack](https://webpack.github.io/)
- [babel](https://github.com/babel/babel-loader)
- [react](http://facebook.github.io/react/)
- [redux](https://github.com/rackt/redux/)
- [react-router](https://github.com/rackt/react-router)
- [material-ui](http://material-ui.com)

## Selenium Testing
	npm install  "phantomjs", "selenium-html-js-converter", "selenium-standalone", "wd-sync", "wd-sync-raw"

## Development
To start hacking into this app, first run `npm install` to grab all the dependencies. Then start the dev server with `npm run dev`.

## Testing
You can test the app by running `npm test` - that will lint your `(css|scss)` and `js` files and then run the tests. If you want to run your tests __continuosly__, then run `npm run ci`.

## Building for production
To create a distribution build of the application, run `npm run build` to package all the output to the `build` folder. If you want to preview your build you can run `npm run prod` and it will start a [http-server](https://www.npmjs.com/package/http-server) on the `build` folder.

## Application structure
```
app/ ------------------------------------ application code.
-- components/ -------------------------- dumb components.
-- -- MyComponent/ ---------------------- component.
-- -- -- index.js ----------------------- exports the component.
-- -- -- style.css ---------------------- component style (if needed).
-- -- -- test.js ------------------------ component specs.
-- containers/ -------------------------- smart components.
-- -- App ------------------------------- a smart component (bound to react-redux connect())
-- -- -- index.js ----------------------- exports the connected component.
-- -- -- style.css ---------------------- component style (if needed).
-- -- -- test.js ------------------------ component specs.
-- stores/ ------------------------------ redux stores (actions/reducer/tests).
-- -- myStore --------------------------- redux store.
-- -- -- actions.js --------------------- exports constants and action creators for this store.
-- -- -- index.js ----------------------- exports the reducer for this store.
-- -- -- test.js ------------------------ store specs (tests the actions and the reducer).
-- -- index.js -------------------------- exports all combined reducers.
-- utils/ ------------------------------- utils and helpers to use in the application.
-- -- setupStores.js -------------------- create store from combined reducers, enable hmr for reducers, apply middleware, etc.
-- index.html --------------------------- index.html template for HtmlWebpackPlugin.
-- index.js ----------------------------- entry point for the application, creates routes, etc.
build/ ---------------------------------- output folder for application build.
config/ --------------------------------- task config folder.
-- mocha.opts --------------------------- options passed to mocha.
-- null-compiler.js --------------------- ignore some requires in files when running mocha.
-- sass-lint.yml ------------------------ sass-lint rules.
-- test_helpers.js ---------------------- exposes some globals for the specs.
-- webpack.config.base.js --------------- webpack basic config.
-- webpack.config.dev.js ---------------- webpack config for development.
-- webpack.config.prod.js --------------- webpack config for production.
.babelrc
.eslintrc
.gitignore
package.json
README.md
```

## NPM Tasks.
- `build`: creates a distribution version on the application on the build folder.
- `ci`: runs the mocha tests in continous integration mode.
- `dev`: starts a webpack development server with hot reload on the port `3000`.
- `prod`: run `build` task and then start a server to preview the built application.
- `test`: run mocha tests.
- `validate`: run `eslint` and `csslint`.

## Notes from the creator.
1. I am using a "module" convention for this project, That means, I assume everything it's a self-contained module (the components, the containers, the stores).
2. As peer the "module" convention, each folder has the files it does need (source, tests and style).
3. I don't use a `constants`, `actions`, or `reducers` folder for the same reason specified in #1.

## TODO
- Move conventions to [eslint-config-reactjs](https://github.com/reactjs/eslint-config-reactjs) or maybe [standardjs react](https://github.com/feross/eslint-config-standard-react)?
- Implement Reselect.
- Implement CSS modules.
- Implement redux router.
- Implement animations and transitions.
- Implement a task to generate automated documentation based on components/containers.
- ~~Create a yeoman generator for this?~~ Create some [plop](https://github.com/amwmedia/plop) generators.

### Happy hacking!
