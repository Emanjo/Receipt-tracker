<template>
  <div id="app">
    <main-nav/>
    <span class="border-bottom"></span>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
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

html, body {
  min-height: 100vh;
}

</style>
