<script>
  async function fetchPodcasts() {
    return fetch(
      'https://itunes-podcasts.firebaseio.com/items.json'
    ).then((response) => response.json());
  }

  const toggled = {};
  function toggleInfo(url) {
    toggled[url] = !Boolean(toggled[url]);
  }

  let src = null;
  let title = '';
  function play(podcast) {
    src = podcast.url;
    title = podcast.title;
  }

  $: document.title = title;
</script>

<style>
  .player {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: white;
    width: 100%;
    border-top: 1px solid #a5a8ab;
    box-shadow: 0 -2px 8px #a5a8ab;
  }
  .title {
    font-weight: bold;
    padding: 8px;
    text-align: center;
  }
  audio {
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .play-button {
    padding: 0;
    border: none;
    background-color: transparent;
    text-decoration: underline;
    cursor: pointer;
  }
  .play-button:hover {
    color: blue;
  }
</style>

<!-- svelte-ignore a11y-media-has-caption -->

{#await fetchPodcasts()}
  <h1>Loading...</h1>
{:then items}
  {#if src}
    <div class="player">
      <div class="title">{title}</div>
      <audio {src} controls autoplay />
    </div>
  {/if}
  <ul>
    {#each items as podcast}
      <li>
        <button
          class="play-button"
          on:click={() => play(podcast)}>{podcast.title}</button>
        <span>/</span>
        <span>{podcast.duration}</span>
        {#if podcast.description}
          <span>/</span>
          <button on:click={() => toggleInfo(podcast.url)}>toggle info</button>
        {/if}
        {#if toggled[podcast.url]}
          <pre>{podcast.description}</pre>
        {/if}
      </li>
    {/each}
  </ul>
{/await}
