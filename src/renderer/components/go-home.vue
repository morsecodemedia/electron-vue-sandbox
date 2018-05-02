<template>
  <router-link to="landing-page" class="go-home-btn"></router-link>
</template>

<script>
  export default {
    name: 'go-home',
  }
</script>

<style>
  .go-home-btn {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0;
    z-index: 10000;
  }
</style>
