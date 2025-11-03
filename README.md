Welcome to theWall.
This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Why?

The plugin is a simple black-list based detector of websites enabeling the worlds worst killing machine - the Israeli government.
This is not a tool to spread hate, it aims to spread knowledge. Users are free to proceed to those websites after knowing.

## How it works

The plugin checks the URL of the current tab against a verified list of domains. If the domain is found in the list, the plugin displays a popup.

For most domains, a simple check against the domain is enough. However, for "special" websites like Facebook, LinkedIn, Twitter, Instagram, and GitHub. We check page Ids.
The source of this data is crunchbase so it's 100% accurate.

## Getting Started

First, run the development server:

```bash
npm i
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

## Making production build

Run the following:

```bash
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.
