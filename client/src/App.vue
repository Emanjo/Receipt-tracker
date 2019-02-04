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
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #182143;
  min-height: 100vh;
  display: flex;
  line-height: 1.5;
  .nav {
    background-color: #2E385E;
    box-shadow: 0.5px 0 1px;
    .logo {
      background: #525E87;
      padding: 1em;
      text-align: center;
      text-transform: uppercase;
      h1 {
        font-size: 20px;
        font-weight: lighter;
        color: #929BBD;
      }
    }
  }
  .content {
    width: 100%;
    padding: 10px 50px;
  }
}

.container {
  overflow: hidden;
  margin: 1.5em;
}

.fade-enter-active {
  transition: ease-out 0.20s;
}

.fade-enter  {
  opacity: 0;
}
</style>
