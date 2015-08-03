# Shinkoku (深刻)

Shinkoku (Japanese, literally meaning *serious* or *severe*) is a single page app built using [React](http://facebook.github.io/react/) to fetch and display your current critical items from [WaniKani](https://www.wanikani.com/). Simply enter your WaniKani API key, which can be found in their [API documentation](https://www.wanikani.com/api) and you're good to go!

## Requirements

The only requirements you must have installed are Node.js and NPM ([Installation instructions](https://docs.npmjs.com/getting-started/installing-node)).

## Development Setup

* After installing Node.js and NPM, run `npm install` in the root directory to install all dependencies.
* Use the included Gulpfile to start a local webserver and load the page by running `gulp`. This will load the page in a new browser tab, and will watch for any changes to .jsx or .scss files in the `/src` directory. If any files in the `/src` directory change, this task will automatically re-bundle the Javascript and CSS and reload the page.

## Contribute

This project is open-source, so all contributions are welcome! The following is a good guideline for contribution:

* Fork the repo on GitHub.
* Create a branch on your forked repo that will contain your changes.
* Hack away on your branch.
* Push the branch to GitHub.
* Send me a pull request for your branch.
