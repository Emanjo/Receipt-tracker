<template>
      <v-layout row wrap>
        <v-flex pa-3 xs12>
          <div class="text-xs-center">
            <h1>Dashboard</h1>
          </div>
        </v-flex>
        <v-flex pr-2 pb-3 xs12 md6>
          <v-card>
          <v-card-title primary-title>
            <v-layout row wrap>
              <v-flex xs12>
                <div class="text-xs-center">
                  <h2 class="font-weight-thin">Top Retailers</h2>
                </div>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="days in past"
                  box
                  class="pt-2"
                  v-model="daysTopRetailer"
                  @change="updateTopRetailers"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-title>
            <div class="loader text-xs-center">
              <img v-if="notLoadedTopRetailer" src="../../assets/loader.gif" alt="Loading icon">
            </div>
            <div class="pr-3 pb-3 pt-0">
              <canvas px-2 ref="topRetailerChart"></canvas>
            </div>
          </v-card>
        </v-flex>
        <v-flex pl-2 pb-3 xs12 md6>
          <v-card>
          <v-card-title primary-title>
            <v-layout row wrap>
              <v-flex xs12>
                <div class="text-xs-center">
                  <h2 class="font-weight-thin">Top Items</h2>
                </div>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  class="pt-2"
                  label="days in past"
                  box
                  v-model="daysTopItem"
                  @change="updateTopItems"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-title>
            <div class="loader text-xs-center">
              <img v-if="notLoadedTopItem" src="../../assets/loader.gif" alt="Loading icon">
            </div>
            <div class="pl-3 pb-3 pt-0">
              <canvas px-2 ref="topItemChart"></canvas>
            </div>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <receipts-overview></receipts-overview>
        </v-flex>
      </v-layout>
</template>

<script>
  import { barChartTopRetailers, barChartTopItems } from '../../helpers/createCharts';
  import axios from 'axios';
  import ReceiptsOverview from './../dashboard/ReceiptsOverview.vue';

  export default {
    components: {
      ReceiptsOverview
    },
    data() {
      return {
        notLoadedTopItem: true,
        notLoadedTopRetailer: true,
        error: false,
        daysTopItem: 7,
        daysTopRetailer: 7,
        topItemChart: null,
        topRetailerChart: null,
      }
    },
    methods: {
      async updateTopItems() {

        if(this.topItemChart) { this.topItemChart.destroy()}

        this.notLoadedTopItem = true;
      
        const topItemChart = this.$refs.topItemChart,
              topItemCtx = topItemChart.getContext("2d");

        axios.get(`/api/items/count/${this.daysTopItem}`)
        .then( response => {
  
        this.topItemChart = barChartTopItems(topItemCtx, response.data.data);

        this.notLoadedTopItem = false;

        })
        .catch( () => {
          this.notLoadedTopItem = false;
          this.error = true;
        });
      },
      async updateTopRetailers() {

        if(this.topRetailerChart) { this.topRetailerChart.destroy()}

        this.notLoadedTopRetailer = true;
      
        const topRetailerChart = this.$refs.topRetailerChart, 
              topRetailerCtx = topRetailerChart.getContext("2d");

        axios.get(`/api/retailers/sum/${this.daysTopRetailer}`)
        .then( response => {
  
        this.topRetailerChart = barChartTopRetailers(topRetailerCtx, response.data.data);

        this.notLoadedTopRetailer = false;

        })
        .catch( () => {
          this.notLoadedTopRetailer = false;
          this.error = true;
        });
      }

    },
    async mounted() {

      this.updateTopItems();

      this.updateTopRetailers();

    }
  }
</script>