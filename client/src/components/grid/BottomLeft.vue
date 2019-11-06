<template lang="html">
  <div v-if="images.length > 0" class="grid-container">
    <div v-if="'url' in images[8]" class="grid-item">
      <img :src="path + images[8].url"/>
      yes image exists
    </div>
    <div v-else class="grid-item">
      no there is no image
    </div>
    <div v-if="'url' in images[9]" class="grid-item">
      <img :src="path + images[9].url"/>
      yes image exists
    </div>
    <div v-else class="grid-item">
      no there is no image
    </div>
    <div v-if="'url' in images[12]" class="grid-item">
      <img :src="path + images[12].url"/>
      yes image exists
    </div>
    <div v-else class="grid-item">
      no there is no image
    </div>
    <div v-if="'url' in images[13]" class="grid-item">
      <img :src="path + images[13].url"/>
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
  name: 'BottomLeft',
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
