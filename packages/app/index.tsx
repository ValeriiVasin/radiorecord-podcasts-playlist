import React, { FC, useCallback, useEffect, useState } from "react";
import { render } from "react-dom";

const Podcast: FC<{ podcast: PodcastItem }> = ({ podcast }) => {
  const [showInfo, setShowInfo] = useState(false);
  const toggleInfo = useCallback(() => setShowInfo(!showInfo), [showInfo]);

  return (
    <li>
      <a href={podcast.url} target="_blank">
        {podcast.title}
      </a>
      <span> / </span>
      <span>{podcast.duration}</span>
      {podcast.description && (
        <>
          <span> / </span>
          <button onClick={toggleInfo}>toggle info</button>
        </>
      )}
      {showInfo && <pre>{podcast.description}</pre>}
    </li>
  );
};

const App: FC = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<PodcastItem[]>([]);

  useEffect(() => {
    (async function() {
      setLoading(true);
      const podcasts: PodcastItem[] = await fetch(
        "https://itunes-podcasts.firebaseio.com/items.json"
      ).then(response => response.json());
      setItems(podcasts);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Radio Record Latest Podcasts</h1>
      <ul>
        {items.map(item => (
          <Podcast key={item.url} podcast={item} />
        ))}
      </ul>
    </>
  );
};

render(<App />, document.getElementById("root"));
