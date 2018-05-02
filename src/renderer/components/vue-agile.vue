<template>
  <div id="wrapper">
      <main>
          <div class="left-side">
              <div class="title" style="background-color: white; color: black; padding: 10px; display: block; position: absolute; top: 10px; left; 15px; z-index: 9000;">This is a test of vue-agile, a carousel componenet based on the Slick carousel.<br />
                <router-link to="/" style="color: black; padding: 20px;">Home</router-link>
              </div>

              <agile :arrows="false"
              :dots="false"
              :speed="15000"
              :timing="'ease'"
              :fade="true"
              :autoplay="true"
              :pauseOnHover="false">
                <div v-for="picture in pictures"
                  :key="picture.id"
                  class="slide slide-img"
                  :class="'slide--'+picture.id">
                  <img :src="picture.image" />
                </div>
              </agile>
          </div>
      </main>
  </div>
</template>

<script>

import Vue from 'vue'
import VueAgile from 'vue-agile'

Vue.use(VueAgile)

export default {
  name: 'vue-agile',
  data() {
    return {
      pictureActive: [],
      pictures: [
        {
          id: 10001,
          image: 'https://placeimg.com/350/350/animals',
        },
        {
          id: 10002,
          image: 'http://www.fillmurray.com/350/350',
        },
        {
          id: 10003,
          image: 'https://placeimg.com/350/350/techs',
        },
        {
          id: 10004,
          image: 'https://placeimg.com/350/350/nature',
        },
        {
          id: 10005,
          image: 'https://placeimg.com/350/350/people/sepia',
        },
      ],
    }
  },
  methods: {
    isActive(id) {
      return (this.pictureActive.indexOf(id) !== -1)
    },
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

.agile {
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.slide-img {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
  width: 100vw;
  height: 100vh;
}
.slide-img img {
  width: 100vw;
  height: 100vh;
}

/* .slide--10001 {
  background-image: url('https://placeimg.com/350/350/animals');
}
.slide--10002 {
  background-image: url('http://www.fillmurray.com/350/350');
}
.slide--10003 {
  background-image: url('https://placeimg.com/350/350/techs');
}
.slide--10004 {
  background-image: url('https://placeimg.com/350/350/nature');
}
.slide--10005 {
  background-image: url('https://placeimg.com/350/350/people/sepia');
} */


</style>
