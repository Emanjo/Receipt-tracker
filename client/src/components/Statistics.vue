<template>
  <div>
    <div class="container">
      <h1>Statistics</h1>
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>

<script>
  import { barChart } from '../helpers/createCharts';

  //Just some dummydata
  let data = [
    {
      retailer: 'Rema',
      total: 1500
    },
    {
      retailer: 'Kiwi',
      total: 465
    },
  ]

  export default {
    mounted() {
      let chart = this.$refs.chart;
      let ctx = chart.getContext("2d");
      
      barChart(ctx, 'Top retailers last 30 days', data);
    }
    
  }
</script>

<style scoped>

</style>