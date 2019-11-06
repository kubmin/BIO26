<template lang="html">
  <div v-if="images.length > 0" class="grid-container">
    <div v-if="'url' in images[10]" class="grid-item">
      <img :src="path + images[10].url"/>
      yes image exists
    </div>
    <div v-else class="grid-item">
      no there is no image
    </div>
    <div v-if="'url' in images[11]" class="grid-item">
      <img :src="path + images[11].url"/>
      yes image exists
    </div>
    <div v-else class="grid-item">
      no there is no image
    </div>
    <div v-if="'url' in images[14]" class="grid-item">
      <img :src="path + images[14].url"/>
      yes image exists
    </div>
    <div v-else class="grid-item">
      no there is no image
    </div>
    <div v-if="'url' in images[15]" class="grid-item">
      <img :src="path + images[15].url"/>
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
  name: 'BottomRight',
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
