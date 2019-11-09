<template>
  <div id="bio-26">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import _ from 'lodash'
import io from 'socket.io-client'
import axios from 'axios'

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'BIO26',
  data() {
    return {
      socket: io('192.168.0.53:3002'),
      sensors: [],
    }
  },
  computed: {
    ...mapState([
      'path',
      'images',
    ]),
  },
  methods: {
    shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }
  },
  created() {
    this.socket.on('setImages', (data) => {
      console.log(data);
      this.$store.commit('setter', ['images', data])
    })
    this.socket.on('reset', (data) => {
      console.log('init');
      this.$store.commit('setter', ['images', data])
    })
    this.socket.on('sensorData', (data) => {
      this.sensors = data
      // socket.io sends the images indexs, client retrieved images id and sends
      // it back to socket.io to retrieve a calculated nn image array
      this.socket.emit('calculateN', [this.images[data[0]].id, this.images[data[1]].id])
    })
  }
}
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
  box-sizing: border-box;
}

#bio-26 {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  color: #2c3e50;
  height: 100%;
  /* padding: 12px */
  padding: 1em;

}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 18px));
  grid-template-rows: repeat(2, calc(50% - 18px));
  grid-gap: 24px;
  height: 100%;
}

.grid-item {
  font-size: 12px;
}

.grid-wrapper > div,
.grid-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.grid-wrapper > div {
  width: 100%;
  height: 100%
}

.grid-image {
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.grid-image > div {
  height: 100%;
  width: 100%;
}

 img {
  display: block;
  max-width: 100%;
  max-height: 80%;
}

.client-container {
  /* align-items: flex-start; */
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 18px));
  grid-template-rows: repeat(2, calc(50% - 18px));
  grid-gap: 24px;
  height: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
