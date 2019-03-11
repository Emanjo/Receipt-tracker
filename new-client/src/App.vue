<template>
  <v-app>
    <main-nav/>
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
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
    Footer,
  },
  data () {
    return {
      items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        right: null
      //
    }
  }
}
</script>
