<template lang="html">
  <div class="grid-container">
    <div
      class="grid-item"
      @click="select(image)"
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

<script>
import axios from 'axios'
import GridImage from './GridImage.vue'

export default {
  name: 'ImagesFex',
  data() {
    return {
      path: 'http://92.111.10.191:5000/',
      bodyFormData: new FormData(),
      images: [],
      sIdx: null,
      eIdx: null,
      selected: 0,
    }
  },
  components: {
    GridImage,
  },
  created() {
    axios.get(this.path)
    .then((res) => {
      this.images = res.data
    })
    .catch((error) => {
      alert(error)
    })
  },
  methods: {
    select(image) {
      if (this.selected == 0) {
        this.sIdx = image.id
        this.selected++
      } else if (this.selected == 1) {
        this.eIdx = image.id
        this.selected = 0

        this.$router.push({ name: 'Result', params: { sIdx: this.sIdx, eIdx: this.eIdx } })

        this.sIdx = null
        this.eIdx = null
      }
    }
  }
}
</script>

<style lang="css">
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, calc(25% - 18px));
  grid-template-rows: repeat(4, calc(25% - 18px));
  grid-gap: 24px;
  height: 100%;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 30px;
  text-align: center;
}
.grid-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.grid-image > img {
  object-fit: cover;
  max-width: 100%;
  max-height: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
