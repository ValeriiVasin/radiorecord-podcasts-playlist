import React, { Fragment, Component } from 'react';
import { render } from 'react-dom';

interface AppState {
  loading: boolean;
  items: PodcastItem[];
  infoShown: {
    [id: string]: boolean;
  };
}

class App extends Component {
  state: AppState = {
    loading: false,
    items: [],
    infoShown: {}
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const items = await fetch(
      'https://itunes-podcasts.firebaseio.com/items.json'
    ).then(response => response.json());
    this.setState({ items, loading: false });
  }

  handleInfoClick = (url: string) => {
    const { infoShown } = this.state;
    const isOpened = Boolean(infoShown[url]);
    const nextInfoShown = { ...infoShown, [url]: !isOpened };
    this.setState({ infoShown: nextInfoShown });
  };

  shouldShowInfo = (url: string): boolean => Boolean(this.state.infoShown[url]);

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    const items = this.state.items.map(item => (
      <li key={item.url}>
        <a href={item.url} target="_blank">
          {item.title}
        </a>
        <span> / </span>
        <span>{item.duration}</span>
        {item.description && <Fragment>
          <span> / </span>,
          <button onClick={() => this.handleInfoClick(item.url)}>
            toggle info
          </button>
        </Fragment>}
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

render(<App />, document.getElementById('root'));
