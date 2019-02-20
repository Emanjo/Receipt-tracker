<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Receipt tracker</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        to="/new-receipt"
      >
        <span class="mr-2">New receipt</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
