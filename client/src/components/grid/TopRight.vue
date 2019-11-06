<template lang="html">
  <div class="grid-container">
    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
          <div v-if="emptyObject(images[2])" :key="images[2]"/>
          <div v-else :key="images[2].id" class="grid-image">
            <div>
              <img :src="path + images[2].url"/>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
        <div v-if="emptyObject(images[3])" :key="images[3]"/>
        <div v-else :key="images[3].id" class="grid-image">
          <div>
            <img :src="path + images[3].url"/>
          </div>
        </div>
        </transition>
      </div>
    </div>

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
          <div v-if="emptyObject(images[6])" :key="images[6]"/>
          <div v-else :key="images[6].id" class="grid-image">
            <div>
              <img :src="path + images[6].url"/>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="grid-item">
      <div class="grid-wrapper">
        <transition name="fade" mode="out-in">
        <div v-if="emptyObject(images[7])" :key="images[7]"/>
        <div v-else :key="images[7].id" class="grid-image">
          <div>
            <img :src="path + images[7].url"/>
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
  name: 'TopRight',
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
