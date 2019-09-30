<template lang="html">
  <div class="wrapper">
    <template v-if="images.length > 0">
      <div class="grid-container">
        <div
          class="grid-item"
          v-for="(image, index) in images"
          :key="index"
        >
          <div class="grid-image">
            <GridImage
              :url="path + image.url"
            />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      {{ message }}
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import GridImage from './GridImage.vue'

export default {
  name: 'Result',
  props: ['sIdx', 'eIdx'],
  data() {
    return {
      path: 'http://92.111.10.191:5000/',
      images: [],
      message: null,
      bodyFormData: new FormData(),
    }
  },
  components: {
    GridImage,
  },
  created() {
    this.generate()
  },
  methods: {
    generate() {
      this.bodyFormData.set(0, this.$route.params.sIdx)
      this.bodyFormData.set(1, this.$route.params.eIdx)

      axios({
        method: 'post',
        url: this.path + 'nn',
        data: this.bodyFormData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then((response) => {
        this.images = response.data
      })
      .catch(() => {
        this.message = 'error, check console'
      })
    }
  }
}

</script>

<style lang="css" scoped>
.wrapper {
  height: 100%;
}
</style>
