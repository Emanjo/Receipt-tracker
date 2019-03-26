<template>
  <v-data-table
    :headers="headers"
    :items="receipts"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td class="text-xs-left">{{ props.item.retailer }}</td>
      <td class="text-xs-left">{{ props.item.date }}</td>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios';
  export default {
    data () {
      return {
        headers: [
          { text: 'Retailer', value: 'retailer', sortable: true, align: 'left', },
          { text: 'Date', value: 'date', sortable: true, align: 'left', },
        ],
        receipts: []
      }
    },
    mounted() {
      axios.get('/api/receipts')
      .then( response => {

        const array = response.data.data.map(element => ({
          retailer: element.retailer,
          date: `${new Date(element.date).getFullYear()}-${new Date(element.date).getMonth()}-${new Date(element.date).getDate()}`
        }));

        this.receipts = array;

      });
    }
  }
</script>

<style scoped>

</style>