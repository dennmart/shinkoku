# Shinkoku (深刻)

Shinkoku (Japanese, literally meaning *serious* or *severe*) is a single page app built using [React](http://facebook.github.io/react/) to fetch and display your current critical items from [WaniKani](https://www.wanikani.com/). Simply enter your WaniKani API key, which can be found in their [API documentation](https://www.wanikani.com/api) and you're good to go!

To see Shinkoku in action, go to https://shinkoku.dennmart.com/.

## Requirements

The only requirements you must have installed are Node.js and NPM ([Installation instructions](https://docs.npmjs.com/getting-started/installing-node)).

## Development Setup

* After installing Node.js and NPM, run `npm install` in the root directory to install all dependencies.
* Once all dependencies are installed, run `npm run dev` in the root directory to start up [webpack-dev-server] and run the application for local development. This will watch for any changes to .jsx or .scss files in the `/src` directory. If any files in the `/src` directory change, this task will automatically re-bundle the Javascript and CSS and reload the page.
* `npm run dev` will start two services:
  * The Shinkoku app will run in http://localhost:8080/.
  * The [Webpack Bundle Analyzer] will run in http://localhost:8888.

## Production Build

* To generate files suitable for a production environment, run `npm run build` to build the files to the `/dist` directory.

## Contribute

This project is open-source, so all contributions are welcome! The following is a good guideline for contribution:

* Fork the repo on GitHub.
* Create a branch on your forked repo that will contain your changes.
* Hack away on your branch.
* Push the branch to GitHub.
* Send me a pull request for your branch.
