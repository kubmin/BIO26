<template lang="html">
  <div class="grid-container">
    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
          <div :key="images[10].id" >
            <div class="grid-image">
              <div>
                <FadeImage :url="path + images[10].url"/>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
        <div :key="images[11].id">
          <div class="grid-image">
            <div>
              <FadeImage :url="path + images[11].url"/>
            </div>
          </div>
        </div>
        </transition>
      </div>
    </div>

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
          <div :key="images[14].id" >
            <div class="grid-image">
              <div>
                <FadeImage :url="path + images[14].url"/>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>


    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
        <div :key="images[15].id">
          <div class="grid-image">
            <div>
              <FadeImage :url="path + images[15].url"/>
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
  methods: {
    emptyObject(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object
    }
  }
}
</script>

<style lang="css" scoped>
</style>
