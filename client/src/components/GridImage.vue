<template lang="html">
  <transition name="fade" mode="out-in">
    <img
      v-show="load"
      v-images-loaded="loading"
      :src="url"
    />
  </transition>
</template>

<script>
import imagesLoaded from 'vue-images-loaded'

export default {
  name: 'GridImage',
  props: ['url'],
  data() {
    return {
      load: false,
    }
  },
  directives: {
    imagesLoaded
  },
  methods: {
    loading() {
      this.load = true
    }
  }
}
</script>
