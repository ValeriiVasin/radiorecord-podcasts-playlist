# RadioRecord Podcast playlist

## Motivation
iTunes fails to work properly with long compositions. Fortunately it does expose RSS feed link which we could use to extract compositions and play them directly from the browser.

## How to use

```bash
git clone git@github.com:ValeriiVasin/radiorecord-podcasts-playlist.git
cd radiorecord-podcasts-playlist
yarn
yarn sync
yarn start
open http://localhost:1234
```

## Stack
- Firebase (database + functions)
- cron-job.org for cron execution
