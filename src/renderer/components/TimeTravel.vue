<template>
  <div id="wrapper">
    <main>
      <div class="location-container">
        <div class="location-btn"
          v-for="loc in locations"
          :key="loc.id">
          <p>{{loc.label}}</p>
          <address>
            <span>{{loc.address.address1}}</span><br />
            <span v-if="loc.address.address2">{{loc.address.address2}}<br /></span>
            <span v-if="loc.address.address3">{{loc.address.address3}}<br /></span>
            <span>{{loc.address.city}}, {{loc.address.state}} {{loc.address.zip}}</span>
          </address>
          <ul>
            <li>
              <button class="transit-type"
              @click="timeTravel(loc.latitude,loc.longitude,'driving')"><font-awesome-icon icon="car" /></button>
            </li>
            <li>
              <button class="transit-type"
              @click="timeTravel(loc.latitude,loc.longitude,'walking')"><font-awesome-icon icon="walking" /></button>
            </li>
            <li>
              <button class="transit-type"
              @click="timeTravel(loc.latitude,loc.longitude,'bicycling')"><font-awesome-icon icon="bicycle" /></button>
            </li>
            <li>
              <button class="transit-type"
              @click="timeTravel(loc.latitude,loc.longitude,'transit')"><font-awesome-icon icon="subway" /></button>
            </li>
          </ul>

          <p v-if="loc.latitude && loc.longitude">{{loc.latitude}}, {{loc.longitude}}</p>
        </div>
      </div>

      <div class="time-travel"
        v-show="travelResponse !== ''"
        v-for="route in travelResponse"
        :key="route.id">
          <span class="close-btn"
          @click="resetTimeTravel()"><font-awesome-icon icon="times-circle" /></span>
          <p><span :class="colorScale(route.timeDiff)">{{route.legs[0].duration_in_traffic.text}}</span> in current traffic.</p>
      </div>

      <div class="error-msg"
      v-show="travelError !== ''">
        <span class="close-btn"
          @click="resetTimeTravel()"><font-awesome-icon icon="times-circle" /></span>
          <span v-html="travelError"></span>
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
  import config           from './morsecodemirror.config.json'
  import dayjs            from 'dayjs'
  import fontawesome      from '@fortawesome/fontawesome'
  import FontAwesomeIcon  from '@fortawesome/vue-fontawesome'
  import { faCar, faWalking, faBicycle, faSubway, faTimesCircle } from '@fortawesome/fontawesome-free-solid'
  fontawesome.library.add(faCar, faWalking, faBicycle, faSubway, faTimesCircle)
  const googleMapsClient = require('@google/maps').createClient({
    key: config.googleMapsAPIKey
  })
  export default {
    name: 'TimeTravel',
    components: {
      FontAwesomeIcon,
      dayjs
    },
    data: function() {
      return {
        locations: config.locations,
        home: config.home,
        travelResponse: '',
        travelError: ''
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
              for (let i in this.travelResponse) {
                let route = this.travelResponse[i]
                route.timeDiff = dayjs(route.legs[0].duration_in_traffic.value).diff(route.legs[0].duration.value,'seconds',true)
              }
            break
            case 'NOT_FOUND':
              this.travelError = "<strong>NOT FOUND:</strong><br /> At least one of the locations specified in the request's origin, destination, or waypoints could not be geocoded."
            break
            case 'ZERO_RESULTS':
              this.travelError = "<strong>ZERO RESULTS:</strong><br /> No route could be found between the origin and destination."
            break
            case 'OVER_QUERY_LIMIT':
              this.travelError = '<strong>OVER QUERY LIMIT:</strong><br /> The service has received too many requests from your application within the allowed time period.'
            break
            case 'REQUEST_DENIED':
              this.travelError = '<strong>REQUEST DENIED:</strong><br /> The service denied use of the directions service by your application.'
            break
            case 'INVALID_REQUEST':
              this.travelError = '<strong>INVALID REQUEST:</strong><br /> The provided request was invalid. Common causes of this status include an invalid parameter or parameter value.'
            break
            case 'UNKNOWN_ERROR':
              this.travelError = '<strong>UNKNOWN ERROR:</strong><br /> A directions request could not be processed due to a server error. The request may succeed if you try again.'
            break
            case 'MAX_WAYPOINTS_EXCEEDED':
              this.travelError = '<strong>MAX WAYPOINTS EXCEEDED:</strong><br /> Too many waypoints were provided in the request.'
            break
          case 'MAX_ROUTE_LENGTH_EXCEEDED':
              this.travelError = '<strong>MAX ROUTE LENGTH EXCEEDED:</strong><br /> The requested route is too long and cannot be processed. This error occurs when more complex directions are returned. Try reducing the number of waypoints, turns, or instructions.'
            break
            default:
              this.travelError = '<strong>BROKEN:</strong><br /> Somehow you got here. This is a bigger problem than you know.'
            break
          }
        } else {
          this.travelError = '<strong>errObj:</strong><br /> '+errObj
        }
      },
      timeTravel(lat,long,mode) {
        this.resetTimeTravel()
        var timeToLeave = Math.round(new Date() / 1000)
        googleMapsClient.directions({
          origin: this.home.latitude+','+this.home.longitude,
          destination: lat+','+long,
          mode: mode,
          departure_time: timeToLeave,
          traffic_model: 'pessimistic'
        }, this.parseTimeTravel)
      },
      resetTimeTravel() {
        this.travelResponse = ''
        this.travelError = ''
      },
      colorScale(x) {
        let trafficColorClass = ''
        if (x <= 0.100) {
          trafficColorClass = 'traffic-colors-1'
        } else if (x >= 0.101 && x <= 0.200) {
          trafficColorClass = 'traffic-colors-2'
        } else if (x >= 0.201 && x <= 0.300) {
          trafficColorClass = 'traffic-colors-3'
        } else if (x >= 0.301 && x <= 0.400) {
          trafficColorClass = 'traffic-colors-4'
        } else if (x >= 0.401 && x <= 0.500) {
          trafficColorClass = 'traffic-colors-5'
        } else if (x >= 0.501 && x <= 0.600) {
          trafficColorClass = 'traffic-colors-6'
        } else if (x >= 0.601 && x <= 0.700) {
          trafficColorClass = 'traffic-colors-7'
        } else if (x >= 0.701 && x <= 0.800) {
          trafficColorClass = 'traffic-colors-8'
        } else if (x >= 0.801 && x <= 0.900) {
          trafficColorClass = 'traffic-colors-9'
        } else if (x >= 0.901) {
          trafficColorClass = 'traffic-colors-10'
        }
        return trafficColorClass
      }
    },
    beforeMount () {
      // Example of configuration overrides
      // if (config.setting && config.setting.length > 0) {
      //   this.setting = config.setting
      // }
    },
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

  ul {
    list-style: none;
    margin: 10px auto;
  }

  ul li {
    display: inline-block;
  }

  ul li button {
    font-size: 20px;
    width: 44px;
    height: 44px;
    cursor: pointer;
    text-align: center;
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
    padding: 15px;
    position: absolute;
    top: 10px;
    right: 10px;
    min-width: 300px;
    max-width: 33%;
  }

  .traffic-colors-1 {
    color: #008000;
  }
  .traffic-colors-2 {
    color: #489600;
  }
  .traffic-colors-3 {
    color: #74ac00;
  }
  .traffic-colors-4 {
    color: #9dc200;
  }
  .traffic-colors-5 {
    color: #ccd700;
  }
  .traffic-colors-6 {
    color: #fbbf00;
  }
  .traffic-colors-7 {
    color: #e59200;
  }
  .traffic-colors-8 {
    color: #c96801;
  }
  .traffic-colors-9 {
    color: #ab3c02;
  }
  .traffic-colors-10 {
    color: #8b0000;
  }
</style>

