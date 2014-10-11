mywebsite
=========

# My online portfolio

This is a my online portfolio, live preview at http://ahmadmilzam.com

## Requirements

You'll need to have the following items installed before continuing.

  * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
  * [Grunt](http://gruntjs.com/): Run `[sudo] npm install -g grunt-cli`
  * [Bower](http://bower.io): Run `[sudo] npm install -g bower`

## Quickstart

```bash
git clone git@github.com:ahmadmilzam/mywebsite.git
npm install && bower install
```

While you're working on your project, run:

`grunt`

And you're set!

For Production, run:

`grunt-build`

## Directory Structure

  * `src/scss/_settings.scss`: Foundation configuration settings go in here
  * `src/scss/app.scss`: Application styles go here
  * `src/js/app.js`: Main script go in here
  * `src/js/libs/*.js`: Application's plugins / dependencies go here
