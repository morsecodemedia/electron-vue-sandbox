<template>
  <div id="wrapper">
    <main>
      <div class="location-container">
        <div class="location-btn"
          v-for="loc in locations"
          :key="loc.id"
          @click="timeTravel(loc.latitude,loc.longitude)">
          <p>{{loc.label}}</p>
          <address>
            <span>{{loc.address.address1}}</span><br />
            <span v-if="loc.address.address2">{{loc.address.address2}}<br /></span>
            <span v-if="loc.address.address3">{{loc.address.address3}}<br /></span>
            <span>{{loc.address.city}}, {{loc.address.state}} {{loc.address.zip}}</span>
          </address>
          <p v-if="loc.latitude && loc.longitude">{{loc.latitude}}, {{loc.longitude}}</p>
        </div>
      </div>

      <div class="time-travel"
        v-show="travelResponse !== ''"
        v-for="route in travelResponse"
        :key="route.id">
          <button class="close-btn"
          @click="resetTimeTravel()">X</button>
          <p>From: <address>{{route.legs[0].start_address}}</address></p>
          <p>To: <address>{{route.legs[0].end_address}}</address></p>
          <p>{{route.legs[0].distance.text}} in {{route.legs[0].duration.text}} / {{route.legs[0].duration_in_traffic.text}} in current traffic.</p>
      </div>

      <div class="error-msg"
      v-show="travelError !== ''">
        <button class="close-btn"
          @click="resetTimeTravel()">X</button>
          {{travelError}}
      </div>

      <router-link class="home-btn" to="LandingPage">⚏</router-link>

      <p class="home-location" :key="home.id">Your location is {{home.address.address1}},
        <span v-if="home.address.address2">{{home.address.address2}}</span>
        <span v-if="home.address.address3">{{home.address.address3}}</span>
        {{home.address.city}}, {{home.address.state}} {{home.address.zip}}.
        <span v-if="home.latitude && home.longitude">{{home.latitude}}, {{home.longitude}}</span></p>
    </main>
  </div>
</template>

<script>
  import timeTravelConfig from './timeTravelConfig.json'
  const googleMapsClient = require('@google/maps').createClient({
    key: timeTravelConfig.googleMapsAPIKey
  })
  export default {
    name: 'TimeTravel',
    data: function() {
      return {
        locations: timeTravelConfig.locations,
        home: timeTravelConfig.home,
        travelResponse: timeTravelConfig.travelResponse,
        travelError: timeTravelConfig.travelError
      }
    },
    methods: {
      parseTimeTravel(err, response) {
        let errObj = err
        if (!errObj || errObj === null) {
          var data = response.json
          switch(data.status) {
            case 'OK':
              this.travelResponse = data.routes
            break
            case 'ZERO_RESULTS':
              this.travelError = 'ZERO_RESULTS'
            break
            case 'OVER_QUERY_LIMIT':
              this.travelError = 'OVER_QUERY_LIMIT'
            break
            case 'REQUEST_DENIED':
              this.travelError = 'REQUEST_DENIED'
            break
            case 'INVALID_REQUEST':
              this.travelError = 'INVALID_REQUEST'
            break
            case 'UNKNOWN_ERROR':
              this.travelError = 'UNKNOWN_ERROR'
            break
            default:
              this.travelError = 'BROKEN'
            break
          }
        } else {
          this.travelError = 'errObj: '+errObj
        }
      },
      timeTravel(lat,long) {
        var timeToLeave = Math.round(new Date() / 1000)
        googleMapsClient.directions({
          origin: this.home.latitude+','+this.home.longitude,
          destination: lat+','+long,
          mode: 'driving',
          departure_time: timeToLeave,
          traffic_model: 'pessimistic'
        }, this.parseTimeTravel)
      },
      resetTimeTravel() {
        this.travelResponse = ''
        this.travelError = ''
      }
    }
  }
</script>

<style scoped>

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .location-container {
    position: relative;
    top: 10px;
    left: 10px;
    width: 275px;
  }

  .location-btn {
    display: inline-block;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 10px auto;
    cursor: pointer;
    color: black;
    width: 100%;
  }

  .time-travel {
    position: absolute;
    height: 200px;
    width: 400px;
    padding: 20px;
    border: 1px solid #666;
    border-radius: 5px;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .close-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 16px;
    cursor: pointer;
  }

  .home-location {
    position: absolute;
    bottom: 15px;
    text-align: center;
    display: block;
    width: 100vw;
  }

  .home-btn {
    position: absolute;
    font-size: 20px;
    bottom: 20px;
    left: 20px;
  }

  .error-msg {
    background-color: #efdad9;
    color: #a36364;
    padding: 15px 5px;
    position: absolute;
    top: 10px;
    right: 10px;
    min-width: 300px;
  }
</style>

