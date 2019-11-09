<template lang="html">
  <div v-if="images.length > 0" class="grid-container">
    <div v-if="'url' in images[0]" class="grid-item">
      <img :src="path + images[0].url"/>
    </div>
    <div v-else class="grid-item">
      <!-- no there is no image -->
    </div>
    <div v-if="'url' in images[1]" class="grid-item">
      <img :src="path + images[1].url"/>
    </div>
    <div v-else class="grid-item">
      <!-- no there is no image -->
    </div>
    <div v-if="'url' in images[4]" class="grid-item">
      <img :src="path + images[4].url"/>
    </div>
    <div v-else class="grid-item">
      <!-- no there is no image -->
    </div>
    <div v-if="'url' in images[5]" class="grid-item">
      <img :src="path + images[5].url"/>
    </div>
    <div v-else class="grid-item">
      <!-- no there is no image -->
    </div>
  </div>
  <div v-else>
    Loading ...
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
}
</script>
