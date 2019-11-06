<template lang="html">
  <div class="grid-container">
    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
          <div v-if="emptyObject(images[8])" :key="images[8]"/>
          <div v-else :key="images[8]" class="grid-image">
            <div>
              <img :src="path + images[8].url"/>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
        <div v-if="emptyObject(images[9])" :key="images[9]"/>
        <div v-else :key="images[9]" class="grid-image">
          <div>
            <img :src="path + images[9].url"/>
          </div>
        </div>
        </transition>
      </div>
    </div>

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
          <div v-if="emptyObject(images[12])" :key="images[12]"/>
          <div v-else :key="images[12]" class="grid-image">
            <div>
              <img :src="path + images[12].url"/>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
        <div v-if="emptyObject(images[13])" :key="images[13]"/>
        <div v-else :key="images[13]" class="grid-image">
          <div>
            <img :src="path + images[13].url"/>
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
  name: 'BottomLeft',
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
