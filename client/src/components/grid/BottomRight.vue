<template lang="html">
  <div class="grid-container">
    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
          <div v-if="emptyObject(images[10])" :key="images[10]"/>
          <div v-else :key="images[10]" class="grid-image">
            <div>
              <img :src="path + images[10].url"/>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
        <div v-if="emptyObject(images[11])" :key="images[11]"/>
        <div v-else :key="images[11]" class="grid-image">
          <div>
            <img :src="path + images[11].url"/>
          </div>
        </div>
        </transition>
      </div>
    </div>

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
          <div v-if="emptyObject(images[14])" :key="images[14]"/>
          <div v-else :key="images[14]" class="grid-image">
            <div>
              <img :src="path + images[14].url"/>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
        <div v-if="emptyObject(images[15])" :key="images[15]"/>
        <div v-else :key="images[15]" class="grid-image">
          <div>
            <img :src="path + images[15].url"/>
          </div>
        </div>
      </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'BottomRight',
  computed: {
    ...mapState([
      'path',
      'images',
    ]),
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
