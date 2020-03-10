# RadioRecord Podcast playlist

## Motivation

iTunes fails to work properly with long compositions. Fortunately it does expose RSS feed link which we could use to extract compositions and play them directly from the browser.

## Quickstart

```bash
git clone git@github.com:ValeriiVasin/radiorecord-podcasts-playlist.git
cd radiorecord-podcasts-playli

npm install
npx lerna bootstrap
npx lerna start --stream
open http://localhost:1234
```

## Firebase Cloud Functions development

https://firebase.google.com/docs/functions

### Setup

```bash
# install latest tools
npm install -g firebase-tools

# login to firebase account
firebase login

# update firebase packages to latest
lerna run firebase-update --scope functions
```

### Development

```
# run firebase dev server
lerna run start --scope functions --stream

open http://localhost:5000/itunes-podcasts/us-central1/hello
```

### Troubleshooting

If API for the commands changed - regenerate skeleton of the firebase functions and copy over the commands for it:

```bash
lerna exec --scope functions firebase init functions
```

## Stack

- [Parcel bundler](https://parceljs.org)
- Firebase (database + cloud functions)
- cron-job.org for scheduled cloud functions execution
