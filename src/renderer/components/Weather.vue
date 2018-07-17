<template>
  <div id="wrapper">
    <main>

      <router-link class="home-btn" to="LandingPage">⚏</router-link>
    </main>
  </div>
</template>

<script>
  // TODO: Pull default values from a weather specific config
  import config from './morsecodemirror.config.json'
  import axios  from 'axios'
  export default {
    name: 'Weather',
    data: function() {
      return {
        openWeatherMapAPI: config.openWeatherMapAPIKey,
        lang: 'en',
        unitsOfMeasurement: 'imperial',
        weather: '',
        weatherRefreshInterval: 600000,
        lat: config.home.latitude,
        long: config.home.longitude,
        zip: config.home.address.zip
      }
    },
    created() {
      this.getForecast()
    },
    methods: {
      getWeather() { // Current weather
        this.weather = ''
        let query = (this.zip) ? '&zip=' + this.zip : '&lat=' + this.lat + '&lon=' + this.long
        axios.get('https://api.openweathermap.org/data/2.5/weather?'
          + 'units='  + this.units
          + '&lang='  + this.lang
          + '&APPID=' + this.openWeatherMapAPI
          + query
          )
          .then(response => {
            // TODO: Parse the Response and display it
            window.console.log(response)
          })
          .catch(error => {
            // TODO: Pass errors to error notification
            window.console.log(error)
          })
      },
      getForecast() { // 5 day / 3 hour forecast
        this.weather = ''
        let query = (this.zip) ? '&zip=' + this.zip : '&lat=' + this.lat + '&lon=' + this.long
        axios.get('https://api.openweathermap.org/data/2.5/forecast?'
          + 'units='  + this.units
          + '&lang='  + this.lang
          + '&APPID=' + this.openWeatherMapAPI
          + query
          )
          .then(response => {
            // TODO: Parse the Response and display it
            window.console.log(response)
          })
          .catch(error => {
            // TODO: Pass errors to error notification
            window.console.log(error)
          })
      },
      getUVIndex() { // UV Index (beta)
        this.weather = ''
        let query = (this.zip) ? '&zip=' + this.zip : '&lat=' + this.lat + '&lon=' + this.long
        axios.get('https://api.openweathermap.org/data/2.5/uvi/forecast?'
          + 'units='  + this.units
          + '&lang='  + this.lang
          + '&APPID=' + this.openWeatherMapAPI
          + query
          )
          .then(response => {
            // TODO: Parse the Response and display it
            window.console.log(response)
          })
          .catch(error => {
            // TODO: Pass errors to error notification
            window.console.log(error)
          })
      }
    },
    beforeMount () {
      if (config.lang && config.lang.length > 0) {
        this.lang = config.lang
      }
      if (config.unitsOfMeasurement && config.unitsOfMeasurement.length > 0) {
        this.unitsOfMeasurement = config.unitsOfMeasurement
      }
      if (config.weatherRefreshInterval && config.weatherRefreshInterval.length > 0) {
        this.weatherRefreshInterval = config.weatherRefreshInterval
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

  .home-btn {
    position: absolute;
    font-size: 20px;
    bottom: 20px;
    left: 20px;
  }

</style>

