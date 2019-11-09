<template lang="html">
  <transition name="fade" mode="out-in">
  <div
    v-if="'url' in data"
    :key="data.id"
    class="client-item"
    :class="{
        'align__flex-start': style == 1,
        'align__flex-center': style == 2,
        'align__flex-end': style == 3,
        'justify__flex-start': style == 4,
        'justify__flex-center': style == 5,
        'justify__flex-end': style == 6,
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
      style: Math.floor(Math.random() * 2) + 1,
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
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
  }
  /* .content img {
    margin-bottom: 12px;
  }
  .content {
    width: 80%;
  } */

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
    align-items: flex-end;
  }
  .justify__flex-start {
    align-items: flex-start;
  }
  .justify__flex-center {
    align-items: center;
  }
</style>
