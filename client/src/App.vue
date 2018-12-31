<template>
  <div id="app">
    <PostComponent/>
  </div>
</template>

<script>
import PostComponent from './components/PostComponent.vue'

export default {
  name: 'app',
  components: {
    PostComponent
  }
}
</script>

<style lang="scss">

@import 'assets/reset';

* {
  box-sizing: border-box;
}

html {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  padding: 30px;
}
</style>
