<template lang="html">
  <div v-if="images.length > 0" class="client-container">
    <GridItem :data="images[10]"/>
    <GridItem :data="images[11]"/>
    <GridItem :data="images[14]"/>
    <GridItem :data="images[15]"/>
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
