<template lang="html">
  <div class="grid-container">
    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
          <div :key="images[8].id" >
            <div class="grid-image">
              <div>
                <FadeImage :url="path + images[8].url"/>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
        <div :key="images[9].id">
          <div class="grid-image">
            <div>
              <FadeImage :url="path + images[9].url"/>
            </div>
          </div>
        </div>
        </transition>
      </div>
    </div>

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
          <div :key="images[12].id" >
            <div class="grid-image">
              <div>
                <FadeImage :url="path + images[12].url"/>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>


    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
        <div :key="images[13].id">
          <div class="grid-image">
            <div>
              <FadeImage :url="path + images[13].url"/>
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
  methods: {
    emptyObject(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object
    }
  }
}
</script>

<style lang="css" scoped>
</style>
