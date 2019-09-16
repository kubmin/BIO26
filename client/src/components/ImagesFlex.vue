<template lang="html">
  <div class="wrapper">
    <div class="image-wrap">
      <div v-for="(image, index) in images" :key="index" @click="select(image)">
        <img ref="image" v-images-loaded="loaded" :src="'http://localhost:5000/' + image.url" :class="{ selected: firstIdx.id == image.id || secondIdx.id == image.id }"/>
        {{ image.id }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import imagesLoaded from 'vue-images-loaded'

const path = 'http://localhost:5000/'

export default {
  name: 'ImagesFex',
  data() {
    return {
      load: false,
      images: [],
      selectedItems: 0,
      firstIdx: {
        id: null,
        url: null,
      },
      secondIdx: {
        id: null,
        url: null,
      },
    }
  },
  directives: {
    imagesLoaded
  },
  created() {
    axios.get(path)
    .then((res) => {
      this.images = res.data
    })
    .catch((error) => {
      alert(error)
    })
  },
  methods: {
    loaded(el) {
      const width = el.elements[0].clientWidth
      const height = el.elements[0].clientHeight
      const aspect =  width / height

      el.elements[0].parentNode.style.flex = aspect
    },
    select(image) {
      if (this.selectedItems == 0) {
        this.firstIdx.id = image.id
        this.firstIdx.url = image.url
        this.selectedItems++
      } else if (this.selectedItems == 1) {
        this.secondIdx.id = image.id
        this.secondIdx.url = image.url
        this.selectedItems = 0

        var bodyFormData = new FormData()
        bodyFormData.set(0, this.firstIdx.id)
        bodyFormData.set(1, this.secondIdx.id)

        this.firstIdx.id = null
        this.secondIdx.id = null

        axios({
          method: 'post',
          url: 'http://localhost:5000/nn',
          data: bodyFormData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then((response) => {
            this.images = response.data
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.image-wrap {
  display: flex;
}
.image-wrap > div:not(:last-child) {
  margin-right: 2%;
}
img {
  width: 100%;
  height: auto;
  vertical-align: middle;
}
.selected {
  opacity: .5;
}
</style>
