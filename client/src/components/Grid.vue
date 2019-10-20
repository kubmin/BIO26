<template lang="html">
  <div class="grid-container">
    <div class="hardware">
      Port: <input v-model="port"/>
      Value: <input v-model="value"/>
      <button @click="hardwareSelect(port, value)">Send</button>
    </div>

    <div
      class="grid-item"
      v-for="(image, index) in images"
      :key="index"
    >
      <div class="grid-wrapper">
        <div class="grid-image">
          <div>
            <GridImage
              :url="path + image.url"
            />
          </div>
        </div>
        <div class="grid-meta">
          {{ title(image.url)[1] }}
          {{ title(image.url)[2] }}<br>
          {{ title(image.url)[0] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

import axios from 'axios'
import GridImage from './GridImage.vue'

export default {
  name: 'ImagesFex',
  data() {
    return {
      path: 'http://192.168.0.34:5000/',
      bodyFormData: new FormData(),
      images: [],
      sIdx: null,
      eIdx: null,
      selected: 0,
      value: null,
      port: null,
      socket: io('localhost:3001'),
    }
  },
  components: {
    GridImage,
  },
  created() {
    axios.get(this.path)
    .then((res) => {
      this.images = res.data
    })
    .catch((error) => {
      alert(error)
    })
  },
  mounted() {
    this.socket.on('DATA', (data) => {
      this.hardwareSelect(data)
    })
  },
  methods: {
    title(value) {
      var index
      var array = value.match(/\[.*?\]/g)

      for (index in array) {
        array[index] = array[index].replace('[', '')
        array[index] = array[index].replace(']', '')
      }

      array[0] = array[0].replace(/_/g, ':')
      array[1] = array[1].replace(/_/g, ' ')
      array[2] = '(' + array[2] + ')'

      return array

    },
    /*
      Select images using the sensors. Takes a port and value as input.
    */
    hardwareSelect(value) {
      if (!this.selected) {
        if (value == 250) {
          this.$router.push({ name: 'Result', params: { sIdx: this.images[0].id, eIdx: this.images[1].id } })
          this.selected = true
        }
      }
    },
    select(image) {
      if (this.selected == 0) {
        this.sIdx = image.id
        this.selected++
      } else if (this.selected == 1) {
        this.eIdx = image.id
        this.selected = 0

        this.$router.push({ name: 'Result', params: { sIdx: this.sIdx, eIdx: this.eIdx } })

        this.sIdx = null
        this.eIdx = null
      }
    }
  }
}
</script>

<style lang="css">
.hardware {
  position: fixed;
  padding: 12px;
  right: 12px;
  color: white;
  background: rgba(0,0,255,.8);
  z-index: 99;
}
.hardware button {
  margin-left: 12px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, calc(25% - 18px));
  grid-template-rows: repeat(4, calc(25% - 18px));
  grid-gap: 24px;
  height: 100%;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  text-align: center;
  border: solid black 1px;
}
.grid-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.grid-image {
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: lightpink;
}
.grid-image > div {
  height: 100%;
  width: 100%;
}
.grid-image > div > img {
  object-fit: cover;
  max-width: 100%;
  max-height: 100%;
}
.grid-meta {
  background-color: lightblue;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
