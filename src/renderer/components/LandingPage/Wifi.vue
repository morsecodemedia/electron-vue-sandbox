<template>
  <div>


  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    updated() {
      window.alert(navigator.onLine ? 'online' : 'offline')
    },
  }
</script>

<style scoped>

</style>
