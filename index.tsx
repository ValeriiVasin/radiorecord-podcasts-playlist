import feed from "./feed.json";

import React, { Fragment, Component } from "react";
import { render } from "react-dom";

interface AppState {
  infoShown: {
    [id: string]: boolean;
  };
}

class App extends Component {
  state: AppState = {
    infoShown: {}
  };

  handleInfoClick = (url: string) => {
    const { infoShown } = this.state;
    const isOpened = Boolean(infoShown[url]);
    const nextInfoShown = { ...infoShown, [url]: !isOpened };
    this.setState({ infoShown: nextInfoShown });
  };

  shouldShowInfo = (url: string): boolean => Boolean(this.state.infoShown[url]);

  render() {
    const items = feed.items.map(item => (
      <li key={item.url}>
        <a href={item.url} target="_blank">
          {item.title}
        </a>
        <span> / </span>
        <span>{item.duration}</span>
        {item.description && [
          <span> / </span>,
          <button onClick={() => this.handleInfoClick(item.url)}>
            toggle info
          </button>
        ]}
        {this.shouldShowInfo(item.url) ? <pre>{item.description}</pre> : null}
      </li>
    ));

    return (
      <Fragment>
        <h1>Radio Record Latest Podcasts</h1>
        <ul>{items}</ul>
      </Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
