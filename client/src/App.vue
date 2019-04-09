<template>
  <v-app>
    <main-nav/>
    <v-content>
      <router-view/>
    </v-content>
     <Footer/>
  </v-app>
</template>

<script>

import MainNav from './components/MainNav.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    MainNav,
    Footer
  }
}
</script>
