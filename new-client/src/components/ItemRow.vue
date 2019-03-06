<template>
    <v-layout row wrap>
      <v-flex pa-8 xs12 sm6 md6 class="pr">
          <v-text-field p8
            label="Description"
            v-model="description"
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm3 md3 class="pa">
          <v-text-field
            label="Price"
            type="number"
            v-model="price"
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm3 md3 class="pl">
          <v-text-field
            label="Count"
            type="number"
            v-model="count"
            price
          ></v-text-field>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        id: 0,
        description: '',
        price: 0,
        count: 0
      }
    },
  }
</script>

<style scoped>

@media (min-width: 600px) {
  .pr {
  padding-right: 8px;
}

.pa {
  padding: 0 8px;
}

.pl {
  padding-left: 8px;
}

}

</style>