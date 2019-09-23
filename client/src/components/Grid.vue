<template lang="html">
  <!-- <div class="wrapper">
    <div class="image-wrap">
      <div v-for="(image, index) in images" :key="index" @click="select(image)">
        <img ref="image" v-images-loaded="loaded" :src="path + image.url" :class="{ selected: firstIdx.id == image.id || secondIdx.id == image.id }"/>
        {{ image.id }}
      </div>
    </div>
  </div> -->

  <div class="grid-container">
    <div
      class="grid-item"
      v-for="image in images"
      :key="image.id"
    >
      <div class="grid-image">
        <img :src="path + image.url"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import imagesLoaded from 'vue-images-loaded'

export default {
  name: 'ImagesFex',
  data() {
    return {
      path: 'http://92.111.10.191:5000/',
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
    axios.get(this.path)
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
          url: this.path + 'nn',
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
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, calc(25% - 9px));
  grid-template-rows: repeat(4, calc(25% - 9px));
  grid-gap: 12px;
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
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
