<template>
  <div id="wrapper">
    <main>

    </main>
  </div>
</template>

<script>
//import { TweenLite } from 'gsap'
const fs = require('fs')

const testFolder = process.env.PORTABLE_EXECUTABLE_DIR + '/test/'

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    window.console(file)
  })
})

export default {
  name: 'Screensaver',
  data() {
    return {

    }
  },
}
</script>

<style>

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

</style>

