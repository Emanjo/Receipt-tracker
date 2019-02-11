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
      date: 129876461,
      items: [
        {
          description: 'Banan',
          count: 1,
          pricePerItem: 16
        },
        {
          description: 'Melkesjokolade',
          count: 1,
          pricePerItem: 43 
        },
      ],
    },
    {
      retailer: 'Kiwi',
      total: 465
    },
    {
      retailer: 'Spar',
      total: 49
    }
  ]

  export default {
    mounted() {
      let chart = this.$refs.chart;
      let ctx = chart.getContext("2d");
      
      barChart(ctx, 'Top retailers last 30 days based on total sum', data);
    }
    
  }
</script>

<style scoped>

</style>