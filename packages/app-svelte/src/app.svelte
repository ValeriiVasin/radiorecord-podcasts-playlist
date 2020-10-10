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
</script>

{#await fetchPodcasts()}
  <h1>Loading...</h1>
{:then items}
  <!-- svelte-ignore a11y-media-has-caption -->
  {#if src}<audio {src} controls autoplay />{/if}
  <ul>
    {#each items as podcast}
      <li>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a
          href="javascript:void(0)"
          on:click={() => (src = podcast.url)}>{podcast.title}</a>
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
