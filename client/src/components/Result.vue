<template lang="html">
  <div class="wrapper">
    <template v-if="images.length > 0">
      <div class="grid-container">
        <div
          class="grid-item"
          v-for="(image, index) in images"
          :key="index"
        >
          <div class="grid-wrapper">
            <div class="grid-image">
              <div>
                <GridImage
                  :url="path + image.url"
                />
              </div>
            </div>
            <div class="grid-meta">
              {{ title(image.url)[0] }}<br>
              {{ title(image.url)[1] }}<br>
              {{ title(image.url)[2] }}<br>
            </div>
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
      path: 'http://192.168.0.97:5000/',
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
    title(value) {
      var index
      var array = value.match(/\[.*?\]/g)

      for (index in array) {
        array[index] = array[index].replace('[', '')
        array[index] = array[index].replace(']', '')
      }

      array[0] = array[0].replace(/_/g, ':')
      array[1] = array[1].replace(/_/g, ' ')
      array[2] = '(' + array[2] + ')'

      return array

    },
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
