<template lang="html">
  <div v-if="images.length > 0" class="grid-container">
    <div v-if="'url' in images[2]" class="grid-item">
      <img :src="path + images[2].url"/>
      yes image exists
    </div>
    <div v-else class="grid-item">
      no there is no image
    </div>
    <div v-if="'url' in images[3]" class="grid-item">
      <img :src="path + images[3].url"/>
      yes image exists
    </div>
    <div v-else class="grid-item">
      no there is no image
    </div>
    <div v-if="'url' in images[6]" class="grid-item">
      <img :src="path + images[6].url"/>
      yes image exists
    </div>
    <div v-else class="grid-item">
      no there is no image
    </div>
    <div v-if="'url' in images[7]" class="grid-item">
      <img :src="path + images[7].url"/>
      yes image exists
    </div>
    <div v-else class="grid-item">
      no there is no image
    </div>
  </div>
  <div v-else>
    ERROR: No sensor connection
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import FadeImage from '../FadeImage.vue'

export default {
  name: 'TopRight',
  computed: {
    ...mapState([
      'path',
      'images',
    ]),
  },
  components: {
    FadeImage,
  },
}
</script>
