<template>
  <v-form>
      <v-layout row wrap>

        <!-- Form row alert box-->
        <v-flex xs12>
           <div class="text-xs-center">
            <v-alert :value="success" type="success" transition="scale-transition" dismissible @click="alertClicked">  Success! Receipt was made. </v-alert>
            <v-alert :value="error" type="error" transition="scale-transition" dismissible @click="alertClicked">  Something went wrong! Please try again later. </v-alert>
          </div>
          </v-flex>

          <!-- Form row-->
        <v-flex xs12>
          <h2 class="text-xs-center display-1 font-weight-thin mb-3 mt-3">New receipt</h2>
        </v-flex>

        <!-- Form row-->
        <v-flex xs3>
        </v-flex>
        <v-flex xs12 sm9 md9>
          <h3 class="mt-3">General info</h3>
        </v-flex>
        <v-flex xs3>
        </v-flex>

        <!-- Form row-->
        <v-flex xs12 sm3 md3>
          <v-text-field
            label="Retailer"
            v-model="retailer"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm3 md3>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            lazy
            full-width
            width="290px"
            >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Date"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
          </v-date-picker>
          </v-dialog>
        </v-flex>
      <v-flex xs3>
      </v-flex>

      <!-- Form row-->
      <v-flex xs3>
      </v-flex>
      <v-flex xs6>
        <h3 class=" mt-3">Items</h3>
      </v-flex>
      <v-flex xs3>
      </v-flex>

      <!-- Form row-->
      <v-flex xs3>
      </v-flex>
      <v-flex xs12 sm6 md6>
        <component v-for="(itemRow, index) in itemRows" :is="itemRow" @onChange="updateItems" :index="index" :key="index"></component>
      </v-flex>
      <v-flex xs3>
      </v-flex>

      <!-- Form row-->
      <v-flex xs12>
        <div class="text-xs-center">
          <v-btn color="success" @click="addItemRow">Add item <v-icon>add</v-icon></v-btn>
          <v-btn color="error" @click="removeItemRow">Remove item <v-icon>remove</v-icon></v-btn>
        </div>
      </v-flex>

      <!-- Form row-->
      <v-flex xs3>
      </v-flex>
      <v-flex xs12 sm6 md6 pt-5>
        <div class="text-xs-center">
          <v-btn color="info" @click="addReceipt"><v-icon>note_add</v-icon> Register receipt</v-btn>
        </div>
      </v-flex>
      <v-flex xs3>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
  import ItemRow from './../form/ItemRow.vue';
  import axios from 'axios';

  export default {
    components: {
      ItemRow,
    },
    data() {
      return {
        retailer: "",
        items: [],
        itemRows: ['ItemRow'],
        date: new Date().toISOString().substr(0, 10),
        modal: false,
        menu: false,
        menu2: false,
        success: false,
        error: false,
      }
    },
    methods: {
      async addReceipt() {
        axios.post('/api/receipts', {
          retailer: this.retailer,
          date: Date.parse(this.date),
          items: this.items
        })
        .then( response => {
          this.success = true;
          console.log(response);
        })
        .catch( err => {
          this.error = true;
          console.log(err);
        });
      },
      addItemRow() {
        this.itemRows.push('ItemRow');
      },
      removeItemRow() {
        if (this.itemRows.length <= 1) {
          this.addItemRow();
        }
        this.items.splice(-1,1); // Make this one better, since it will delete wrong objects..
        this.itemRows.splice(-1,1);
      },
      updateItems(object, index) {
        this.$set(this.items, index, object)
        console.log(this.items);
      },
      alertClicked() {
        this.success = false;
        this.error = false;
      }
    }
  }
</script>

<style scoped>

</style>