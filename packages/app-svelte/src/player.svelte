<script context="module">
  let current;
</script>

<script>
  export let src;
  export let title;
  export let autoplay = false;

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let audio;
  let paused = true;
  function stopOthers() {
    if (current && current !== audio) current.pause();
    current = audio;
  }

  function onEnded() {
    dispatch('ended');
  }
</script>

<style>
  .player {
    position: fixed;
    bottom: 0;
    left: 0;
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
</style>

<div class="player">
  <div class="title">{title}</div>

  <audio
    bind:this={audio}
    on:ended={onEnded}
    bind:paused
    on:play={stopOthers}
    controls
    {src}
    {autoplay} />
</div>
