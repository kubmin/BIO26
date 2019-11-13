<template lang="html">
  <transition name="fade" mode="out-in">
  <div
    v-if="'url' in data"
    :key="data.id"
    class="client-item"
    :class="{
        'align__flex-center': align == 1,
        'align__flex-end': align == 2,
        'justify__flex-center': justify == 1,
        'justify__flex-end': justify == 2,
        'debug': debug == true,
      }"
    >
    <FadeImage :data="data"/>
    <!-- <div class="content">
      <FadeImage :url="path + data.url" :data="data"/>
      <div ref="meta">
        {{ title(data.url)[0] }} </br>
        {{ title(data.url)[1] }} {{ title(data.url)[2] }}</br>
      </div>
    </div> -->
  </div>
  <div v-else class="client-item" :key="data.id">
    <div class="content"></div>
  </div>
  </transition>
</template>

<script>
import FadeImage from '../FadeImage.vue'
import { mapState } from 'vuex'

import imagesLoaded from 'vue-images-loaded'

export default {
  props: ['data', 'caption'],
  name: 'GridItem',
  data() {
    return {
      imageLoaded: false,
      align: Math.floor(Math.random() * 2) + 1,
      justify: Math.floor(Math.random() * 2) + 1
    }
  },
  components: {
    FadeImage,
  },
  directives: {
    imagesLoaded
  },
  computed: {
    ...mapState([
      'path',
      'debug',
    ]),
  },
}
</script>

<style lang="css" scoped>
  .client-item {
    align-items: flex-end;
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
  }
  /* conditional styles */
  .debug {
    border: 1px solid red;
  }
  .align__flex-end {
    align-items: flex-end;
  }
  .align__flex-start {
    align-items: flex-start;
  }
  .align__flex-center {
    align-items: center;
  }

  .justify__flex-end {
    justify-content: flex-end;
  }
  .justify__flex-start {
    justify-content: flex-start;
  }
  .justify__flex-center {
    justify-content: center;
  }
</style>
