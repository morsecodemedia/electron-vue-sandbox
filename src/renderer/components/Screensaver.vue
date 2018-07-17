<template>
  <div id="wrapper">
    <main>
      <go-home></go-home>
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
  import config           from './morsecodemirror.config.json'
  import goHome           from './go-home'
  import { TimelineMax }  from 'gsap'
  import path             from 'path'
  import { remote }       from 'electron'
  const fs = require('fs')
  const testFolder = path.join(remote.app.getPath('desktop'), 'screensaver/')

  var tl = new TimelineMax({repeat:-1})

  export default {
    name: 'Screensaver',
    components: { goHome },
    data: function() {
      return {
        pictures: [],
        fadeConfig : {
          fadeSpeed: 4,
          displayLength: 4
        },
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
      if (config.fadeConfig.fadeSpeed && config.fadeConfig.fadeSpeed.length > 0) {
        this.fadeConfig.fadeSpeed = config.fadeConfig.fadeSpeed
      }
      if (config.fadeConfig.displayLength && config.fadeConfig.displayLength.length > 0) {
        this.fadeConfig.displayLength = config.fadeConfig.displayLength
      }
    },
  }
</script>

<style scoped>

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

