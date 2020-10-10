<script>
  import { onMount } from 'svelte';
  import Player from './player.svelte';

  async function fetchPodcasts() {
    return fetch(
      'https://itunes-podcasts.firebaseio.com/items.json'
    ).then((response) => response.json());
  }

  let items;
  let loading = true;
  onMount(async () => {
    loading = true;
    items = await fetchPodcasts();
    loading = false;
  });

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

  function playNext() {
    const index = items.findIndex((item) => item.url === src);
    if (index === items.length - 1) {
      play(items[0]);
      return;
    }

    play(items[index + 1]);
  }

  $: document.title = title;
</script>

<style>
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

{#if loading}
  <h1>Loading...</h1>
{:else}
  {#if src}
    <Player {src} {title} autoplay={true} on:ended={playNext} />
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
{/if}
