<template>
  <div>
      <h1>Dashboard</h1>
      <v-divider></v-divider>
      <h2 class="text-xs-center display-1 font-weight-thin mb-3 mt-3">Top retailers</h2>
      <v-layout row wrap>
      <v-flex xs12 md6>
        <div class="loader text-xs-center">
          <img v-if="notLoaded" src="../../assets/loader.gif" alt="Loading icon">
        </div>
        <canvas ref="chartOne"></canvas>
      </v-flex>
      <v-flex xs12 md6>
        <div class="loader text-xs-center">
          <img v-if="notLoaded" src="../../assets/loader.gif" alt="Loading icon">
        </div>
        <canvas ref="chartTwo"></canvas>
      </v-flex>
      <v-flex xs12>
        <v-alert class="text-xs-center" :value="error" type="error" transition="scale-transition"><b>Error!</b> Connection to database failed!</v-alert>
      </v-flex>
      </v-layout>
    </div>
</template>

<script>
  import { barChartTopRetailers } from '../../helpers/createCharts';
  import axios from 'axios';

  export default {
    data() {
      return {
        notLoaded: true,
        error: false
      }
    },
    async mounted() {
      axios.all([ 
        axios.get('/api/retailers/sum/7'), 
        axios.get('/api/retailers/sum/30') 
        ]) 
      .then(axios.spread((sevenReq, thirtyReq) => {
        let chartOne = this.$refs.chartOne, chartTwo = this.$refs.chartTwo;
        let ctxOne = chartOne.getContext("2d"), ctxTwo = chartTwo.getContext("2d");
      
        barChartTopRetailers(ctxOne, 'last 7 days', sevenReq.data.data);
        barChartTopRetailers(ctxTwo, 'last 30 days', thirtyReq.data.data);

        this.notLoaded = false;
      })) 
      .catch(() => {
          this.notLoaded = false;
          this.error = true;
      });
    }
  }
</script>

<style scoped>


</style>