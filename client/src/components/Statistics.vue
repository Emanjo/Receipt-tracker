<template>
  <div>
    <div class="container">
      <h1>Statistics</h1>
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>

<script>
  import { barChartTopRetailers } from '../helpers/createCharts';
  import axios from 'axios';

  export default {
    data() {
      return {
        receipts: []
      }
    },
    async mounted() {
      try {
      const reciepts = await axios.get('/api/receipts/');
      const retailers = await axios.get('/api/retailers/');

      this.retailers = retailers.data;
      this.receipts = reciepts.data;
      } catch (err) {
        console.log(err);
      }

      let chart = this.$refs.chart;
      let ctx = chart.getContext("2d");
      
      barChartTopRetailers(ctx, 'Top retailers last 30 days based on total sum', this.receipts.data, this.retailers.data);
    }
  }
</script>

<style scoped>

</style>