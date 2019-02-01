<template>
  <div id="app">
    <div class="nav">
      <div class="logo">
        <h1>Receipt tracker</h1>
      </div>
      <div class="container">
        <main-nav class="main-nav"/>
      </div>
    </div>
    <div class="content">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import MainNav from './components/MainNav.vue';

export default {
  name: 'app',
  components: {
    MainNav
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
  color: #8080B3;
  min-height: 100vh;
  display: flex;
  .nav {
    background-color: #343477;
    .logo {
      background: #8080B3;
      padding: 1em;
      h1 {
        color: #1B1B5A;
      }
    }
  }
  .content {
    width: 100%;
  }
}

.container {
  overflow: hidden;
  margin: 1em;
}

.fade-enter-active {
  transition: ease-out 0.20s;
}

.fade-enter  {
  opacity: 0;
}
</style>
