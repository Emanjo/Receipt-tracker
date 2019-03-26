<template>
      <v-layout row wrap>
        <v-flex pa-3 xs12>
          <div class="text-xs-center">
            <h1>Dashboard</h1>
          </div>
        </v-flex>
        <v-flex pr-2 pb-3 xs12 md6>
          <top-retailer></top-retailer>
        </v-flex>
        <v-flex pl-2 pb-3 xs12 md6>
          <top-item></top-item>
        </v-flex>
        <v-flex xs12>
          <receipts-overview></receipts-overview>
        </v-flex>
      </v-layout>
</template>

<script>
  import ReceiptsOverview from './../dashboard/ReceiptsOverview.vue';
  import TopRetailer from './../dashboard/TopRetailer.vue';
  import TopItem from './../dashboard/TopItem.vue';

  export default {
    components: {
      ReceiptsOverview,
      TopRetailer,
      TopItem
    }
  }
</script>