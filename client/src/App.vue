<template>
  <div id="app">
    <div class="nav">
asdas
    </div>
    <div class="content">
      asdas
    </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="scss">

@import 'styles/reset';

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
  display: flex;
  flex-direction: row;
  .nav {
  width: 200px;
  background-color: lightblue;
  }
  .content {
  }
}
</style>
