<template>
  <v-form>
    <v-container>
      <v-layout row wrap>

        <v-flex xs12 >
          <h2 class="text-xs-center display-1 font-weight-thin mb-3 mt-3">New receipt</h2>
        </v-flex>

        <v-flex xs3>
        </v-flex>

        <v-flex xs12 sm9 md9>
          <h3 class="font-weight-thin mt-3">General info</h3>
        </v-flex>

        <v-flex xs3>
        </v-flex>
        
        <v-flex xs12 sm3 md3>
          <v-text-field
            label="Retailer"
            v-model="retailer"
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm3 md3>
          <v-text-field
            label="Date"
            v-model="date"
          ></v-text-field>
        </v-flex>

        <v-flex xs3>
        </v-flex>

        <v-flex xs3>
        </v-flex>


        <v-flex xs9>
          <h3 class="font-weight-thin mt-3">Items</h3>
        </v-flex>

        <v-flex xs3>
        </v-flex>

        <v-flex xs12 sm6 md6>
          <component v-for="itemRow in itemRows" :is="itemRow" :key="itemRow.id"></component>
        </v-flex>


        <v-flex xs3>
        </v-flex>

        <v-flex xs12>
          <div class="text-xs-center">
            <v-btn color="success" @click="addItemRow">Add item <v-icon>add</v-icon></v-btn>
            <v-btn color="error" @click="removeItemRow">Remove item <v-icon>remove</v-icon></v-btn>
          </div>
        </v-flex>

        <v-flex xs3>
        </v-flex>

        <v-flex xs12 sm6 md6>
          <v-btn color="info" @click="addReceipt"><v-icon>note_add</v-icon> Register receipt</v-btn>
        </v-flex>

        <v-flex xs3>
        </v-flex>
        
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  import ItemRow from './ItemRow.vue';

  export default {
    components: {
      ItemRow
    },
    data() {
      return {
        retailer: "",
        date: "",
        items: [],
        itemRows: ['ItemRow','ItemRow', 'ItemRow']
      }
    },
    methods: {
      addReceipt() {

      },
      addItemRow() {
        this.itemRows.push('ItemRow');
      },
      removeItemRow() {
        if (this.itemRows.length <= 1) {
          this.addItemRow();
        } 
        this.itemRows.splice(-1,3);
      }
    },
    
  }
</script>

<style scoped>

</style>