<template>
  <div id="wrapper">
    <main>
      <picture
        v-for="picture in pictures"
        :key="picture.id">
        <source :srcset="picture.href">
        <img
          :src="picture.href"
          :id="picture.id" />
      </picture>
    </main>
  </div>
</template>

<script>
  import { TimelineMax } from 'gsap'
  import path from 'path'
  import { remote } from 'electron'
  const fs = require('fs')
  const testFolder = path.join(remote.app.getPath('desktop'), 'screensaver/')

  var tl = new TimelineMax({repeat:-1})

  var fadeConfig = {
    fadeSpeed: 4,
    displayLength: 4
  }

  export default {
    name: 'Screensaver',
    data: function() {
      return {
        pictures: [],
      }
    },
    updated () {
      tl.clear()
      this.pictures.forEach((picture) => {
        let el = document.querySelector('#'+picture.id)
        tl.to(el, fadeConfig.fadeSpeed, {alpha: 1}, "-="+fadeConfig.fadeSpeed)
        tl.to('#'+picture.id, fadeConfig.displayLength, {alpha: 0}, "+="+(fadeConfig.fadeSpeed+fadeConfig.displayLength))
      })
      tl.play()
    },
    beforeMount () {
      fs.readdir(testFolder, (err, files) => {
        files.forEach((file,i) => {
          this.pictures.push({
            href: 'file://'+testFolder+file,
            id: 'picture-'+i,
            })
        })
      })
    },
  }
</script>

<style>

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background: black;
  }

  img {
    object-fit: contain;
    display: block;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

</style>

