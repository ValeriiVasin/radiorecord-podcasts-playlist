<script>
  import Player from "./audio.svelte";

  async function fetchPodcasts() {
    return fetch("https://itunes-podcasts.firebaseio.com/items.json").then(
      response => response.json()
    );
  }

  const toggled = {};
  function toggleInfo(url) {
    toggled[url] = !Boolean(toggled[url]);
  }

  let src;
  let title;
  function play(_src, _title) {
    title = _title;
    src = _src;
  }
</script>

<style>
  :global(body, html) {
    padding: 0;
    margin: 0;
  }
</style>

{#await fetchPodcasts()}
  <h1>Loading...</h1>
{:then items}
  {#if src}
    <Player {src} {title} autoplay />
  {/if}

  {#each items as podcast}
    <li>
      <a
        href={podcast.url}
        on:click|preventDefault={() => play(podcast.url, podcast.title)}>
        {podcast.title}
      </a>
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
{/await}
