<template>
  <div id="app" class="container">
      <main-nav class="main-nav"/>
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


</style>
