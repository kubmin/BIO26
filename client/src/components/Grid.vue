<template lang="html">
  <div class="grid-container">
    <div class="hardware">
      valZero: channel {{ valZero.channel }}, value {{ valZero.value }}, data {{ valZero.data }}<br />
      valOne: channel {{ valOne.channel }}, value {{ valOne.value }}, data {{ valOne.data }}<br />
      valTwo: channel {{ valTwo.channel }}, value {{ valTwo.value }}, data {{ valTwo.data }}<br />
      valThree: channel {{ valThree.channel }}, value {{ valThree.value }}, data {{ valThree.data }}<br /><br />
      Triggered: {{ sensors[0] }} - {{ sensors[1] }}
    </div>

    <div
      class="grid-item"
      v-for="(image, index) in images"
      :key="index"
      @click="select(image)"
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
      path: 'http://192.168.1.70:5000/',
      bodyFormData: new FormData(),
      valZero: [],
      valOne: [],
      valTwo: [],
      valThree: [],
      sensors: [],
      images: [],
      sIdx: null,
      eIdx: null,
      selected: 0,
      value: null,
      port: null,
      number: null,
      socket: io('192.168.1.70:3001'),
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
    this.socket.on('20_00', (data) => {
      this.hardwareSelect(data)
      this.valZero = data
    })
    this.socket.on('20_01', (data) => {
      this.hardwareSelect(data)
      this.valOne = data
    })
    this.socket.on('24_00', (data) => {
      this.hardwareSelect(data)
      this.valTwo = data
    })
    this.socket.on('24_01', (data) => {
      this.hardwareSelect(data)
      this.valThree = data
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
    hardwareSelect(arr) {
      // First sensor
      if (this.valZero.value == 0 && this.valZero.data == 250) {
        // 1 + 2
        console.log('1+2');
        this.sensors = [0,1]
      } else if (this.valZero.value == 0 && this.valZero.data == 187) {
        // 1 + 3
        console.log('1+3');
        this.sensors = [0,2]
      } else if (this.valZero.value == 0 && this.valZero.data == 235) {
        // 1 + 4
        console.log('1+4');
        this.sensors = [0,3]
      } else if (this.valZero.value == 0 && this.valZero.data == 251 && this.valOne.value == 1 && this.valOne.data == 251) {
        // 1 + 5
        console.log('1+5');
        this.sensors = [0,4]
      } else if (this.valZero.value == 0 && this.valZero.data == 251 && this.valOne.value == 1 && this.valOne.data == 254) {
        // 1 + 6
        console.log('1+6');
        this.sensors = [0,5]
      } else if (this.valZero.value == 0 && this.valZero.data == 251 && this.valOne.value == 1 && this.valOne.data == 191) {
        // 1 + 7
        console.log('1+7');
        this.sensors = [0,6]
      } else if (this.valZero.value == 0 && this.valZero.data == 251 && this.valOne.value == 1 && this.valOne.data == 239) {
        // 1 + 8
        console.log('1+8');
        this.sensors = [0,7]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 251 && this.valZero.value == 0 && this.valZero.data == 251) {
        // 1 + 9
        console.log('1+9');
        this.sensors = [0,8]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 254 && this.valZero.value == 0 && this.valZero.data == 251) {
        // 1 + 10
        console.log('1+10');
        this.sensors = [0,9]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 191 && this.valZero.value == 0 && this.valZero.data == 251) {
        // 1 + 11
        console.log('1+11');
        this.sensors = [0,10]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 239 && this.valZero.value == 0 && this.valZero.data == 251) {
        // 1 + 12
        console.log('1+12');
        this.sensors = [0,11]
      } else if (this.valThree.value == 1 && this.valThree.data == 251 && this.valZero.value == 0 && this.valZero.data == 251) {
        // 1 + 13
        console.log('1+13');
        this.sensors = [0,12]
      } else if (this.valThree.value == 1 && this.valThree.data == 254 && this.valZero.value == 0 && this.valZero.data == 251) {
        // 1 + 14
        console.log('1+14');
        this.sensors = [0,13]
      } else if (this.valThree.value == 1 && this.valThree.data == 191 && this.valZero.value == 0 && this.valZero.data == 251) {
        // 1 + 15
        console.log('1+15');
        this.sensors = [0,14]
      } else if (this.valThree.value == 1 && this.valThree.data == 239 && this.valZero.value == 0 && this.valZero.data == 251) {
        // 1 + 16
        console.log('1+16')
        this.sensors = [0,15]
      }

      // Second sensor
      if (this.valZero.value == 0 && this.valZero.data == 190) {
        // 2 + 3
        console.log('2+3')
        this.sensors = [1,2]
      } else if (this.valZero.value == 0 && this.valZero.data == 238) {
        // 2 + 4
        console.log('2+4')
        this.sensors = [1,3]
      } else if (this.valZero.value == 0 && this.valZero.data == 254 && this.valOne.value == 1 && this.valOne.data == 251) {
        // 2 + 5
        console.log('2+5')
        this.sensors = [1,4]
      } else if (this.valZero.value == 0 && this.valZero.data == 254 && this.valOne.value == 1 && this.valOne.data == 254) {
        // 2 + 6
        console.log('2+6');
        this.sensors = [1,5]
      } else if (this.valZero.value == 0 && this.valZero.data == 254 && this.valOne.value == 1 && this.valOne.data == 191) {
        // 2 + 7
        console.log('2+7')
        this.sensors = [1,6]
      } else if (this.valZero.value == 0 && this.valZero.data == 254 && this.valOne.value == 1 && this.valOne.data == 239) {
        // 2 + 8
        console.log('2+8')
        this.sensors = [1,7]
      } else if (this.valZero.value == 0 && this.valZero.data == 254 && this.valTwo.value == 0 && this.valTwo.data == 251) {
        // 2 + 9
        console.log('2+9')
        this.sensors = [1,8]
      } else if (this.valZero.value == 0 && this.valZero.data == 254 && this.valTwo.value == 0 && this.valTwo.data == 254) {
        // 2 + 10
        console.log('2+10')
        this.sensors = [1,9]
      } else if (this.valZero.value == 0 && this.valZero.data == 254 && this.valTwo.value == 0 && this.valTwo.data == 191) {
        // 2 + 11
        console.log('2+11')
        this.sensors = [1,10]
      } else if (this.valZero.value == 0 && this.valZero.data == 254 && this.valTwo.value == 0 && this.valTwo.data == 239) {
        // 2 + 12
        console.log('2+12')
        this.sensors = [1,11]
      } else if (this.valZero.value == 0 && this.valZero.data == 254 && this.valThree.value == 1 && this.valThree.data == 251) {
        // 2 + 13
        console.log('2+13')
        this.sensors = [1,12]
      } else if (this.valZero.value == 0 && this.valZero.data == 254 && this.valThree.value == 1 && this.valThree.data == 254) {
        // 2 + 14
        console.log('2+14')
        this.sensors = [1,13]
      } else if (this.valZero.value == 0 && this.valZero.data == 254 && this.valThree.value == 1 && this.valThree.data == 191) {
        // 2 + 15
        console.log('2+15')
        this.sensors = [1,14]
      } else if (this.valZero.value == 0 && this.valZero.data == 254 && this.valThree.value == 1 && this.valThree.data == 239) {
        // 2 + 16
        console.log('2+16')
        this.sensors = [1,15]
      }


      // Third sensor
      if (this.valZero.value == 0 && this.valZero.data == 175) {
        // 3 + 4
        console.log('3+4')
        this.sensors = [2,3]
      } else if (this.valZero.value == 0 && this.valZero.data == 191 && this.valOne.value == 1 && this.valOne.data == 251) {
        // 3 + 5
        console.log('3+5')
        this.sensors = [2,4]
      } else if (this.valZero.value == 0 && this.valZero.data == 191 && this.valOne.value == 1 && this.valOne.data == 254) {
        // 3 + 6
        console.log('3+6')
        this.sensors = [2,5]
      } else if (this.valZero.value == 0 && this.valZero.data == 191 && this.valOne.value == 1 && this.valOne.data == 191) {
        // 3 + 7
        console.log('3+7')
        this.sensors = [2,6]
      } else if (this.valZero.value == 0 && this.valZero.data == 191 && this.valOne.value == 1 && this.valOne.data == 239) {
        // 3 + 8
        console.log('3+8')
        this.sensors = [2,7]
      } else if (this.valZero.value == 0 && this.valZero.data == 191 && this.valTwo.value == 0 && this.valTwo.data == 251) {
        // 3 + 9
        console.log('3+9')
        this.sensors = [2,8]
      } else if (this.valZero.value == 0 && this.valZero.data == 191 && this.valTwo.value == 0 && this.valTwo.data == 254) {
        // 3 + 10
        console.log('3+10')
        this.sensors = [2,9]
      } else if (this.valZero.value == 0 && this.valZero.data == 191 && this.valTwo.value == 0 && this.valTwo.data == 191) {
        // 3 + 11
        console.log('3+11')
        this.sensors = [2,10]
      } else if (this.valZero.value == 0 && this.valZero.data == 191 && this.valTwo.value == 0 && this.valTwo.data == 239) {
        // 3 + 12
        console.log('3+12')
        this.sensors = [2,11]
      } else if (this.valZero.value == 0 && this.valZero.data == 191 && this.valThree.value == 1 && this.valThree.data == 251) {
        // 3 + 13
        console.log('3+13')
        this.sensors = [2,12]
      } else if (this.valZero.value == 0 && this.valZero.data == 191 && this.valThree.value == 1 && this.valThree.data == 254) {
        // 3 + 14
        console.log('3+14')
        this.sensors = [2,13]
      } else if (this.valZero.value == 0 && this.valZero.data == 191 && this.valThree.value == 1 && this.valThree.data == 191) {
        // 3 + 15
        console.log('3+15')
        this.sensors = [2,14]
      } else if (this.valZero.value == 0 && this.valZero.data == 191 && this.valThree.value == 1 && this.valThree.data == 239) {
        // 3 + 16
        console.log('3+16')
        this.sensors = [2,15]
      }

      // Fourth sensor
      if (this.valZero.value == 0 && this.valZero.data == 239 && this.valOne.value == 1 && this.valOne.data == 251) {
        // 4 + 5
        console.log('4+5')
        this.sensors = [3,4]
      } else if (this.valZero.value == 0 && this.valZero.data == 239 && this.valOne.value == 1 && this.valOne.data == 254) {
        // 4 + 6
        console.log('4+6')
        this.sensors = [3,5]
      } else if (this.valZero.value == 0 && this.valZero.data == 239 && this.valOne.value == 1 && this.valOne.data == 191) {
        // 4 + 7
        console.log('4+7')
        this.sensors = [3,6]
      } else if (this.valZero.value == 0 && this.valZero.data == 239 && this.valOne.value == 1 && this.valOne.data == 239) {
        // 4 + 8
        console.log('4+8')
        this.sensors = [3,7]
      } else if (this.valZero.value == 0 && this.valZero.data == 239 && this.valTwo.value == 0 && this.valTwo.data == 251) {
        // 4 + 9
        console.log('4+9')
        this.sensors = [3,8]
      } else if (this.valZero.value == 0 && this.valZero.data == 239 && this.valTwo.value == 0 && this.valTwo.data == 254) {
        // 4 + 10
        console.log('4+10')
        this.sensors = [3,9]
      } else if (this.valZero.value == 0 && this.valZero.data == 239 && this.valTwo.value == 0 && this.valTwo.data == 191) {
        // 4 + 11
        console.log('4+11')
        this.sensors = [3,10]
      } else if (this.valZero.value == 0 && this.valZero.data == 239 && this.valTwo.value == 0 && this.valTwo.data == 239) {
        // 4 + 12
        console.log('4+12')
        this.sensors = [3,11]
      } else if (this.valZero.value == 0 && this.valZero.data == 239 && this.valThree.value == 1 && this.valThree.data == 251) {
        // 4 + 13
        console.log('4+13')
        this.sensors = [3,12]
      } else if (this.valZero.value == 0 && this.valZero.data == 239 && this.valThree.value == 1 && this.valThree.data == 254) {
        // 4 + 14
        console.log('4+14')
        this.sensors = [3,13]
      } else if (this.valZero.value == 0 && this.valZero.data == 239 && this.valThree.value == 1 && this.valThree.data == 191) {
        // 4 + 15
        console.log('4+15')
        this.sensors = [3,14]
      } else if (this.valZero.value == 0 && this.valZero.data == 239 && this.valThree.value == 1 && this.valThree.data == 239) {
        // 4 + 16
        console.log('4+16')
        this.sensors = [3,15]
      }


      // Fifth sensor
      if (this.valOne.value == 1 && this.valOne.data == 250) {
        // 5 + 6
        console.log('5+6')
        this.sensors = [4,5]
      } else if (this.valOne.value == 1 && this.valOne.data == 238) {
        // 5 + 7
        console.log('5+7')
        this.sensors = [4,6]
      } else if (this.valOne.value == 1 && this.valOne.data == 190) {
        // 5 + 8
        console.log('5+8')
        this.sensors = [4,7]
      } else if (this.valOne.value == 1 && this.valOne.data == 254 && this.valTwo.value == 0 && this.valTwo.data == 254) {
        // 5 + 9
        console.log('5+9')
        this.sensors = [4,8]
      } else if (this.valOne.value == 1 && this.valOne.data == 254 && this.valTwo.value == 0 && this.valTwo.data == 251) {
        // 5 + 10
        console.log('5+10')
        this.sensors = [4,9]
      } else if (this.valOne.value == 1 && this.valOne.data == 254 && this.valTwo.value == 0 && this.valTwo.data == 239) {
        // 5 + 11
        console.log('5+11')
        this.sensors = [4,10]
      } else if (this.valOne.value == 1 && this.valOne.data == 254 && this.valTwo.value == 0 && this.valTwo.data == 191) {
        // 5 + 12
        console.log('5+12')
        this.sensors = [4,11]
      } else if (this.valOne.value == 1 && this.valOne.data == 254 && this.valThree.value == 1 && this.valThree.data == 254) {
        // 5 + 13
        console.log('5+13')
        this.sensors = [4,12]
      } else if (this.valOne.value == 1 && this.valOne.data == 254 && this.valThree.value == 1 && this.valThree.data == 251) {
        // 5 + 14
        console.log('5+14')
        this.sensors = [4,13]
      } else if (this.valOne.value == 1 && this.valOne.data == 254 && this.valThree.value == 1 && this.valThree.data == 239) {
        // 5 + 15
        console.log('5+15')
        this.sensors = [4,14]
      } else if (this.valOne.value == 1 && this.valOne.data == 254 && this.valThree.value == 1 && this.valThree.data == 191) {
        // 5 + 16
        console.log('5+16')
        this.sensors = [4,15]
      }


      // Sixth sensor
      if (this.valOne.value == 1 && this.valOne.data == 235) {
        // 6 + 7
        console.log('6+7')
        this.sensors = [5,6]
      } else if (this.valOne.value == 1 && this.valOne.data == 187) {
        // 6 + 8
        console.log('6+8')
        this.sensors = [5,7]
      } else if (this.valOne.value == 1 && this.valOne.data == 251 && this.valTwo.value == 0 && this.valTwo.data == 254) {
        // 6 + 9
        console.log('6+9')
        this.sensors = [5,8]
      } else if (this.valOne.value == 1 && this.valOne.data == 251 && this.valTwo.value == 0 && this.valTwo.data == 251) {
        // 6 + 10
        console.log('6+10')
        this.sensors = [5,9]
      } else if (this.valOne.value == 1 && this.valOne.data == 251 && this.valTwo.value == 0 && this.valTwo.data == 239) {
        // 6 + 11
        console.log('6+11')
        this.sensors = [5,10]
      } else if (this.valOne.value == 1 && this.valOne.data == 251 && this.valTwo.value == 0 && this.valTwo.data == 191) {
        // 6 + 12
        console.log('6+12')
        this.sensors = [5,11]
      } else if (this.valOne.value == 1 && this.valOne.data == 251 && this.valThree.value == 1 && this.valThree.data == 254) {
        // 6 + 13
        console.log('6+13')
        this.sensors = [5,12]
      } else if (this.valOne.value == 1 && this.valOne.data == 251 && this.valThree.value == 1 && this.valThree.data == 251) {
        // 6 + 14
        console.log('6+14')
        this.sensors = [5,13]
      } else if (this.valOne.value == 1 && this.valOne.data == 251 && this.valThree.value == 1 && this.valThree.data == 239) {
        // 6 + 15
        console.log('6+15')
        this.sensors = [5,14]
      } else if (this.valOne.value == 1 && this.valOne.data == 251 && this.valThree.value == 1 && this.valThree.data == 191) {
        // 6 + 15
        console.log('6+15')
        this.sensors = [5,15]
      }

      // 7th sensor
      if (this.valOne.value == 1 && this.valOne.data == 175) {
        // 7 + 8
        console.log('7+8')
        this.sensors = [6,7]
      } else if (this.valOne.value == 1 && this.valOne.data == 239 && this.valTwo.value == 0 && this.valTwo.data == 254) {
        // 7 + 9
        console.log('7+9')
        this.sensors = [6,8]
      } else if (this.valOne.value == 1 && this.valOne.data == 239 && this.valTwo.value == 0 && this.valTwo.data == 251) {
        // 7 + 10
        console.log('7+10')
        this.sensors = [6,9]
      } else if (this.valOne.value == 1 && this.valOne.data == 239 && this.valTwo.value == 0 && this.valTwo.data == 239) {
        // 7 + 11
        console.log('7+11')
        this.sensors = [6,10]
      } else if (this.valOne.value == 1 && this.valOne.data == 239 && this.valTwo.value == 0 && this.valTwo.data == 191) {
        // 7 + 12
        console.log('7+12')
        this.sensors = [6,11]
      } else if (this.valOne.value == 1 && this.valOne.data == 239 && this.valThree.value == 1 && this.valThree.data == 254) {
        // 7 + 13
        console.log('7+13')
        this.sensors = [6,12]
      } else if (this.valOne.value == 1 && this.valOne.data == 239 && this.valThree.value == 1 && this.valThree.data == 251) {
        // 7 + 14
        console.log('7+14')
        this.sensors = [6,13]
      } else if (this.valOne.value == 1 && this.valOne.data == 239 && this.valThree.value == 1 && this.valThree.data == 239) {
        // 7 + 15
        console.log('7+15')
        this.sensors = [6,14]
      } else if (this.valOne.value == 1 && this.valOne.data == 239 && this.valThree.value == 1 && this.valThree.data == 191) {
        // 7 + 16
        console.log('7+16')
        this.sensors = [6,15]
      }


      //8th sensor
      if (this.valOne.value == 1 && this.valOne.data == 191 && this.valTwo.value == 0 && this.valTwo.data == 254) {
        // 8 + 9
        console.log('8+9')
        this.sensors = [7,8]
      } else if (this.valOne.value == 1 && this.valOne.data == 191 && this.valTwo.value == 0 && this.valTwo.data == 251) {
        // 8 + 10
        console.log('8+10')
        this.sensors = [7,9]
      } else if (this.valOne.value == 1 && this.valOne.data == 191 && this.valTwo.value == 0 && this.valTwo.data == 239) {
        // 8 + 11
        console.log('8+11')
        this.sensors = [7,10]
      } else if (this.valOne.value == 1 && this.valOne.data == 191 && this.valTwo.value == 0 && this.valTwo.data == 191) {
        // 8 + 12
        console.log('8+12')
        this.sensors = [7,11]
      } else if (this.valOne.value == 1 && this.valOne.data == 191 && this.valThree.value == 1 && this.valThree.data == 254) {
        // 8 + 13
        console.log('8+13')
        this.sensors = [7,12]
      } else if (this.valOne.value == 1 && this.valOne.data == 191 && this.valThree.value == 1 && this.valThree.data == 251) {
        // 8 + 14
        console.log('8+14')
        this.sensors = [7,13]
      } else if (this.valOne.value == 1 && this.valOne.data == 191 && this.valThree.value == 1 && this.valThree.data == 239) {
        // 8 + 15
        console.log('8+15')
        this.sensors = [7,14]
      } else if (this.valOne.value == 1 && this.valOne.data == 191 && this.valThree.value == 1 && this.valThree.data == 191) {
        // 8 + 16
        console.log('8+16')
        this.sensors = [7,15]
      }


      //9th sensor
      if (this.valTwo.value == 0 && this.valTwo.data == 250) {
        // 9 + 10
        console.log('9+10')
        this.sensors = [8,9]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 238) {
        // 9 + 11
        console.log('9+11')
        this.sensors = [8,10]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 190) {
        // 9 + 12
        console.log('9+12')
        this.sensors = [8,11]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 254 && this.valThree.value == 1 && this.valThree.data == 254) {
        // 9 + 13
        console.log('9+13')
        this.sensors = [8,12]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 254 && this.valThree.value == 1 && this.valThree.data == 251) {
        // 9 + 14
        console.log('9+14')
        this.sensors = [8,13]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 254 && this.valThree.value == 1 && this.valThree.data == 239) {
        // 9 + 15
        console.log('9+15')
        this.sensors = [8,14]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 254 && this.valThree.value == 1 && this.valThree.data == 191) {
        // 9 + 16
        console.log('9+16')
        this.sensors = [8,15]
      }


      // 10th sensor
      if (this.valTwo.value == 0 && this.valTwo.data == 235) {
        // 10 + 11
        console.log('10+11')
        this.sensors = [9,10]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 187) {
        // 10 + 12
        console.log('10+12')
        this.sensors = [9,11]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 251 && this.valThree.value == 1 && this.valThree.data == 254) {
        // 10 + 13
        console.log('10+13')
        this.sensors = [9,12]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 251 && this.valThree.value == 1 && this.valThree.data == 251) {
        // 10 + 14
        console.log('10+14')
        this.sensors = [9,13]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 251 && this.valThree.value == 1 && this.valThree.data == 239) {
        // 10 + 15
        console.log('10+15')
        this.sensors = [9,14]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 251 && this.valThree.value == 1 && this.valThree.data == 191) {
        // 10 + 16
        console.log('10+16')
        this.sensors = [9,15]
      }

      // 11th sensor
      if (this.valTwo.value == 0 && this.valTwo.data == 175) {
        // 11 + 12
        console.log('11+12')
        this.sensors = [10,11]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 239 && this.valThree.value == 1 && this.valThree.data == 254) {
        // 11 + 13
        console.log('11+13')
        this.sensors = [10,12]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 239 && this.valThree.value == 1 && this.valThree.data == 251) {
        // 11 + 14
        console.log('11+14')
        this.sensors = [10,13]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 239 && this.valThree.value == 1 && this.valThree.data == 239) {
        // 11 + 15
        console.log('11+15')
        this.sensors = [10,14]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 239 && this.valThree.value == 1 && this.valThree.data == 191) {
        // 11 + 16
        console.log('11+16')
        this.sensors = [10,15]
      }


      // 12th sensor
      if (this.valTwo.value == 0 && this.valTwo.data == 191 && this.valThree.value == 1 && this.valThree.data == 254) {
        // 12 + 13
        console.log('12+13')
        this.sensors = [11,12]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 191 && this.valThree.value == 1 && this.valThree.data == 251) {
        // 12 + 14
        console.log('12+14')
        this.sensors = [11,13]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 191 && this.valThree.value == 1 && this.valThree.data == 239) {
        // 12 + 15
        console.log('12+15')
        this.sensors = [11,14]
      } else if (this.valTwo.value == 0 && this.valTwo.data == 191 && this.valThree.value == 1 && this.valThree.data == 191) {
        // 12 + 16
        console.log('12+16')
        this.sensors = [11,15]
      }


      // 13th sensor
      if (this.valThree.value == 1 && this.valThree.data == 250) {
        // 13 + 14
        console.log('13+14')
        this.sensors = [12,13]
      } else if (this.valThree.value == 1 && this.valThree.data == 238) {
        // 13 + 15
        console.log('13+15')
        this.sensors = [12,14]
      } else if (this.valThree.value == 1 && this.valThree.data == 190) {
        // 13 + 16
        console.log('13+16')
        this.sensors = [12,15]
      }


      // 14th sensor
      if (this.valThree.value == 1 && this.valThree.data == 235) {
        // 14 + 15
        console.log('14+15')
        this.sensors = [13,14]
      } else if (this.valThree.value == 1 && this.valThree.data == 187) {
        // 14 + 16
        console.log('14+16')
        this.sensors = [13,15]
      }


      // 15th sensor
      if (this.valThree.value == 1 && this.valThree.data == 175) {
        // 15 + 16
        console.log('15+16')
        this.sensors = [14,15]
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

<style lang="css" scoped>
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
