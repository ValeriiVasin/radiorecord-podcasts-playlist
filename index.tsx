import feed from "./feed.json";

import React, { Fragment } from "react";
import { render } from "react-dom";

const App = () => {
  const items = feed.items.map(item => (
    <li key={item.url}>
      <a href={item.url} target="_blank">{item.title}</a>
    </li>
  ));
  return (
    <Fragment>
      <h1>Radio Record Latest</h1>
      <ul>
        {items}
      </ul>
    </Fragment>
  );
};

render(<App />, document.getElementById("root"));
