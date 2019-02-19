<template>
  <div>
    <div class="container">
      <h1>Statistics</h1>
      <hr />
      <h3>Top retailers based on total sum</h3>
      <div class="row">
        <div class="col-6">
          <canvas ref="chartOne"></canvas>
        </div>
        <div class="col-6">
          <canvas ref="chartTwo"></canvas>
        </div>
      </div>
    </div>
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