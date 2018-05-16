<template>
  <div id="wrapper">
    <main>
      <div class="btn"
        v-for="loc in locations"
        :key="loc.id">
        <p>{{loc.label}}</p>
        <address>
          <span>{{loc.address.address1}}</span><br />
          <span v-if="loc.address.address2">{{loc.address.address2}}<br /></span>
          <span v-if="loc.address.address3">{{loc.address.address3}}<br /></span>
          <span>{{loc.address.city}}, {{loc.address.state}} {{loc.address.zip}}</span>
        </address>
        <p v-if="loc.latitude && loc.longitude">{{loc.latitude}}, {{loc.longitude}}</p>
      </div>
      <p class="home-location">Your location is {{home.address.address1}}, <span v-if="home.address.address2">{{home.address.address2}}</span>
        <span v-if="home.address.address3">{{home.address.address3}}</span> {{home.address.city}}, {{home.address.state}} {{home.address.zip}}. <span v-if="home.latitude && home.longitude">{{home.latitude}}, {{home.longitude}}</span></p>
    </main>
  </div>
</template>

<script>
  import timeTravelConfig from './timeTravelConfig.json'
  export default {
    name: 'TimeTravel',
    data: function() {
      return {
        locations: timeTravelConfig.locations,
        home: timeTravelConfig.home
      }
    },
  }
</script>

<style scoped>

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .btn {
    display: inline-block;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 10px;
    cursor: pointer;
  }

  .home-location {
    position: absolute;
    bottom: 15px;
    text-align: center;
    display: block;
    width: 100vw;
  }
</style>

