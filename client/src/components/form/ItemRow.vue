<template>
    <v-layout row wrap>
      <v-flex pa-8 xs12 sm6 md6 class="pr">
          <combo-box p8
            @onChange="descriptionChange" 
            label="Select an item or create a new one" 
            apiUrl="api/items" 
            placeholder="example: bread"
            v-model="description"
          ></combo-box>
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
import ComboBox from './../form/ComboBox.vue';

  export default {
    components: {
      ComboBox,
    },
    props: [
      'index'
    ],
    data() {
      return {
        description: '',
        price: 0,
        count: 1
      }
    },
    methods: {
      emit() {
        this.$emit('onChange', {
          description: this.description, 
          pricePerItem: parseInt(this.price), 
          count: parseInt(this.count)
          }, this.index);
      },
      descriptionChange(value) {
        this.description = value;
      }
    },
    watch: {
      description() {
        this.emit()
      },
      price() {
        this.emit()
      },
      count() {
        this.emit();
      }
    }
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