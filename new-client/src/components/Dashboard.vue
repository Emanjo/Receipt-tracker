<template>
  <div>
      <h1>Dashboard</h1>
      <v-divider></v-divider>
      <h2 class="text-xs-center display-1 font-weight-thin mb-3 mt-3">Top retailers</h2>
      <v-layout row wrap>
      <v-flex xs12 md6>
        <canvas ref="chartOne"></canvas>
      </v-flex>
      <v-flex xs12 md6>
        <canvas ref="chartTwo"></canvas>
      </v-flex>
      </v-layout>
    </div>
</template>

<script>
  import { barChartTopRetailers } from '../helpers/createCharts';
  import axios from 'axios';

  export default {
    async mounted() {
      let topRetailerDataMonth = [], topRetailerDataWeek = [];
      try {
        topRetailerDataWeek = await axios.get('/api/retailers/sum/7');
        topRetailerDataMonth = await axios.get('/api/retailers/sum/30');
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }

      let chartOne = this.$refs.chartOne, chartTwo = this.$refs.chartTwo;
      let ctxOne = chartOne.getContext("2d"), ctxTwo = chartTwo.getContext("2d");
      
      barChartTopRetailers(ctxOne, 'last 7 days', topRetailerDataWeek);
      barChartTopRetailers(ctxTwo, 'last 30 days', topRetailerDataMonth);
    }
  }
</script>

<style scoped>

</style>