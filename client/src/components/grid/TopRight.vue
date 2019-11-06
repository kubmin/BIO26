<template lang="html">
  <div class="grid-container">
    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
          <div :key="images[2].id" >
            <div class="grid-image">
              <div>
                <FadeImage :url="path + images[2].url"/>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
        <div :key="images[3].id">
          <div class="grid-image">
            <div>
              <FadeImage :url="path + images[3].url"/>
            </div>
          </div>
        </div>
        </transition>
      </div>
    </div>

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
          <div :key="images[6].id" >
            <div class="grid-image">
              <div>
                <FadeImage :url="path + images[6].url"/>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>


    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
        <div :key="images[7].id">
          <div class="grid-image">
            <div>
              <FadeImage :url="path + images[7].url"/>
            </div>
          </div>
        </div>
        </transition>
      </div>
    </div>
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
  methods: {
    emptyObject(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object
    }
  }
}
</script>

<style lang="css" scoped>
</style>
