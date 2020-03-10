interface Podcast {
  items: PodcastItem[];
}

interface PodcastItem {
  url: string;
  title: string;
  description: string;
  duration: string;
  pubDate: string;
}
