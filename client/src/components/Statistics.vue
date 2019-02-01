<template>
  <div>
    <div class="container">
      <h1>Statistics</h1>
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>

<script>
import { lineChart } from '../helpers/createCharts';
  export default {
    mounted() {
      let chart = this.$refs.chart;
      let ctx = chart.getContext("2d");
      
      lineChart(ctx, 'Top retailers last 30 days');
    }
    
  }
</script>

<style scoped>

</style>