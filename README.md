# RadioRecord Podcast playlist

## Motivation
iTunes fails to work properly with long compositions. Fortunately it does expose RSS feed link which we could use to extract compositions and play them directly from the browser.

## Quickstart

```bash
git clone git@github.com:ValeriiVasin/radiorecord-podcasts-playlist.git
cd radiorecord-podcasts-playlist
npm install
npm start
open http://localhost:1234
```

## Stack
- [Parcel bundler](https://parceljs.org)
- Firebase (database + cloud functions)
- cron-job.org for scheduled cloud functions execution

## Firebase Cloud Functions development
```bash
cd functions
npm install
npx firebase login
npm start
```

