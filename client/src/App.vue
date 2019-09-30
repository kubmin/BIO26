<template>
  <div id="bio-26">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BIO26',
}
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
  box-sizing: border-box;
}

#bio-26 {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing:border-box;
  color: #2c3e50;
  height: 100%;
  padding: 12px;
}
</style>
