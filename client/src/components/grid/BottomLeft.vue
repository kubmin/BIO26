<template lang="html">
  <div v-if="images.length > 0" class="client-container">
    <GridItem :data="images[8]"/>
    <GridItem :data="images[9]"/>
    <GridItem :data="images[12]"/>
    <GridItem :data="images[13]"/>
  </div>
  <div v-else>
    {{ info }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

import GridItem from './GridItem.vue'

export default {
  name: 'BottomRight',
  data() {
    return {
      info: 'Loading ...'
    }
  },
  computed: {
    ...mapState([
      'path',
      'images',
    ]),
  },
  mounted() {
    setTimeout(() => {
      this.info = 'Failed loading.'
    }, 5000)
  },
  components: {
    GridItem,
  },
}
</script>
