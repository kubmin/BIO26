<template lang="html">
  <div v-if="checkArray(images)" class="grid-container">

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
          <div v-if="emptyObject(images[0])" :key="images[0]"/>
          <div v-else :key="images[0].id" >
            <div class="grid-image">
              <div>
                <FadeImage :url="path + images[0].url"/>
              </div>
            </div>
            <div class="grid-meta">
              {{ title(images[0].url)[1] }}
              {{ title(images[0].url)[2] }}<br>
              {{ title(images[0].url)[0] }}
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
        <div v-if="emptyObject(images[1])" :key="images[1]"/>
        <div v-else :key="images[1].id">
          <div class="grid-image">
            <div>
              <FadeImage :url="path + images[1].url"/>
            </div>
          </div>
          <div class="grid-meta">
            {{ title(images[1].url)[1] }}
            {{ title(images[1].url)[2] }}<br>
            {{ title(images[1].url)[0] }}
          </div>
        </div>
        </transition>
      </div>
    </div>

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
          <div v-if="emptyObject(images[4])" :key="images[4]"/>
          <div v-else :key="images[4].id" >
            <div class="grid-image">
              <div>
                <FadeImage :url="path + images[4].url"/>
              </div>
            </div>
            <div class="grid-meta">
              {{ title(images[4].url)[1] }}
              {{ title(images[4].url)[2] }}<br>
              {{ title(images[4].url)[0] }}
            </div>
          </div>
        </transition>
      </div>
    </div>


    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
        <div v-if="emptyObject(images[5])" :key="images[5]"/>
        <div v-else :key="images[5].id">
          <div class="grid-image">
            <div>
              <FadeImage :url="path + images[5].url"/>
            </div>
          </div>
          <div class="grid-meta">
            {{ title(images[5].url)[1] }}
            {{ title(images[5].url)[2] }}<br>
            {{ title(images[5].url)[0] }}
          </div>
        </div>
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapState, mapMutations } from 'vuex'

import FadeImage from '../FadeImage.vue'

export default {
  name: 'TopLeft',
  computed: {
    ...mapState([
      'path',
      'images',
    ]),
  },
  components: {
    FadeImage
  },
  methods: {
    checkArray(array) {
      return typeof array !== 'undefined' && array.length > 0
    },
    emptyObject(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object
    },
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
  }
}
</script>

<style lang="css" scoped>
</style>
