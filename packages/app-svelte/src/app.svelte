<script>
  import { slide } from "svelte/transition";

  async function fetchPodcasts() {
    return fetch("https://itunes-podcasts.firebaseio.com/items.json").then(
      response => response.json()
    );
  }

  const toggled = {};
  function toggleInfo(url) {
    toggled[url] = !Boolean(toggled[url]);
  }
</script>

{#await fetchPodcasts()}
  <h1>Loading...</h1>
{:then items}
  {#each items as podcast}
    <li>
      <a href={podcast.url} target="_blank">{podcast.title}</a>
      <span>/</span>
      <span>{podcast.duration}</span>
      {#if podcast.description}
        <span>/</span>
        <button on:click={() => toggleInfo(podcast.url)}>toggle info</button>
      {/if}
      {#if toggled[podcast.url]}
        <pre transition:slide>{podcast.description}</pre>
      {/if}
    </li>
  {/each}
{/await}
