<template lang="html">
  <div class="content">
    <transition name="fade" mode="out-in">
      <img ref="image"
        v-show="load"
        v-images-loaded="loading"
        :src="path + data.url"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <div v-show="load" ref="meta">
        {{ title(data.url)[0] }} </br>
        {{ title(data.url)[1] }} {{ title(data.url)[2] }}</br>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import imagesLoaded from 'vue-images-loaded'

export default {
  name: 'FadeImage',
  props: ['url', 'data'],
  data() {
    return {
      load: false,
    }
  },
  directives: {
    imagesLoaded
  },
  computed: {
    ...mapState([
      'path',
    ]),
  },
  methods: {
    loading() {
      this.load = true
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
.content img {
  margin-bottom: 12px;
}
.content {
  width: 80%;
}
</style>
