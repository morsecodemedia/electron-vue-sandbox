<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="left-side">
        <span class="title">This is your Vue/Electron Sandbox!</span>
        <system-information></system-information>
		<wifi></wifi>
        <div class="doc">
          <div class="title alt">Documentation</div>
          <button @click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')">Read the Docs</button><br><br>
          <button class="alt" @click="open('https://electron.atom.io/docs/')">Electron</button>
          <button class="alt" @click="open('https://vuejs.org/v2/guide/')">Vue.js</button>

        </div>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">3rd Party Components</div>
          <p>
            <router-link class="btn" to="vue-agile">Vue Agile</router-link><br />
            A carousel component
          </p>
          <div class="title">Custom Components</div>
          <p>
            <router-link class="btn" to="Screensaver">Screensaver</router-link><br />
            An image gallery with fade animations
          </p>
          <p>
            <router-link class="btn" to="go-home">Go Home</router-link><br />
            A full screen invisible button that can be layered on any component to take you home
          </p>
          <p>
            <router-link class="btn" to="TimeTravel"><font-awesome-icon icon="map-signs" /> Time Travel - Full</router-link><br />
            A full page component, get travel times from home location to a set of predefined locations
          </p>
          <p>
            <router-link class="btn" to="Weather">Weather</router-link><br />
            A full page component, get the current weather, 5 day forecast, UV index and air pollution
          </p>
          <div class="title">Trigger Configurations</div>
          <p>
            <button @click="connectTwilioToNixle()">Connect Twilio - Doesn't work due to Twilio Limitations</button>
          </p>
        </div>
      </div>
      <div v-if="bridgeOpening" class="bridge-notification">
        <h1>{{bridgeMsg}}</h1>
      </div>
    </main>
  </div>
</template>

<script>
  import config             from './morsecodemirror.config.json'
  import SystemInformation  from './LandingPage/SystemInformation'
  import Wifi               from './LandingPage/Wifi'
  import express            from 'express'
  import bodyParser         from 'body-parser'
  import fontawesome        from '@fortawesome/fontawesome'
  import FontAwesomeIcon    from '@fortawesome/vue-fontawesome'
  import { faMapSigns }     from '@fortawesome/fontawesome-free-solid'
  fontawesome.library.add(faMapSigns)
  export default {
    name: 'landing-page',
    components: {
      SystemInformation,
      Wifi,
      FontAwesomeIcon
    },
    data: function() {
      return {
        bridgeOpening: false,
        bridgeMsg: '',
        authToken: config.twilioAuthToken,
        accountSid: config.twilioAccountSid,
        server: express()
      }
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link)
      },
      connectTwilioToNixle() {
        const twilioClient = require('twilio')(this.accountSid, this.authToken)

        twilioClient.messages.create({
          body: 'BBB',
          from: config.twilioNumber,
          to: '888777'
        }).then(message => window.console.log(message.sid)).done()
      },
    },
    mounted () {
      this.server.use(bodyParser.urlencoded({extended:false}))
      this.server.post('/message', (request, response) => {
        this.bridgeMsg = response.req.body.Body
        this.bridgeOpening = true
      })
      // remember to: ngrok http 3031
      // then get the hashed subdomain and update in twilio dashboard
      this.server.listen(3031)
    },
    updated () {
      if (this.bridgeOpening) {
        setTimeout(() => {
          this.bridgeOpening = false
        }, 1000 * 60 * 20)
      }
    },
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button,
  .btn {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
  .bridge-notification {
    height: 120px;
    width: 400px;
    display: block;
    background: black;
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 10;
    padding: 15px;
  }
  .bridge-notification h1 {
    font-size: 22px;
    line-height: 1.25em;
    color: red;
    display: inline-block;
  }
</style>
