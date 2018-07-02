import fetch from 'node-fetch';
import { parseString } from 'xml2js';
import { FeedResponse, Item } from '../../feed';

export const getRadioRecordPodcast = async () => {
  const responseXML = await fetch('http://www.radiorecord.ru/rss.xml').then(
    response => response.text()
  );

  return new Promise<Podcast>((resolve, reject) => {
    parseString(responseXML, (err, json: FeedResponse) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(mapper(json));
    });
  });
};

function mapper(response: FeedResponse): Podcast {
  const responseItems: Item[] = response.rss.channel[0].item;

  const podcastItems = responseItems.map(item => {
    const title = item.title[0];
    const url = item.enclosure[0].$.url;
    const description = item.description[0];
    const duration = item['itunes:duration'][0];
    const pubDate = item.pubDate[0];

    return {
      url,
      title,
      duration,
      pubDate,
      description
    };
  });

  return { items: podcastItems };
}
